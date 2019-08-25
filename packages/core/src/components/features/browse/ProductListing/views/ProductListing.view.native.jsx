import React from 'react';
import PropTypes from 'prop-types';
import ProductList from '../molecules/ProductList/views';

const ProductListView = ({ products, breadCrumbs, ...otherProps }) => {
  return <ProductList products={products} {...otherProps} />;
};

ProductListView.propTypes = {
  products: PropTypes.arrayOf(PropTypes.shape({})),
  breadCrumbs: PropTypes.arrayOf(PropTypes.shape({})),
};

ProductListView.defaultProps = {
  products: [],
  breadCrumbs: [],
};

export default ProductListView;
