import React from 'react';
import { fromJS } from 'immutable';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';
import { PRODUCT_ADD_TO_BAG } from '@tcp/core/src/constants/reducer.constants';
import withStyles from '@tcp/core/src/components/common/hoc/withStyles';
import BodyCopy from '@tcp/core/src/components/common/atoms/BodyCopy';
import MiniBagSelect from '@tcp/web/src/components/features/CnC/MiniBag/molecules/MiniBagSelectBox/MiniBagSelectBox';
import { Row, Button, Image, Col } from '@tcp/core/src/components/common/atoms';
import { getIconPath } from '@tcp/core/src/utils';
import { CALL_TO_ACTION_VISIBLE, CONTROLS_VISIBLE } from '@tcp/core/src/constants/rum.constants';
import RenderPerf from '@tcp/web/src/components/common/molecules/RenderPerf';
import ProductPickupContainer from '@tcp/core/src/components/common/organisms/ProductPickup';
import { getMapSliceForColorProductId } from '@tcp/core/src/components/features/browse/ProductListing/molecules/ProductList/utils/productsCommonUtils';
import ProductColorChipsSelector from '../../ProductColorChipSelector';
import ProductSizeSelector from '../../ProductSizeSelector';
import AlternateSizes from '../molecules/AlternateSizes';
import styles, { giftCardDesignStyle } from '../styles/ProductAddToBag.style';
import SizeChart from '../molecules/SizeChart/container';

export const SIZE_CHART_LINK_POSITIONS = {
  AFTER_SIZE: 2,
  AFTER_QUANTITY: 3,
};

// to get Error Message displayed in case any error comes on Add To card
const ErrorComp = (errorMessage, showAddToBagCTA) => {
  return (
    <BodyCopy
      className={!showAddToBagCTA ? 'size-error' : 'default-error'}
      fontSize="fs12"
      component="div"
      fontFamily="secondary"
      fontWeight="regular"
      role="alert"
      aria-live="assertive"
    >
      <Image
        alt="Error"
        className="error-image"
        src={getIconPath('alert-triangle')}
        data-locator="productcustomizeform-error-icon"
      />
      <BodyCopy
        className="size-error-message"
        fontSize="fs12"
        component="div"
        fontFamily="secondary"
        fontWeight="regular"
      >
        {` ERROR: ${errorMessage}`}
      </BodyCopy>
    </BodyCopy>
  );
};

class ProductAddToBag extends React.PureComponent<Props> {
  getButtonLabel = () => {
    const { fromBagPage, plpLabels, keepAlive, outOfStockLabels = {} } = this.props;
    const { addToBag, update } = plpLabels;
    const addToBagLabel = fromBagPage ? update : addToBag;
    return keepAlive ? outOfStockLabels.outOfStockCaps : addToBagLabel;
  };

  renderOutfitButton = () => {
    const {
      currentProduct,
      currentProduct: { colorFitsSizesMap },
      selectedColorProductId,
      isOutfitPage,
      keepAlive,
    } = this.props;
    const currentColorEntry =
      getMapSliceForColorProductId(colorFitsSizesMap, selectedColorProductId) || {};
    return isOutfitPage ? (
      <div className="outfit-pickup">
        <ProductPickupContainer
          productInfo={currentProduct}
          formName={`ProductAddToBag-${currentProduct.generalProductId}`}
          miscInfo={currentColorEntry.miscInfo}
          isOutfitVariant
          keepAlive={keepAlive}
        />
      </div>
    ) : null;
  };

  renderColorList = (colorList, colorTitle) => {
    const {
      selectColor,
      isGiftCard,
      showColorChips,
      quickViewColorSwatchesCss,
      isPDP,
    } = this.props;
    return (
      showColorChips &&
      colorList &&
      colorList.size > 0 && (
        <div className="color-selector">
          <Field
            width={87}
            id="color"
            name="color"
            component={ProductColorChipsSelector}
            isGiftCard={isGiftCard}
            colorFitsSizesMap={colorList}
            onChange={selectColor}
            dataLocator="addnewaddress-state"
            title={`${colorTitle}:`}
            inheritedStyles={isGiftCard && isPDP ? giftCardDesignStyle : quickViewColorSwatchesCss}
          />
        </div>
      )
    );
  };

