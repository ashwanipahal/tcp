import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { PropTypes } from 'prop-types';
import { BodyCopy, Image } from '../../../../../../../../common/atoms';
import {
  getTranslatedMomentDate,
  getAPIConfig,
} from '../../../../../../../../../utils/index.native';
import ReactTooltip from '../../../../../../../../common/atoms/ReactToolTip';
import CartItemTile from '../../../../../../CartItemTile/molecules/CartItemTile/views/CartItemTile.view.native';
import { getProductDetails } from '../../../../../../CartItemTile/container/CartItemTile.selectors';
import CheckoutConstants from '../../../../../Checkout.constants';
import {
  Container,
  CartListHeading,
  SubHeader,
  PickupSubHeader,
  PickupProductListTitle,
  AtTextWrapper,
  CartItemTileContainer,
  StoreDetailsWrapper,
  TooltipWrapper,
} from '../styles/CheckoutCartItemsList.style.native';

const infoIcon = require('../../../../../../../../../assets/info-icon.png');

/**
 *
 *
 * @class CheckoutCartItemsList
 * @extends {Component}
 * @summary Component to render and sort items in bag as per shipping,pickups and store vise and show them on review page(Mobile App).
 */
class CheckoutCartItemsList extends Component {
  static propTypes = {
    /** amount of items in the cart (not items.length) */
    itemsCount: PropTypes.number.isRequired,

    /** List of products to show.
     * MUST BE ORDERED BY FULLFILMENT CENTER, with undefined store first.
     */
    items: PropTypes.arrayOf(
      PropTypes.shape({
        /**
         * Information regarding the product that this cart item refers to.
         * Essentially, the cart item is just some quantity of the product
         */
        productInfo: PropTypes.shape({}).isRequired,

        /** Information about this cart item that is not a function of the product */
        itemInfo: PropTypes.shape({}).isRequired,

        miscInfo: PropTypes.shape({}).isRequired,
      })
    ).isRequired,

    /** This is used to display the correct currency symbol */
    currencySymbol: PropTypes.string.isRequired,
    labels: PropTypes.shape({}),
    bagPageLabels: PropTypes.shape({}),
    gettingSortedItemList: PropTypes.func.isRequired,
  };

  /**
   * @function getOrderItem
   * @param {String<object>} item - contains order product details
   * @param {String} currencySymbol - tells function which currency symbol to use
   * @summary This function accepts a item and currency symbol and will return
   * single order item html.
   */
  getOrderItem = item => {
    const { labels, currencySymbol } = this.props;
    const showOnReviewPage = false;
    return (
      <CartItemTileContainer>
        <CartItemTile
          productDetail={item}
          labels={labels}
          showOnReviewPage={showOnReviewPage}
          currencySymbol={currencySymbol}
        />
      </CartItemTileContainer>
    );
  };

  /**
   * @function popover
   * @param {Object} deliveryItem - delivery item details
   * @summary This function accepts a deliveryItem and gives tooltip data
   */
  popover = deliveryItem => {
    const { labels } = this.props;
    const {
      storeAddress: { addressLine1, addressLine2, city, state, zipCode },
    } = deliveryItem;
    const { storeTodayOpenRange, storeTomorrowOpenRange, storePhoneNumber } = deliveryItem;
    const { today, tomorrow, phone } = labels;
    return (
      <Text>
        {deliveryItem && deliveryItem.storeAddress && (
          <>
            <BodyCopy
              fontWeight="regular"
              fontSize="fs12"
              fontFamily="secondary"
              text={addressLine1}
            />

            {addressLine2 && (
              <BodyCopy
                fontWeight="regular"
                fontSize="fs12"
                fontFamily="secondary"
                text={addressLine2}
              />
            )}
            <BodyCopy
              fontWeight="regular"
              fontSize="fs12"
              fontFamily="secondary"
              text={`${city},${state}${zipCode}`}
            />
            <BodyCopy
              fontWeight="regular"
              fontSize="fs12"
              fontFamily="secondary"
              text={`${today}${storeTodayOpenRange}`}
            />
            <BodyCopy
              fontWeight="regular"
              fontSize="fs12"
              fontFamily="secondary"
              text={`${tomorrow}${storeTomorrowOpenRange}`}
            />
            <BodyCopy
              fontWeight="regular"
              fontSize="fs12"
              fontFamily="secondary"
              text={`${phone}${storePhoneNumber}`}
            />
          </>
        )}
      </Text>
    );
  };

  /**
   * @function getPickupHeader
   * @param {String<object>} deliveryItem - contains store infomation
   * which is use to show on order header
   * @param {boolean} isShowHeader - is a flag which tells if header
   * with store detail need to be display or not,
   * if the isShowHeader is false the header with only date will display.
   * @summary This function accepts store details and returns the header html
   */
  getPickupHeader = (deliveryItem, isShowHeader) => {
    const { labels } = this.props;
    return (
      <PickupProductListTitle>
        {isShowHeader && (
          <PickupSubHeader>
            <BodyCopy
              fontWeight="extrabold"
              fontSize="fs16"
              fontFamily="secondary"
              text={labels.pickup}
            />
            <StoreDetailsWrapper>
              <AtTextWrapper>
                <BodyCopy
                  fontWeight="regular"
                  fontSize="fs10"
                  fontFamily="secondary"
                  text={labels.at}
                />
              </AtTextWrapper>
              <BodyCopy
                fontWeight="extrabold"
                fontSize="fs10"
                fontFamily="secondary"
                text={deliveryItem.store}
              />
              <TooltipWrapper>
                <ReactTooltip withOverlay={false} popover={this.popover(deliveryItem)}>
                  <Image source={infoIcon} height={15} width={15} />
                </ReactTooltip>
              </TooltipWrapper>
            </StoreDetailsWrapper>
          </PickupSubHeader>
        )}
        <BodyCopy
          fontWeight="extrabold"
          fontSize="fs16"
          fontFamily="secondary"
          text={deliveryItem.duration}
        />
      </PickupProductListTitle>
    );
  };

