/* eslint-disable max-lines */
import React from 'react';
import { change } from 'redux-form';
import { connect } from 'react-redux';
import ProductAddToBag from '../views/ProductAddToBag.view';
import {
  getPageName,
  getPageSection,
  getPageSubSection,
} from '../../../organisms/PickupStoreModal/molecules/PickupStoreSelectionForm/container/PickupStoreSelectionForm.selectors';

/**
 * This class is a container of Product Add to bag view
 *
 * @class ProductAddToBagContainer
 * @extends {React.PureComponent<Props>}
 */
class ProductAddToBagContainer extends React.PureComponent<Props> {
  constructor(props) {
    super(props);
    const { currentProduct, selectedColorProductId } = props;
    this.initialValuesForm = this.getInitialValues(currentProduct, selectedColorProductId);
    this.displayATBErrorMessage = this.displayATBErrorMessage.bind(this);
    this.state = {
      selectedColor: this.initialValuesForm && this.initialValuesForm.color,
      selectedFit: this.initialValuesForm && this.initialValuesForm.Fit,
      selectedSize: this.initialValuesForm && this.initialValuesForm.Size,
      selectedQuantity: this.initialValuesForm && this.initialValuesForm.Quantity,
      isErrorMessageDisplayed: false,
      isATBErrorMessageDisplayed: true,
      fitChanged: true,
      persistSelectedFit: '',
      keepAlive:
        this.initialColorFitsSizesMapEntry &&
        this.initialColorFitsSizesMapEntry.miscInfo &&
        this.initialColorFitsSizesMapEntry.miscInfo.keepAlive,
    };
  }

  /* eslint-disable-next-line */
  UNSAFE_componentWillReceiveProps(nextProps) {
    const { currentProduct, selectedColorProductId, productInfoFromBag } = nextProps;
    const {
      currentProduct: prevCurrentProduct,
      selectedColorProductId: prevSelectedColorProductId,
      productInfoFromBag: prevProductInfoFromBag,
    } = this.props;

    if (
      (currentProduct && currentProduct !== prevCurrentProduct) ||
      selectedColorProductId !== prevSelectedColorProductId
    ) {
      // update selected color once map is received from api
      this.setState(
        this.getStateValuesFromProps(currentProduct, selectedColorProductId, nextProps)
      );
    }
    if (productInfoFromBag && productInfoFromBag !== prevProductInfoFromBag) {
      this.setState({
        selectedColor: { name: productInfoFromBag.selectedColor },
        selectedFit: { name: productInfoFromBag.selectedFit },
        selectedSize: { name: productInfoFromBag.selectedSize },
        selectedQuantity: productInfoFromBag.selectedQty,
      });
    }
  }

  getStateValuesFromProps = (currentProduct, selectedColorProductId, nextProps) => {
    this.initialValuesForm = this.getInitialValues(
      currentProduct,
      selectedColorProductId,
      nextProps
    );
    return {
      selectedColor: this.initialValuesForm && this.initialValuesForm.color,
      selectedFit: this.initialValuesForm && this.initialValuesForm.Fit,
      selectedSize: this.initialValuesForm && this.initialValuesForm.Size,
      selectedQuantity: this.initialValuesForm && this.initialValuesForm.Quantity,
      persistSelectedFit: this.initialValuesForm && this.initialValuesForm.Fit,
    };
  };

  /**
   * @function getDefaultColor
   * @returns default color at 0 index in color array.
   *
   * @memberof ProductAddToBagContainer
   */
  getInitialValues = (currentProduct, selectedColorProductId, nextProps) => {
    const { colorFitsSizesMap } = currentProduct;
    return (
      colorFitsSizesMap && this.defaultSizesSet(currentProduct, selectedColorProductId, nextProps)
    );
  };

  defaultSizesSet = (currentProduct, selectedColorProductId, nextProps) => {
    if (currentProduct) {
      return this.getInitialAddToBagFormValues(currentProduct, selectedColorProductId, nextProps);
    }

    return null;
  };

