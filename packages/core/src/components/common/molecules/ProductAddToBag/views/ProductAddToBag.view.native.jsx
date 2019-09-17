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
  changeQuantity = () => {};

  addToBagAction = () => {};

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
    const isSelected = (selectedColor && name === selectedColor.color.name) || false;

    return (
      <LinkImageIcon
        uri={imagePath}
        selected={isSelected}
        onPress={() => selectColor(item)}
        width={30}
        height={30}
        borderRadius={15}
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
    const { quantityList } = this.props;

    return (
      <RowViewContainer>
        <BodyCopy
          fontWeight="black"
          color="gray.900"
          mobileFontFamily="secondary"
          fontSize="fs14"
          text="QUANTITY: "
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
    return (
      <Button
        color="white"
        fill="BLUE"
        buttonVariation="variable-width"
        text="ADD TO BAG"
        fontSize="fs13"
        fontWeight="extrabold"
        fontFamily="secondary"
        onPress={this.addToBagAction}
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
    } = this.props;

    const { color } = selectedColor || {};
    const { name: colorName = '' } = color || {};
    const { fitNameVal: fitName = '' } = selectedFit || {};
    const { sizeName = '' } = selectedSize || {};

    return (
      <View {...this.props}>
        <Field
          id="color"
          name={selectedColor}
          component={ProductVariantSelector}
          title="COLOR"
          itemValue={colorName}
          renderItem={this.renderColor}
          data={colorList}
          selectedItem={selectedColor}
          componentWidth={30}
          separatorWidth={16}
        />
        <Field
          id="fit"
          name={selectedFit}
          component={ProductVariantSelector}
          title="FIT"
          itemValue={fitName}
          data={fitList}
          selectedItem={selectedFit}
          selectItem={selectFit}
          itemNameKey="fitNameVal"
        />
        <Field
          id="size"
          name={selectedColor}
          component={ProductVariantSelector}
          title="SIZE"
          itemValue={sizeName}
          renderItem={this.renderSize}
          data={sizeList}
          selectedItem={selectedSize}
          selectItem={selectSize}
          itemNameKey="sizeName"
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
};

ProductAddToBag.defaultProps = {
  colorList: [],
  fitList: [],
  sizeList: [],
  selectedColor: null,
  selectedFit: null,
  selectedSize: null,
  quantityList: [],
};

/* export view with redux form */
export default connect()(
  reduxForm({
    form: 'ProductAddToBag',
    enableReinitialize: true,
  })(withStyles(ProductAddToBag, styles))
);

export { ProductAddToBag as ProductAddToBagVanilla };
