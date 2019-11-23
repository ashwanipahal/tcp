import React from 'react';
import withIsomorphicRenderer from '@tcp/core/src/components/common/hoc/withIsomorphicRenderer';
import { toastMessageInfo } from '@tcp/core/src/components/common/atoms/Toast/container/Toast.actions.native';
import { PropTypes } from 'prop-types';
import OutfitDetails from '../views/index';
import {
  getLabels,
  getOutfitImage,
  getOutfitProducts,
  getAddedToBagErrorCatId,
  getPDPLabels,
} from './OutfitDetails.selectors';
import { getOutfitDetails } from './OutfitDetails.actions';
import {
  getPlpLabels,
  getCurrencyAttributes,
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
} from '../../../../../reduxStore/selectors/session.selectors';
import { getIsPickupModalOpen } from '../../../../common/organisms/PickupStoreModal/container/PickUpStoreModal.selectors';
import { getCartItemInfo } from '../../../CnC/AddedToBag/util/utility';
import {
  addToCartEcom,
  clearAddToBagErrorState,
} from '../../../CnC/AddedToBag/container/AddedToBag.actions';
import { getAddedToBagError } from '../../../CnC/AddedToBag/container/AddedToBag.selectors';
import getAddedToBagFormValues from '../../../../../reduxStore/selectors/form.selectors';
import { PRODUCT_ADD_TO_BAG } from '../../../../../constants/reducer.constants';
import { addItemsToWishlist } from '../../Favorites/container/Favorites.actions';

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
      labels,
      outfitImageUrl,
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
    } = this.props;
    const { outfitIdLocal } = this.state;
    if (outfitProducts) {
      return (
        <OutfitDetails
          labels={labels}
          outfitImageUrl={outfitImageUrl}
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
        />
      );
    }
    return null;
  }
}

OutfitDetailsContainer.pageInfo = {
  pageId: 'outfit',
};

const mapStateToProps = state => {
  return {
    labels: getLabels(state),
    outfitImageUrl: getOutfitImage(state),
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
  };
}

OutfitDetailsContainer.propTypes = {
  labels: PropTypes.shape({}),
  outfitImageUrl: PropTypes.string,
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
};

OutfitDetailsContainer.defaultProps = {
  labels: {},
  outfitImageUrl: '',
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
};

export default withIsomorphicRenderer({
  WrappedComponent: OutfitDetailsContainer,
  mapStateToProps,
  mapDispatchToProps,
});
