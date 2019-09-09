import React from 'react';
import { connect } from 'react-redux';
import { PropTypes } from 'prop-types';
import ProductDetail from '../views';
import { getProductDetails } from './ProductDetail.actions';
import {
  getNavTree,
  prodDetails,
  getBreadCrumbs,
  getDescription,
  getRatingsProductId,
} from './ProductDetail.selectors';

class ProductListingContainer extends React.PureComponent {
  componentDidMount() {
    const { getDetails } = this.props;
    getDetails({ productColorId: '2036238' });
  }

  render() {
    const {
      productDetails,
      breadCrumbs,
      longDescription,
      ratingsProductId,
      ...otherProps
    } = this.props;
    return (
      <ProductDetail
        productDetails={productDetails}
        breadCrumbs={breadCrumbs}
        longDescription={longDescription}
        ratingsProductId={ratingsProductId}
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
    longDescription: getDescription(state),
    ratingsProductId: getRatingsProductId(state),
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
  longDescription: PropTypes.string,
  ratingsProductId: PropTypes.string,
};

ProductListingContainer.defaultProps = {
  productDetails: [],
  breadCrumbs: {},
  longDescription: '',
  ratingsProductId: '',
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ProductListingContainer);
