import React from 'react';
import { connect } from 'react-redux';
import { PropTypes } from 'prop-types';
import ProductDetail from '../views';
import { getProductDetails } from './ProductDetail.actions';
import { getNavTree, prodDetails, getBreadCrumbs } from './ProductDetail.selectors';

class ProductListingContainer extends React.PureComponent {
  componentDidMount() {
    const { getDetails } = this.props;
    getDetails({ productColorId: '2036238' });
  }

  render() {
    const { productDetails, breadCrumbs, ...otherProps } = this.props;
    console.log('productDetails in container', productDetails);
    return (
      <ProductDetail
        productDetails={productDetails}
        breadCrumbs={breadCrumbs}
        otherProps={otherProps}
      />
    );
  }
}

function mapStateToProps(state) {
  return {
    navTree: getNavTree(state),
    productDetails: prodDetails(state),
    breadCrumbs: getBreadCrumbs(state),
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
  breadCrumbs: PropTypes.shape({}),
};

ProductListingContainer.defaultProps = {
  productDetails: [],
  breadCrumbs: {},
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ProductListingContainer);
