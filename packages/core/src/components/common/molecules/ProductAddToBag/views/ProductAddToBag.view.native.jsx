import React from 'react';
import { View } from 'react-native';
import { connect } from 'react-redux';
import { reduxForm, Field } from 'redux-form';
import PropTypes from 'prop-types';

import LinkImageIcon from '../../../../features/browse/ProductListing/atoms/LinkImageIcon';
import ProductVariantSelector from '../../ProductVariantSelector';
import withStyles from '../../../hoc/withStyles';
import styles, {
  RowViewContainer,
  dropDownStyle,
  dropDownItemStyle,
} from '../styles/ProductAddToBag.style.native';
import { Button, BodyCopy } from '../../../atoms';
import DropDown from '../../../atoms/DropDown/views/DropDown.native';

class ProductAddToBag extends React.PureComponent<Props> {
  changeQuantity = quantity => {
    const { onQuantityChange } = this.props;
    if (onQuantityChange) onQuantityChange(quantity);
  };

  /**
   * @function renderColor
   * @returns view for color item
   *
   * @memberof ProductAddToBag
   */
  renderColor = ({ item }) => {
    const {
      color: { imagePath, name },
    } = item;
    const { selectedColor, selectColor } = this.props;
    const isSelected = (selectedColor && name === selectedColor.name) || false;
    const borderWidth = 2;
    const componentSize = 30;
    const imageSize = isSelected ? componentSize - borderWidth : componentSize;
    return (
      <LinkImageIcon
        uri={imagePath}
        selected={isSelected}
        onPress={() => selectColor(name)}
        width={componentSize}
        height={componentSize}
        borderRadius={15}
        borderWidth={borderWidth}
        imageWidth={imageSize}
        imageHeight={imageSize}
      />
    );
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
        <DropDown
          selectedValue="1"
          data={quantityList}
          onValueChange={this.changeQuantity}
          bounces={false}
          dropDownStyle={{ ...dropDownStyle }}
          itemStyle={{ ...dropDownItemStyle }}
          variation="secondary"
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
    } = this.props;
    return (
      <Button
        color="white"
        fill="BLUE"
        buttonVariation="variable-width"
        text={addToBag}
        fontSize="fs10"
        fontWeight="extrabold"
        fontFamily="secondary"
        onPress={addToBagAction}
        locator="pdp_color_swatch"
      />
    );
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
      plpLabels: { errorMessage, size, fit, color },
    } = this.props;

    const { name: colorName } = selectedColor || {};
    const { name: fitName = '' } = selectedFit || {};
    const { name: sizeName = '' } = selectedSize || {};
    const sizeError = isErrorMessageDisplayed ? errorMessage : '';

    return (
      <View {...this.props}>
        <Field
          id="color"
          name={colorName}
          itemValue={colorName}
          component={ProductVariantSelector}
          title={color}
          renderItem={this.renderColor}
          data={colorList}
          selectedItem={colorName}
          componentWidth={30}
          separatorWidth={16}
          locators={{ key: 'pdp_color_label', value: 'pdp_color_value' }}
        />
        <Field
          id="fit"
          name={fitName}
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
          name={sizeName}
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
        {this.renderQuantityView()}
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
};

/* export view with redux form */
export default connect()(
  reduxForm({
    form: 'ProductAddToBag',
    enableReinitialize: true,
  })(withStyles(ProductAddToBag, styles))
);

export { ProductAddToBag as ProductAddToBagVanilla };
