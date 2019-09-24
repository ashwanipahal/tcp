/** @module ProductPickup
 * @summary Shows the BOPIS CTA in PDP
 *
 */

import React from 'react';
import { PropTypes } from 'prop-types';
import {
  COLOR_FITS_SIZES_MAP_PROP_TYPE,
  PRICING_PROP_TYPES,
} from '../../PickupStoreModal/PickUpStoreModal.proptypes';
import { handleGenericKeyDown } from '../util';
import withStyles from '../../../hoc/withStyles';

import { Button, Anchor, BodyCopy } from '../../../atoms';
import ProductPickupStyles from '../styles/ProductPickup.style';

const labels = {
  CHANGE_STORE: '(Change Store)',
  PRODUCT_PICKUP: {
    TITLE_DEFAULT_NOSTORE: 'Select Store',
    PRODUCT_BOPIS: 'Buy online - Pick up in store',
    BOPIS_AVAILABLE: 'Pick up TODAY!',
    BOPIS_ONLY_AVAILABLE: 'Item available for pickup TODAY',
    BOSS_AVAILABLE: 'Or choose NO RUSH Pickup ',
    BOSS_ONLY_AVAILABLE: 'Choose NO RUSH Pickup ',
    PICKUP_IN_STORE: 'PICK UP IN STORE',
  },
  SPACE_ONE: ' ',
  FREE_SHIPPING: 'FREE Shipping Every Day!',
  NO_MIN_PURCHASE: 'No Minimum Purchase Required.',
  FIND_STORE: 'FIND A STORE',
};

const KEY_CODES = {
  ENTER: 13,
};

/**
 *  Describes a general product, not yet specialized by chosing a color, size, etc.
 *  For example, a product shown in reccomendations, or PDP.
 */
export const PRODUCT_INFO_PROP_TYPES = {
  /* this identifies a product for Bazaarvoice (reviews and ratings component) */
  ratingsProductId: PropTypes.string,

  /** This identifies the product regardless of color/fit/size (i.e., changing size/fit/color does not change this value) */
  generalProductId: PropTypes.string.isRequired,
  /** The name of the product to be displayed to the user */
  name: PropTypes.string.isRequired,
  /** Images for this product in different colors.
   * This is an object of key-vale pairs. the key is the color name, and the value has thew shape described below.
   */
  imagesByColor: PropTypes.oneOfType([
    PropTypes.objectOf(
      PropTypes.shape({
        extraImages: PropTypes.arrayOf(
          PropTypes.shape({
            iconSizeImageUrl: PropTypes.string.isRequired,
            regularSizeImageUrl: PropTypes.string.isRequired,
            bigSizeImageUrl: PropTypes.string.isRequired,
            superSizeImageUrl: PropTypes.string.isRequired,
          })
        ),
      })
    ),
    PropTypes.objectOf(
      PropTypes.shape({
        basicImageUrl: PropTypes.string.isRequired,
      })
    ),
  ]),
  /** optional displayNames of the color fit and size (e.g., for gift cards it is {color: 'Design, size: 'Value']) */
  colorFitSizeDisplayNames: PropTypes.shape({
    color: PropTypes.string,
    fit: PropTypes.string,
    size: PropTypes.string,
  }),
  /**
   * The available color fit and size options for this product
   * Organized in a three level nesting (similar to a site navigation) with L1 being the color,
   * L2 being the fit, and L3 being the size
   */
  colorFitsSizesMap: COLOR_FITS_SIZES_MAP_PROP_TYPE,

  /** SEO Friendly URL required to have the image and title linkable */
  pdpUrl: PropTypes.string.isRequired,

  /* Short description of the product. */
  shortDescription: PropTypes.string,

  /* Long description of the product that may include HTML. */
  longDescription: PropTypes.string,

  /** Flags if this SKU/product is a Gift-Card */
  isGiftCard: PropTypes.bool,

  /** Product price, which may be overriden by sku-level price */
  ...PRICING_PROP_TYPES,
};

export const PRODUCT_INFO_PROP_TYPE_SHAPE = PropTypes.shape(PRODUCT_INFO_PROP_TYPES);

