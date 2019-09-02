import React from 'react';
import { connect } from 'react-redux';
import { PropTypes } from 'prop-types';
import ProductDetail from '../views';

class ProductListingContainer extends React.PureComponent {
  componentDidMount() {
    const { getProducts } = this.props;
    getProducts();
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
    getProducts: payload => {
      console.log('here', payload, dispatch);
    },
  };
}

ProductListingContainer.propTypes = {
  products: PropTypes.arrayOf(PropTypes.shape({})),
  getProducts: PropTypes.func,
};

ProductListingContainer.defaultProps = {
  products: [],
  getProducts: () => {},
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ProductListingContainer);
