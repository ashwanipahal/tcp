import React from 'react';
import PropTypes from 'prop-types';
import { Image, View, Modal, TouchableOpacity } from 'react-native';
import BodyCopy from '@tcp/core/src/components/common/atoms/BodyCopy';
import { getScreenHeight } from '../../../../../../utils/index.native';
import withStyles from '../../../../../common/hoc/withStyles.native';
import CustomIcon from '../../../../../common/atoms/Icon';
import { ICON_NAME, ICON_FONT_CLASS } from '../../../../../common/atoms/Icon/Icon.constants';
import {
  DropDownStyle,
  Row,
  OverLayView,
  HeaderContainer,
  DropDownItemContainer,
  Separator,
  FlatList,
  FlatListWrapper,
} from '../../styles/SelectWishListDropdown.style.native';

const downIcon = require('../../../../../../assets/carrot-small-down.png');
const upIcon = require('../../../../../../assets/carrot-small-up.png');

/**
 * This is a drop down component. Styling of drop down and its item
 * can be passed in the component.
 * @param dropDownStyle - It applies style to the drop down row.
 * @param itemStyle - It applies style to the item of drop down.
 * @param selectedValue - Pass the by default selected value.
 * @param onValueChange - Callback to get the selected value of the drop down.
 * @param variation(primary/secondary) - primary to set the text in center and secondary to left.
 */

class SelectWishListDropdown extends React.PureComponent<Props> {
  static propTypes = {
    data: PropTypes.shape([]),
    selectedValue: PropTypes.string,
    onValueChange: PropTypes.func,
    itemStyle: PropTypes.shape({}),
    dropDownStyle: PropTypes.shape({}),
    arrowImageStyle: PropTypes.shape({}),
    variation: PropTypes.string,
    bounces: PropTypes.bool,
    selectedItemFontWeight: PropTypes.string,
    dropDownItemFontWeight: PropTypes.string,
    isAnimateList: PropTypes.bool,
    fontSize: PropTypes.string,
    isShareOptions: PropTypes.bool,
    renderHeader: PropTypes.func,
    renderFooter: PropTypes.func,
    labels: PropTypes.objectOf(PropTypes.oneOfType([PropTypes.string])),
    defaultWishList: PropTypes.shape({}),
    renderItems: PropTypes.func,
  };

  static defaultProps = {
    data: [],
    selectedValue: null,
    onValueChange: null,
    itemStyle: null,
    dropDownStyle: null,
    arrowImageStyle: null,
    variation: 'primary',
    bounces: false,
    selectedItemFontWeight: 'semibold',
    dropDownItemFontWeight: 'semibold',
    isAnimateList: false,
    fontSize: 'fs13',
    isShareOptions: false,
    renderHeader: null,
    renderFooter: null,
    labels: {},
    defaultWishList: {},
    renderItems: null,
  };

