import React from 'react';
import PropTypes from 'prop-types';
import { Image, View, Modal, TouchableOpacity } from 'react-native';
import BodyCopy from '@tcp/core/src/components/common/atoms/BodyCopy';
import { getScreenHeight } from '../../../../../utils/index.native';
import withStyles from '../../../hoc/withStyles.native';
import {
  DropDownStyle,
  Row,
  OverLayView,
  HeaderContainer,
  DropDownItemContainer,
  Separator,
  FlatList,
  StyledLabel,
} from '../DropDown.style.native';

const downIcon = require('../../../../../assets/carrot-small-down.png');
const upIcon = require('../../../../../assets/carrot-small-up.png');

/**
 * This is a drop down component. Styling of drop down and its item
 * can be passed in the component.
 * @param dropDownStyle - It applies style to the drop down row.
 * @param itemStyle - It applies style to the item of drop down.
 * @param selectedValue - Pass the by default selected value.
 * @param onValueChange - Callback to get the selected value of the drop down.
 * @param variation(primary/secondary) - primary to set the text in center and secondary to left.
 */

class DropDown extends React.PureComponent<Props> {
  static propTypes = {
    data: PropTypes.shape([]),
    selectedValue: PropTypes.string,
    onValueChange: PropTypes.func,
    itemStyle: PropTypes.shape({}),
    dropDownStyle: PropTypes.shape({}),
    variation: PropTypes.string,
    bounces: PropTypes.bool,
  };

  static defaultProps = {
    data: [],
    selectedValue: null,
    onValueChange: null,
    itemStyle: null,
    dropDownStyle: null,
    variation: 'primary',
    bounces: true,
  };

  static getDerivedStateFromProps(props, state) {
    const { selectedLabelState } = state;
    if (props.selectedValue !== selectedLabelState) {
      const result = props.data.find(item => {
        if (item.value) return item.value === props.selectedValue;
        return item.id === props.selectedValue;
      });

      if (result) {
        if (result.label) return { selectedLabelState: result.label };
        return { selectedLabelState: result.displayName };
      }
    }
    return null;
  }

  constructor(props) {
    super(props);
    this.rowFrame = {
      x: 0,
      y: 0,
      width: 0,
      height: 0,
    };

    this.dropDownFrame = {
      x: 0,
      y: 0,
      width: 0,
      height: 0,
    };

    const { data, selectedValue } = this.props;
    const selectedObject = data.find(item => {
      return item.value === selectedValue;
    });

    let selectedLabelState;
    if (selectedValue) {
      if (selectedObject) selectedLabelState = selectedObject.label;
      else selectedLabelState = selectedValue;
    } else {
      selectedLabelState = data.label;
    }

    this.state = {
      dropDownIsOpen: false,
      selectedLabelState,
      top: 0,
      flatListTop: 0,
      flatListHeight: 0,
    };
  }

  componentDidUpdate() {
    if (this.rowMarker) setTimeout(() => this.calculateDropDownPosition(), 300);
  }

  /**
   * Calculate the dimension and coordinates of drop down
   */
  calculateDropDownPosition = () => {
    if (!this.rowMarker) return;
    this.rowMarker.measure((x, y, width, height, pageX, pageY) => {
      this.rowFrame = { x: pageX, y: height + pageY, width, height };

      const windowHeight = getScreenHeight();

      // calculate the list height
      const { data, itemStyle } = this.props;
      const calculateHeight = data.length * itemStyle.height;

      // checking bottom space
      const bottomSpace = windowHeight - this.rowFrame.y - this.rowFrame.height;
      // check drop down is in bottom or not
      const showInBottom = bottomSpace >= calculateHeight || bottomSpace >= this.rowFrame.y;

      // if it is not in bottom then taking it y coordinate to set the drop down item position
      // else subtracting device height and position of drop down y coordinate.
      const topMargin = {
        top: showInBottom ? this.rowFrame.y : Math.max(0, this.rowFrame.y - calculateHeight),
      };

      const dH = windowHeight - pageY - height;
      this.setDropDownPosition(topMargin, dH, showInBottom, calculateHeight, windowHeight);
    });
  };

