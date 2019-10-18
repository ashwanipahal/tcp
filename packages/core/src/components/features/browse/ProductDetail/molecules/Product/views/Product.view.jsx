/* eslint-disable */
import React from 'react';
import PropTypes from 'prop-types';
import ProductCustomizeReduxForm from '../../ProductCustomizeForm/ProductCustomizeForm';
import ProductPrice from '../../ProductPrice/ProductPrice';
import ProductBasicInfo from '../../ProductBasicInfo/ProductBasicInfo';
import {
  getPrices,
  getPricesWithRange,
  getMapSliceForColorProductId,
} from '../../../../ProductListing/molecules/ProductList/utils/productsCommonUtils';
import RenderPerf from '@tcp/web/src/components/common/molecules/RenderPerf';
import { PRICING_VISIBLE } from '@tcp/core/src/constants/rum.constants';

class Product extends React.Component {
  // static propTypes = {
  //   /** Whether to render for mobile. */
  //   isMobile: PropTypes.bool,

  //   /** Whether to show the spinner or not */
  //   isInventoryLoaded: PropTypes.bool,

  //   /**
  //    *  Describes a general product, not yet specialized by chosing a color, size, etc.
  //    *  For example, a product shown in reccomendations, or PDP.
  //    */
  //   productInfo: PRODUCT_INFO_PROP_TYPE_SHAPE.isRequired,

  //   /* The session currency symbol */
  //   currencySymbol: PropTypes.string.isRequired,
  //   priceCurrency: PropTypes.string.isRequired,

  //   /** callback for change in the selected color (accepts: colorProductId) and returns a promise */
  //   onColorChange: PropTypes.func.isRequired,

  //   /** Id of the product color to show */
  //   colorProductId: PropTypes.string.isRequired,

  //   /** Callback for adding an item to bag. Accepts two params: productInfo, formData.
  //    * The productInfo is like the prop of this object, and form data contains the keys: color, fit, size, quantity.
  //    */
  //   onAddItemToBag: PropTypes.func.isRequired,
  //   /** Callback for acknowledging a successfull adding to bag. Accepts two params: productInfo, formData.
  //    * The productInfo is like the prop of this object, and form data contains the keys: color, fit, size, quantity.
  //    */
  //   onAddItemToBagSuccess: PropTypes.func.isRequired,

  //   /**
  //    * Method for triggering the Bopis quick view modal
  //    */
  //   onPickUpOpenClick: PropTypes.func,

  //   isCanada: PropTypes.bool.isRequired,
  //   isHasPlcc: PropTypes.bool.isRequired,
  //   currencyExchange: PropTypes.string,
  //   outfits: PropTypes.arrayOf(PropTypes.shape({})),

  //   /** Flag that tells the page if it should render the onModal images*/
  //   shouldDisplayOnModal: PropTypes.bool.isRequired,
  //   /* We are available to know if is an international shipping */
  //   isInternationalShipping: PropTypes.bool,
  //   isShowVideoOnPdp: PropTypes.bool
  // }

  constructor(props) {
    super(props);
    // let initialValues = this.getInitialAddToBagFormValues(this.props);
    /**
     * PLEASE NOTE THE DIFFERENCE BETWEEN initialAddToBagFormValues AND addToBagFormValues
     *
     * initialAddToBagFormValues:
     * Used by ProductCustomizeForm
     * We only need to pass the values in once when the inventory has loaded
     *
     * addToBagFormValues:
     * Used by ProductBasicInfo
     * We need to pass the values in every time the fit/size is updated in the form to make sure the FavoriteButton has the correct SKU value (DT-31913)
     */
    // this.state = {
    //   initialAddToBagFormValues: initialValues,
    //   addToBagFormValues: initialValues,
    //   isSelectedSizeDisabled:false,
    //   showDefaultSizeMsg: false,
    // };

    // this.handleAddToBagFormChange = this.handleAddToBagFormChange.bind(this);
    // this.handleAddItemToBag = (formData) => this.props.onAddItemToBag(this.props.productInfo, formData);
    // this.handleImagesColorChange = this.handleImagesColorChange.bind(this);
  }
  componentWillMount() {
    // const {isShowDefaultSize} = this.props;
    // this.defaultSizesSet(isShowDefaultSize);
  }
  componentWillReceiveProps(nextProps) {
    // if(this.props.isShowDefaultSize !== nextProps.isShowDefaultSize){
    //   this.defaultSizesSet(nextProps.isShowDefaultSize);
    // }
  }

