import React from 'react';
import { connect } from 'react-redux';
import { PropTypes } from 'prop-types';
import { getProductDetails } from './BundleProduct.actions';
import BundleProduct from '../views';
import {
  getCurrentProduct,
  getPlpLabels,
  getPDPLabels,
  getShortDescription,
  getGeneralProductId,
  getDescription,
  getCurrentCurrency,
  getCurrencyAttributes,
  getAlternateSizes,
  getCurrentBundle,
  getAddedToBagErrorCatId,
  getBreadCrumbs,
  prodDetails,
  getOutfitLabels,
} from './BundleProduct.selectors';
import getAddedToBagFormValues from '../../../../../reduxStore/selectors/form.selectors';
import { PRODUCT_ADD_TO_BAG } from '../../../../../constants/reducer.constants';
import { getCartItemInfo } from '../../../CnC/AddedToBag/util/utility';
import {
  addToCartEcom,
  clearAddToBagErrorState,
} from '../../../CnC/AddedToBag/container/AddedToBag.actions';
import { getAddedToBagError } from '../../../CnC/AddedToBag/container/AddedToBag.selectors';
import { getIsPickupModalOpen } from '../../../../common/organisms/PickupStoreModal/container/PickUpStoreModal.selectors';
import {
  addItemsToWishlist,
  removeAddToFavoriteErrorState,
} from '../../Favorites/container/Favorites.actions';
import {
  isPlccUser,
  getUserLoggedInState,
  isRememberedUser,
} from '../../../account/User/container/User.selectors';
import { fetchAddToFavoriteErrorMsg } from '../../Favorites/container/Favorites.selectors';

export class ProductBundleContainer extends React.PureComponent {
  selectedColorProductId;

  constructor(props) {
    super(props);
    const { navigation } = props;
    this.selectedColorProductId =
      (navigation && navigation.getParam('selectedColorProductId')) || '';
  }

  componentDidMount() {
    const { navigation } = this.props;
    this.makeApiCall();
    if (!navigation) window.scrollTo(0, 100);
  }

  makeApiCall = () => {
    const { getDetails } = this.props;
    const productId = this.extractPID();
    getDetails({ productId, ignoreCache: true });
  };

  extractPID = () => {
    const { router, navigation } = this.props;
    let pid;
    if (navigation) {
      pid = navigation.getParam('pdpUrl');
    } else {
      pid = router.query.bid || '';
    }

    const id = pid && pid.split('-');
    return id && id.length > 1 ? id[id.length - 1] : pid;
  };

  handleAddToBag = (addToBagEcom, productInfo, generalProductId, currentState) => {
    const formValues = getAddedToBagFormValues(
      currentState,
      `${PRODUCT_ADD_TO_BAG}-${generalProductId}`
    );
    let cartItemInfo = getCartItemInfo(productInfo, formValues);
    cartItemInfo = { ...cartItemInfo };
    addToBagEcom(cartItemInfo);
  };

  render() {
    const {
      currentProduct,
      plpLabels,
      pdpLabels,
      navigation,
      longDescription,
      shortDescription,
      itemPartNumber,
      currency,
      currencyAttributes,
      currentBundle,
      addToBagEcom,
      currentState,
      addToBagError,
      addToBagErrorId,
      isPickupModalOpen,
      addToFavorites,
      isLoggedIn,
      isPlcc,
      AddToFavoriteErrorMsg,
      removeAddToFavoritesErrorMsg,
      breadCrumbs,
      productDetails,
      outfitLabels,
    } = this.props;
    return (
      <BundleProduct
        currentProduct={currentProduct}
        selectedColorProductId={this.selectedColorProductId}
        plpLabels={plpLabels}
        pdpLabels={pdpLabels}
        outfitLabels={outfitLabels}
        navigation={navigation}
        shortDescription={shortDescription}
        itemPartNumber={itemPartNumber}
        longDescription={longDescription}
        currency={currency}
        currencyExchange={currencyAttributes.exchangevalue}
        currentBundle={currentBundle}
        handleAddToBag={this.handleAddToBag}
        addToBagEcom={addToBagEcom}
        currentState={currentState}
        addToBagError={addToBagError}
        addToBagErrorId={addToBagErrorId}
        isPickupModalOpen={isPickupModalOpen}
        addToFavorites={addToFavorites}
        isLoggedIn={isLoggedIn}
        isPlcc={isPlcc}
        AddToFavoriteErrorMsg={AddToFavoriteErrorMsg}
        removeAddToFavoritesErrorMsg={removeAddToFavoritesErrorMsg}
        breadCrumbs={breadCrumbs}
        productDetails={productDetails}
      />
    );
  }
}

