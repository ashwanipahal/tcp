import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'next/router'; // eslint-disable-line
import { PropTypes } from 'prop-types';
import ProductDetail from '../views';
import { getProductDetails } from './ProductDetail.actions';
import {
  getNavTree,
  prodDetails,
  getBreadCrumbs,
  getDescription,
  getRatingsProductId,
  getDefaultImage,
  getCurrentCurrency,
  getPlpLabels,
  getCurrentProduct,
  getPDPLabels,
} from './ProductDetail.selectors';

class ProductListingContainer extends React.PureComponent {
  componentDidMount() {
    const {
      getDetails,
      router: {
        query: { pid },
      },
    } = this.props;

    // TODO - fix this to extract the product ID from the page.
    const id = pid && pid.split('-');
    let productId = id && id.length > 1 ? `${id[id.length - 2]}_${id[id.length - 1]}` : pid;
    if (
      (id.indexOf('Gift') > -1 || id.indexOf('gift') > -1) &&
      (id.indexOf('Card') > -1 || id.indexOf('card') > -1)
    ) {
      productId = 'gift';
    }

    getDetails({ productColorId: productId });
    window.scrollTo(0, 100);
  }

  render() {
    const {
      productDetails,
      breadCrumbs,
      longDescription,
      ratingsProductId,
      defaultImage,
      productInfo,
      currency,
      plpLabels,
      pdpLabels,
      ...otherProps
    } = this.props;
    return (
      <ProductDetail
        productDetails={productDetails}
        breadCrumbs={breadCrumbs}
        longDescription={longDescription}
        ratingsProductId={ratingsProductId}
        otherProps={otherProps}
        defaultImage={defaultImage}
        plpLabels={plpLabels}
        pdpLabels={pdpLabels}
        currency={currency}
        productInfo={productInfo}
      />
    );
  }
}

function mapStateToProps(state) {
  return {
    navTree: getNavTree(state),
    productDetails: prodDetails(state),
    breadCrumbs: getBreadCrumbs(state),
    longDescription: getDescription(state),
    ratingsProductId: getRatingsProductId(state),
    // This is just to check if the product is correct
    defaultImage: getDefaultImage(state),
    productInfo: getCurrentProduct(state),
    currency: getCurrentCurrency(state),
    plpLabels: getPlpLabels(state),
    pdpLabels: getPDPLabels(state),
  };
}

function mapDispatchToProps(dispatch) {
  return {
    getDetails: payload => {
      dispatch(getProductDetails(payload));
    },
  };
}

ProductListingContainer.propTypes = {
  productDetails: PropTypes.arrayOf(PropTypes.shape({})),
  getDetails: PropTypes.func.isRequired,
  productInfo: PropTypes.arrayOf(PropTypes.shape({})),
  breadCrumbs: PropTypes.shape({}),
  pdpLabels: PropTypes.shape({}),
  longDescription: PropTypes.string,
  ratingsProductId: PropTypes.string,
  router: PropTypes.shape({
    query: PropTypes.shape({
      pid: PropTypes.string,
    }),
  }).isRequired,
  defaultImage: PropTypes.string,
  currency: PropTypes.string,
  plpLabels: PropTypes.shape({
    lbl_sort: PropTypes.string,
  }),
};

ProductListingContainer.defaultProps = {
  productDetails: [],
  productInfo: {},
  breadCrumbs: null,
  longDescription: '',
  ratingsProductId: '',
  defaultImage: '',
  currency: '',
  plpLabels: {
    lbl_sort: '',
  },
  pdpLabels: {},
};

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(ProductListingContainer)
);
