import React from 'react';
import { PropTypes } from 'prop-types';
import withStyles from '@tcp/core/src/components/common/hoc/withStyles';
import { BodyCopy, Col, Row, Image } from '@tcp/core/src/components/common/atoms';
import ReactToolTip from '@tcp/core/src/components/common/atoms/ReactToolTip';
import cssClassName from '../../../../../../../../../utils/cssClassName';
import { getDateInformation } from '../../../../../../../../../utils/badge.util';
import { getAPIConfig, getIconPath } from '../../../../../../../../../utils/utils';
import CartItemTile from '../../../../../../CartItemTile/molecules/CartItemTile/views/CartItemTile.view';
import { getProductDetails } from '../../../../../../CartItemTile/container/CartItemTile.selectors';
import styles from '../styles/CheckoutCartItemsList.style';
import CheckoutConstants from '../../../../../Checkout.constants';

class CheckoutCartItemsList extends React.Component {
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
        productInfo: PropTypes.shape({
          /** This identifies the product with a given color fit and size combination */
          skuId: PropTypes.string.isRequired,
          /** The name of the product to be displayed to the user */
          name: PropTypes.string.isRequired,
          /** the url of the image of the product */
          imagePath: PropTypes.string.isRequired,
          /** The color/pattern */
          color: PropTypes.shape({
            /** The color's name (e.g. 'Clay') */
            name: PropTypes.string.isRequired,
          }),
          /** The fit (e.g. 'slim') */
          fit: PropTypes.string,
          /** The size (e.g. '5S') */
          size: PropTypes.string.isRequired,
        }).isRequired,

        /** Information about this cart item that is not a function of the product */
        itemInfo: PropTypes.shape({
          /** This cart item is made up of quantity many copies of the product */
          quantity: PropTypes.number.isRequired,
          /** the list price of this item (i.e., before any discounts) */
          listPrice: PropTypes.number.isRequired,
          /** the actuall price the user has to pay for this item */
          offerPrice: PropTypes.number.isRequired,
        }).isRequired,