  //eslint-disable-next-line class-methods-use-this
  getInitialValues(item) {
    return {
      color: item.get(['colorFitsSizesMap', 0, 'color']),
      fit: '',
      size: '',
      quantity: 1,
    };
    // let colorFitsSizesMapEntry = getMapSliceForColorProductId(props.productInfo.colorFitsSizesMap, props.productInfo.generalProductId);

    // return {
    //   color: colorFitsSizesMapEntry.color.name,
    //   fit: colorFitsSizesMapEntry.hasFits ? getDefaultFitForColorSlice(colorFitsSizesMapEntry).fitName : null,
    //   size: props.productInfo.isGiftCard
    //     ? props.productInfo.colorFitsSizesMap[0].fits[0].sizes[0].sizeName      // on gift card we need something selected, otherwise no price would show up
    //     : getDefaultSizeForProduct(props.productInfo.colorFitsSizesMap),
    //   quantity: 1
    // };
  }

  getProductCustomizeFormName() {
    // return 'AddToBagForm-' + this.props.productInfo.generalProductId;
  }

  /**
   * @method handleFindInStoreOnKeyPress
   * handle find in store modal triggering when Enter key pressed.
   */
  handleFindInStoreOnKeyPress = event => {
    // const {
    //   productInfo,
    //   colorProductId
    // } = this.props;
    // const colorProduct = getMapSliceForColorProductId(productInfo.colorFitsSizesMap, colorProductId);
    // return handleGenericKeyDown(event, config.KEY_CODES.ENTER, () => { this.handlePickupModalClick(colorProduct)});
  };

  defaultSizesSet(isShowDefaultSize) {
    // const {productInfo} = this.props;
    // let initialValues = this.getInitialAddToBagFormValues(this.props);
    // initialValues = getDefaultSizes(initialValues, productInfo, isShowDefaultSize);
    // this.setState({
    //   addToBagFormValues: initialValues.formValues,
    //   initialAddToBagFormValues: initialValues.formValues,
    //   showDefaultSizeMsg: initialValues.showDefaultSizeMsg
    // });
  }
  /**
   * DT-31913
   * Update addToBagFormValues whenever the ProductCustomizeForm changes to make sure we pass the correct SKU value to ProductBasicInfo/FavoriteButton
   * NOTE: Not great for performance reasons because it triggers re-renders
   */
  handleAddToBagFormChange(formData) {
    // const { productInfo } = this.props;
    // // eslint-disable-next-line
    // formData.fit = checkAndGetDefaultFitName(formData.fit, formData.color, productInfo.colorFitsSizesMap);
    // this.setState({ addToBagFormValues: formData });
    // this.setState({isSelectedSizeDisabled: checkIsSelectedSizeDisabled(productInfo, formData)});
  }

  handleImagesColorChange(colorName) {
    // let {onColorChange, productInfo} = this.props;
    // return onColorChange(getMapSliceForColor(productInfo.colorFitsSizesMap, colorName).colorProductId);
  }

  /**
   * @method handlePickupModalClick
   * @desc wrapper method to open pickup modal
   * @param {object} colorProduct - contains details of a particular variant
   */
  handlePickupModalClick(colorProduct) {
    // const {
    //   productInfo,
    //   onPickUpOpenClick,
    //   itemValues,
    //   isBopisClearanceProductEnabled,
    //   isBopisEnabled,
    //   isBossClearanceProductEnabled,
    //   isBossEnabled,
    // } = this.props;
    // const {
    //   miscInfo,
    //   colorProductId,
    // } = colorProduct;
    // const {
    //   generalProductId,
    // } = productInfo;
    // const isBopisEligible = validateBopisEligibility({
    //   isBopisClearanceProductEnabled,
    //   isBopisEnabled,
    //   miscInfo,
    // });
    // const isBossEligible = validateBossEligibility({
    //   isBossClearanceProductEnabled,
    //   isBossEnabled,
    //   miscInfo,
    // });
    // return onPickUpOpenClick(
    //   generalProductId,
    //   itemValues,
    //   colorProductId,
    //   generalProductId,
    //   isBopisEligible,
    //   isBossEligible,
    // );
  }

