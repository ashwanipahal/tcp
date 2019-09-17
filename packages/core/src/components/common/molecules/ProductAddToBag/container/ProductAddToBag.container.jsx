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
    const selectedColor = this.getDefaultColor(props.colorFitsSizesMap);
    const selectedFit = this.getDefaultFit(selectedColor);
    this.state = { selectedColor, selectedFit, selectedSize: null };
  }

  componentWillReceiveProps(nextProps) {
    const { colorFitsSizesMap } = nextProps;
    const { colorFitsSizesMap: prevColorFitsSizesMap } = this.props;

    if (colorFitsSizesMap && colorFitsSizesMap !== prevColorFitsSizesMap) {
      // update selected color once map is received from api
      const selectedColor = this.getDefaultColor(colorFitsSizesMap);
      const selectedFit = this.getDefaultFit(selectedColor);
      this.setState({ selectedColor, selectedFit });
    }
  }

  /**
   * @function getDefaultColor
   * @returns default color at 0 index in color array
   *
   * @memberof ProductAddToBagContainer
   */
  getDefaultColor = colorFitsSizesMap => {
    return (colorFitsSizesMap && colorFitsSizesMap[0]) || null;
  };

  /**
   * @function getDefaultFit
   * @returns first fit as default fit from fits array
   *
   * @memberof ProductAddToBagContainer
   */
  getDefaultFit = selectedColor => {
    return (selectedColor && selectedColor.fits[0]) || null;
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
  getSizeList = () => {
    const { selectedFit, selectedColor } = this.state;
    if (selectedFit && selectedFit.sizes) return selectedFit && selectedFit.sizes;
    return selectedColor && selectedColor.fits && selectedColor.fits[0].sizes;
  };

  /**
   * @function getQuantityList
   * @returns quantity list with labels and values to render dropdown
   *
   * @memberof ProductAddToBagContainer
   */
  getQuantityList = () => {
    const quantities = [];
    for (let value = 1; value <= 15; value += 1) {
      const result = { label: value, value };
      quantities.push(result);
    }

    return quantities;
  };

  /**
   * @function render
   *
   * @returns ProductAddToBag view
   * @memberof ProductAddToBagContainer
   */
  render() {
    const { colorFitsSizesMap } = this.props;
    const { selectedColor, selectedFit, selectedSize } = this.state;
    return (
      <ProductAddToBag
        colorList={colorFitsSizesMap}
        fitList={this.getFitList()}
        sizeList={this.getSizeList()}
        selectSize={this.selectSize}
        selectFit={this.selectFit}
        selectColor={this.selectColor}
        selectedColor={selectedColor}
        selectedFit={selectedFit}
        selectedSize={selectedSize}
        quantityList={this.getQuantityList()}
      />
    );
  }
}

/* Export container */
export default ProductAddToBagContainer;
