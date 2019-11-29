import React from 'react';
import withIsomorphicRenderer from '@tcp/core/src/components/common/hoc/withIsomorphicRenderer';
import { toastMessageInfo } from '@tcp/core/src/components/common/atoms/Toast/container/Toast.actions.native';
import { PropTypes } from 'prop-types';
import OutfitDetails from '../views/index';
import { trackPageView, setClickAnalyticsData } from '../../../../../analytics/actions';
import {
  getLabels,
  getOutfitImage,
  getOutfitProducts,
  getAddedToBagErrorCatId,
  getPDPLabels,
  getUnavailableCount,
  getLoadingState,
} from './OutfitDetails.selectors';
import { getOutfitDetails } from './OutfitDetails.actions';
import {
  getPlpLabels,
  getCurrencyAttributes,
  getPLPPromos,
} from '../../ProductDetail/container/ProductDetail.selectors';
import { isCanada, isMobileApp } from '../../../../../utils';
import {
  isPlccUser,
  getUserLoggedInState,
  isRememberedUser,
} from '../../../account/User/container/User.selectors';
import {
  getIsInternationalShipping,
  getCurrentCurrency,
  getIsKeepAliveProduct,
  getIsKeepAliveProductApp,
} from '../../../../../reduxStore/selectors/session.selectors';
import { getLabelsOutOfStock } from '../../ProductListing/container/ProductListing.selectors';
import { getIsPickupModalOpen } from '../../../../common/organisms/PickupStoreModal/container/PickUpStoreModal.selectors';
import { getCartItemInfo } from '../../../CnC/AddedToBag/util/utility';
import {
  addToCartEcom,
  clearAddToBagErrorState,
} from '../../../CnC/AddedToBag/container/AddedToBag.actions';
import { getAddedToBagError } from '../../../CnC/AddedToBag/container/AddedToBag.selectors';
import getAddedToBagFormValues from '../../../../../reduxStore/selectors/form.selectors';
import {
  PRODUCT_ADD_TO_BAG,
  OUTFIT_LISTING_FORM,
} from '../../../../../constants/reducer.constants';
import {
  removeAddToFavoriteErrorState,
  addItemsToWishlist,
} from '../../Favorites/container/Favorites.actions';
import { fetchAddToFavoriteErrorMsg } from '../../Favorites/container/Favorites.selectors';
import PRODUCTDETAIL_CONSTANTS from '../../ProductDetail/container/ProductDetail.constants';
import OutfitProductSkeleton from '../molecules/OutfitProductSkeleton';

class OutfitDetailsContainer extends React.PureComponent {
  static getInitialProps = async ({ props, query, isServer }) => {
    const { getOutfit, navigation } = props;
    if (isMobileApp()) {
      const vendorColorProductIdsList = navigation.getParam('vendorColorProductIdsList');
      const outfitId = navigation.getParam('outfitId');
      // TODO - these are dummy for mocking. Keeping these comments till we get real outfit details data from listing
      // const vendorColorProductIdsList = '2101602_054-2044392_10-2110252_IV-2623363_IV-2079174_BQ';
      // const outfitId = '138548';
      await getOutfit({ outfitId, vendorColorProductIdsList });
    } else {
      let vendorColorProductIdsList;
      let outfitId;
      if (isServer) {
        ({ vendorColorProductIdsList, outfitId } = query);
      } else {
        ({
          router: {
            query: { vendorColorProductIdsList, outfitId },
          },
        } = props);
      }
      await getOutfit({ outfitId, vendorColorProductIdsList });
    }
  };

  static getDerivedStateFromProps(nextProps, prevState) {
    const {
      router: {
        query: { outfitId: selectedOutfitId },
      },
    } = nextProps;
    return selectedOutfitId ? { ...prevState, outfitIdLocal: selectedOutfitId } : { ...prevState };
  }

  constructor(props) {
    super(props);
    this.state = {
      outfitIdLocal: '',
    };
  }

  handleAddToBag = (addToBagEcom, productInfo, generalProductId, currentState) => {
    // RWD-16438 Fix: Same form name is removed if user go from outfit to PDP and then press back button.
    const formName = !isMobileApp()
      ? `${PRODUCT_ADD_TO_BAG}-${generalProductId}`
      : `${OUTFIT_LISTING_FORM}-${generalProductId}`;
    const formValues = getAddedToBagFormValues(currentState, formName);
    let cartItemInfo = getCartItemInfo(productInfo, formValues);
    cartItemInfo = { ...cartItemInfo };
    addToBagEcom(cartItemInfo);
  };

  render() {
    const {
      labels,
      outfitImageUrl,
      unavailableCount,
      outfitProducts,
      plpLabels,
      isPlcc,
      isInternationalShipping,
      priceCurrency,
      currencyAttributes,
      addToBagEcom,
      addToFavorites,
      currentState,
      addToBagError,
      addToBagErrorId,
      isPickupModalOpen,
      isLoggedIn,
      navigation,
      pdpLabels,
      toastMessage,
      AddToFavoriteErrorMsg,
      removeAddToFavoritesErrorMsg,
      topPromos,
      router: { asPath: asPathVal },
      isKeepAliveEnabled,
      outOfStockLabels,
      isLoading,
      trackPageLoad,
    } = this.props;
    const { outfitIdLocal } = this.state;
    return (
      <React.Fragment>
        {outfitProducts ? (
          <OutfitDetails
            labels={labels}
            outfitImageUrl={outfitImageUrl}
            unavailableCount={unavailableCount}
            outfitProducts={outfitProducts}
            plpLabels={plpLabels}
            isCanada={isCanada()}
            isPlcc={isPlcc}
            isInternationalShipping={isInternationalShipping}
            currencySymbol={priceCurrency}
            currencyAttributes={currencyAttributes}
            handleAddToBag={this.handleAddToBag}
            addToBagEcom={addToBagEcom}
            currentState={currentState}
            addToBagError={addToBagError}
            addToBagErrorId={addToBagErrorId}
            isPickupModalOpen={isPickupModalOpen}
            addToFavorites={addToFavorites}
            isLoggedIn={isLoggedIn}
            navigation={navigation}
            outfitId={outfitIdLocal}
            pdpLabels={pdpLabels}
            toastMessage={toastMessage}
            AddToFavoriteErrorMsg={AddToFavoriteErrorMsg}
            removeAddToFavoritesErrorMsg={removeAddToFavoritesErrorMsg}
            asPathVal={asPathVal}
            topPromos={topPromos}
            isKeepAliveEnabled={isKeepAliveEnabled}
            outOfStockLabels={outOfStockLabels}
            trackPageLoad={trackPageLoad}
          />
        ) : null}
        {isLoading ? <OutfitProductSkeleton /> : null}
      </React.Fragment>
    );
  }
}

