import React from 'react';
import { View } from 'react-native';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { reduxForm, Field } from 'redux-form';
import PropTypes from 'prop-types';
import { PRODUCT_ADD_TO_BAG } from '@tcp/core/src/constants/reducer.constants';
import ProductVariantSelector from '../../ProductVariantSelector';
import withStyles from '../../../hoc/withStyles';
import styles, { RowViewContainer } from '../styles/ProductAddToBag.style.native';
import { Button, BodyCopy } from '../../../atoms';
import { NativeDropDown } from '../../../atoms/index.native';
import ErrorDisplay from '../../../atoms/ErrorDisplay';

class ProductAddToBag extends React.PureComponent<Props> {
  /* Have to define empty constructor because test case fail with error 'TypeError: Cannot read property 'find' of undefined'. So if using PureComponent then mendatory to define constructor */
  // eslint-disable-next-line
  constructor(props) {
    super(props);
  }

  /**
   *
   * @function getButtonLabel
   * @returns Returns label of button on basis of update/addtobag scenarios
   * @memberof ProductAddToBag
   */
  getButtonLabel = () => {
    const { fromBagPage, plpLabels } = this.props;
    const { addToBag, update } = plpLabels;
    return fromBagPage ? update : addToBag;
  };

  /**
   * @function renderAddToBagButton
   * @returns Add To Bag Butyon
   *
   * @memberof ProductAddToBag
   */
  renderAddToBagButton = () => {
    const { handleFormSubmit, fitChanged, displayErrorMessage } = this.props;
    return (
      <Button
        margin="16px 0 0 0"
        color="white"
        fill="BLUE"
        text={this.getButtonLabel()}
        fontSize="fs10"
        fontWeight="extrabold"
        fontFamily="secondary"
        onPress={() => {
          if (fitChanged) {
            displayErrorMessage(fitChanged);
          } else {
            handleFormSubmit();
          }
        }}
        locator="pdp_color_swatch"
        accessibilityLabel="Add to Bag"
      />
    );
  };

  onQuantityValueChange = selectedQuantity => {
    const { onQuantityChange, form } = this.props;
    if (onQuantityChange) {
      onQuantityChange(selectedQuantity, form);
    }
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
      selectColor,
      showAddToBagCTA,
      showColorChips,
      isGiftCard,
      isDisableZeroInventoryEntries,
    } = this.props;
    const qunatityText = `${quantity}: `;
    const { name: colorName } = selectedColor || {};
    const { name: fitName = '' } = selectedFit || {};
    const { name: sizeName = '' } = selectedSize || {};
    const sizeError = isErrorMessageDisplayed ? errorMessage : '';
    const quantityDropDownStyle = {
      width: 200,
    };
    let { colorFitSizeDisplayNames } = this.props;
    colorFitSizeDisplayNames = {
      color,
      fit,
      size,
      ...colorFitSizeDisplayNames,
    };
    return (
      <View {...this.props}>
        {showColorChips && (
          <Field
            id="color"
            name="color"
            itemValue={colorName}
            component={ProductVariantSelector}
            title={colorFitSizeDisplayNames.color}
            renderColorItem
            data={colorList}
            selectedItem={colorName}
            selectedColor={selectedColor}
            selectColor={selectColor}
            componentWidth={30}
            separatorWidth={16}
            locators={{ key: 'pdp_color_label', value: 'pdp_color_value' }}
            isGiftCard={isGiftCard}
          />
        )}
        <Field
          id="fit"
          name="Fit"
          component={ProductVariantSelector}
          title={colorFitSizeDisplayNames.fit}
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
          title={colorFitSizeDisplayNames.size}
          itemValue={sizeName}
          renderItem={this.renderSize}
          data={sizeList}
          selectedItem={sizeName}
          selectItem={selectSize}
          itemNameKey="displayName"
          error={sizeError}
          locators={{ key: 'pdp_size_label', value: 'pdp_size_value' }}
          isDisableZeroInventoryEntries={isDisableZeroInventoryEntries}
        />
        <RowViewContainer style={quantityDropDownStyle}>
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
            id="quantity"
            selectedValue={selectedQuantity}
            onValueChange={this.onQuantityValueChange}
            heading={qunatityText}
            name="Quantity"
          />
        </RowViewContainer>

        <ErrorDisplay error={errorOnHandleSubmit} />
        {showAddToBagCTA && this.renderAddToBagButton()}
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
  showAddToBagCTA: PropTypes.bool,
  handleFormSubmit: PropTypes.func,
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
  handleFormSubmit: null,
  selectedQuantity: 1,
  showAddToBagCTA: true,
};

/* export view with redux form */
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
