import React from 'react';
import ProductAddToBag from '../views/ProductAddToBag.view';

/**
 * This class is a container of Product Add to bag view
 *
 * @class ProductAddToBagContainer
 * @extends {React.PureComponent<Props>}
 */
class ProductAddToBagContainer extends React.PureComponent<Props> {
  constructor(props) {
    super(props);
    // const selectedColor = this.getDefaultColor(productDetails);
    // const selectedFit = this.getDefaultFit(selectedColor);
    const { currentProduct } = props;
    this.initialValuesForm = this.getInitialValues(currentProduct);

    this.state = {
      selectedColor: this.initialValuesForm.color,
      selectedFit: this.initialValuesForm.Fit,
      selectedSize: this.initialValuesForm.Size,
      selectedQuantity: this.initialValuesForm.Quantity,
      isErrorMessageDisplayed: false,
      fitChanged: true,
      persistSelectedFit: '',
    };
  }

  componentWillReceiveProps(nextProps) {
    const { currentProduct } = nextProps;
    const { currentProduct: prevCurrentProduct } = this.props;

    if (currentProduct && currentProduct !== prevCurrentProduct) {
      // update selected color once map is received from api
      this.setState(this.getStateValuesFromProps(currentProduct));
    }
  }

  getStateValuesFromProps = currentProduct => {
    const initialValues = this.getInitialValues(currentProduct);
    const selectedFit =
      initialValues && initialValues.Fit
        ? {
            name: initialValues.Fit,
          }
        : null;

    return {
      selectedColor: initialValues && initialValues.color,
      selectedFit,
      selectedSize: initialValues && initialValues.Size,
      selectedQuantity: initialValues && initialValues.Quantity,
      persistSelectedFit: initialValues && initialValues.Fit,
    };
  };

  /**
   * @function getDefaultColor
   * @returns default color at 0 index in color array
   *
   * @memberof ProductAddToBagContainer
   */
  getInitialValues = currentProduct => {
    const { colorFitsSizesMap } = currentProduct;
    return colorFitsSizesMap && this.defaultSizesSet(currentProduct);
  };

  defaultSizesSet = currentProduct => {
    if (currentProduct) {
      return this.getInitialAddToBagFormValues(currentProduct);
    }

    return null;
  };