  renderFitList = (fitList, fitTitle) => {
    const { selectFit, keepAlive } = this.props;
    return (
      fitList &&
      fitList.size > 0 && (
        <div className="fit-selector">
          <Field
            width={69}
            id="fit"
            name="Fit"
            component={ProductSizeSelector}
            sizesMap={fitList}
            onChange={selectFit}
            dataLocator="addnewaddress-state"
            title={`${fitTitle}:`}
            keepAlive={keepAlive}
          />
        </div>
      )
    );
  };

  renderAlternateSizes = alternateSizes => {
    const { className, plpLabels } = this.props;
    const sizeAvailable = plpLabels && plpLabels.sizeAvailable ? plpLabels.sizeAvailable : '';
    const visibleAlternateSizes = alternateSizes && Object.keys(alternateSizes).length > 0;
    return (
      visibleAlternateSizes && (
        <AlternateSizes
          title={`${sizeAvailable}:`}
          buttonsList={alternateSizes}
          className={className}
        />
      )
    );
  };

  renderUnavailableLink = () => {
    const {
      currentProduct,
      currentProduct: { colorFitsSizesMap },
      plpLabels,
      onCloseClick,
      selectedColorProductId,
      keepAlive,
    } = this.props;
    const sizeUnavailable = plpLabels && plpLabels.sizeUnavalaible ? plpLabels.sizeUnavalaible : '';
    const currentColorEntry = getMapSliceForColorProductId(
      colorFitsSizesMap,
      selectedColorProductId
    );
    return (
      <ProductPickupContainer
        productInfo={currentProduct}
        formName={`ProductAddToBag-${currentProduct.generalProductId}`}
        isAnchor
        sizeUnavailable={sizeUnavailable}
        onPickupClickAddon={onCloseClick}
        miscInfo={currentColorEntry.miscInfo}
        keepAlive={keepAlive}
      />
    );
  };

  renderSizeList = (sizeList, colorFitSizeDisplayNames, errorMessage) => {
    const {
      sizeChartLinkVisibility,
      isErrorMessageDisplayed,
      selectSize,
      isDisableZeroInventoryEntries,
      keepAlive,
    } = this.props;
    return (
      sizeList &&
      sizeList.size > 0 && (
        <div className="size-selector">
          {sizeChartLinkVisibility === SIZE_CHART_LINK_POSITIONS.AFTER_SIZE && <SizeChart />}
          <Field
            width={49}
            className={isErrorMessageDisplayed ? 'size-field-error' : 'size-field'}
            id="size"
            name="Size"
            component={ProductSizeSelector}
            sizesMap={sizeList}
            onChange={selectSize}
            dataLocator="addnewaddress-state"
            title={`${colorFitSizeDisplayNames.size}:`}
            isDisableZeroInventoryEntries={isDisableZeroInventoryEntries}
            keepAlive={keepAlive}
          />
          {isErrorMessageDisplayed && ErrorComp(errorMessage)}
        </div>
      )
    );
  };

  renderQuantitySelector = () => {
    const { isFromBagProductSfl, quantityList } = this.props;
    return (
      !isFromBagProductSfl && (
        <div className="qty-selector">
          <Field
            width={32}
            id="quantity"
            name="Quantity"
            component={MiniBagSelect}
            options={quantityList}
            onChange={this.quantityChange}
            dataLocator="addnewaddress-state"
          />
        </div>
      )
    );
  };