  getMapSliceForColorProductId = (colorFitsSizesMap, colorProductId, selectedColorProductId) => {
    const colorIdToMatch = selectedColorProductId || colorProductId;
    const selectedProduct = colorFitsSizesMap.find(
      entry => entry.colorProductId === colorIdToMatch || entry.colorDisplayId === colorIdToMatch
    );
    return selectedProduct || (colorFitsSizesMap.length > 0 ? colorFitsSizesMap[0] : null);
  };

  getDefaultFitForColorSlice = (colorFitsSizesMapEntry, ignoreQtyCheck = false) => {
    return (
      colorFitsSizesMapEntry.fits.find(
        fit => !ignoreQtyCheck && fit.isDefault && fit.maxAvailable > 0
      ) ||
      colorFitsSizesMapEntry.fits.find(fit => !ignoreQtyCheck && fit.maxAvailable > 0) ||
      colorFitsSizesMapEntry.fits[0]
    );
  };

  getDefaultSizeForProduct = (colorFitsSizesMap, initialFormValues) => {
    const firstSizeName = colorFitsSizesMap[0]
      ? colorFitsSizesMap[0].fits[0].sizes[0].sizeName
      : '';

    if (initialFormValues) {
      return initialFormValues.Size;
    }

    // eslint-disable-next-line no-restricted-syntax
    for (const colorEnrtry of colorFitsSizesMap) {
      if (
        colorEnrtry.fits.length > 1 ||
        colorEnrtry.fits[0].sizes.length > 1 ||
        colorEnrtry.fits[0].sizes[0].sizeName !== firstSizeName
      ) {
        return '';
      }
    }

    return firstSizeName;
  };

  getColor = colorFitsSizesMapEntry => {
    return (
      colorFitsSizesMapEntry && colorFitsSizesMapEntry.color && colorFitsSizesMapEntry.color.name
    );
  };

  // eslint-disable-next-line complexity
  getInitialAddToBagFormValues = (currentProduct, selectedColorProductId, nextProps) => {
    const colorFitsSizesMapEntry = currentProduct
      ? this.getMapSliceForColorProductId(
          currentProduct.colorFitsSizesMap,
          currentProduct.generalProductId,
          selectedColorProductId
        )
      : {};
    this.initialColorFitsSizesMapEntry = colorFitsSizesMapEntry;
    let { initialFormValues } = nextProps && nextProps.renderReceiveProps ? nextProps : this.props;

    const { fromBagPage, isFavoriteEdit } = this.props;

    if (fromBagPage || isFavoriteEdit) {
      const { productInfoFromBag } = this.props;
      initialFormValues = {
        color: productInfoFromBag.selectedColor,
        Size: productInfoFromBag.selectedSize,
        Fit: productInfoFromBag.selectedFit,
        Quantity: productInfoFromBag.selectedQty,
      };
    }

    return {
      color: {
        name: this.getColor(colorFitsSizesMapEntry),
      },
      Fit:
        colorFitsSizesMapEntry && colorFitsSizesMapEntry.hasFits
          ? {
              name: !initialFormValues
                ? this.getDefaultFitForColorSlice(colorFitsSizesMapEntry).fitName
                : initialFormValues.Fit,
            }
          : null,
      Size: {
        name: currentProduct.isGiftCard
          ? currentProduct.colorFitsSizesMap[0].fits[0].sizes[0].sizeName // on gift card we need something selected, otherwise no price would show up
          : this.getDefaultSizeForProduct(currentProduct.colorFitsSizesMap, initialFormValues),
      },
      Quantity: !initialFormValues ? 1 : initialFormValues.Quantity,
    };
  };

  updateSelectedSize = () => {
    const {
      currentProduct: { colorFitsSizesMap },
    } = this.props;
    const sizeList = this.getSizeList(colorFitsSizesMap);
    if (sizeList.length === 1) {
      this.setState({
        selectedSize: {
          name: sizeList[0].displayName,
        },
      });
    }
  };