class ProductPickup extends React.PureComponent {
  static propTypes = {
    miscInfo: PropTypes.shape({}),
    offerEspotAvailable: PropTypes.bool,
    className: PropTypes.string,

    /**
     * Information regarding the product at the swatch/color level.
     */
    productInfo: PRODUCT_INFO_PROP_TYPE_SHAPE.isRequired,
    /** User's preferred store information */
    userDefaultStore: PropTypes.shape({
      basicInfo: PropTypes.shape({
        /** store id identifier */
        id: PropTypes.string.isRequired,
        /** store Name */
        storeName: PropTypes.string.isRequired,
      }).isRequired,
    }),
    /**
     * User's latitude and longitude coordinates if access is allowed.
     */
    userGeoCoordinates: PropTypes.shape({
      lat: PropTypes.number,
      long: PropTypes.number,
    }),

    /**
     * Item values selected for the product, to use in the BOPIS modal if it
     * gets opened.
     */
    itemValues: PropTypes.shape({
      color: PropTypes.string.isRequired,
      fit: PropTypes.string,
      size: PropTypes.string,
      quantity: PropTypes.number,
    }),

    /**
     * method responsible for triggering the operator method for BopisQuickViewModal
     */
    onPickUpOpenClick: PropTypes.func,
    /**
     * carries the inventory information of the bopis item selected
     */
    bopisItemInventory: PropTypes.arrayOf(PropTypes.object),
    isBopisEligible: PropTypes.bool,
    isBossEligible: PropTypes.bool,
    isSkuResolved: PropTypes.bool,
    showChangeStore: PropTypes.bool,
    pickupTitleText: PropTypes.string,
    isBossEligBossInvAvail: PropTypes.bool,
    isStoreBopisEligible: PropTypes.bool,
    showPickupDetails: PropTypes.bool,
    showPickupInfo: PropTypes.bool,
    isSubmitting: PropTypes.bool,
  };

  static defaultProps = {
    miscInfo: {},
    userDefaultStore: {
      basicInfo: {
        id: '',
        storeName: '',
      },
    },
    userGeoCoordinates: {
      lat: null,
      long: null,
    },
    itemValues: {
      color: '',
      fit: '',
      size: '',
      quantity: null,
    },
    onPickUpOpenClick: null,
    bopisItemInventory: [],
    offerEspotAvailable: false,
    className: '',
    isBopisEligible: false,
    isBossEligible: false,
    isSkuResolved: false,
    showChangeStore: false,
    pickupTitleText: '',
    isBossEligBossInvAvail: false,
    isStoreBopisEligible: false,
    showPickupDetails: false,
    showPickupInfo: false,
    isSubmitting: false,
  };

  /**
   * @method handlePickupModalClick -
   * method is responsible for invoking the method for open pickup modal
   */

  handlePickupModalClick = () => {
    const {
      onPickUpOpenClick,
      productInfo,
      itemValues,
      isBopisEligible,
      isBossEligible,
    } = this.props;

    return onPickUpOpenClick({
      generalProductId: productInfo.generalProductId,
      initialValues: { color: itemValues && itemValues.color && itemValues.color.name },
      isBopisCtaEnabled: isBopisEligible,
      isBossCtaEnabled: isBossEligible,
      colorProductId: productInfo.generalProductId,
    });
  };

  /**
   * @method handleChangeStoreOnKeyPress
   * handles the change store modal when Enter key is pressed post tabbing on the link
   */
  handleChangeStoreOnKeyPress = event =>
    handleGenericKeyDown(event, KEY_CODES.ENTER, this.handlePickupModalClick);

  /**
   * @method renderPickupTitle
   * @param {object} miscInfo carries the information of the product with
   * respective color product
   * @param {object} userDefaultStore carries the information of the store user's
   * default store
   */
  renderPickupTitle() {
    const {
      isSkuResolved,
      isBopisEligible,
      showChangeStore,
      pickupTitleText,
      userDefaultStore,
      isBossEligBossInvAvail,
    } = this.props;
    if (isSkuResolved) {
      if (userDefaultStore) {
        if (showChangeStore) {
          /**
           * if the sku is resolved and the user has added a store to the account
           * then it @returns - store name and the link to change the store
           * */
          return (
            <React.Fragment>
              <BodyCopy
                className="store-name"
                fontSize="fs16"
                fontFamily="secondary"
                fontWeight="semibold"
                component="span"
              >
                {userDefaultStore.basicInfo.storeName}
              </BodyCopy>
              <Anchor
                fontSizeVariation="medium"
                className="change-store-link"
                role="link"
                tabIndex="0"
                onKeyDown={this.handleChangeStoreOnKeyPress}
                onClick={this.handlePickupModalClick}
                underline
              >
                {labels.CHANGE_STORE}
              </Anchor>
            </React.Fragment>
          );
        }
        return (
          <BodyCopy fontSize="fs16" fontWeight="semibold" fontFamily="secondary">
            {labels.PRODUCT_PICKUP.TITLE_DEFAULT_NOSTORE}
          </BodyCopy>
        );
      }
      if (isBopisEligible && !isBossEligBossInvAvail) {
        // bopis only
        /**
         * @returns if the product is only bopis eligible and the sku is resolved
         * then it @returns {labels.PRODUCT_BOPIS}
         */
        return (
          <BodyCopy fontSize="fs16" fontWeight="semibold" fontFamily="secondary">
            {pickupTitleText}
          </BodyCopy>
        );
      }
      /**
       * @returns if the product is only boss eligible and the sku is resolved
       * then it @returns {labels.TITLE_DEFAULT_NOSTORE}
       */
      return (
        <BodyCopy fontSize="fs16" fontWeight="semibold" fontFamily="secondary">
          {pickupTitleText}
        </BodyCopy>
      );
    }
    return (
      <BodyCopy fontSize="fs16" fontWeight="semibold" fontFamily="secondary">
        {pickupTitleText}
      </BodyCopy>
    );
  }

