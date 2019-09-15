import React from 'react';
import PropTypes from 'prop-types';
import withStyles from '../../../hoc/withStyles.native';
import { DotContainer, DotTouchableOpacity, DotComp } from '../styles/PaginationDots.style.native';

class PaginationDots extends React.PureComponent {
  renderDots = () => {
    const {
      numberOfDots,
      selectedIndex,
      size,
      selectedSize,
      borderRadius,
      selectedBorderRadius,
      backgroundColor,
      selectedBackgroundColor,
      borderWidth,
      selectedBorderWidth,
      borderColor,
      selectedBorderColor,
      dotLeftMargin,
      dotRightMargin,
    } = this.props;
    const dots = [];

    for (let i = 0; i < numberOfDots; i += 1) {
      dots.push(
        <DotTouchableOpacity key={i} onPress={() => this.onPageChange(i)}>
          <DotComp
            selected={i === selectedIndex}
            size={size}
            selectedSize={selectedSize}
            borderRadius={borderRadius}
            selectedBorderRadius={selectedBorderRadius}
            backgroundColor={backgroundColor}
            selectedBackgroundColor={selectedBackgroundColor}
            borderWidth={borderWidth}
            selectedBorderWidth={selectedBorderWidth}
            borderColor={borderColor}
            selectedBorderColor={selectedBorderColor}
            dotLeftMargin={dotLeftMargin}
            dotRightMargin={dotRightMargin}
          />
        </DotTouchableOpacity>
      );
    }
    return dots;
  };

  onPageChange = clickItemIndex => {
    const { onPress } = this.props;
    if (onPress) {
      onPress(clickItemIndex);
    }
  };

  render() {
    const { marginTop } = this.props;
    return <DotContainer marginTop={marginTop}>{this.renderDots()}</DotContainer>;
  }
}

PaginationDots.propTypes = {
  numberOfDots: PropTypes.number.isRequired,
  selectedIndex: PropTypes.number.isRequired,
  onPress: PropTypes.func,
  size: PropTypes.number,
  selectedSize: PropTypes.number,
  borderRadius: PropTypes.number,
  selectedBorderRadius: PropTypes.number,
  backgroundColor: PropTypes.string,
  selectedBackgroundColor: PropTypes.string,
  borderWidth: PropTypes.number,
  selectedBorderWidth: PropTypes.number,
  borderColor: PropTypes.string,
  selectedBorderColor: PropTypes.string,
  dotLeftMargin: PropTypes.number,
  dotRightMargin: PropTypes.number,
  theme: PropTypes.shape({}),
  marginTop: PropTypes.number,
};

PaginationDots.defaultProps = {
  onPress: () => {},
  size: 8,
  selectedSize: 10,
  borderRadius: 4,
  selectedBorderRadius: 6,
  backgroundColor: '#575757',
  selectedBackgroundColor: '#ffffff',
  borderWidth: 1,
  selectedBorderWidth: 2,
  borderColor: '#ffffff',
  selectedBorderColor: '#575757',
  dotLeftMargin: 2,
  dotRightMargin: 2,
  theme: {},
  marginTop: 0,
};

export default withStyles(PaginationDots);
export { PaginationDots as PaginationDotsVanilla };