        miscInfo: PropTypes.shape({
          /**
           * If falsy (i.e., null, undefined, etc.) this item is to be shipped;
           * otherwise, it is the name of the store from which it is to be picked up
           */
          store: PropTypes.string,
          storeAddress: PropTypes.object,
        }).isRequired,
      })
    ).isRequired,

    /** This is used to display the correct currency symbol */
    currencySymbol: PropTypes.string.isRequired,
    labels: PropTypes.shape({}).isRequired,
    bagPageLabels: PropTypes.shape({}).isRequired,
    className: PropTypes.string.isRequired,
  };

  /**
   * @function getOrderItem
   * @param {String<object>} item - contains order product details
   * @param {String} currencySymbol - tells function which currency symbol to use
   * @summary This function accepts a item and currency symbol and will return
   * single order item html.
   */
  getOrderItem = item => {
    const { labels } = this.props;
    const showOnReviewPage = false;
    return (
      <div className="cart-item-tile-container">
        <CartItemTile productDetail={item} labels={labels} showOnReviewPage={showOnReviewPage} />
      </div>
    );
  };

  OrderTooltip = deliveryItem => {
    return (
      <>
        {deliveryItem.storeAddress && (
          <p>
            {deliveryItem.storeAddress.addressLine1}
            <br />
            {deliveryItem.storeAddress.addressLine2 && (
              <span>
                {deliveryItem.storeAddress.addressLine2}
                <br />
              </span>
            )}
            {`${deliveryItem.storeAddress.city},
      ${deliveryItem.storeAddress.state}
      ${deliveryItem.storeAddress.zipCode}`}
            <br />
            <br />
            <em>Today:</em>
            {deliveryItem.storeTodayOpenRange}
            <br />
            <em>Tomorrow:</em>
            {deliveryItem.storeTomorrowOpenRange}
            <br />
            <em>Phone:</em>
            {deliveryItem.storePhoneNumber}
          </p>
        )}
      </>
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
    return (
      <div className="title-list-pickup-product">
        {isShowHeader && (
          <div className="pickup-header">
            <Row>
              <Col colSize={{ small: 12, medium: 12, large: 12 }}>
                <BodyCopy
                  component="span"
                  fontWeight="extrabold"
                  fontSize="fs16"
                  fontFamily="secondary"
                  className="title-list-product"
                >
                  {`Pickup`}
                </BodyCopy>
                <BodyCopy
                  component="span"
                  fontWeight="regular"
                  fontSize="fs10"
                  fontFamily="secondary"
                  className="store-of-product"
                >
                  {`At `}
                </BodyCopy>
                <BodyCopy
                  component="span"
                  fontWeight="semiBold"
                  fontSize="fs10"
                  fontFamily="secondary"
                >
                  {deliveryItem.store}
                </BodyCopy>
                <ReactToolTip
                  fontFamily="secondary"
                  message={this.OrderTooltip(deliveryItem)}
                  aligned="right"
                  className="toolTip"
                >
                  <Image height="15" width="15" src={getIconPath('info-icon')} />
                </ReactToolTip>
              </Col>
            </Row>
          </div>
        )}
        <Row>
          <Col colSize={{ small: 12, medium: 12, large: 12 }}>
            <BodyCopy
              fontWeight="extrabold"
              fontSize="fs16"
              fontFamily="secondary"
              className="store-date-container"
            >
              {deliveryItem.duration}
            </BodyCopy>
          </Col>
        </Row>
      </div>
    );
  };

  /**
   * @function getShippingListItems
   * @param {String<object>} pickUpList - contains order infomation
   * which is use to show on order header and its list item
   * @summary This function accepts shipit order details and returns the header and list item html
   */
  getShippingListItems = (pickUpList, index) => {
    const headerClassName = cssClassName('header-list ', 'header-primary ');
    if (pickUpList && pickUpList.list) {
      return (
        <div key={index}>
          <Row>
            <Col colSize={{ small: 12, medium: 12, large: 12 }}>
              <div className={headerClassName}>
                <BodyCopy
                  fontWeight="extrabold"
                  fontSize="fs16"
                  fontFamily="secondary"
                  className="title-list-product"
                >
                  {`Shipping`}
                </BodyCopy>
              </div>
              <ul className="container-list-shopping-cart">
                {pickUpList.list.map(listItem => {
                  return this.getOrderItem(listItem.item, listItem.currencySymbol);
                })}
              </ul>
            </Col>
          </Row>
        </div>
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
    if (storeItemsList) {
      Object.keys(storeItemsList).forEach(storeItem => {
        if (storeItem) {
          let isShowHeader = true;
          let orderCount = 0;
          Object.keys(storeItemsList[storeItem]).forEach(deliveryItemList => {
            if (deliveryItemList) {
              const deliveryItem =
                storeItemsList[storeItem][PICKUP_ITEM_ORDER[orderCount]] ||
                storeItemsList[storeItem][deliveryItemList];
              const headerClassName = cssClassName(
                'header-list ',
                { 'header-primary ': isShowHeader },
                { 'header-secondary ': !isShowHeader }
              );
              const itemHeader = [
                <div key={`${index}_${orderCount}_0`} className={headerClassName}>
                  {this.getPickupHeader(deliveryItem, isShowHeader)}
                </div>,
                <ul key={`${index}_${orderCount}_1`} className="container-list-shopping-cart">
                  {deliveryItem.list.map(listItem => {
                    return this.getOrderItem(listItem.item, listItem.currencySymbol);
                  })}
                </ul>,
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

  categorizingItemsForStores = ({
    currentStore,
    currentStoreAddress,
    item,
    orderType,
    bossStartDate,
    bossEndDate,
    bopisDate,
    bucket,
    deliveryType,
    bucketReference,
  }) => {
    const { currencySymbol } = this.props;
    const orderItem = {
      store: currentStore,
      storeAddress: currentStoreAddress,
      storePhoneNumber: item.miscInfo.storePhoneNumber || '',
      storeTodayOpenRange: item.miscInfo.storeTodayOpenRange || '',
      storeTomorrowOpenRange: item.miscInfo.storeTomorrowOpenRange || '',
      orderType,
      duration:
        item.miscInfo.orderItemType === CheckoutConstants.ORDER_ITEM_TYPE.BOSS ? (
          `${bossStartDate.day}. ${bossStartDate.month} ${bossStartDate.date} - ${
            bossEndDate.day
          }. ${bossEndDate.month} ${bossEndDate.date}`
        ) : (
          <BodyCopy
            fontWeight="extrabold"
            fontSize="fs12"
            fontFamily="secondary"
            className="title-list-product"
          >
            {`Today, ${bopisDate.month} ${bopisDate.date}`}
          </BodyCopy>
        ),
    };
    if (bucket[deliveryType]) {
      bucketReference[deliveryType][currentStore] = bucket[deliveryType][currentStore] || {};
      const bucketStore = bucket[deliveryType][currentStore];
      bucketStore[orderType] = bucketStore[orderType] || orderItem;
      bucketStore[orderType].list = bucketStore[orderType].list || [];
      bucketStore[orderType].list.push({ item, currencySymbol });
    } else {
      bucketReference[deliveryType] = {};
      bucketReference[deliveryType][currentStore] = {};
      const bucketStore = bucketReference[deliveryType][currentStore];

      bucketStore[orderType] = orderItem;
      bucketStore[orderType].list = [];
      bucketStore[orderType].list.push({ item, currencySymbol });
    }
  };

  renderItems() {
    const { items, currencySymbol } = this.props;
    const apiConfig = getAPIConfig();
    const localeType = 'en_US'; // apiConfig.siteId + apiConfig.countryKey;
    const bopisDate = getDateInformation();

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
        if (
          firstItem.miscInfo.orderItemType === CheckoutConstants.CHECKOUT_ORDER.ORDER_BOPIS_LABEL
        ) {
          return -1;
        }
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
    const orderBucket =
      sortedItem &&
      sortedItem.reduce((bucket, item) => {
        const orderType = item.miscInfo.orderItemType;
        const currentStore = item.miscInfo.store || CheckoutConstants.CHECKOUT_ORDER.ECOM_NO_STORE;
        const currentStoreAddress = item.miscInfo.storeAddress || '';
        const { bossStartDate, bossEndDate } = item.miscInfo;
        const bucketReference = bucket;

        const deliveryType =
          orderType === CheckoutConstants.CHECKOUT_ORDER.ORDER_BOPIS_LABEL ||
          orderType === CheckoutConstants.CHECKOUT_ORDER.ORDER_BOSS_LABEL
            ? CheckoutConstants.CHECKOUT_ORDER.ORDER_PICKUP_LABEL
            : CheckoutConstants.CHECKOUT_ORDER.ORDER_SHIPIT_LABEL;

        if (deliveryType === CheckoutConstants.CHECKOUT_ORDER.ORDER_SHIPIT_LABEL) {
          bucketReference[deliveryType] = bucket[deliveryType] || {};
          bucketReference[deliveryType].list = bucket[deliveryType].list || [];
          bucket[deliveryType].list.push({ item, currencySymbol });
        } else {
          this.categorizingItemsForStores({
            currentStore,
            currentStoreAddress,
            item,
            orderType,
            bossStartDate,
            bossEndDate,
            bopisDate,
            bucket,
            deliveryType,
            bucketReference,
          });
        }
        return bucket;
      }, {});

    const orderTypeList = CheckoutConstants.CHECKOUT_ORDER.REVIEW_PRODUCT_SEQUENCE;
    return (
      <div className="checkout-cart-list">
        {orderTypeList.map((item, index) => this.renderOrderItems(item, orderBucket[item], index))}
      </div>
    );
  }

  render() {
    const { itemsCount, className, bagPageLabels } = this.props;
    return (
      <div className={className}>
        <Row tagName="header">
          <Col colSize={{ small: 12, medium: 12, large: 12 }}>
            <BodyCopy
              fontWeight="semibold"
              fontSize="fs16"
              fontFamily="secondary"
              className="checkout-cart-list-heading"
            >
              {`${bagPageLabels.bagHeading} (${itemsCount})`}
            </BodyCopy>
            {this.renderItems()}
          </Col>
        </Row>
      </div>
    );
  }
}

export default withStyles(CheckoutCartItemsList, styles);
export { CheckoutCartItemsList as CheckoutCartItemsListVanilla };
