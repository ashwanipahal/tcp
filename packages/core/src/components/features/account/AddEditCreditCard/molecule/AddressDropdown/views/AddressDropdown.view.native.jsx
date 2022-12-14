import React from 'react';
import PropTypes from 'prop-types';
import { Image, View, Modal, TouchableOpacity } from 'react-native';
import BodyCopy from '@tcp/core/src/components/common/atoms/BodyCopy';
import Badge from '@tcp/core/src/components/common/atoms/Badge';
import Address from '@tcp/core/src/components/common/molecules/Address';
import { getScreenHeight } from '@tcp/core/src/utils/index.native';
import Button from '@tcp/core/src/components/common/atoms/Button';
import { getLabelValue } from '@tcp/core/src/utils/utils';
import {
  Row,
  OverLayView,
  HeaderContainer,
  DropDownItemContainer,
  Separator,
  FlatList,
  AddNewAddressWrapper,
  BadgeWrapper,
  AddNewButton,
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
    showButton: PropTypes.bool,
  };

  static defaultProps = {
    data: [],
    selectedValue: null,
    onValueChange: null,
    itemStyle: null,
    dropDownStyle: null,
    variation: 'primary',
    showButton: true,
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
    if (selectedValue !== null) {
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
      flatListTop: 0,
      flatListHeight: 0,
    };
  }

  componentDidUpdate(prevProps) {
    if (this.rowMarker) setTimeout(() => this.calculateDropDownPosition(), 300);
    const { selectedValue, data } = this.props;
    let selectedLabelState;
    if (prevProps.selectedValue !== selectedValue) {
      // Added empty check for 'Add New Address CTA', as it doesn't have any key/id.
      let selectedAddress = data.filter(item => item.id === selectedValue);
      if (selectedAddress && !selectedAddress.length) {
        selectedAddress = data.filter(item => item.id === '');
      }
      selectedLabelState = selectedAddress && selectedAddress.length && selectedAddress[0].label;
      this.updateState({ selectedLabelState });
    }
  }

  updateState = ({ selectedLabelState }) => {
    this.setState({ selectedLabelState });
  };

  /**
   * Calculate the dimension and coordinates of drop down
   */
  calculateDropDownPosition = () => {
    if (!this.rowMarker) return;
    this.rowMarker.measure((x, y, width, height, pageX, pageY) => {
      const { data, itemStyle, dropDownStyle } = this.props;
      this.rowFrame = { x: pageX, y: dropDownStyle.height + pageY, width, height };
      const windowHeight = getScreenHeight();

      // calculate the list height
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
        listHeight = 250;
      } else {
        listHeight = calculateHeight;
      }
    } else if (calculateHeight > windowHeight) {
      listMargin = 100;
      listHeight = (windowHeight * 3) / 4;
    } else {
      listHeight = calculateHeight;
    }
    this.setState({ flatListHeight: listHeight, flatListTop: listMargin });
  };

  renderButton = ({ item }) => {
    const { label } = item;
    const { showButton, disableBtn } = this.props;
    return showButton ? (
      <AddNewButton>
        <Button
          fullWidth
          fill="BLACK"
          text={label}
          onPress={this.openAddressBook}
          disableButton={disableBtn}
        />
      </AddNewButton>
    ) : (
      <AddNewAddressWrapper onPress={this.openAddressBook}>
        <BodyCopy fontSize="fs14" mobileFontFamily="secondary" fontWeight="black" text={label} />
      </AddNewAddressWrapper>
    );
  };

  getContext = item => {
    const { content, useCustomContent } = item;
    return useCustomContent ? (
      content
    ) : (
      <>
        {item && item.primary && (
          <BadgeWrapper>
            <Badge showCheckmark dataLocator="addressbook-defshippinglabel">
              DEFAULT
            </Badge>
          </BadgeWrapper>
        )}
        <Address
          address={content}
          showCountry={false}
          showPhone={false}
          className="CreditCardForm__address"
          dataLocatorPrefix="payment"
          showName
          showDefaultText={item && item.primary}
        />
      </>
    );
  };

  /**
   * Render drop down item
   */
  dropDownLayout = ({ item }) => {
    const { itemStyle } = this.props;
    return (
      <DropDownItemContainer
        onPress={() => this.onDropDownItemClick(item)}
        style={{ ...itemStyle }}
      >
        {item.id ? this.getContext(item) : this.renderButton({ item })}
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
    const { addAddress, toggleModal } = this.props;
    this.setState({
      dropDownIsOpen: false,
    });
    if (addAddress) {
      addAddress();
    }
    if (toggleModal) {
      toggleModal({ type: 'add' });
    }
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
    const { dropDownIsOpen, selectedLabelState, top, flatListTop, flatListHeight } = this.state;
    return (
      <View style={dropDownStyle}>
        <Row
          {...this.props}
          onPress={this.openDropDown}
          ref={ref => {
            this.rowMarker = ref;
          }}
          onLayout={() => {
            if (this.rowMarker) {
              this.rowMarker.measure(() => {});
            }
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
          <Image source={dropDownIsOpen ? upIcon : downIcon} alt="" />
        </Row>
        <Modal visible={dropDownIsOpen} transparent>
          <TouchableOpacity
            accessible
            accessibilityLabel={getLabelValue(labels, 'lbl_common_tapClose', 'common')}
            accessibilityRole="none"
            onPress={this.closeDropDown}
            activeOpacity={1}
            style={{
              left: this.rowFrame.x,
              height: getScreenHeight(),
              paddingTop: flatListTop,
            }}
          >
            <OverLayView
              ref={ref => {
                this.overlayMarker = ref;
              }}
              style={{
                top,
                width: this.rowFrame.width,
              }}
            >
              {dropDownIsOpen && (
                <FlatList
                  data={data}
                  renderItem={this.dropDownLayout}
                  keyExtractor={item => item.id}
                  bounces={false}
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

export default AddressDropdown;
