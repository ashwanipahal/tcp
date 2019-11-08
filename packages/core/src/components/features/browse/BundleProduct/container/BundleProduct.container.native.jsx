import React from 'react';
import { connect } from 'react-redux';
import { PropTypes } from 'prop-types';
import { getProductDetails } from './BundleProduct.actions';
import ProductBundle from '../views';
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
} from './BundleProduct.selectors';

class ProductBundleContainer extends React.PureComponent {
  selectedColorProductId;

  constructor(props) {
    super(props);
    const { navigation } = props;
    this.selectedColorProductId = navigation && navigation.getParam('selectedColorProductId');
  }

  componentDidMount() {
    this.makeApiCall();
  }

  makeApiCall = () => {
    const { getDetails, navigation } = this.props;
    const productId = this.extractPID(navigation);
    getDetails({ productId, ignoreCache: true });
  };

  extractPID = navigation => {
    const pid = (navigation && navigation.getParam('pdpUrl')) || '';
    // TODO - fix this to extract the product ID from the page.
    const id = pid && pid.split('-');
    return id && id.length > 1 ? id[id.length - 1] : pid;
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
    } = this.props;
    return (
      <ProductBundle
        currentProduct={currentProduct}
        selectedColorProductId={this.selectedColorProductId}
        plpLabels={plpLabels}
        pdpLabels={pdpLabels}
        navigation={navigation}
        shortDescription={shortDescription}
        itemPartNumber={itemPartNumber}
        longDescription={longDescription}
        currency={currency}
        currencyExchange={currencyAttributes.exchangevalue}
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
    plpLabels: getPlpLabels(state),
    pdpLabels: getPDPLabels(state),
    shortDescription: getShortDescription(state),
    longDescription: getDescription(state),
    itemPartNumber: getGeneralProductId(state),
    currency: getCurrentCurrency(state),
    currencyAttributes: getCurrencyAttributes(state),
    alternateSizes: getAlternateSizes(state),
  };
}

function mapDispatchToProps(dispatch) {
  return {
    getDetails: payload => {
      dispatch(getProductDetails(payload));
    },
  };
}

ProductBundleContainer.propTypes = {
  getDetails: PropTypes.func.isRequired,
  navigation: PropTypes.shape({}).isRequired,
  currentProduct: PropTypes.shape({}),
  plpLabels: PropTypes.shape({}),
  pdpLabels: PropTypes.shape({}),
  shortDescription: PropTypes.string,
  itemPartNumber: PropTypes.string,
  longDescription: PropTypes.string,
  currency: PropTypes.string,
  currencyAttributes: PropTypes.shape({}),
};

ProductBundleContainer.defaultProps = {
  currentProduct: {},
  plpLabels: {},
  pdpLabels: {},
  shortDescription: '',
  itemPartNumber: '',
  longDescription: '',
  currency: 'USD',
  currencyAttributes: {
    exchangevalue: 1,
  },
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ProductBundleContainer);

export { ProductBundleContainer as ProductBundleContainerVanilla };
