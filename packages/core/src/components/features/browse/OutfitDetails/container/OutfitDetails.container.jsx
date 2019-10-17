import React from 'react';
import { connect } from 'react-redux';
import { PropTypes } from 'prop-types';
import OutfitDetails from '../views/index';
import {
  getLabels,
  getOutfitImage,
  getOutfitProducts,
  getAddedToBagErrorCatId,
} from './OutfitDetails.selectors';
import { getOutfitDetails } from './OutfitDetails.actions';
import { getPlpLabels } from '../../ProductDetail/container/ProductDetail.selectors';
import { isCanada, isMobileApp } from '../../../../../utils';
import { isPlccUser } from '../../../account/User/container/User.selectors';
import {
  getIsInternationalShipping,
  getCurrentCurrencySymbol,
  getCurrentCurrency,
} from '../../../../../reduxStore/selectors/session.selectors';
import { getCartItemInfo } from '../../../CnC/AddedToBag/util/utility';
import {
  addToCartEcom,
  clearAddToBagErrorState,
} from '../../../CnC/AddedToBag/container/AddedToBag.actions';
import { getAddedToBagError } from '../../../CnC/AddedToBag/container/AddedToBag.selectors';
import getAddedToBagFormValues from '../../../../../reduxStore/selectors/form.selectors';
import { PRODUCT_ADD_TO_BAG } from '../../../../../constants/reducer.constants';

class OutfitDetailsContainer extends React.PureComponent {
  componentDidMount() {
    const {
      getOutfit,
      router: { query },
      navigation,
    } = this.props;

    if (isMobileApp()) {
      const vendorColorProductIdsList = navigation.getParam('vendorColorProductIdsList');
      const outfitId = navigation.getParam('outfitId');
      // const vendorColorProductIdsList = '2101602_054-2044392_10-2110252_IV-2623363_IV-2079174_BQ';
      // const outfitId = '138548';
      getOutfit({ outfitId, vendorColorProductIdsList });
    } else {
      const { vendorColorProductIdsList, outfitId } = query;
      getOutfit({ outfitId, vendorColorProductIdsList });
    }
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
      currencySymbol,
      priceCurrency,
      currencyExchange,
      addToBagEcom,
      currentState,
      addToBagError,
      addToBagErrorId,
    } = this.props;
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
          currencySymbol={currencySymbol}
          priceCurrency={priceCurrency}
          currencyExchange={currencyExchange}
          handleAddToBag={this.handleAddToBag}
          addToBagEcom={addToBagEcom}
          currentState={currentState}
          addToBagError={addToBagError}
          addToBagErrorId={addToBagErrorId}
        />
      );
    }
    return null;
  }
}

const mapStateToProps = state => {
  return {
    labels: getLabels(state),
    outfitImageUrl: getOutfitImage(state),
    outfitProducts: getOutfitProducts(state),
    plpLabels: getPlpLabels(state),
    isCanada: isCanada(),
    isPlcc: isPlccUser(state),
    isInternationalShipping: getIsInternationalShipping(state),
    currencySymbol: getCurrentCurrencySymbol(state),
    priceCurrency: getCurrentCurrency(state),
    currencyExchange: [{ exchangevalue: 1 }], // TODO - fix this when currency exchange rate is available
    addToBagError: getAddedToBagError(state),
    addToBagErrorId: getAddedToBagErrorCatId(state),
    currentState: state,
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
  };
}

OutfitDetailsContainer.propTypes = {
  getOutfit: PropTypes.func.isRequired,
  labels: PropTypes.shape({}),
  outfitImageUrl: PropTypes.string,
  outfitProducts: PropTypes.shape({}),
  router: PropTypes.shape({
    query: PropTypes.shape({}),
  }),
  plpLabels: PropTypes.shape({}),
  isPlcc: PropTypes.bool,
  isInternationalShipping: PropTypes.bool,
  currencySymbol: PropTypes.string,
  priceCurrency: PropTypes.string,
  currencyExchange: PropTypes.string,
  addToBagEcom: PropTypes.func.isRequired,
  currentState: PropTypes.shape({}).isRequired,
  navigation: PropTypes.shape({}),
  addToBagError: PropTypes.string,
  addToBagErrorId: PropTypes.string,
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
  currencySymbol: '$',
  priceCurrency: 'USD',
  currencyExchange: [{ exchangevalue: 1 }],
  addToBagError: '',
  addToBagErrorId: '',
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(OutfitDetailsContainer);