ProductBundleContainer.pageInfo = {
  pageId: 'b',
};
function mapStateToProps(state) {
  return {
    currentProduct: getCurrentProduct(state),
    productDetails: prodDetails(state),
    plpLabels: getPlpLabels(state),
    pdpLabels: getPDPLabels(state),
    shortDescription: getShortDescription(state),
    longDescription: getDescription(state),
    itemPartNumber: getGeneralProductId(state),
    currency: getCurrentCurrency(state),
    currencyAttributes: getCurrencyAttributes(state),
    alternateSizes: getAlternateSizes(state),
    currentBundle: getCurrentBundle(state),
    currentState: state,
    addToBagError: getAddedToBagError(state),
    addToBagErrorId: getAddedToBagErrorCatId(state),
    isPickupModalOpen: getIsPickupModalOpen(state),
    isLoggedIn: getUserLoggedInState(state) && !isRememberedUser(state),
    isPlcc: isPlccUser(state),
    AddToFavoriteErrorMsg: fetchAddToFavoriteErrorMsg(state),
    breadCrumbs: getBreadCrumbs(state),
    outfitLabels: getOutfitLabels(state),
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
    addToFavorites: payload => {
      dispatch(addItemsToWishlist(payload));
    },
    removeAddToFavoritesErrorMsg: payload => {
      dispatch(removeAddToFavoriteErrorState(payload));
    },
  };
}

ProductBundleContainer.propTypes = {
  getDetails: PropTypes.func.isRequired,
  navigation: PropTypes.shape({}).isRequired,
  currentProduct: PropTypes.shape({}).isRequired,
  currentBundle: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  plpLabels: PropTypes.shape({}),
  pdpLabels: PropTypes.shape({}),
  shortDescription: PropTypes.string,
  itemPartNumber: PropTypes.string,
  longDescription: PropTypes.string,
  currency: PropTypes.string,
  currencyAttributes: PropTypes.shape({}),
  addToBagEcom: PropTypes.func,
  currentState: PropTypes.shape({}),
  addToBagError: PropTypes.string,
  addToBagErrorId: PropTypes.string,
  isPickupModalOpen: PropTypes.bool,
  addToFavorites: PropTypes.func,
  isLoggedIn: PropTypes.bool,
  isPlcc: PropTypes.bool,
  router: PropTypes.shape({}).isRequired,
  AddToFavoriteErrorMsg: PropTypes.string,
  removeAddToFavoritesErrorMsg: PropTypes.func,
  breadCrumbs: PropTypes.shape({}),
  productDetails: PropTypes.arrayOf(PropTypes.shape({})),
  formValues: PropTypes.shape({}).isRequired,
  outfitLabels: PropTypes.shape({}),
};

ProductBundleContainer.defaultProps = {
  plpLabels: {},
  pdpLabels: {},
  outfitLabels: {},
  shortDescription: '',
  itemPartNumber: '',
  longDescription: '',
  currency: 'USD',
  currencyAttributes: {
    exchangevalue: 1,
  },
  addToBagEcom: () => {},
  currentState: {},
  addToBagError: '',
  addToBagErrorId: '',
  isPickupModalOpen: false,
  addToFavorites: () => {},
  isLoggedIn: false,
  isPlcc: false,
  AddToFavoriteErrorMsg: '',
  removeAddToFavoritesErrorMsg: () => {},
  breadCrumbs: [],
  productDetails: [],
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ProductBundleContainer);