  static getDerivedStateFromProps(props, state) {
    const { selectedLabelState } = state;
    if (props.selectedValue !== selectedLabelState) {
      const result = props.data.find(item => {
        if (item.displayName) return item.displayName === props.selectedValue;
        return item.id === props.selectedValue;
      });

      if (result) {
        if (result.displayName) return { selectedLabelState: result.displayName };
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

    const { selectedValue, defaultWishList, isShareOptions, labels } = this.props;
    let selectedLabelState = '';
    if (isShareOptions) {
      selectedLabelState = selectedValue || labels.lbl_fav_share;
    } else {
      selectedLabelState =
        defaultWishList && defaultWishList.length && defaultWishList[0].displayName;
    }

    this.state = {
      dropDownIsOpen: false,
      selectedLabelState,
      top: 0,
      flatListTop: 0,
      flatListHeight: 0,
    };
  }

  componentDidMount() {
    const { isAnimateList } = this.props;
    if (this.rowMarker) setTimeout(() => this.calculateDropDownPosition(), isAnimateList ? 300 : 0);
  }

  componentDidUpdate() {
    const { isAnimateList } = this.props;
    if (this.rowMarker) setTimeout(() => this.calculateDropDownPosition(), isAnimateList ? 300 : 0);
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
      const calculateHeight = data && data.length * itemStyle.height;

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
    const { customDropDownHeight, isShareOptions } = this.props;
    this.setState({ top: topMargin.top });
    let listMargin = 0;
    let listHeight = 0;

    if (showInBottom) {
      if (calculateHeight > dH) {
        listHeight = dH - 100;
      } else {
        listHeight = isShareOptions ? calculateHeight : calculateHeight - 100;
      }
      if (customDropDownHeight) {
        listHeight = customDropDownHeight;
      }
    } else if (calculateHeight > windowHeight) {
      listMargin = 100;
      listHeight = (windowHeight * 3) / 4;
    } else {
      listHeight = calculateHeight;
    }

    this.setState({
      flatListHeight: listHeight,
      flatListTop: listMargin,
    });
  };

  /**
   * Render drop down item for wishlist
   */
  renderDropDownItem = ({ item }) => {
    const { variation, itemStyle, dropDownItemFontWeight } = this.props;
    const { displayName } = item;

    return (
      <DropDownItemContainer onPress={() => this.onDropDownItemClick(item)} style={itemStyle}>
        <BodyCopy
          fontFamily="secondary"
          fontSize="fs13"
          textAlign={variation === 'primary' || variation === 'secondary' ? 'center' : ''}
          color={itemStyle.color}
          fontWeight={dropDownItemFontWeight}
          text={displayName}
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
    let { value } = item;
    const { id, displayName } = item;
    if (!value) value = id;
    this.setState({
      dropDownIsOpen: false,
      selectedLabelState: displayName,
    });

    // pass the callback here with value
    const { onValueChange } = this.props;
    if (onValueChange) onValueChange(value);
  };

  /**
   * Close the drop down
   */
  closeDropDown = () => {
    this.setState(
      {
        dropDownIsOpen: false,
      },
      () => {
        const { onPressOut } = this.props;
        if (onPressOut) {
          onPressOut();
        }
      }
    );
  };

  render() {
    const {
      data,
      dropDownStyle,
      bounces,
      disabled,
      arrowImageStyle,
      selectedItemFontWeight,
      isWishlist,
      fontSize,
      renderHeader,
      renderFooter,
      renderItems,
    } = this.props;
    const { dropDownIsOpen, selectedLabelState, top, flatListTop, flatListHeight } = this.state;
    return (
      <View style={dropDownStyle}>
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
              fontSize={fontSize}
              textAlign="center"
              color="gray.900"
              fontWeight={selectedItemFontWeight}
              text={selectedLabelState}
            />
            {isWishlist && (
              <CustomIcon
                margins="0 0 0 8px"
                iconFontName={ICON_FONT_CLASS.Icomoon}
                name={ICON_NAME.filledHeart}
                size="fs16"
                color="gray.500"
              />
            )}
          </HeaderContainer>
          <Image source={dropDownIsOpen ? upIcon : downIcon} style={arrowImageStyle} />
        </Row>

        <Modal visible={dropDownIsOpen} transparent>
          <TouchableOpacity
            accessible
            accessibilityLabel="Tap to close it"
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
              <FlatListWrapper width={this.rowFrame.width} height={flatListHeight}>
                {dropDownIsOpen && (
                  <FlatList
                    data={data}
                    renderItem={item =>
                      renderItems
                        ? renderItems(item, this.onDropDownItemClick)
                        : this.renderDropDownItem(item)
                    }
                    keyExtractor={(_, index) => index.toString()}
                    bounces={bounces}
                    style={{ height: flatListHeight }}
                    ListHeaderComponent={renderHeader}
                    ListFooterComponent={renderFooter}
                    ItemSeparatorComponent={() => !isWishlist && <Separator />}
                  />
                )}
              </FlatListWrapper>
            </OverLayView>
          </TouchableOpacity>
        </Modal>
      </View>
    );
  }
}

export default withStyles(SelectWishListDropdown, DropDownStyle);
export { SelectWishListDropdown as SelectWishListDropdownVanilla };
