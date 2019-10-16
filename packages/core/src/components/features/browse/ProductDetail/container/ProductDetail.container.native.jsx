import React from 'react';
import { connect } from 'react-redux';
import { PropTypes } from 'prop-types';
import ProductDetail from '../views';
import { getProductDetails } from './ProductDetail.actions';

import {
  getNavTree,
  getBreadCrumbs,
  getCurrentProduct,
  getPlpLabels,
  getProductDetailFormValues,
  getPDPLabels,
  getShortDescription,
  getGeneralProductId,
  getDescription,
  getRelatedOutfits,
} from './ProductDetail.selectors';
import { getIsPickupModalOpen } from '../../../../common/organisms/PickupStoreModal/container/PickUpStoreModal.selectors';
import {
  addToCartEcom,
  clearAddToBagErrorState,
} from '../../../CnC/AddedToBag/container/AddedToBag.actions';
import { getAddedToBagError } from '../../../CnC/AddedToBag/container/AddedToBag.selectors';
import { getCartItemInfo } from '../../../CnC/AddedToBag/util/utility';

class ProductDetailContainer extends React.PureComponent {
  selectedColorProductId;

  constructor(props) {
    super(props);
    const { navigation } = props;
    this.selectedColorProductId = navigation && navigation.getParam('selectedColorProductId');
  }

  componentDidMount() {
    const { getDetails, navigation } = this.props;
    const pid = (navigation && navigation.getParam('pdpUrl')) || '';

    // TODO - fix this to extract the product ID from the page.
    const id = pid && pid.split('-');
    let productId = id && id.length > 1 ? `${id[id.length - 2]}_${id[id.length - 1]}` : pid;
    if (
      (id.indexOf('Gift') > -1 || id.indexOf('gift') > -1) &&
      (id.indexOf('Card') > -1 || id.indexOf('card') > -1)
    ) {
      productId = 'gift';
    }
    getDetails({ productColorId: productId, ignoreCache: true });
  }

  handleAddToBag = () => {
    const { addToBagEcom, formValues, currentProduct } = this.props;
    let cartItemInfo = getCartItemInfo(currentProduct, formValues);
    cartItemInfo = { ...cartItemInfo };
    addToBagEcom(cartItemInfo);
  };

  render() {
    const {
      currentProduct,
      breadCrumbs,
      navTree,
      plpLabels,
      pdpLabels,
      navigation,
      addToBagError,
      clearAddToBagError,
      isPickupModalOpen,
      longDescription,
      shortDescription,
      itemPartNumber,
      relatedOutfits,
    } = this.props;
    const isProductDataAvailable = Object.keys(currentProduct).length > 0;
    return (
      <React.Fragment>
        {isProductDataAvailable ? (
          <ProductDetail
            currentProduct={currentProduct}
            breadCrumbs={breadCrumbs}
            navTree={navTree}
            selectedColorProductId={this.selectedColorProductId}
            plpLabels={plpLabels}
            pdpLabels={pdpLabels}
            handleFormSubmit={this.handleAddToBag}
            navigation={navigation}
            addToBagError={addToBagError}
            clearAddToBagError={clearAddToBagError}
            isPickupModalOpen={isPickupModalOpen}
            shortDescription={shortDescription}
            itemPartNumber={itemPartNumber}
            longDescription={longDescription}
            relatedOutfits={relatedOutfits.slots}
          />
        ) : null}
      </React.Fragment>
    );
  }
}

function mapStateToProps(state) {
  return {
    navTree: getNavTree(state),
    currentProduct: getCurrentProduct(state),
    breadCrumbs: getBreadCrumbs(state),
    plpLabels: getPlpLabels(state),
    pdpLabels: getPDPLabels(state),
    isPickupModalOpen: getIsPickupModalOpen(state),
    addToBagError: getAddedToBagError(state),
    formValues: getProductDetailFormValues(state),
    shortDescription: getShortDescription(state),
    itemPartNumber: getGeneralProductId(state),
    longDescription: getDescription(state),
    relatedOutfits: getRelatedOutfits(state),
  };
}

function mapDispatchToProps(dispatch) {
  return {
    getDetails: payload => {
      dispatch(getProductDetails(payload));
    },
    addToBagEcom: payload => {
      dispatch(addToCartEcom(payload));
    },
    clearAddToBagError: () => {
      dispatch(clearAddToBagErrorState());
    },
  };
}

ProductDetailContainer.propTypes = {
  currentProduct: PropTypes.shape({}),
  getDetails: PropTypes.func.isRequired,
  clearAddToBagError: PropTypes.func.isRequired,
  breadCrumbs: PropTypes.shape({}),
  navigation: PropTypes.shape({}).isRequired,
  addToBagEcom: PropTypes.func.isRequired,
  navTree: PropTypes.shape({}),
  plpLabels: PropTypes.shape({}),
  pdpLabels: PropTypes.shape({}),
  isPickupModalOpen: PropTypes.bool,
  addToBagError: PropTypes.string,
  formValues: PropTypes.shape({}).isRequired,
  shortDescription: PropTypes.string,
  itemPartNumber: PropTypes.string,
  longDescription: PropTypes.string,
  relatedOutfits: PropTypes.shape({
    slots: PropTypes.arrayOf(PropTypes.shape({})),
  }),
};

ProductDetailContainer.defaultProps = {
  currentProduct: {},
  breadCrumbs: {},
  navTree: {},
  plpLabels: {},
  pdpLabels: {},
  isPickupModalOpen: false,
  addToBagError: '',
  shortDescription: '',
  itemPartNumber: '',
  longDescription: '',
  relatedOutfits: {},
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ProductDetailContainer);
export { ProductDetailContainer as ProductDetailContainerVanilla };
