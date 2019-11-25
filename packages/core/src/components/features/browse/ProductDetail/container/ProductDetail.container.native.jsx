import React from 'react';
import { connect } from 'react-redux';
import { PropTypes } from 'prop-types';
import { toastMessageInfo } from '@tcp/core/src/components/common/atoms/Toast/container/Toast.actions.native';
import { getIsKeepAliveProductApp } from '@tcp/core/src/reduxStore/selectors/session.selectors';
import { getLabelsOutOfStock } from '../../ProductListing/container/ProductListing.selectors';
import ProductDetail from '../views';
import { Spinner } from '../../../../common/atoms';
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
  getCurrentCurrency,
  getCurrencyAttributes,
  getAlternateSizes,
  getPLPPromos,
} from './ProductDetail.selectors';
import { getIsPickupModalOpen } from '../../../../common/organisms/PickupStoreModal/container/PickUpStoreModal.selectors';
import {
  addToCartEcom,
  clearAddToBagErrorState,
} from '../../../CnC/AddedToBag/container/AddedToBag.actions';
import { getAddedToBagError } from '../../../CnC/AddedToBag/container/AddedToBag.selectors';
import { getCartItemInfo } from '../../../CnC/AddedToBag/util/utility';
import {
  getUserLoggedInState,
  isRememberedUser,
} from '../../../account/User/container/User.selectors';
import {
  addItemsToWishlist,
  removeAddToFavoriteErrorState,
} from '../../Favorites/container/Favorites.actions';

import { fetchAddToFavoriteErrorMsg } from '../../Favorites/container/Favorites.selectors';
import PRODUCTDETAIL_CONSTANTS from './ProductDetail.constants';

class ProductDetailContainer extends React.PureComponent {
  selectedColorProductId;

  constructor(props) {
    super(props);
    const { navigation } = props;
    // eslint-disable-next-line react/prop-types
    this.selectedColorProductId = navigation && navigation.getParam('selectedColorProductId');
  }

  componentDidMount() {
    const { getDetails, navigation } = this.props;
    const productId = this.extractPID(navigation);
    getDetails({ productColorId: productId, ignoreCache: true });
  }

  componentDidUpdate() {
    const { navigation, currentProduct: { generalProductId } = {}, getDetails } = this.props;
    const productId = this.extractPID(navigation);
    if (generalProductId && productId && productId !== generalProductId) {
      getDetails({ productColorId: productId, ignoreCache: true });
    }
  }

  handleAddToBag = () => {
    const { addToBagEcom, formValues, currentProduct } = this.props;
    let cartItemInfo = getCartItemInfo(currentProduct, formValues);
    cartItemInfo = { ...cartItemInfo };
    addToBagEcom(cartItemInfo);
  };

  extractPID = navigation => {
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
    return productId;
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
      onAddItemToFavorites,
      isLoggedIn,
      currency,
      currencyAttributes,
      alternateSizes,
      AddToFavoriteErrorMsg,
      removeAddToFavoritesErrorMsg,
      toastMessage,
      isKeepAliveEnabled,
      outOfStockLabels,
      middlePromos,
      bottomPromos,
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
            onAddItemToFavorites={onAddItemToFavorites}
            isLoggedIn={isLoggedIn}
            currency={currency}
            currencyExchange={currencyAttributes.exchangevalue}
            alternateSizes={alternateSizes}
            AddToFavoriteErrorMsg={AddToFavoriteErrorMsg}
            removeAddToFavoritesErrorMsg={removeAddToFavoritesErrorMsg}
            toastMessage={toastMessage}
            isKeepAliveEnabled={isKeepAliveEnabled}
            outOfStockLabels={outOfStockLabels}
            middlePromos={middlePromos}
            bottomPromos={bottomPromos}
          />
        ) : (
          <Spinner />
        )}
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
    isLoggedIn: getUserLoggedInState(state) && !isRememberedUser(state),
    currency: getCurrentCurrency(state),
    currencyAttributes: getCurrencyAttributes(state),
    alternateSizes: getAlternateSizes(state),
    AddToFavoriteErrorMsg: fetchAddToFavoriteErrorMsg(state),
    isKeepAliveEnabled: getIsKeepAliveProductApp(state),
    outOfStockLabels: getLabelsOutOfStock(state),
    middlePromos: getPLPPromos(state, PRODUCTDETAIL_CONSTANTS.PROMO_MIDDLE),
    bottomPromos: getPLPPromos(state, PRODUCTDETAIL_CONSTANTS.PROMO_BOTTOM),
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
    onAddItemToFavorites: payload => {
      dispatch(addItemsToWishlist(payload));
    },
    removeAddToFavoritesErrorMsg: payload => {
      dispatch(removeAddToFavoriteErrorState(payload));
    },
    toastMessage: payload => {
      dispatch(toastMessageInfo(payload));
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
  onAddItemToFavorites: PropTypes.func,
  isLoggedIn: PropTypes.bool,
  currency: PropTypes.string,
  currencyAttributes: PropTypes.shape({
    exchangevalue: PropTypes.string,
  }),
  alternateSizes: PropTypes.shape({
    key: PropTypes.string,
  }),
  AddToFavoriteErrorMsg: PropTypes.string,
  removeAddToFavoritesErrorMsg: PropTypes.func,
  toastMessage: PropTypes.func,
  isKeepAliveEnabled: PropTypes.bool,
  outOfStockLabels: PropTypes.shape({}),
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
  onAddItemToFavorites: null,
  isLoggedIn: false,
  currency: 'USD',
  currencyAttributes: {
    exchangevalue: 1,
  },
  alternateSizes: {},
  AddToFavoriteErrorMsg: '',
  removeAddToFavoritesErrorMsg: () => {},
  toastMessage: () => {},
  isKeepAliveEnabled: false,
  outOfStockLabels: {},
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ProductDetailContainer);
export { ProductDetailContainer as ProductDetailContainerVanilla };