OutfitDetailsContainer.pageInfo = {
  pageId: 'outfit',
  pageData: {
    pageName: 'outfit',
    pageSection: 'outfit',
    pageSubSection: 'outfit',
    loadAnalyticsOnload: false,
  },
};

const mapStateToProps = state => {
  return {
    labels: getLabels(state),
    outfitImageUrl: getOutfitImage(state),
    isLoading: getLoadingState(state),
    unavailableCount: getUnavailableCount(state),
    outfitProducts: getOutfitProducts(state),
    plpLabels: getPlpLabels(state),
    isCanada: isCanada(),
    isPlcc: isPlccUser(state),
    isInternationalShipping: getIsInternationalShipping(state),
    priceCurrency: getCurrentCurrency(state),
    currencyAttributes: getCurrencyAttributes(state),
    addToBagError: getAddedToBagError(state),
    addToBagErrorId: getAddedToBagErrorCatId(state),
    currentState: state,
    isPickupModalOpen: getIsPickupModalOpen(state),
    isLoggedIn: getUserLoggedInState(state) && !isRememberedUser(state),
    pdpLabels: getPDPLabels(state),
    AddToFavoriteErrorMsg: fetchAddToFavoriteErrorMsg(state),
    topPromos: getPLPPromos(state, PRODUCTDETAIL_CONSTANTS.PROMO_TOP),
    isKeepAliveEnabled: isMobileApp()
      ? getIsKeepAliveProductApp(state)
      : getIsKeepAliveProduct(state),
    outOfStockLabels: getLabelsOutOfStock(state),
  };
};

function mapDispatchToProps(dispatch) {
  return {
    getOutfit: payload => {
      dispatch(getOutfitDetails(payload));
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
    toastMessage: payload => {
      dispatch(toastMessageInfo(payload));
    },
    removeAddToFavoritesErrorMsg: payload => {
      dispatch(removeAddToFavoriteErrorState(payload));
    },
    trackPageLoad: payload => {
      const { products } = payload;
      dispatch(
        setClickAnalyticsData({
          products,
        })
      );
      setTimeout(() => {
        dispatch(
          trackPageView({
            props: {
              initialProps: {
                pageProps: {
                  pageData: {
                    ...payload,
                  },
                },
              },
            },
          })
        );
        setTimeout(() => {
          dispatch(setClickAnalyticsData({}));
        }, 200);
      }, 100);
    },
  };
}

OutfitDetailsContainer.propTypes = {
  labels: PropTypes.shape({}),
  outfitImageUrl: PropTypes.string,
  unavailableCount: PropTypes.number,
  outfitProducts: PropTypes.shape({}),
  router: PropTypes.shape({
    query: PropTypes.shape({}),
  }),
  plpLabels: PropTypes.shape({}),
  isPlcc: PropTypes.bool,
  isInternationalShipping: PropTypes.bool,
  priceCurrency: PropTypes.string,
  currencyAttributes: PropTypes.shape({}),
  addToBagEcom: PropTypes.func.isRequired,
  currentState: PropTypes.shape({}).isRequired,
  navigation: PropTypes.shape({}),
  addToBagError: PropTypes.string,
  addToBagErrorId: PropTypes.string,
  isPickupModalOpen: PropTypes.bool,
  addToFavorites: PropTypes.func.isRequired,
  isLoggedIn: PropTypes.bool,
  pdpLabels: PropTypes.shape({}),
  toastMessage: PropTypes.func,
  AddToFavoriteErrorMsg: PropTypes.string,
  removeAddToFavoritesErrorMsg: PropTypes.func,
  isKeepAliveEnabled: PropTypes.bool,
  outOfStockLabels: PropTypes.shape({}),
};

OutfitDetailsContainer.defaultProps = {
  labels: {},
  outfitImageUrl: '',
  unavailableCount: 0,
  outfitProducts: null,
  router: {
    query: {},
  },
  navigation: {},
  plpLabels: {},
  isPlcc: false,
  isInternationalShipping: false,
  priceCurrency: 'USD',
  currencyAttributes: { exchangevalue: 1 },
  addToBagError: '',
  addToBagErrorId: '',
  isPickupModalOpen: false,
  isLoggedIn: false,
  pdpLabels: {},
  toastMessage: () => {},
  AddToFavoriteErrorMsg: '',
  removeAddToFavoritesErrorMsg: () => {},
  isKeepAliveEnabled: false,
  outOfStockLabels: {},
};

export default withIsomorphicRenderer({
  WrappedComponent: OutfitDetailsContainer,
  mapStateToProps,
  mapDispatchToProps,
});