  /**
   * @member renderPickupInfo
   * @description this method returns the information of pickup on the
   * respective store based on different scenarios
   * @param {object} miscInfo carries the product information
   * with respective color id
   * @param {object} userDefaultStore carries the information of User's default store
   * @return if the sku is resolved and the product is available in store
   * or both BOSS and BOPIS
   * then is @returns - item availability information along with the
   * pickup today label and the BOSS dates information with the boss pickup
   * label
   * @return if the sku is resolved and the product is only available for BOPIS
   * then it @returns - item availability information with the BOPIS only pickup
   * label
   * @return if the sku is resolved and the product is avialable only for BOSS
   * then it @returns - the boss dates information along with the BOSS only
   * pickup labels
   */
  renderPickupInfo() {
    const {
      bopisItemInventory,
      offerEspotAvailable,
      isStoreBopisEligible,
      showPickupDetails,
      isBopisEligible,
    } = this.props;

    if (showPickupDetails) {
      return (
        <div className="pickup-info">
          {isStoreBopisEligible && (
            <BodyCopy fontSize="fs12" fontFamily="secondary">
              <BodyCopy
                className="availability"
                fontWeight="extrabold"
                fontFamily="secondary"
                color="success"
                component="span"
              >
                {`${bopisItemInventory[0].status}!`}
                {labels.SPACE_ONE}
              </BodyCopy>
              {labels.PRODUCT_PICKUP.BOPIS_AVAILABLE}
            </BodyCopy>
          )}
          <BodyCopy
            className="pickup-boss-info"
            fontSize="fs12"
            fontFamily="secondary"
            component="span"
          >
            {isStoreBopisEligible
              ? labels.PRODUCT_PICKUP.BOSS_AVAILABLE
              : labels.PRODUCT_PICKUP.BOSS_ONLY_AVAILABLE}
            {labels.SPACE_ONE}
            {offerEspotAvailable && 'and'}
            {labels.SPACE_ONE}
          </BodyCopy>
          {/* <ContentSlot className="pickup-espot" contentSlotName="fav_store_pickup_content" /> */}
        </div>
      );
    }
    if (isBopisEligible) {
      return (
        isStoreBopisEligible && (
          <BodyCopy className="pickup-info">
            <span className="availability">
              {`${bopisItemInventory[0].status}!`}
              {labels.SPACE_ONE}
            </span>
            {labels.PRODUCT_PICKUP.BOPIS_ONLY_AVAILABLE}
          </BodyCopy>
        )
      );
    }
    return (
      <div className="pickup-info">
        <p className="pickup-boss-info">
          {labels.PRODUCT_PICKUP.BOSS_ONLY_AVAILABLE}
          {labels.SPACE_ONE}
          {offerEspotAvailable && 'and'}
          {labels.SPACE_ONE}
        </p>
        {/* <ContentSlot className="pickup-espot" contentSlotName="no_fav_pickup_content" /> */}
      </div>
    );
  }

  render() {
    const { className, showPickupInfo, isSubmitting } = this.props;

    return (
      <React.Fragment>
        <div className={`${className} pickup-section-container`}>
          <div className="pickup-sub-container">
            <div className="pickup-header">
              <div className="title-pickup-section">
                <img
                  className="shipping-icon"
                  alt="shipping-icon"
                  src="/static/images/fast-shipping.svg"
                />
                <div className="shipping-text-section">
                  <BodyCopy
                    fontSize="fs16"
                    fontWeight="semibold"
                    fontFamily="secondary"
                    component="span"
                  >
                    {labels.FREE_SHIPPING}
                  </BodyCopy>
                  <BodyCopy fontSize="fs12" fontFamily="secondary" className="sub-header-pickup">
                    {labels.NO_MIN_PURCHASE}
                  </BodyCopy>
                </div>
              </div>
            </div>
            <div className="pickup-content">
              <div className="pickup-section">
                <div className="title-pickup-section">
                  <img
                    className="pickup-icon"
                    alt="pickup-icon"
                    src="/static/images/marker-icon.svg"
                  />
                </div>
                <div className="pickup-details">
                  {this.renderPickupTitle()}
                  {showPickupInfo && this.renderPickupInfo()}
                </div>
              </div>
              <Button
                className="button-find-in-store"
                buttonVariation="fixed-width"
                fill="BLACK"
                disabled={isSubmitting}
                onClick={this.handlePickupModalClick}
              >
                {showPickupInfo ? labels.PRODUCT_PICKUP.PICKUP_IN_STORE : labels.FIND_STORE}
              </Button>
            </div>
          </div>
        </div>
        {/* {this.isBopisEligible && (
          <ContentSlot contentSlotName="pdp_bopis_promo" className="product-details-bopis-promo" />
        )} */}
      </React.Fragment>
    );
  }
}

export default withStyles(ProductPickup, ProductPickupStyles);
