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
  };

  static defaultProps = {
    data: [],
    selectedValue: null,
    onValueChange: null,
    itemStyle: null,
    dropDownStyle: null,
    variation: 'primary',
  };

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
    const selectedObject = data.filter(item => {
      return item.value === selectedValue;
    });

    this.state = {
      dropDownIsOpen: false,
      selectedLabelState: selectedValue ? selectedObject[0].label : data[0].label,
    };
  }

  /**
   * Open the drop down
   */
  openDropDown = () => {
    this.setState({
      dropDownIsOpen: true,
    });
  };

  /**
   * Render drop down item
   */
  dropDownLayout = ({ item }) => {
    const { variation, itemStyle } = this.props;
    const { label } = item;
    return (
      <DropDownItemContainer onPress={() => this.onDropDownItemClick(item)} style={itemStyle}>
        <BodyCopy
          fontFamily="secondary"
          fontSize="fs13"
          textAlign={variation === 'primary' ? 'center' : ''}
          color="gray.800"
          fontWeight="black"
          text={label}
        />
      </DropDownItemContainer>
    );
  };

  /**
   * Handle the drop down item click
   */
  onDropDownItemClick = item => {
    const { label, value } = item;
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

  /**
   * Calculate the dimension and coordinates of drop down
   */
  findRowDimensions = () => {
    if (this.rowMarker) {
      this.rowMarker.measure((x, y, width, height, pageX, pageY) => {
        this.rowFrame = { x: pageX, y: height + pageY, width, height };
      });
    }
  };

  /**
   * Calculate the dimension and coordinates of drop down item
   */
  findDropDownDimensions = () => {
    if (this.overlayMarker) {
      this.overlayMarker.measure((x, y, width, height, pageX) => {
        const windowHeight = getScreenHeight();

        // checking bottom space
        const bottomSpace = windowHeight - this.rowFrame.y - this.rowFrame.height;
        // check drop down is in bottom or not
        const showInBottom = bottomSpace >= height || bottomSpace >= this.rowFrame.y;

        // if it is not in bottom then taking it y coordinate to set the drop down item position
        // else subtracting device height and position of drop down y coordinate.
        const topMargin = {
          top: showInBottom ? this.rowFrame.y : Math.max(0, this.rowFrame.y - height),
        };
        this.dropDownFrame = { x: pageX, y: topMargin.top, width, height };
      });
    }
  };

  render() {
    const { data, dropDownStyle } = this.props;
    const { dropDownIsOpen, selectedLabelState } = this.state;
    return (
      <View style={dropDownStyle}>
        <Row
          {...this.props}
          onStartShouldSetResponder={this.openDropDown}
          ref={ref => {
            this.rowMarker = ref;
          }}
          onLayout={this.findRowDimensions}
        >
          <HeaderContainer>
            <BodyCopy
              fontFamily="secondary"
              fontSize="fs13"
              textAlign="center"
              color="gray.800"
              fontWeight="black"
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
              top: this.dropDownFrame.y,
              height: getScreenHeight(),
            }}
          >
            <OverLayView
              ref={ref => {
                this.overlayMarker = ref;
              }}
              onLayout={this.findDropDownDimensions}
            >
              {dropDownIsOpen && (
                <FlatList
                  data={data}
                  renderItem={this.dropDownLayout}
                  keyExtractor={item => item.key}
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