  fitChange = e => {
    const { persistSelectedFit } = this.state;
    if (persistSelectedFit !== e) {
      this.setState(
        {
          selectedFit: {
            name: e,
          },
          fitChanged: true,
          isErrorMessageDisplayed: false,
          isATBErrorMessageDisplayed: false,
        },
        this.updateSelectedSize
      );
    } else {
      this.setState(
        {
          selectedFit: {
            name: e,
          },
          fitChanged: false,
          isErrorMessageDisplayed: false,
          isATBErrorMessageDisplayed: false,
        },
        this.updateSelectedSize
      );
    }
  };

  colorChange = (e, colorIndex) => {
    const { selectedSize, selectedFit, selectedQuantity } = this.state;
    const {
      onChangeColor,
      currentProduct: { colorFitsSizesMap },
    } = this.props;
    const selectedColor = this.getSelectedColorData(colorFitsSizesMap, e);
    this.setState({
      selectedColor: { name: e },
      selectedSize,
      isErrorMessageDisplayed: false,
      isATBErrorMessageDisplayed: false,
      fitChanged: selectedSize.name === '',
      keepAlive: selectedColor && selectedColor[0] && selectedColor[0].miscInfo.keepAlive,
    });
    // props for any custom action to call
    if (onChangeColor) {
      onChangeColor(
        e,
        selectedSize && selectedSize.name,
        selectedFit && selectedFit.name,
        selectedQuantity,
        colorIndex
      );
    }
  };

  /**
   * @function getSizeList
   * @returns size list for selected fit
   *
   * @memberof ProductAddToBagContainer
   */
  getSizeList = colorFitsSizesMap => {
    const { selectedColor, selectedFit } = this.state;
    const selectedColorElement = this.getSelectedColorData(colorFitsSizesMap, selectedColor);
    const hasFits =
      selectedColorElement && selectedColorElement.length > 0 && selectedColorElement[0].hasFits;
    return (
      selectedColorElement &&
      selectedColorElement.length > 0 &&
      (hasFits
        ? this.getSizeOptions(selectedColorElement[0], selectedFit)
        : this.getSizeOptions(selectedColorElement[0]))
    );
  };

  getSizeOptions = (colorItem, selectedFit?) => {
    const { fits } = colorItem;
    let sizeOptions = [];
    if (colorItem && fits && fits.length) {
      fits.forEach(fit => {
        if (selectedFit) {
          if (fit.fitName === selectedFit.name) {
            sizeOptions = fit.sizes.map(size => ({
              displayName: size.sizeName,
              id: size.sizeName,
              maxAvailable: size.maxAvailable,
              disabled: size.maxAvailable <= 0,
            }));
          }
        } else {
          // eslint-disable-next-line sonarjs/no-identical-functions
          sizeOptions = fit.sizes.map(size => ({
            displayName: size.sizeName,
            id: size.sizeName,
            maxAvailable: size.maxAvailable,
            disabled: size.maxAvailable <= 0,
          }));
        }
      });
    }

    this.getErrorCheck(sizeOptions, selectedFit);
    return sizeOptions;
  };

  getErrorCheck = (sizeOptions, selectedFit) => {
    const { selectedSize } = this.state;

    const option = this.getOptionArray(sizeOptions);

    const fitOption = this.getFitOptionsArray(selectedFit, selectedSize, sizeOptions);

    this.setErrorState(fitOption);

    if (
      option &&
      option.length > 0 &&
      selectedSize &&
      option[0].displayName === selectedSize.name
    ) {
      this.setState({
        fitChanged: true,
      });
    } else if (selectedSize.name && !selectedFit) {
      this.setState({
        fitChanged: false,
      });
      this.displayErrorMessage(false);
    }
  };

  getOptionArray = sizeOptions =>
    sizeOptions.length > 0 && sizeOptions.filter(item => item.maxAvailable <= 0);

  getFitOptionsArray = (selectedFit, selectedSize, sizeOptions) =>
    selectedFit &&
    selectedSize.name &&
    sizeOptions.length > 0 &&
    sizeOptions.filter(item => item.displayName === selectedSize.name);

