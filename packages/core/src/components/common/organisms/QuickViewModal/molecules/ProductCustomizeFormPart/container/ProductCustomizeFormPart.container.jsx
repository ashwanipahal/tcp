import React from 'react';
import PropTypes from 'prop-types';
import { PRODUCT_INFO_PROP_TYPE_SHAPE } from '../../../../../../features/browse/ProductListing/molecules/ProductList/propTypes/productsAndItemsPropTypes';
import { COLOR_FITS_SIZES_MAP_PROP_TYPE } from '../../../../PickupStoreModal/PickUpStoreModal.proptypes';
import ProductCustomizeFormPart from '../views/ProductCustomizeFormPart.view';
import { routerPush } from '../../../../../../../utils';
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
  };

  goToPDPPage = (e, pdpToPath, currentColorPdpUrl) => {
    e.preventDefault();
    const { onCloseClick } = this.props;
    routerPush(pdpToPath, currentColorPdpUrl);
    onCloseClick();
  };

  goToPDPPageMobile = (pdpUrl, selectedColorProductId) => {
    const { navigation, onCloseClick } = this.props;
    const title = navigation && navigation.getParam('title');
    onCloseClick();
    navigation.navigate('ProductDetail', {
      title,
      pdpUrl,
      selectedColorProductId,
      reset: true,
    });
  };

  render() {
    const { productInfo, formRef } = this.props;
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
};

ProductCustomizeFormPartContainer.defaultProps = {
  currency: 'USD',
  addToBagError: '',
  navigation: {},
  formRef: {},
};

export default ProductCustomizeFormPartContainer;
export { ProductCustomizeFormPartContainer as ProductCustomizeFormPartContainerVanilla };
