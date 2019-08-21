import React from 'react';
import PropTypes from 'prop-types';
import { Image, View, Modal, TouchableOpacity } from 'react-native';
import BodyCopy from '@tcp/core/src/components/common/atoms/BodyCopy';
import Address from '@tcp/core/src/components/common/molecules/Address';
import { getScreenHeight } from '@tcp/core/src/utils/index.native';
import Button from '@tcp/core/src/components/common/atoms/Button';
import {
  Row,
  OverLayView,
  HeaderContainer,
  DropDownItemContainer,
  Separator,
  FlatList,
} from '../styles/AddressDropdown.style.native';

const downIcon = require('../../../../../../../assets/carrot-small-down.png');
const upIcon = require('../../../../../../../assets/carrot-small-up.png');

/**
 * This is a AddressDropdown component. Styling of drop down and its item
 * can be passed in the component.
 * @param dropDownStyle - It applies style to the drop down row.
 * @param itemStyle - It applies style to the item of drop down.
 * @param selectedValue - Pass the by default selected value.
 * @param onValueChange - Callback to get the selected value of the drop down.
 * @param variation(primary/secondary) - primary to set the text in center and secondary to left.
 */

export class AddressDropdown extends React.PureComponent<Props> {
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

    let selectedLabelState;
    const defaultSelectedValue = data && data.length && data[0].label; // If nothing falls under any condition then this value will be selected.
    if (selectedValue) {
      const selectedAddress = data.filter(item => item.id === selectedValue);
      selectedLabelState =
        selectedAddress && selectedAddress.length ? selectedAddress[0].label : defaultSelectedValue;
    } else {
      const primaryAddress = data.filter(item => item.primary === true);
      selectedLabelState =
        primaryAddress && primaryAddress.length ? primaryAddress[0].label : defaultSelectedValue;
    }

    this.state = {
      dropDownIsOpen: false,
      selectedLabelState,
      top: 0,
    };
  }

  componentDidUpdate() {
    this.calculateDropDownPosition();
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
      this.setState({ top: topMargin.top });
    });
  };

  /**
   * Render drop down item
   */
  dropDownLayout = ({ item }) => {
    const { itemStyle } = this.props;
    const { label, content } = item;
    return (
      <DropDownItemContainer onPress={() => this.onDropDownItemClick(item)} style={itemStyle}>
        {item.id ? (
          <Address
            address={content}
            showCountry={false}
            showPhone={false}
            className="CreditCardForm__address"
            dataLocatorPrefix="payment"
            showName
          />
        ) : (
          <Button
            fullWidth
            buttonVariation="variable-width"
            fill="BLUE"
            text={label}
            onPress={this.openAddressBook}
          />
        )}
      </DropDownItemContainer>
    );
  };

  /**
   * Open the drop down
   */
  openDropDown = () => {
    const { data } = this.props;
    if (data.length === 1 && data[0].id === '') {
      this.openAddressBook();
    } else {
      this.setState({
        dropDownIsOpen: true,
      });
    }
  };

  /**
   * openAddressBook modal
   */
  openAddressBook = () => {
    const { addAddress } = this.props;
    this.setState({
      dropDownIsOpen: false,
    });
    addAddress();
  };

  /**
   * Handle the drop down item click
   */
  onDropDownItemClick = item => {
    let { label, value } = item;
    const { id, displayName, fullName } = item;
    if (!label) {
      if (fullName) label = fullName;
      else label = displayName;
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
    const { data, dropDownStyle, labels } = this.props;
    const { dropDownIsOpen, selectedLabelState, top } = this.state;
    return (
      <View style={dropDownStyle}>
        <Row
          {...this.props}
          onStartShouldSetResponder={this.openDropDown}
          ref={ref => {
            this.rowMarker = ref;
          }}
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
            accessibilityLabel={labels.common.lbl_common_tapClose}
            accessibilityRole="none"
            onPress={this.closeDropDown}
            activeOpacity={1}
            style={{
              width: this.rowFrame.width,
              left: this.rowFrame.x,
              height: getScreenHeight(),
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
                  keyExtractor={item => item.id}
                  ItemSeparatorComponent={() => <Separator />}
                  style={{ height: getScreenHeight() / 2 }}
                />
              )}
            </OverLayView>
          </TouchableOpacity>
        </Modal>
      </View>
    );
  }
}

export default AddressDropdown;