  /**
   * Set drop down position
   */
  setDropDownPosition = (topMargin, dH, showInBottom, calculateHeight, windowHeight) => {
    this.setState({ top: topMargin.top });
    let listMargin = 0;
    let listHeight = 0;

    if (showInBottom) {
      if (calculateHeight > dH) {
        listHeight = dH - 100;
      } else {
        listHeight = calculateHeight - 100;
      }
    } else if (calculateHeight > windowHeight) {
      listMargin = 100;
      listHeight = (windowHeight * 3) / 4;
    } else {
      listHeight = calculateHeight;
    }
    this.setState({ flatListHeight: listHeight, flatListTop: listMargin });
  };

  /**
   * Render drop down item
   */
  dropDownLayout = ({ item }) => {
    const { variation, itemStyle } = this.props;
    const { displayName } = item;
    let { label } = item;
    if (!label) {
      label = displayName;
    }
    return (
      <DropDownItemContainer onPress={() => this.onDropDownItemClick(item)} style={itemStyle}>
        <BodyCopy
          mobileFontFamily="secondary"
          fontSize="fs13"
          textAlign={variation === 'primary' ? 'center' : ''}
          color={itemStyle.color}
          fontWeight="semibold"
          text={label}
        />
      </DropDownItemContainer>
    );
  };

  /**
   * Open the drop down
   */
  openDropDown = () => {
    this.setState({
      dropDownIsOpen: true,
    });
  };

  /**
   * Handle the drop down item click
   */
  onDropDownItemClick = item => {
    let { label, value } = item;
    const { id, displayName } = item;
    if (!label) {
      label = displayName;
    }
    if (!value) value = id;
    this.setState({
      dropDownIsOpen: false,
      selectedLabelState: label,
    });

    // pass the callback here with value
    const { onValueChange } = this.props;
    if (onValueChange) onValueChange(value);
  };

  /**
   * Close the drop down
   */
  closeDropDown = () => {
    this.setState({
      dropDownIsOpen: false,
    });
  };

  render() {
    const { data, dropDownStyle, heading, bounces, disabled } = this.props;
    const { dropDownIsOpen, selectedLabelState, top, flatListTop, flatListHeight } = this.state;
    return (
      <View style={dropDownStyle}>
        {heading && <StyledLabel isFocused>{heading}</StyledLabel>}
        <Row
          {...this.props}
          onPress={this.openDropDown}
          ref={ref => {
            this.rowMarker = ref;
          }}
          pointerEvents={disabled ? 'none' : 'auto'}
        >
          <HeaderContainer>
            <BodyCopy
              mobileFontFamily="secondary"
              fontSize="fs13"
              textAlign="center"
              color="gray.800"
              fontWeight="semibold"
              text={selectedLabelState}
            />
          </HeaderContainer>
          <Image source={dropDownIsOpen ? upIcon : downIcon} />
        </Row>
        <Modal visible={dropDownIsOpen} transparent>
          <TouchableOpacity
            accessible
            accessibilityLabel="Tap to close it"
            accessibilityRole="none"
            onPress={this.closeDropDown}
            activeOpacity={1}
            style={{
              width: this.rowFrame.width,
              left: this.rowFrame.x,
              height: getScreenHeight(),
              marginTop: flatListTop,
            }}
          >
            <OverLayView
              ref={ref => {
                this.overlayMarker = ref;
              }}
              style={{
                top,
              }}
            >
              {dropDownIsOpen && (
                <FlatList
                  data={data}
                  renderItem={this.dropDownLayout}
                  keyExtractor={item => item.key}
                  bounces={bounces}
                  style={{ height: flatListHeight }}
                  ItemSeparatorComponent={() => <Separator />}
                />
              )}
            </OverLayView>
          </TouchableOpacity>
        </Modal>
      </View>
    );
  }
}

export default withStyles(DropDown, DropDownStyle);
export { DropDown as DropDownVanilla };
