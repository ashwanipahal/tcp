import React from 'react';
import PropTypes from 'prop-types';
import { TouchableOpacity, Modal, View, StatusBar, Platform, Dimensions } from 'react-native';
import Triangle from './Triangle';
import getTooltipCoordinate, { getElementVisibleWidth } from './getTooltipCoordinate';

const Screen = Dimensions.get('window');
const ScreenWidth = Screen.width;
const ScreenHeight = Screen.height;
const isIOS = Platform.OS === 'ios';

const styles = {
  container: (withOverlay, overlayColor) => ({
    backgroundColor: withOverlay ? overlayColor : 'transparent',
    flex: 1,
  }),
  Pointer: (pastMiddleLine, yOffset, elementHeight, xOffset, elementWidth) => ({
    position: 'absolute',
    top: pastMiddleLine ? yOffset - 13 : yOffset + elementHeight - 2,
    left: xOffset + getElementVisibleWidth(elementWidth, xOffset, ScreenWidth) / 2 - 7.5,
  }),
  contentStyle: (yOffset, xOffset, highlightColor, elementWidth, elementHeight) => ({
    position: 'absolute',
    top: yOffset,
    left: xOffset,
    backgroundColor: highlightColor,
    overflow: 'visible',
    width: elementWidth,
    height: elementHeight,
  }),
  shadowColor: {
    shadowColor: '#000',
    shadowOffset: { width: 1, height: 1 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 10,
  },
};
class ReactTooltip extends React.PureComponent {
  state = {
    isVisible: false,
    yOffset: 0,
    xOffset: 0,
    elementWidth: 0,
    elementHeight: 0,
  };

  renderedElement;

  componentDidMount() {
    // wait to compute onLayout values.
    setTimeout(this.getElementPosition, 500);
  }

  toggleTooltip = () => {
    const { onClose } = this.props;
    this.getElementPosition();
    this.setState(prevState => {
      if (prevState.isVisible && !isIOS) {
        onClose();
      }

      return { isVisible: !prevState.isVisible };
    });
  };

  wrapWithPress = (toggleOnPress, children) => {
    if (toggleOnPress) {
      return (
        <TouchableOpacity accessibilityRole="link" onPress={this.toggleTooltip} activeOpacity={1}>
          {children}
        </TouchableOpacity>
      );
    }

    return children;
  };

  getTooltipStyle = () => {
    const { yOffset, xOffset, elementHeight, elementWidth } = this.state;
    const { height, backgroundColor, width, withPointer } = this.props;

    const { x, y } = getTooltipCoordinate(
      xOffset,
      yOffset,
      elementWidth,
      elementHeight,
      ScreenWidth,
      ScreenHeight,
      width,
      height,
      withPointer
    );

    return {
      position: 'absolute',
      left: x,
      top: y,
      width,
      height,
      backgroundColor,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      flex: 1,
      borderRadius: 10,
      padding: 10,
    };
  };

  renderPointer = tooltipY => {
    const { yOffset, xOffset, elementHeight, elementWidth } = this.state;
    const { backgroundColor, pointerColor } = this.props;
    const pastMiddleLine = yOffset > tooltipY;

    return (
      <View style={styles.Pointer(pastMiddleLine, yOffset, elementHeight, xOffset, elementWidth)}>
        <Triangle
          style={{ borderBottomColor: pointerColor || backgroundColor }}
          isDown={pastMiddleLine}
        />
      </View>
    );
  };

  renderContent = withTooltip => {
    const { popover, withPointer, toggleOnPress, highlightColor, children } = this.props;

    if (!withTooltip) {
      return this.wrapWithPress(toggleOnPress, children);
    }

    const { yOffset, xOffset, elementWidth, elementHeight } = this.state;
    const tooltipStyle = this.getTooltipStyle();
    return (
      <View>
        <View
          style={styles.contentStyle(yOffset, xOffset, highlightColor, elementWidth, elementHeight)}
        >
          {children}
        </View>
        <View style={styles.shadowColor}>
          {withPointer && this.renderPointer(tooltipStyle.top)}
          <View style={tooltipStyle} testID="tooltipPopoverContainer">
            {popover}
          </View>
        </View>
      </View>
    );
  };

  getElementPosition = () => {
    if (this.renderedElement) {
      this.renderedElement.measure(
        (frameOffsetX, frameOffsetY, width, height, pageOffsetX, pageOffsetY) => {
          this.setState({
            xOffset: pageOffsetX,
            yOffset: isIOS ? pageOffsetY : pageOffsetY - StatusBar.currentHeight,
            elementWidth: width,
            elementHeight: height,
          });
        }
      );
    }
  };

  render() {
    const { isVisible } = this.state;
    const { onClose, withOverlay, overlayColor, onOpen } = this.props;

    return (
      <View
        collapsable={false}
        ref={e => {
          this.renderedElement = e;
        }}
      >
        {this.renderContent(false)}
        <Modal
          animationType="fade"
          visible={isVisible}
          transparent
          onDismiss={onClose}
          onShow={onOpen}
          onRequestClose={onClose}
        >
          <TouchableOpacity
            accessibilityRole="link"
            style={styles.container(withOverlay, overlayColor)}
            onPress={this.toggleTooltip}
            activeOpacity={1}
          >
            {this.renderContent(true)}
          </TouchableOpacity>
        </Modal>
      </View>
    );
  }
}

ReactTooltip.propTypes = {
  children: PropTypes.element.isRequired,
  withPointer: PropTypes.bool,
  popover: PropTypes.element.isRequired,
  toggleOnPress: PropTypes.bool,
  height: PropTypes.number,
  width: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  pointerColor: PropTypes.string,
  onClose: PropTypes.func,
  onOpen: PropTypes.func,
  overlayColor: PropTypes.string,
  withOverlay: PropTypes.bool,
  backgroundColor: PropTypes.string,
  highlightColor: PropTypes.string,
};

ReactTooltip.defaultProps = {
  withOverlay: true,
  overlayColor: 'rgba(250, 250, 250, 0.80)',
  highlightColor: 'transparent',
  withPointer: true,
  toggleOnPress: true,
  height: 96,
  width: 240,
  pointerColor: '#ffffff',
  backgroundColor: '#ffffff',
  onClose: () => {},
  onOpen: () => {},
};

export default ReactTooltip;