  render() {
    const {
      plpLabels,
      className,
      fitChanged,
      quantityList,
      displayErrorMessage,
      displayATBErrorMessage,
      errorOnHandleSubmit,
      handleFormSubmit,
      showAddToBagCTA,
      alternateSizes,
      isPickup,
      isBundleProduct,
      isATBErrorMessageDisplayed,
      keepAlive,
      isFromBagProductSfl,
      quickViewPickup,
    } = this.props;

    let { sizeList, fitList, colorList, colorFitSizeDisplayNames } = this.props;
    colorFitSizeDisplayNames = {
      color: 'Color',
      fit: 'Fit',
      size: 'Size',
      ...colorFitSizeDisplayNames,
    };

    if (sizeList) {
      sizeList = fromJS(sizeList);
      fitList = fromJS(fitList);
    }

    colorList = fromJS(colorList);
    const { errorMessage, fit: fitTitle } = plpLabels;

    return (
      <form className={className} noValidate>
        <Row className="edit-form-css">
          <Col colSize={{ small: 12, medium: 12, large: 12 }}>
            <div className="select-value-wrapper">
              {this.renderColorList(colorList, colorFitSizeDisplayNames.color)}
              {this.renderFitList(fitList, fitTitle)}
              {this.renderSizeList(sizeList, colorFitSizeDisplayNames, errorMessage)}
              {!isPickup && this.renderAlternateSizes(alternateSizes)}
              {quickViewPickup && this.renderUnavailableLink()}
              {this.renderQuantitySelector(
                isFromBagProductSfl,
                MiniBagSelect,
                quantityList,
                this.quantityChange
              )}
            </div>
            <RenderPerf.Measure name={CONTROLS_VISIBLE} />
          </Col>
        </Row>
        {isATBErrorMessageDisplayed &&
          errorOnHandleSubmit &&
          ErrorComp(errorOnHandleSubmit, showAddToBagCTA)}
        {showAddToBagCTA && (
          <Row fullBleed className={`${errorOnHandleSubmit ? 'product-size-error' : ''}`}>
            <Col colSize={{ small: 12, medium: 12, large: 12 }} className="outfit-button-wrapper">
              <div className="button-wrapper">
                <Button
                  type="submit"
                  className="add-to-bag-button"
                  disabled={keepAlive}
                  onClick={e => {
                    e.preventDefault();
                    // eslint-disable-next-line sonarjs/no-all-duplicated-branches
                    if (fitChanged) {
                      displayErrorMessage(fitChanged);
                    } else {
                      displayATBErrorMessage(true);
                      handleFormSubmit();
                    }
                  }}
                >
                  {this.getButtonLabel()}
                </Button>
                <RenderPerf.Measure name={CALL_TO_ACTION_VISIBLE} />
              </div>
              {!isBundleProduct && this.renderOutfitButton()}
            </Col>
            <Col
              colSize={{ small: 12, medium: 12, large: 12 }}
              className="outfit-button-wrapper-desktop"
            >
              {!isBundleProduct && this.renderOutfitButton()}
              <div className="button-wrapper">
                <Button
                  type="submit"
                  className="add-to-bag-button"
                  disabled={keepAlive}
                  // eslint-disable-next-line sonarjs/no-identical-functions
                  onClick={e => {
                    e.preventDefault();
                    // eslint-disable-next-line sonarjs/no-all-duplicated-branches
                    if (fitChanged) {
                      displayErrorMessage(fitChanged);
                    } else {
                      displayATBErrorMessage(true);
                      handleFormSubmit();
                    }
                  }}
                >
                  {this.getButtonLabel()}
                </Button>
                <RenderPerf.Measure name={CALL_TO_ACTION_VISIBLE} />
              </div>
            </Col>
          </Row>
        )}
      </form>
    );
  }
}

export default compose(
  connect((state, props) => {
    const formName = props.customFormName || PRODUCT_ADD_TO_BAG;
    return {
      form: `${formName}-${props.generalProductId}`,
      enableReinitialize: true,
    };
  }),
  reduxForm()
)(withStyles(ProductAddToBag, styles));

export { ProductAddToBag as ProductAddToBagVanilla };
