import React from 'react';
import { View } from 'react-native';
import { reduxForm, Field } from 'redux-form';
import PropTypes from 'prop-types';
import get from 'lodash/get';
import ProductVariantSelector from '../../ProductVariantSelector';
import withStyles from '../../../hoc/withStyles';
import styles, { RowViewContainer } from '../styles/ProductAddToBag.style.native';
import { Button, BodyCopy } from '../../../atoms';
import { NativeDropDown } from '../../../atoms/index.native';
import ProductPickupContainer from '../../../organisms/ProductPickup';
import { getMapSliceForColorProductId } from '../../../../features/browse/ProductListing/molecules/ProductList/utils/productsCommonUtils';
import ErrorDisplay from '../../../atoms/ErrorDisplay';

class ProductAddToBag extends React.PureComponent<Props> {
  /* Have to define empty constructor because test case fail with error 'TypeError: Cannot read property 'find' of undefined'. So if using PureComponent then mendatory to define constructor */
  // eslint-disable-next-line
  constructor(props) {
    super(props);
  }

  changeQuantity = quantity => {
    const { onQuantityChange } = this.props;
    if (onQuantityChange) onQuantityChange(quantity);
  };

  /**
   * @function renderQuantityView
   * @returns quantity view with dropdown
   *
   * @memberof ProductAddToBag
   */
  renderQuantityView = () => {
    const {
      quantityList,
      plpLabels: { quantity },
      selectedQuantity,
      onQuantityChange,
    } = this.props;
    const qunatityText = `${quantity}: `;

    return (
      <RowViewContainer>
        <BodyCopy
          fontWeight="black"
          color="gray.900"
          mobileFontFamily="secondary"
          fontSize="fs14"
          text={qunatityText}
        />
        <NativeDropDown
          data={quantityList}
          selectedValue={selectedQuantity}
          onValueChange={onQuantityChange}
        />
      </RowViewContainer>
    );
  };

  /**
   * @function renderAddToBagButton
   * @returns Add To Bag Butyon
   *
   * @memberof ProductAddToBag
   */
  renderAddToBagButton = () => {
    const {
      plpLabels: { addToBag },
      addToBagAction,
      fitChanged,
      displayErrorMessage,
    } = this.props;
    return (
      <Button
        margin="16px 0 0 0"
        color="white"
        fill="BLUE"
        buttonVariation="variable-width"
        text={addToBag}
        fontSize="fs10"
        fontWeight="extrabold"
        fontFamily="secondary"
        onPress={() => {
          if (fitChanged) {
            displayErrorMessage(fitChanged);
          } else {
            addToBagAction();
          }
        }}
        locator="pdp_color_swatch"
        accessibilityLabel="Add to Bag"
      />
    );
  };

  renderPickUpStor = () => {
    const { currentProduct, selectedColorProductId } = this.props;
    if (currentProduct) {
      const colorFitsSizesMap = get(currentProduct, 'colorFitsSizesMap', null);
      const curentColorEntry = getMapSliceForColorProductId(
        colorFitsSizesMap,
        selectedColorProductId
      );
      const { miscInfo } = curentColorEntry;
      return (
        <ProductPickupContainer
          productInfo={currentProduct}
          formName={`ProductAddToBag-${currentProduct.generalProductId}`}
          miscInfo={miscInfo}
        />
      );
    }
    return null;
  };

  render() {
    const {
      colorList,
      fitList,
      sizeList,
      selectedColor,
      selectedFit,
      selectedSize,
      selectFit,
      selectSize,
      isErrorMessageDisplayed,
      errorOnHandleSubmit,
      plpLabels: { errorMessage, size, fit, color },
      quantityList,
      plpLabels: { quantity },
      selectedQuantity,
      onQuantityChange,
      selectColor,
    } = this.props;
    const qunatityText = `${quantity}: `;
    const { name: colorName } = selectedColor || {};
    const { name: fitName = '' } = selectedFit || {};
    const { name: sizeName = '' } = selectedSize || {};
    const sizeError = isErrorMessageDisplayed ? errorMessage : '';

    return (
      <View {...this.props}>
        <Field
          id="color"
          name="color"
          itemValue={colorName}
          component={ProductVariantSelector}
          title={color}
          renderColorItem
          data={colorList}
          selectedItem={colorName}
          selectedColor={selectedColor}
          selectColor={selectColor}
          componentWidth={30}
          separatorWidth={16}
          locators={{ key: 'pdp_color_label', value: 'pdp_color_value' }}
        />
        <Field
          id="fit"
          name="Fit"
          component={ProductVariantSelector}
          title={fit}
          itemValue={fitName}
          data={fitList}
          selectedItem={fitName}
          selectItem={selectFit}
          itemNameKey="displayName"
          locators={{ key: 'pdp_fit_label', value: 'pdp_fit_value' }}
        />
        <Field
          id="size"
          name="Size"
          component={ProductVariantSelector}
          title={size}
          itemValue={sizeName}
          renderItem={this.renderSize}
          data={sizeList}
          selectedItem={sizeName}
          selectItem={selectSize}
          itemNameKey="displayName"
          error={sizeError}
          locators={{ key: 'pdp_size_label', value: 'pdp_size_value' }}
        />
        <RowViewContainer>
          <BodyCopy
            fontWeight="black"
            color="gray.900"
            mobileFontFamily="secondary"
            fontSize="fs14"
            text={qunatityText}
          />
          <Field
            component={NativeDropDown}
            data={quantityList}
            selectedValue={selectedQuantity}
            onValueChange={onQuantityChange}
            heading={qunatityText}
            name="Quantity"
          />
        </RowViewContainer>

        {this.renderPickUpStor()}
        <ErrorDisplay error={errorOnHandleSubmit} />
        {this.renderAddToBagButton()}
      </View>
    );
  }
}

/* PropTypes declaration */
ProductAddToBag.propTypes = {
  colorList: PropTypes.arrayOf(Object),
  fitList: PropTypes.arrayOf(Object),
  sizeList: PropTypes.arrayOf(Object),
  selectedColor: PropTypes.instanceOf(Object),
  selectedFit: PropTypes.instanceOf(Object),
  selectedSize: PropTypes.instanceOf(Object),
  quantityList: PropTypes.arrayOf(Object),
  plpLabels: PropTypes.instanceOf(Object),
  isErrorMessageDisplayed: PropTypes.bool,
  addToBagAction: PropTypes.func,
  selectedQuantity: PropTypes.number,
  currentProduct: PropTypes.shape({}).isRequired,
  selectedColorProductId: PropTypes.number.isRequired,
};

ProductAddToBag.defaultProps = {
  colorList: [],
  fitList: [],
  sizeList: [],
  selectedColor: null,
  selectedFit: null,
  selectedSize: null,
  quantityList: [],
  plpLabels: {},
  isErrorMessageDisplayed: false,
  addToBagAction: null,
  selectedQuantity: 1,
};

/* export view with redux form */
export default reduxForm({
  form: 'ProductAddToBag',
  enableReinitialize: true,
})(withStyles(ProductAddToBag, styles));

export { ProductAddToBag as ProductAddToBagVanilla };
