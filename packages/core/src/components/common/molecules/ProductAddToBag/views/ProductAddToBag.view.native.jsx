import React from 'react';
import { View } from 'react-native';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { reduxForm, Field } from 'redux-form';
import PropTypes from 'prop-types';
import ProductPickupContainer from '@tcp/core/src/components/common/organisms/ProductPickup';
import { PRODUCT_ADD_TO_BAG } from '@tcp/core/src/constants/reducer.constants';
import { getMapSliceForColorProductId } from '@tcp/core/src/components/features/browse/ProductListing/molecules/ProductList/utils/productsCommonUtils';
import ProductVariantSelector from '../../ProductVariantSelector';
import withStyles from '../../../hoc/withStyles';
import styles, {
  RowViewContainer,
  SizeViewContainer,
} from '../styles/ProductAddToBag.style.native';
import { Button, BodyCopy } from '../../../atoms';
import { NativeDropDown } from '../../../atoms/index.native';
import SizeChart from '../molecules/SizeChart/container';
import AlternateSizes from '../molecules/AlternateSizes';

export const SIZE_CHART_LINK_POSITIONS = {
  AFTER_SIZE: 2,
  AFTER_QUANTITY: 3,
};

class ProductAddToBag extends React.PureComponent<Props> {
  /* Have to define empty constructor because test case fail with error 'TypeError: Cannot read property 'find' of undefined'. So if using PureComponent then mendatory to define constructor */
  // eslint-disable-next-line
  constructor(props) {
    super(props);
    this.state = {
      showToastMessage: true,
    };
  }

  /**
   *
   * @function getButtonLabel
   * @returns Returns label of button on basis of update/addtobag scenarios
   * @memberof ProductAddToBag
   */
  getButtonLabel = () => {
    const { fromBagPage, plpLabels, keepAlive, outOfStockLabels, isFavoriteEdit } = this.props;
    const { addToBag, update, saveProduct } = plpLabels;
    let addToBagLabel = addToBag;
    if (fromBagPage) {
      addToBagLabel = update;
    } else if (isFavoriteEdit) {
      addToBagLabel = saveProduct;
    }
    return keepAlive ? outOfStockLabels.outOfStockCaps : addToBagLabel;
  };

  componentDidUpdate = prevProps => {
    const {
      errorOnHandleSubmit,
      isErrorMessageDisplayed,
      plpLabels: { errorMessage },
      toastMessage,
      displayErrorMessage,
    } = this.props;
    const changeInFormValidationError =
      isErrorMessageDisplayed && isErrorMessageDisplayed !== prevProps.isErrorMessageDisplayed;
    if (errorOnHandleSubmit || changeInFormValidationError) {
      if (changeInFormValidationError) {
        // This is to provide functionality to trigger error from container as well.
        toastMessage(errorMessage); // calling this method directly as state's showToastMessage is never reset and toast message is not displayed second time
        return displayErrorMessage(false); // calling this method to call didUpdate when isErrorMessageDisplayed is set true again
      }
      return this.onToastMessage(errorOnHandleSubmit);
    }
    return null;
  };

  /**
   * @function renderAddToBagButton
   * @returns Add To Bag Butyon
   *
   * @memberof ProductAddToBag
   */
  renderAddToBagButton = () => {
    const { handleFormSubmit, fitChanged, displayErrorMessage, keepAlive } = this.props;
    return (
      <Button
        margin="16px 0 0 0"
        color="white"
        fill="BLUE"
        disableButton={keepAlive}
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

  renderAlternateSizes = alternateSizes => {
    const { className, navigation, plpLabels, hideAlternateSizes } = this.props;
    const sizeAvailable = plpLabels && plpLabels.sizeAvailable ? plpLabels.sizeAvailable : '';
    const visibleAlternateSizes =
      !hideAlternateSizes && alternateSizes && Object.keys(alternateSizes).length > 0;
    return (
      visibleAlternateSizes && (
        <AlternateSizes
          title={`${sizeAvailable}:`}
          buttonsList={alternateSizes}
          className={className}
          navigation={navigation}
        />
      )
    );
  };

  renderUnavailableLink = () => {
    const {
      currentProduct,
      currentProduct: { colorFitsSizesMap },
      plpLabels,
      selectedColorProductId,
      onCloseClick,
      keepAlive,
      isFromBagProductSfl,
      isPickup,
      isBundleProduct,
    } = this.props;
    const sizeUnavailable = plpLabels && plpLabels.sizeUnavalaible ? plpLabels.sizeUnavalaible : '';
    const currentColorEntry = getMapSliceForColorProductId(
      colorFitsSizesMap,
      selectedColorProductId
    );

    return !isFromBagProductSfl && !isPickup && !isBundleProduct ? (
      <ProductPickupContainer
        productInfo={currentProduct}
        formName={`ProductAddToBag-${currentProduct.generalProductId}`}
        sizeUnavailable={sizeUnavailable}
        isAnchor
        miscInfo={currentColorEntry && currentColorEntry.miscInfo}
        onPickupClickAddon={onCloseClick}
        keepAlive={keepAlive}
      />
    ) : null;
  };

  onQuantityValueChange = selectedQuantity => {
    const { onQuantityChange, form } = this.props;
    if (onQuantityChange) {
      onQuantityChange(selectedQuantity, form);
    }
  };

  onToastMessage = errorMessage => {
    const { toastMessage } = this.props;
    const { showToastMessage } = this.state;
    if (showToastMessage) {
      toastMessage(errorMessage);
      this.setState({
        showToastMessage: false,
      });
    }
  };

  getQtyMarginStyle = () => {
    const { isBundleProduc } = this.props;
    return !isBundleProduc ? '16px 0 16px 0' : '32px 0 40px 0';
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
      plpLabels: { size, fit, color },
      quantityList,
      plpLabels: { quantity },
      selectedQuantity,
      selectColor,
      showAddToBagCTA,
      showColorChips,
      isGiftCard,
      isDisableZeroInventoryEntries,
      sizeChartLinkVisibility,
      alternateSizes,
      isPickup,
      keepAlive,
      quickViewPickup,
      isFromBagProductSfl,
    } = this.props;
    const qunatityText = `${quantity}: `;
    const { name: colorName } = selectedColor || {};
    const { name: fitName = '' } = selectedFit || {};
    const { name: sizeName = '' } = selectedSize || {};

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
          keepAlive={keepAlive}
        />
        <SizeViewContainer>
          {sizeChartLinkVisibility === SIZE_CHART_LINK_POSITIONS.AFTER_SIZE && <SizeChart />}
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
            locators={{ key: 'pdp_size_label', value: 'pdp_size_value' }}
            isDisableZeroInventoryEntries={isDisableZeroInventoryEntries}
            keepAlive={keepAlive}
          />
        </SizeViewContainer>
        {!isPickup && this.renderAlternateSizes(alternateSizes)}
        {quickViewPickup() && this.renderUnavailableLink()}
        {!isFromBagProductSfl && (
          <RowViewContainer style={quantityDropDownStyle} margins={this.getQtyMarginStyle()}>
            <BodyCopy
              fontWeight="black"
              color="gray.900"
              fontFamily="secondary"
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
              textAlignLeft
              lightGrayColor
            />
          </RowViewContainer>
        )}

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
  toastMessage: PropTypes.func,
  isBundleProduct: PropTypes.bool,
  isFromBagProductSfl: PropTypes.bool,
  isFavoriteEdit: PropTypes.bool,
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
  toastMessage: () => {},
  isBundleProduct: false,
  isFromBagProductSfl: false,
  isFavoriteEdit: false,
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
