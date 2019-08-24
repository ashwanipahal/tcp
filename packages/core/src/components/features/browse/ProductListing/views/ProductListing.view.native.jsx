import React from 'react';
import PropTypes from 'prop-types';
import ProductList from '../molecules/ProductList/views';

const ProductListView = ({
  className,
  products,
  currentNavIds,
  navTree,
  breadCrumbs,
  ...otherProps
}) => {
  return <ProductList products={products} {...otherProps} />;
};

ProductListView.propTypes = {
  products: PropTypes.arrayOf(PropTypes.shape({})),
  breadCrumbs: PropTypes.arrayOf(PropTypes.shape({})),
};

ProductListView.defaultProps = {
  className: '',
  products: [],
};

export default ProductListView;