  setErrorState = fitOption => {
    if (fitOption && fitOption.length === 0) {
      this.setState({
        fitChanged: true,
      });
    } else if (fitOption && fitOption.length === 1) {
      this.setState({
        fitChanged: false,
      });
    }
  };

  displayErrorMessage = displayError => {
    this.setState({
      isErrorMessageDisplayed: displayError,
    });
  };

  displayATBErrorMessage = displayError => {
    this.setState({
      isATBErrorMessageDisplayed: displayError,
    });
  };

  /**
   * @function getQuantityList
   * @returns quantity list with labels and values to render dropdown
   *
   * @memberof ProductAddToBagContainer
   */
  getQuantityList = () => {
    const quantityArray = new Array(15).fill(1);
    return quantityArray.map((val, index) => ({
      displayName: index + 1,
      id: index + 1,
    }));
  };

  getSelectedColorData = (colorFitsSizesMap, selectedColor = {}) => {
    return (
      colorFitsSizesMap &&
      colorFitsSizesMap.filter(colorItem => {
        const {
          color: { name },
        } = colorItem;
        return (selectedColor.name || selectedColor) === name;
      })
    );
  };

  getFitOptions = (colorFitsSizesMap, selectedColor) => {
    const colorItem = this.getSelectedColorData(colorFitsSizesMap, selectedColor);
    const { fits, hasFits } = (colorItem && colorItem[0]) || {};

    return (
      (fits &&
        hasFits &&
        fits.map(fit => ({
          displayName: fit.fitName,
          id: fit.fitName,
        }))) ||
      []
    );
  };

  sizeChange = e => {
    const { selectedColor, selectedFit, selectedQuantity } = this.state;
    const { onChangeSize } = this.props;
    this.setState({
      persistSelectedFit: selectedFit,
      selectedSize: { name: e },
      fitChanged: false,
      isATBErrorMessageDisplayed: false,
    });
    if (e !== 'Select') {
      this.displayErrorMessage(false);
    }
    if (onChangeSize) {
      onChangeSize(
        selectedColor && selectedColor.name,
        e,
        selectedFit && selectedFit.name,
        selectedQuantity
      );
    }
  };

  quantityChange = (selectedQuantity, form) => {
    this.setState({ selectedQuantity });
    const { dispatch } = this.props;
    dispatch(change(form, 'Quantity', selectedQuantity));
  };

  setPreSelectedValuesForProduct = productInfoFromBag => {
    const { selectedFit, selectedQty, selectedSize, selectedColor } = productInfoFromBag;
    this.initialValuesForm.Fit = selectedFit;
    this.initialValuesForm.Quantity = selectedQty || 1;
    this.initialValuesForm.Size = selectedSize;
    this.initialValuesForm.color = selectedColor;
  };

  quickViewPickup = () => {
    const { isPickup, isMultiItemQVModal, isBundleProduct, isFavoriteEdit } = this.props;
    const isQuickViewPickup = !isPickup && !isBundleProduct && !isMultiItemQVModal;
    if (isFavoriteEdit) {
      return isFavoriteEdit && !isFavoriteEdit;
    }
    return isQuickViewPickup;
  };