  getMapSliceForColorProductId = (colorFitsSizesMap, colorProductId) => {
    const selectedProduct = colorFitsSizesMap.find(
      entry => entry.colorProductId === colorProductId || entry.colorDisplayId === colorProductId
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

  getDefaultSizeForProduct = colorFitsSizesMap => {
    const firstSizeName = colorFitsSizesMap[0].fits[0].sizes[0].sizeName;
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

  getInitialAddToBagFormValues = currentProduct => {
    const colorFitsSizesMapEntry =
      currentProduct &&
      this.getMapSliceForColorProductId(
        currentProduct.colorFitsSizesMap,
        currentProduct.generalProductId
      );

    return {
      color: {
        name: colorFitsSizesMapEntry.color.name,
      },
      Fit: colorFitsSizesMapEntry.hasFits
        ? this.getDefaultFitForColorSlice(colorFitsSizesMapEntry).fitNameVal
        : null,
      Size: currentProduct.isGiftCard
        ? currentProduct.colorFitsSizesMap[0].fits[0].sizes[0].sizeName // on gift card we need something selected, otherwise no price would show up
        : this.getDefaultSizeForProduct(currentProduct.colorFitsSizesMap),
      Quantity: 1,
    };
  };

  fitChange = e => {
    const { persistSelectedFit } = this.state;
    if (persistSelectedFit !== e) {
      this.setState({
        selectedFit: {
          name: e,
        },
        fitChanged: true,
      });
    } else {
      this.setState({
        selectedFit: {
          name: e,
        },
        fitChanged: false,
      });
    }
  };

  colorChange = e => {
    const { selectedSize } = this.state;
    this.setState({
      selectedColor: { name: e },
      selectedSize,
    });
  };

  /**
   * @function selectColor
   * sets selected color in state and resets selected fit to first fit in selected color array
   *
   * @memberof ProductAddToBagContainer
   */
  selectColor = item => {
    const selectedFit = this.resetFitForSelectedColor(item);
    const selectedSize = this.resetSizeForSelectedFit(selectedFit);
    this.setState({ selectedColor: item, selectedFit, selectedSize });
  };

  /**
   * @function selectFit
   * sets selected fit in state and resets selected size to null
   *
   * @memberof ProductAddToBagContainer
   */
  selectFit = item => {
    const selectedSize = this.resetSizeForSelectedFit(item);
    this.setState({ selectedFit: item, selectedSize });
  };

  /**
   * @function resetFitForSelectedColor
   * @returns selectedFit in state if it is available in selected color
   * else returns first fit in selected color
   *
   * @memberof ProductAddToBagContainer
   */
  resetFitForSelectedColor = item => {
    const { selectedFit } = this.state;
    const selectedFitAvailableInColor = selectedFit
      ? item.fits.filter(fit => fit.fitNameVal === selectedFit.fitNameVal)
      : [];
    if (selectedFitAvailableInColor.length === 0) {
      return this.getDefaultFit(item);
    }

    return selectedFit;
  };

  /**
   * @function resetSizeForSelectedFit
   * @returns selectedSize in state if it is available in selected fit
   * else returns null
   *
   * @memberof ProductAddToBagContainer
   */
  resetSizeForSelectedFit = item => {
    const { selectedSize } = this.state;
    const selectedSizeAvailableInFits = selectedSize
      ? item.sizes.filter(size => size.sizeName === selectedSize.sizeName)
      : [];
    if (selectedSizeAvailableInFits.length === 0) {
      return null;
    }
    return selectedSize;
  };

  /**
   * @function selectSize
   * sets selected size in state
   *
   * @memberof ProductAddToBagContainer
   */
  selectSize = item => {
    this.setState({ selectedSize: item });
  };

  /**
   * @function getFitList
   * @returns fit list for selected color
   *
   * @memberof ProductAddToBagContainer
   */
  getFitList = () => {
    const { selectedColor } = this.state;
    const { hasFits = false, fits } = selectedColor || {};
    return (hasFits && fits) || [];
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
    if (colorItem) {
      fits.forEach(fit => {
        if (selectedFit) {
          if (fit.fitNameVal === selectedFit.name) {
            sizeOptions = fit.sizes.map(size => ({
              displayName: size.sizeName,
              id: size.sizeName,
              maxAvailable: size.maxAvailable,
            }));
          }
        } else {
          // eslint-disable-next-line sonarjs/no-identical-functions
          sizeOptions = fit.sizes.map(size => ({
            displayName: size.sizeName,
            id: size.sizeName,
            maxAvailable: size.maxAvailable,
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
      label: index + 1,
      value: index + 1,
    }));
  };

  getSelectedColorData = (colorFitsSizesMap, selectedColor) => {
    return (
      colorFitsSizesMap &&
      colorFitsSizesMap.filter(colorItem => {
        const {
          color: { name },
        } = colorItem;
        return selectedColor && selectedColor.name === name;
      })
    );
  };

  getFitOptions = (colorFitsSizesMap, selectedColor) => {
    const colorItem = this.getSelectedColorData(colorFitsSizesMap, selectedColor);
    const { fits } = colorItem || {};
    return (
      (fits &&
        fits.map(fit => ({
          displayName: fit.fitNameVal,
          id: fit.fitNameVal,
        }))) ||
      []
    );
  };

  sizeChange = e => {
    const { selectedFit } = this.state;
    this.setState({
      persistSelectedFit: selectedFit,
      selectedSize: { name: e },
      fitChanged: false,
    });
    if (e !== 'Select') {
      this.displayErrorMessage(false);
    }
  };

  /**
   * @function render
   *
   * @returns ProductAddToBag view
   * @memberof ProductAddToBagContainer
   */
  render() {
    const {
      currentProduct: { colorFitsSizesMap },
      plpLabels,
    } = this.props;
    const {
      selectedColor,
      selectedFit,
      selectedSize,
      fitChanged,
      isErrorMessageDisplayed,
      selectedQuantity,
    } = this.state;
    const initialValues = this.initialValuesForm;

    return (
      <ProductAddToBag
        colorList={colorFitsSizesMap}
        fitList={this.getFitOptions(colorFitsSizesMap, selectedColor)}
        sizeList={this.getSizeList(colorFitsSizesMap)}
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
        initialValues={initialValues}
        displayErrorMessage={this.displayErrorMessage}
        selectedQuantity={selectedQuantity}
      />
    );
  }
}

/* Export container */
export default ProductAddToBagContainer;
