import React from 'react';
import { connect } from 'react-redux';
import { PropTypes } from 'prop-types';
import { withRouter } from 'next/router'; // eslint-disable-line
import OutfitDetails from '../views/index';
import { getLabels, getOutfitImage, getOutfitProducts } from './OutfitDetails.selectors';
import { getOutfitDetails } from './OutfitDetails.actions';
import { getPlpLabels } from '../../ProductDetail/container/ProductDetail.selectors';
import { isCanada } from '../../../../../utils';
import { isPlccUser } from '../../../account/User/container/User.selectors';
import {
  getIsInternationalShipping,
  getCurrentCurrencySymbol,
  getCurrentCurrency,
} from '../../../../../reduxStore/selectors/session.selectors';

class OutfitDetailsContainer extends React.PureComponent {
  componentDidMount() {
    const {
      getOutfit,
      router: {
        query: { vendorColorProductIdsList, outfitId },
      },
    } = this.props;
    getOutfit({ outfitId, vendorColorProductIdsList });
  }

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
        />
      );
    }
    return '';
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
    currencyExchange: '1', // TODO - fix this when currency exchange rate is available
  };
};

function mapDispatchToProps(dispatch) {
  return {
    getOutfit: payload => {
      dispatch(getOutfitDetails(payload));
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
};

OutfitDetailsContainer.defaultProps = {
  labels: {},
  outfitImageUrl: '',
  outfitProducts: null,
  router: {
    query: {},
  },
  plpLabels: {},
  isPlcc: false,
  isInternationalShipping: false,
  currencySymbol: '$',
  priceCurrency: 'USD',
  currencyExchange: '1',
};

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(OutfitDetailsContainer)
);