  /**
   * @function render
   *
   * @returns ProductAddToBag view
   * @memberof ProductAddToBagContainer
   */
  render() {
    const {
      currentProduct,
      currentProduct: { colorFitsSizesMap, colorFitSizeDisplayNames, isGiftCard },
      plpLabels,
      handleFormSubmit,
      errorOnHandleSubmit,
      selectedColorProductId,
      customFormName,
      showAddToBagCTA = true,
      showColorChips = true,
      fromBagPage,
      productInfoFromBag,
      customSubmitButtonStyle,
      colorFitsSizesMap: favColorFitsSizesMap,
      isOutfitPage,
      formRef,
      formEnabled,
      quickViewColorSwatchesCss,
      isPDP,
      isDisableZeroInventoryEntries,
      alternateSizes,
      sizeChartLinkVisibility,
      navigation,
      isPickup,
      onCloseClick,
      isBundleProduct,
      outOfStockLabels,
      isKeepAliveEnabled,
      isFavoriteEdit,
      sizeChartDetails,
      isMultiItemQVModal,
      pageNameProp,
      pageSectionProp,
      pageSubSectionProp,
      ...otherProps
    } = this.props;
    const {
      selectedColor,
      selectedFit,
      selectedSize,
      fitChanged,
      isErrorMessageDisplayed,
      isATBErrorMessageDisplayed,
      selectedQuantity,
      keepAlive,
    } = this.state;
    if (fromBagPage) {
      this.setPreSelectedValuesForProduct(productInfoFromBag);
    }

    const productColorFitsSizesMap = colorFitsSizesMap || favColorFitsSizesMap;

    const initialValues = this.initialValuesForm;
    const generalProductId = currentProduct && currentProduct.generalProductId;

    return (
      <ProductAddToBag
        {...otherProps}
        colorList={productColorFitsSizesMap}
        fitList={this.getFitOptions(productColorFitsSizesMap, selectedColor)}
        sizeList={this.getSizeList(productColorFitsSizesMap)}
        selectSize={this.sizeChange}
        selectFit={this.fitChange}
        selectColor={this.colorChange}
        selectedColor={selectedColor}
        selectedFit={selectedFit}
        selectedSize={selectedSize}
        quantityList={this.getQuantityList()}
        plpLabels={plpLabels}
        fitChanged={fitChanged}
        isErrorMessageDisplayed={isErrorMessageDisplayed}
        isATBErrorMessageDisplayed={isATBErrorMessageDisplayed}
        initialValues={initialValues}
        displayErrorMessage={this.displayErrorMessage}
        displayATBErrorMessage={this.displayATBErrorMessage}
        selectedQuantity={selectedQuantity}
        onQuantityChange={this.quantityChange}
        generalProductId={generalProductId}
        handleFormSubmit={handleFormSubmit}
        errorOnHandleSubmit={errorOnHandleSubmit}
        currentProduct={currentProduct}
        selectedColorProductId={selectedColorProductId}
        customFormName={customFormName}
        showAddToBagCTA={showAddToBagCTA}
        showColorChips={showColorChips}
        fromBagPage={fromBagPage}
        inheritedStyles={customSubmitButtonStyle}
        colorFitSizeDisplayNames={colorFitSizeDisplayNames}
        isGiftCard={isGiftCard}
        isOutfitPage={isOutfitPage}
        ref={formRef}
        formEnabled={formEnabled}
        quickViewColorSwatchesCss={quickViewColorSwatchesCss}
        isPDP={isPDP}
        isDisableZeroInventoryEntries={isDisableZeroInventoryEntries}
        alternateSizes={alternateSizes}
        sizeChartLinkVisibility={sizeChartLinkVisibility}
        navigation={navigation}
        isPickup={isPickup}
        onCloseClick={onCloseClick}
        isBundleProduct={isBundleProduct}
        keepAlive={isKeepAliveEnabled && keepAlive}
        outOfStockLabels={outOfStockLabels}
        isFavoriteEdit={isFavoriteEdit}
        sizeChartDetails={sizeChartDetails}
        isMultiItemQVModal={isMultiItemQVModal}
        quickViewPickup={this.quickViewPickup}
        pageNameProp={pageNameProp}
        pageSectionProp={pageSectionProp}
        pageSubSectionProp={pageSubSectionProp}
      />
    );
  }
}

function mapStateToProps(state) {
  return {
    pageNameProp: getPageName(state),
    pageSectionProp: getPageSection(state),
    pageSubSectionProp: getPageSubSection(state),
  };
}

/* Export container */

export default connect(mapStateToProps)(ProductAddToBagContainer);

export { ProductAddToBagContainer as ProductAddToBagContainerVanilla };