  /**
   * @function getShippingListItems
   * @param {String<object>} pickUpList - contains order infomation
   * which is use to show on order header and its list item
   * @summary This function accepts shipit order details and returns the header and list item html
   */
  getShippingListItems = (pickUpList, index) => {
    const { labels } = this.props;
    if (pickUpList && pickUpList.list) {
      return (
        <View key={index}>
          <SubHeader>
            <BodyCopy
              fontWeight="extrabold"
              fontSize="fs16"
              fontFamily="secondary"
              text={labels.shipping}
            />
          </SubHeader>
          <View>
            {pickUpList.list.map(listItem => {
              return this.getOrderItem(listItem.item, listItem.currencySymbol);
            })}
          </View>
        </View>
      );
    }
    return null;
  };

  /**
   * @function renderOrderItems
   * @param {String} pickupType - tells function if order type is SHIPIT or PICKUP
   * @param {String<object>} storeItemsList - contains list stores and items corresponding to them
   * @summary This function accepts a string of (type of order) and object of
   * storelist and will return HTML of order for Particular type.
   */
  renderOrderItems = (pickupType, storeItemsList, index) => {
    if (pickupType === CheckoutConstants.CHECKOUT_ORDER.ORDER_SHIPIT_LABEL) {
      return this.getShippingListItems(storeItemsList, index);
    }
    const orderItemView = [];
    const { PICKUP_ITEM_ORDER } = CheckoutConstants.CHECKOUT_ORDER;
    /* istanbul ignore else */
    if (storeItemsList) {
      Object.keys(storeItemsList).forEach(storeItem => {
        /* istanbul ignore else */
        if (storeItem) {
          let isShowHeader = true;
          let orderCount = 0;
          Object.keys(storeItemsList[storeItem]).forEach(deliveryItemList => {
            /* istanbul ignore else */
            if (deliveryItemList) {
              const deliveryItem =
                storeItemsList[storeItem][PICKUP_ITEM_ORDER[orderCount]] ||
                storeItemsList[storeItem][deliveryItemList];
              const itemHeader = [
                <SubHeader key={`${index}_${orderCount}_0`}>
                  {this.getPickupHeader(deliveryItem, isShowHeader)}
                </SubHeader>,
                <View key={`${index}_${orderCount}_1`}>
                  {deliveryItem.list.map(listItem => {
                    return this.getOrderItem(listItem.item, listItem.currencySymbol);
                  })}
                </View>,
              ];
              orderItemView.push(itemHeader);
              isShowHeader = false;
              orderCount += 1;
            }
          });
        }
      });
    }
    return orderItemView;
  };

  /**
   * @function renderItems
   * @summary This function responsible for rendedring view and calling further respective methods.
   */
  renderItems() {
    const { items, currencySymbol, gettingSortedItemList, labels } = this.props;
    const apiConfig = getAPIConfig();
    const bopisDate =
      apiConfig &&
      getTranslatedMomentDate('', apiConfig.language, CheckoutConstants.REQUIRE_FORMAT);
    /**
     * @var sortedItem - array of items available in the cart checkout are sorted in a
     * way that the BOPIS selected stores are moved to the top in the list than BOSS
     * Immutable is required as items is an immutable array which cant not be sorted.
     */
    const updateditems =
      items &&
      items.map(item => {
        return getProductDetails(item);
      });
    const listItems = JSON.parse(JSON.stringify(updateditems));
    const sortedItem =
      listItems &&
      listItems.sort((firstItem, secondItem) => {
        /* istanbul ignore else */
        if (
          firstItem.miscInfo.orderItemType === CheckoutConstants.CHECKOUT_ORDER.ORDER_BOPIS_LABEL
        ) {
          return -1;
        }
        /* istanbul ignore else */
        if (
          secondItem.miscInfo.orderItemType === CheckoutConstants.CHECKOUT_ORDER.ORDER_BOSS_LABEL
        ) {
          return 1;
        }
        return 0;
      });
    /*
      Bucketing Data in following way:
        SHIPIT
          -> list : [array of order line elements]
        PICKUP
          -> store1 :
              -> BOPIS
                -> list : [array of order line elements]
              -> BOSS
                -> list : [array of order line elements]
          -> store2 :
              -> BOPIS
                -> list : [array of order line elements]
    */
    const orderBucket = gettingSortedItemList({
      sortedItem,
      CheckoutConstants,
      currencySymbol,
      bopisDate,
      labels,
    });
    const {
      CHECKOUT_ORDER: { REVIEW_PRODUCT_SEQUENCE },
    } = CheckoutConstants;
    const orderTypeList = REVIEW_PRODUCT_SEQUENCE;
    if (orderBucket) {
      return (
        <View>
          {orderTypeList.map((item, index) =>
            this.renderOrderItems(item, orderBucket[item], index)
          )}
        </View>
      );
    }
    return {};
  }

  /**
   * @function render
   * @summary This function responsible for rendedring view and calling further respective methods.
   */
  render() {
    const { itemsCount, bagPageLabels } = this.props;
    return (
      <Container>
        <CartListHeading>
          <BodyCopy
            fontWeight="semibold"
            fontSize="fs16"
            fontFamily="secondary"
            text={`${bagPageLabels.bagHeading} (${itemsCount}):`}
          />
        </CartListHeading>
        {this.renderItems()}
      </Container>
    );
  }
}

CheckoutCartItemsList.defaultProps = {
  labels: {},
  bagPageLabels: {},
};

export default CheckoutCartItemsList;
