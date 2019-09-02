import React from 'react';
import { connect } from 'react-redux';
import { PropTypes } from 'prop-types';
import ProductDetail from '../views';
import { getProductDetails } from './ProductDetail.actions';

class ProductListingContainer extends React.PureComponent {
  componentDidMount() {
    console.log('comes here 1 ');
    const { getDetails } = this.props;
    getDetails();
  }

  render() {
    const { products, ...otherProps } = this.props;
    return <ProductDetail otherProps={otherProps} />;
  }
}

function mapStateToProps(state) {
  return {
    products: {},
    state,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    getDetails: payload => {
      console.log('comes here 2 ');
      dispatch(getProductDetails(payload));
    },
  };
}

ProductListingContainer.propTypes = {
  products: PropTypes.arrayOf(PropTypes.shape({})),
  getDetails: PropTypes.func.isRequired,
};

ProductListingContainer.defaultProps = {
  products: [],
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ProductListingContainer);
