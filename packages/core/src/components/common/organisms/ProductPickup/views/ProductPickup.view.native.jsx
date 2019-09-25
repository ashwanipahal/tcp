/* eslint-disable max-lines */
import React from 'react';
import { PropTypes } from 'prop-types';
import {
  COLOR_FITS_SIZES_MAP_PROP_TYPE,
  PRICING_PROP_TYPES,
} from '../../PickupStoreModal/PickUpStoreModal.proptypes';
import { handleGenericKeyDown } from '../util';
import withStyles from '../../../hoc/withStyles';

import { Button, Anchor, BodyCopy } from '../../../atoms';
import LineComp from '../../../atoms/Line';
import CustomIcon from '../../../atoms/Icon';
import { ICON_NAME, ICON_FONT_CLASS } from '../../../atoms/Icon/Icon.constants';
import {
  Container,
  styles,
  FastShippingContainer,
  FastShippingTextContainer,
  StoreContainer,
  RowContainer,
  ColumnContainer,
  PromotionESpot,
  PromotionESpotLeftArrow,
  PromotionESpotTextContainer,
} from '../styles/ProductPickup.style.native';

import { KEY_CODES } from '../../../../../constants/keyboard.constants';
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
      Fit: PropTypes.string,
      Size: PropTypes.string,
      Quantity: PropTypes.number,
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
    labels: PropTypes.shape({
      lbl_Product_pickup_BOPIS_AVAILABLE: PropTypes.string,
      lbl_Product_pickup_BOPIS_DISABLED_FITS_HUSKY: PropTypes.string,
      lbl_Product_pickup_BOPIS_DISABLED_FITS_PLUS: PropTypes.string,
      lbl_Product_pickup_BOPIS_DISABLED_FITS_SLIM: PropTypes.string,
      lbl_Product_pickup_BOPIS_ONLY_AVAILABLE: PropTypes.string,
      lbl_Product_pickup_BOSS_AVAILABLE: PropTypes.string,
      lbl_Product_pickup_BOSS_ONLY_AVAILABLE: PropTypes.string,
      lbl_Product_pickup_FIND_STORE: PropTypes.string,
      lbl_Product_pickup_FREE_SHIPPING: PropTypes.string,
      lbl_Product_pickup_NO_MIN_PURCHASE: PropTypes.string,
      lbl_Product_pickup_PICKUP_IN_STORE: PropTypes.string,
      lbl_Product_pickup_PRODUCT_BOPIS: PropTypes.string,
      lbl_Product_pickup_TITLE_DEFAULT_NOSTORE: PropTypes.string,
    }),
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
      Fit: '',
      Size: '',
      Quantity: null,
    },
    onPickUpOpenClick: null,
    bopisItemInventory: [],
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
    labels: {
      lbl_Product_pickup_BOPIS_AVAILABLE: 'Pick up TODAY!',
      lbl_Product_pickup_BOPIS_DISABLED_FITS_HUSKY: 'husky',
      lbl_Product_pickup_BOPIS_DISABLED_FITS_PLUS: 'plus',
      lbl_Product_pickup_BOPIS_DISABLED_FITS_SLIM: 'slim',
      lbl_Product_pickup_BOPIS_ONLY_AVAILABLE: 'Item available for pickup TODAY',
      lbl_Product_pickup_BOSS_AVAILABLE: 'Or choose NO RUSH Pickup ',
      lbl_Product_pickup_BOSS_ONLY_AVAILABLE: 'Choose NO RUSH Pickup ',
      lbl_Product_pickup_FIND_STORE: 'FIND A STORE',
      lbl_Product_pickup_FREE_SHIPPING: 'FREE Shipping Every Day!',
      lbl_Product_pickup_NO_MIN_PURCHASE: 'No Minimum Purchase Required.',
      lbl_Product_pickup_PICKUP_IN_STORE: 'PICK UP IN STORE',
      lbl_Product_pickup_PRODUCT_BOPIS: 'Buy online - Pick up in store',
      lbl_Product_pickup_TITLE_DEFAULT_NOSTORE: 'Select Store',
    },
  };

  constructor(props) {
    super(props);
    this.handlePickupModalClick = this.handlePickupModalClick.bind(this);
  }

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

    if (onPickUpOpenClick) {
      onPickUpOpenClick(
        productInfo.generalProductId,
        itemValues,
        productInfo.generalProductId,
        productInfo.generalProductId,
        isBopisEligible,
        isBossEligible
      );
    }
  };

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
      labels,
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
                margin="0 12px 0 0"
                dataLocator="pdp_store_name_value"
                fontFamily="secondary"
                fontSize="fs16"
                fontWeight="semibold"
                color="gray.900"
                text={userDefaultStore.basicInfo.storeName}
              />
              <Anchor
                fontSizeVariation="medium"
                anchorVariation="custom"
                colorName="gray.900"
                underline
                href="#"
                locator="pdp_change_store_label"
                className="details-link"
                onPress={this.handlePickupModalClick}
                text={labels.lbl_Product_pickup_CHANGE_STORE}
              />
            </React.Fragment>
          );
        }
        return (
          <BodyCopy
            margin="0 12px 0 0"
            dataLocator="pdp_store_name_value"
            fontFamily="secondary"
            fontSize="fs16"
            fontWeight="semibold"
            color="gray.900"
            text={labels.lbl_Product_pickup_TITLE_DEFAULT_NOSTORE}
          />
        );
      }
      if (isBopisEligible && !isBossEligBossInvAvail) {
        // bopis only
        /**
         * @returns if the product is only bopis eligible and the sku is resolved
         * then it @returns {labels.PRODUCT_BOPIS}
         */
        return (
          <BodyCopy
            margin="0 12px 0 0"
            dataLocator="pdp_store_name_value"
            fontFamily="secondary"
            fontSize="fs16"
            fontWeight="semibold"
            color="gray.900"
            text={pickupTitleText}
          />
        );
      }
      return (
        <BodyCopy
          margin="0 12px 0 0"
          dataLocator="pdp_store_name_value"
          fontFamily="secondary"
          fontSize="fs16"
          fontWeight="semibold"
          color="gray.900"
          text={pickupTitleText}
        />
      );
    }
    return (
      <BodyCopy
        margin="0 12px 0 0"
        dataLocator="pdp_store_name_value"
        fontFamily="secondary"
        fontSize="fs16"
        fontWeight="semibold"
        color="gray.900"
        text={pickupTitleText}
      />
    );
  }

  /* eslint-disable */
  renderPickupInfo() {
    const {
      bopisItemInventory,
      isStoreBopisEligible,
      showPickupDetails,
      isBopisEligible,
      offerEspotAvailable,
      labels,
    } = this.props;
    if (showPickupDetails) {
      return (
        <React.Fragment>
          {isStoreBopisEligible && (
            <RowContainer margins="4px 0 0 0px">
              <BodyCopy
                dataLocator="pdp_store_availability_label"
                fontFamily="secondary"
                fontSize="fs12"
                fontWeight="semibold"
                color="green.500"
                text={`${bopisItemInventory[0].status}!`}
              />
              <BodyCopy
                margin="0 0 0 4px"
                dataLocator="pdp_store_availability_value"
                fontFamily="secondary"
                fontSize="fs12"
                fontWeight="regular"
                color="gray.900"
                text={labels.lbl_Product_pickup_BOPIS_AVAILABLE}
              />
            </RowContainer>
          )}
          <RowContainer margins="4px 0 0 0px">
            <BodyCopy
              dataLocator="pdp_store_no_rush_label"
              fontFamily="secondary"
              fontSize="fs12"
              fontWeight="regular"
              color="gray.900"
              text={
                isStoreBopisEligible
                  ? labels.lbl_Product_pickup_BOSS_AVAILABLE
                  : labels.lbl_Product_pickup_BOSS_ONLY_AVAILABLE
              }
            />
            {offerEspotAvailable && (
              <PromotionESpot>
                <PromotionESpotLeftArrow />
                <PromotionESpotTextContainer>
                  <BodyCopy
                    dataLocator="pdp_store_no_rush_value"
                    fontFamily="primary"
                    fontSize="fs10"
                    fontWeight="black"
                    color="black"
                    text="EXTRA 5% OFF"
                  />
                </PromotionESpotTextContainer>
              </PromotionESpot>
            )}
          </RowContainer>
        </React.Fragment>
      );
    }

    if (isBopisEligible) {
      return (
        isStoreBopisEligible && (
          <RowContainer margins="4px 0 0 0px">
            <BodyCopy
              dataLocator="pdp_store_availability_label"
              fontFamily="secondary"
              fontSize="fs12"
              fontWeight="semibold"
              color="green.500"
              text={`${bopisItemInventory[0].status}!`}
            />
            <BodyCopy
              margin="0 0 0 4px"
              dataLocator="pdp_store_availability_value"
              fontFamily="secondary"
              fontSize="fs12"
              fontWeight="regular"
              color="gray.900"
              text={labels.lbl_Product_pickup_BOPIS_ONLY_AVAILABLE}
            />
          </RowContainer>
        )
      );
    }

    return (
      <RowContainer margins="4px 0 0 0px">
        <BodyCopy
          dataLocator="pdp_store_no_rush_label"
          fontFamily="secondary"
          fontSize="fs12"
          fontWeight="regular"
          color="gray.900"
          text={labels.lbl_Product_pickup_BOSS_ONLY_AVAILABLE}
        />
        {offerEspotAvailable && (
          <PromotionESpot>
            <PromotionESpotLeftArrow />
            <PromotionESpotTextContainer>
              <BodyCopy
                dataLocator="pdp_store_no_rush_value"
                fontFamily="primary"
                fontSize="fs10"
                fontWeight="black"
                color="black"
                text="EXTRA 5% OFF"
              />
            </PromotionESpotTextContainer>
          </PromotionESpot>
        )}
      </RowContainer>
    );
  }
  /* eslint-enable */

  renderPickupInfoError() {
    const { labels } = this.props;
    return (
      <BodyCopy
        dataLocator="pdp_pick_up_error_info"
        fontFamily="secondary"
        fontSize="fs10"
        fontWeight="black"
        color="red.500"
        text={`${labels.lbl_Product_pickup_UNAVAILABLE_IN_STORES} UNAVAILABLE IN STORES`}
      />
    );
  }

  render() {
    const { showPickupInfo, isSubmitting, labels } = this.props;
    return (
      <Container margins="40px 0 0 0">
        <FastShippingContainer>
          <CustomIcon
            iconFontName={ICON_FONT_CLASS.Icomoon}
            name={ICON_NAME.fastShipping}
            size="fs25"
            color="gray.900"
            dataLocator="pdp_fast_shipping_icon"
          />
          <FastShippingTextContainer>
            <BodyCopy
              dataLocator="pdp_free_shipping_label"
              fontFamily="secondary"
              fontSize="fs16"
              fontWeight="semibold"
              color="gray.900"
              text={labels.lbl_Product_pickup_FREE_SHIPPING}
            />
            <BodyCopy
              dataLocator="pdp_free_shipping_label"
              fontFamily="secondary"
              fontSize="fs12"
              fontWeight="regular"
              color="gray.900"
              text={labels.lbl_Product_pickup_NO_MIN_PURCHASE}
            />
          </FastShippingTextContainer>
        </FastShippingContainer>
        <LineComp marginTop={16} borderColor="gray.1600" />
        <StoreContainer>
          <CustomIcon
            iconFontName={ICON_FONT_CLASS.Icomoon}
            name={ICON_NAME.markerIcon}
            size="fs24"
            color="gray.900"
            dataLocator="pdp_store_marker_icon"
          />
          <ColumnContainer margins="0 0 0 20px">
            <RowContainer>{this.renderPickupTitle()}</RowContainer>
            {showPickupInfo && this.renderPickupInfo()}
            {!showPickupInfo && this.renderPickupInfoError()}
          </ColumnContainer>
        </StoreContainer>
        <Button
          margin="12px 12px 0 12px"
          color="white"
          fill="BLACK"
          buttonVariation="variable-width"
          text={
            showPickupInfo
              ? labels.lbl_Product_pickup_PICKUP_IN_STORE
              : labels.lbl_Product_pickup_FIND_STORE
          }
          fontSize="fs12"
          fontWeight="extrabold"
          fontFamily="secondary"
          onPress={this.handlePickupModalClick}
          locator="pdp_pick_up_in_store_btn"
          disabled={isSubmitting}
        />
      </Container>
    );
  }
}

export default withStyles(ProductPickup, styles);
export { ProductPickup as ProductPickupVanilla };