  render() {
    const {
      productDetails,
      colorProductId,
      currencySymbol,
      priceCurrency,
      currencyExchange,
      isCanada,
      isHasPlcc,
      isInternationalShipping,
      isKeepAlive,
      isMatchingFamily,
      selectedColorProductId,
      isGiftCard,
    } = this.props;
    const productInfo = productDetails.get('currentProduct');
    if (!productInfo) {
      return <div />; // TODO - maybe add loader later
    }
    const { promotionalMessage, promotionalPLCCMessage } = productInfo;
    const colorProduct =
      productInfo &&
      getMapSliceForColorProductId(productInfo.colorFitsSizesMap, selectedColorProductId);
    const prices = productInfo && getPrices(productInfo, colorProduct.color.name);
    const badges = colorProduct.miscInfo.badge1;
    const badge1 = isMatchingFamily && badges.matchBadge ? badges.matchBadge : badges.defaultBadge;
    // if(isShowPriceRange) {
    //   const { fit, size } = addToBagFormValues;
    //   prices = getPricesWithRange(productInfo, colorProduct.color.name, fit, size, isSelectedSizeDisabled);
    // }

    return (
      <div>
        <ProductBasicInfo
          keepAlive={isKeepAlive}
          badge={badge1}
          isGiftCard={isGiftCard}
          productInfo={productInfo}
          // {...addToBagFormValues}
          isShowFavoriteCount
          currencySymbol={currencySymbol}
          priceCurrency={priceCurrency}
          currencyExchange={currencyExchange}
          isRatingsVisible
          isCanada={isCanada}
          isPlcc={isHasPlcc}
          isInternationalShipping={isInternationalShipping}
          // TODO - Since the product price range is dependent on the SKU, it can be shown only after the SKU form is added
          // isShowPriceRange={isShowPriceRange}
          // isSelectedSizeDisabled={isSelectedSizeDisabled}
        />
        {!isGiftCard ? (
          <>
            <ProductPrice
              currencySymbol={currencySymbol}
              priceCurrency={priceCurrency}
              currencyExchange={currencyExchange}
              isItemPartNumberVisible={false}
              itemPartNumber={colorProduct.colorDisplayId}
              {...prices}
              promotionalMessage={promotionalMessage}
              isCanada={isCanada}
              promotionalPLCCMessage={promotionalPLCCMessage}
              isPlcc={isHasPlcc}
              isInternationalShipping={isInternationalShipping}
            />
            <RenderPerf.Measure name={PRICING_VISIBLE} />
          </>
        ) : null}
      </div>
    );
    // let {isMobile, isInventoryLoaded, productInfo, colorProductId, currencySymbol, handleChooseOption,
    //   isBopisClearanceProductEnabled, isBopisEnabled, isBossClearanceProductEnabled, isBossEnabled,
    //   currencyExchange, outfits, onColorChange, onAddItemToBagSuccess, alternateSizes,
    //   priceCurrency, shouldDisplayOnModal,isCanada, isHasPlcc, onPickUpOpenClick, isShowPickupModal,
    //   isInternationalShipping, isShowVideoOnPdp, isShowPriceRangeABtest, isShowPriceRangeKillSwitch,
    //   isShowAlternateSizesPDP, isMatchingFamily, children, killSwitchKeepAliveProduct,
    // } = this.props;

    // const isShowPriceRange = isShowPriceRangeKillSwitch && isShowPriceRangeABtest;

    // let {addToBagFormValues, initialAddToBagFormValues, isSelectedSizeDisabled, showDefaultSizeMsg} = this.state;
    // let {isGiftCard, promotionalMessage, promotionalPLCCMessage} = productInfo;
    // let productCustomizeFormName = this.getProductCustomizeFormName();
    // let colorProduct = getMapSliceForColorProductId(productInfo.colorFitsSizesMap, colorProductId);
    // const videoUrl = colorProduct.miscInfo.videoUrl && colorProduct.miscInfo.videoUrl.length > 1 && colorProduct.miscInfo.videoUrl[1] || '';
    // const badges = colorProduct.miscInfo.badge1;
    // const badge1 = isMatchingFamily && badges.matchBadge ? badges.matchBadge : badges.defaultBadge;
    // const {
    //   miscInfo,
    // } = colorProduct;
    // const isKeepAlive = miscInfo.keepAlive && killSwitchKeepAliveProduct;
    // let productBasicInfoElem = <ProductBasicInfo isMobile={isMobile} keepAlive={isKeepAlive} badge={badge1} productInfo={productInfo} {...addToBagFormValues}
    //   isShowFavoriteCount currencySymbol={currencySymbol} priceCurrency={priceCurrency} currencyExchange={currencyExchange} isPriceVisible={!isMobile} isRatingsVisible isCanada={isCanada} isPlcc={isHasPlcc}
    //   isInternationalShipping={isInternationalShipping} isShowPriceRange={isShowPriceRange} isSelectedSizeDisabled={isSelectedSizeDisabled} />;

    // let prices = getPrices(productInfo, colorProduct.color.name);
    // if(isShowPriceRange){
    //   const { fit, size } = addToBagFormValues;
    //   prices = getPricesWithRange(productInfo, colorProduct.color.name, fit, size, isSelectedSizeDisabled);
    // }
    // let imagesToDisplay = getImagesToDisplay({
    //   imagesByColor: productInfo.imagesByColor,
    //   curentColorEntry: colorProduct,
    //   isAbTestActive: shouldDisplayOnModal,
    //   isFullSet: true
    // });
    // const isBopisEligible = validateBopisEligibility({
    //   isBopisClearanceProductEnabled,
    //   isBopisEnabled,
    //   miscInfo,
    // });
    // const isBossEligible = validateBossEligibility({
    //   isBossClearanceProductEnabled,
    //   isBossEnabled,
    //   miscInfo,
    // });
    // const sizeUnavailableLink = (isBopisEligible || isBossEligible) && <p className="size-unavailable">Size unavailable online? <span role="link" tabIndex="0" onClick={() => { this.handlePickupModalClick(colorProduct); }} onKeyDown={this.handleFindInStoreOnKeyPress}>Find in Store</span></p>;
    // const prodNameAltImages = productInfo.long_product_title || productInfo.name;
    // const submitButtonTexts = isKeepAlive ? 'Out Of Stock' : 'Choose Items Below';
    // const buttonClassName = cssClassName('button-choose-options', { ' button-add-to-bag-oos': isKeepAlive });

    // return (
    //   <div className={`product-details-content ${isShowPriceRange ? 'price-range' : ''}`} itemScope itemType="https://schema.org/Product">
    //   {/* TODO: review the following component for mobile */}
    //     {isMobile && productBasicInfoElem}

    //     {/* TODO: stop passing isEnabledSocialMedia and start passing SocialMediaLinks as child component */}
    //     {!!imagesToDisplay.length && <ProductImages keepAlive={isKeepAlive} isMobile={isMobile} isEnabledSocialMedia={(!isMobile && !isGiftCard) || isMobile}
    //       isFullSizeVisible={!isMobile && !isGiftCard} isZoomEnabled={!isGiftCard && !isMobile}
    //       images={imagesToDisplay} videoUrl={videoUrl}
    //       colorFormName={productCustomizeFormName} colorFieldName={COLOR_FIELD_NAME} onColorChange={this.handleImagesColorChange}
    //       isThumbnailListVisible={!isGiftCard} productName={prodNameAltImages} outfits={outfits} isShowVideoOnPdp={isShowVideoOnPdp} productDescription={children} />}

    //     {/* TODO: review the following for mobile */}

    //     {isMobile && (
    //       <ProductPrice currencySymbol={currencySymbol} priceCurrency={priceCurrency} currencyExchange={currencyExchange} isItemPartNumberVisible={false}
    //         itemPartNumber={colorProduct.colorDisplayId} {...prices} promotionalMessage={promotionalMessage} isCanada={isCanada} promotionalPLCCMessage={promotionalPLCCMessage} isPlcc={isHasPlcc}
    //         isInternationalShipping={isInternationalShipping} />
    //     )}

    //     <div className="custom-imformation-container">
    //       {!isMobile && productBasicInfoElem}

    //       <ContentSlot contentSlotName="pdp_global_promo_pricing" className="product-details-header-promo-text-area" />

    //       {!isInventoryLoaded
    //         ? <Spinner />
    //         : <ProductCustomizeForm isShowAltMaxQtyError initialValues={initialAddToBagFormValues} colorFitSizeDisplayNames={productInfo.colorFitSizeDisplayNames}
    //             isSizeChartVisible={!isGiftCard} colorFitsSizesMap={productInfo.colorFitsSizesMap} form={productCustomizeFormName}
    //           onSubmit={this.handleAddItemToBag} onSubmitSuccess={onAddItemToBagSuccess} onColorChange={onColorChange} onChange={this.handleAddToBagFormChange} alternateSizes={alternateSizes}
    //           productInfo={productInfo} showError isSelectFieldVisible sizeUnavailableLink={sizeUnavailableLink} {...addToBagFormValues} currencyExchange={currencyExchange} currencySymbol={currencySymbol}
    //           isShowPriceRange={isShowPriceRange} isSelectedSizeDisabled={isSelectedSizeDisabled} isShowAlternateSizesPDP={isShowAlternateSizesPDP} showDefaultSizeMsg={showDefaultSizeMsg} keepAlive={isKeepAlive}
    //           />
    //       }
    //       {!isGiftCard && (
    //         <ProductPickupContainer productInfo={productInfo} formName={productCustomizeFormName}
    //           miscInfo={colorProduct.miscInfo} onPickUpOpenClick={onPickUpOpenClick} />
    //       )}
    //       {!isInternationalShipping && <ContentSlot contentSlotName="pdp_loyalty_content" className="product-marketing-espot analytics-pdp" />}
    //       {isGiftCard && <p className="sending-giftcard">Prefer sending via email?<a href="https://thechildrensplace.thegiftcardshop.com/occasions.html?&delivery=digital&cardtype=giftcard&extratype=animation">Send an E-Gift Card</a></p>}

    //       {<ContentSlot contentSlotName="pdp_global_promo_add_to_bag" className="product-details-header-promo-text-area" />}
    //       {isShowPickupModal && <PickUpStoreModalContainer isShowAddItemSuccessNotification autoSkipStep1 />}
    //     </div>
    //   </div>
    // );
  }
}

export default Product;
