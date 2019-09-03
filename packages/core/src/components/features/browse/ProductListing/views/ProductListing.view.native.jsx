import React from 'react';
import PropTypes from 'prop-types';
import withStyles from '../../../../common/hoc/withStyles.native';
import ProductList from '../molecules/ProductList/views';
import { styles, PageContainer } from '../styles/ProductListing.style.native';

const ProductListView = ({ products, breadCrumbs, ...otherProps }) => {
  return (
    <PageContainer>
      <ProductList products={products} {...otherProps} />
    </PageContainer>
  );
};

ProductListView.propTypes = {
  products: PropTypes.arrayOf(PropTypes.shape({})),
  breadCrumbs: PropTypes.arrayOf(PropTypes.shape({})),
};

ProductListView.defaultProps = {
  products: [],
  breadCrumbs: [],
};

export default withStyles(ProductListView, styles);
