import React from 'react';
import PropTypes from 'prop-types';
import { PRODUCT_INFO_PROP_TYPE_SHAPE } from '../../../../../../features/browse/ProductListing/molecules/ProductList/propTypes/productsAndItemsPropTypes';
import { COLOR_FITS_SIZES_MAP_PROP_TYPE } from '../../../../PickupStoreModal/PickUpStoreModal.proptypes';
import ProductCustomizeFormPart from '../views/ProductCustomizeFormPart.view';
import { routerPush, getBrand } from '../../../../../../../utils';
import { APP_TYPE } from '../../../../../../features/CnC/Checkout/Checkout.constants';
import {
  getMapSliceForColorProductId,
  getMapSliceForColor,
} from '../../../../../../features/browse/ProductListing/molecules/ProductList/utils/productsCommonUtils';

class ProductCustomizeFormPartContainer extends React.Component {
  constructor(props) {
    super(props);
    const { productInfo, colorFitsSizesMap } = this.props;
    this.onInputSelectionChange = this.onInputSelectionChange.bind(this);
    this.state = {
      formEnabled: true,
      currentColorEntry: getMapSliceForColorProductId(
        colorFitsSizesMap,
        productInfo.generalProductId
      ),
    };
  }

  onChangeColor = e => {
    const { colorFitsSizesMap } = this.props;
    this.setState({ currentColorEntry: getMapSliceForColor(colorFitsSizesMap, e) });
  };

  onInputSelectionChange = () => {
    this.setState(oldState => ({ formEnabled: !oldState.formEnabled }));
    const { changeQuickViewState } = this.props;
    const { formEnabled } = this.state;
    if (!formEnabled) {
      changeQuickViewState(false);
    }
  };

  goToPDPPage = (e, pdpToPath, currentColorPdpUrl) => {
    e.preventDefault();
    const { onCloseClick } = this.props;
    routerPush(pdpToPath, currentColorPdpUrl);
    onCloseClick();
  };

  goToPDPPageMobile = (pdpUrl, selectedColorProductId) => {
    const {
      navigation,
      onCloseClick,
      updateAppTypeHandler,
      productInfoFromBag,
      fromBagPage,
    } = this.props;
    const currentAppBrand = getBrand();
    let isProductBrandOfSameDomain = true;
    if (fromBagPage) {
      isProductBrandOfSameDomain =
        currentAppBrand.toUpperCase() ===
        (productInfoFromBag.itemBrand && productInfoFromBag.itemBrand.toUpperCase());
    }

    const title = navigation && navigation.getParam('title');

    onCloseClick();
    if (!isProductBrandOfSameDomain) {
      updateAppTypeHandler({
        type: currentAppBrand.toLowerCase() === APP_TYPE.TCP ? APP_TYPE.GYMBOREE : APP_TYPE.TCP,
        params: {
          title,
          pdpUrl,
          selectedColorProductId,
          reset: true,
        },
      });
    } else {
      navigation.navigate('ProductDetail', {
        title,
        pdpUrl,
        selectedColorProductId,
        reset: true,
      });
    }
  };

  render() {
    const {
      productInfo,
      formRef,
      currencyAttributes,
      onCloseClick,
      isMultiItemQVModal,
    } = this.props;
    const { currentColorEntry, formEnabled } = this.state;
    const imageUrl = currentColorEntry
      ? productInfo.imagesByColor[currentColorEntry.color.name] &&
        productInfo.imagesByColor[currentColorEntry.color.name].basicImageUrl
      : null;

    return (
      <ProductCustomizeFormPart
        {...this.props}
        imageUrl={imageUrl}
        currentColorEntry={currentColorEntry}
        onChangeColor={this.onChangeColor}
        goToPDPPage={this.goToPDPPage}
        goToPDPPageMobile={this.goToPDPPageMobile}
        onInputSelectionChange={this.onInputSelectionChange}
        formRef={formRef}
        formEnabled={formEnabled}
        currencyAttributes={currencyAttributes}
        onCloseClick={onCloseClick}
        isMultiItemQVModal={isMultiItemQVModal}
      />
    );
  }
}

ProductCustomizeFormPartContainer.propTypes = {
  plpLabels: PropTypes.shape({}).isRequired,
  onCloseClick: PropTypes.func.isRequired,
  navigation: PropTypes.shape({}),
  formRef: PropTypes.shape({}),
  handleAddToBag: PropTypes.func.isRequired,
  formValues: PropTypes.shape([]).isRequired,
  quickViewLabels: PropTypes.shape({
    addToBag: PropTypes.string,
    viewProductDetails: PropTypes.string,
  }).isRequired,
  colorFitsSizesMap: COLOR_FITS_SIZES_MAP_PROP_TYPE.isRequired,
  productInfo: PRODUCT_INFO_PROP_TYPE_SHAPE.isRequired,
  currency: PropTypes.string,
  addToBagError: PropTypes.string,
  currencyAttributes: PropTypes.shape({}),
  changeQuickViewState: PropTypes.bool.isRequired,
  isMultiItemQVModal: PropTypes.bool.isRequired,
  updateAppTypeHandler: PropTypes.func.isRequired,
  productInfoFromBag: PropTypes.shape({}).isRequired,
  fromBagPage: PropTypes.bool.isRequired,
};

ProductCustomizeFormPartContainer.defaultProps = {
  currency: 'USD',
  addToBagError: '',
  navigation: {},
  formRef: {},
  currencyAttributes: {},
};

export default ProductCustomizeFormPartContainer;
export { ProductCustomizeFormPartContainer as ProductCustomizeFormPartContainerVanilla };
