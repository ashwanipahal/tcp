import React, { Component } from 'react';
import LoaderSkelton from '@tcp/core/src/components/common/molecules/LoaderSkelton';
import GenericSkeleton from '@tcp/core/src/components/common/molecules/GenericSkeleton/GenericSkeleton.view';
import { PropTypes } from 'prop-types';
import withStyles from '@tcp/core/src/components/common/hoc/withStyles';
import { BodyCopy, Col, Row, Image } from '@tcp/core/src/components/common/atoms';
import ReactToolTip from '@tcp/core/src/components/common/atoms/ReactToolTip';
import cssClassName from '@tcp/core/src/utils/cssClassName';
import { getTranslateDateInformation } from '@tcp/core/src/utils';
import { getAPIConfig, getIconPath } from '@tcp/core/src/utils/utils';
import CartItemTile from '../../../../../../CartItemTile/molecules/CartItemTile/views/CartItemTile.view';
import { getProductDetails } from '../../../../../../CartItemTile/container/CartItemTile.selectors';
import styles from '../styles/CheckoutCartItemsList.style';
import CheckoutConstants from '../../../../../Checkout.constants';
import CollapsibleContainer from '../../../../../../../../common/molecules/CollapsibleContainer';

/**
 *
 *
 * @class CheckoutCartItemsList
 * @extends {Component}
 * @summary Component to render and sort items in bag as per shipping,pickups and store vise and show them on review page.
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
    className: PropTypes.string.isRequired,
    gettingSortedItemList: PropTypes.func.isRequired,
    showAccordian: PropTypes.bool,
    disableProductRedirect: PropTypes.bool,
    bagLoading: PropTypes.bool,
    checkoutRoutingDone: PropTypes.bool,
  };

  /**
   * @function getOrderItem
   * @param {String<object>} item - contains order product details
   * @param {String} currencySymbol - tells function which currency symbol to use
   * @summary This function accepts a item and currency symbol and will return
   * single order item html.
   */
  getOrderItem = item => {
    const { labels, currencySymbol, disableProductRedirect } = this.props;
    const showOnReviewPage = false;
    return (
      <div className="cart-item-tile-container">
        <CartItemTile
          productDetail={item}
          labels={labels}
          showOnReviewPage={showOnReviewPage}
          currencySymbol={currencySymbol}
          disableProductRedirect={disableProductRedirect}
        />
      </div>
    );
  };

  /**
   * @function OrderTooltip
   * @param {Object} deliveryItem - delivery item details
   * @summary This function accepts a deliveryItem and gives tooltip data
   */
  OrderTooltip = deliveryItem => {
    const { labels } = this.props;
    const {
      storeAddress: { addressLine1, addressLine2, city, state, zipCode },
    } = deliveryItem;
    const { storeTodayOpenRange, storeTomorrowOpenRange, storePhoneNumber, store } = deliveryItem;
    const { today, tomorrow, phone } = labels;
    return (
      <>
        <BodyCopy component="div" fontWeight="bold" fontSize="fs16" fontFamily="secondary">
          {store}
        </BodyCopy>
        {deliveryItem.storeAddress && (
          <>
            <BodyCopy component="div" fontWeight="regular" fontSize="fs12" fontFamily="secondary">
              {addressLine1}
            </BodyCopy>
            {addressLine2 && (
              <BodyCopy component="div" fontWeight="regular" fontSize="fs12" fontFamily="secondary">
                {addressLine2}
              </BodyCopy>
            )}
            <BodyCopy component="div" fontWeight="regular" fontSize="fs12" fontFamily="secondary">
              {`${city},${state}${zipCode}`}
            </BodyCopy>
            {storeTodayOpenRange && (
              <BodyCopy component="div" fontWeight="regular" fontSize="fs12" fontFamily="secondary">
                {`${today}: ${storeTodayOpenRange}`}
              </BodyCopy>
            )}
            {storeTomorrowOpenRange && (
              <BodyCopy component="div" fontWeight="regular" fontSize="fs12" fontFamily="secondary">
                {`${tomorrow}: ${storeTomorrowOpenRange}`}
              </BodyCopy>
            )}
            {storePhoneNumber && (
              <BodyCopy component="div" fontWeight="regular" fontSize="fs12" fontFamily="secondary">
                {`${phone}: ${storePhoneNumber}`}
              </BodyCopy>
            )}
          </>
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
    const { labels } = this.props;
    const toolTipMinWidth = '205px';
    return (
      <div className="title-list-pickup-product">
        {isShowHeader && (
          <div className="pickup-header">
            <Row>
              <Col colSize={{ small: 6, medium: 8, large: 12 }}>
                <BodyCopy
                  component="span"
                  fontWeight="extrabold"
                  fontSize="fs16"
                  fontFamily="secondary"
                >
                  {labels.pickup}
                </BodyCopy>
                <BodyCopy
                  component="span"
                  fontWeight="regular"
                  fontSize="fs10"
                  fontFamily="secondary"
                  className="store-of-product"
                >
                  {labels.at}
                </BodyCopy>
                <BodyCopy
                  component="span"
                  fontWeight="extrabold"
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
                  minWidth={toolTipMinWidth}
                >
                  <Image height="15" width="15" src={getIconPath('info-icon')} />
                </ReactToolTip>
              </Col>
            </Row>
          </div>
        )}
        <Row>
          <Col colSize={{ small: 6, medium: 8, large: 12 }}>
            <BodyCopy
              fontWeight="extrabold"
              fontSize="fs10"
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
    const { labels } = this.props;
    if (pickUpList && pickUpList.list) {
      return (
        <div key={index}>
          <Row className="checkout-cart-list-shipping">
            <Col colSize={{ small: 6, medium: 8, large: 12 }}>
              <div className={headerClassName}>
                <BodyCopy
                  fontWeight="extrabold"
                  fontSize="fs16"
                  fontFamily="secondary"
                  className="title-list-product"
                >
                  {labels.shipping}
                </BodyCopy>
              </div>
              <div className="container-list-shopping-cart">
                {pickUpList.list.map(listItem => {
                  return this.getOrderItem(listItem.item, listItem.currencySymbol);
                })}
              </div>
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
              const headerClassName = cssClassName(
                'header-list ',
                { 'header-primary ': isShowHeader },
                { 'header-secondary ': !isShowHeader }
              );
              const itemHeader = [
                <div key={`${index}_${orderCount}_0`} className={headerClassName}>
                  {this.getPickupHeader(deliveryItem, isShowHeader)}
                </div>,
                <div key={`${index}_${orderCount}_1`} className="container-list-shopping-cart">
                  {deliveryItem.list.map(listItem => {
                    return this.getOrderItem(listItem.item, listItem.currencySymbol);
                  })}
                </div>,
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
    const bopisDate = getTranslateDateInformation('', apiConfig.language);
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
        <div className="checkout-cart-list">
          {orderTypeList.map((item, index) =>
            this.renderOrderItems(item, orderBucket[item], index)
          )}
        </div>
      );
    }
    return {};
  }

  /**
   * @function render
   * @summary This function responsible for rendedring view and calling further respective methods.
   */
  render() {
    const {
      itemsCount,
      className,
      bagPageLabels,
      showAccordian,
      bagLoading,
      checkoutRoutingDone,
    } = this.props;
    const header = (
      <BodyCopy
        fontWeight="semibold"
        fontSize="fs16"
        fontFamily="secondary"
        className="checkout-cart-list-heading"
        checkoutRoutingDone
      >
        {`${bagPageLabels.bagHeading} (${itemsCount}):`}
      </BodyCopy>
    );

    return (
      <div className={className}>
        <Col
          colSize={{
            large: 12,
            medium: 8,
            small: 6,
          }}
          ignoreGutter={{ small: true, medium: true }}
          className={showAccordian ? 'hide-in-large-up' : 'hideAccordian'}
        >
          <CollapsibleContainer
            className={`${className} ${showAccordian ? 'reviewMyBagAccordian' : ''}`}
            header={header}
            body={this.renderItems()}
            iconLocator="arrowicon"
            defaultOpen
          />
        </Col>
        <div className={showAccordian ? 'hide-in-medium-down' : ''}>
          {header}
          {!bagLoading && checkoutRoutingDone ? (
            this.renderItems()
          ) : (
            <>
              <Row>
                <Col colSize={{ large: 2, medium: 1, small: 1 }}>
                  <LoaderSkelton width="100px" height="100px" />
                </Col>
                <Col colSize={{ large: 4, medium: 3, small: 2 }}>
                  <GenericSkeleton />
                </Col>
              </Row>
            </>
          )}
        </div>
      </div>
    );
  }
}

CheckoutCartItemsList.defaultProps = {
  labels: {},
  bagPageLabels: {},
  showAccordian: true,
  disableProductRedirect: false, // Disable Product Redirect
  bagLoading: false,
  checkoutRoutingDone: false,
};

export default withStyles(CheckoutCartItemsList, styles);
export { CheckoutCartItemsList as CheckoutCartItemsListVanilla };
