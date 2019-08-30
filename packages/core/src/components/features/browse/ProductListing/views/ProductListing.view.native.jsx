import React from 'react';

import PropTypes from 'prop-types';
import withStyles from '../../../../common/hoc/withStyles.native';
import ProductList from '../molecules/ProductList/views';
import { styles, PageContainer } from '../styles/ProductListing.style.native';
import FilterButtons from '../molecules/FilterButtons';

const ProductListView = ({ products, labelsFilter, breadCrumbs, ...otherProps }) => {
  return (
    <PageContainer>
      <FilterButtons labelsFilter={labelsFilter} />
      <ProductList products={products} {...otherProps} />
    </PageContainer>
  );
};

ProductListView.propTypes = {
  products: PropTypes.arrayOf(PropTypes.shape({})),
  breadCrumbs: PropTypes.arrayOf(PropTypes.shape({})),
  labelsFilter: PropTypes.shape({}),
};

ProductListView.defaultProps = {
  products: [],
  breadCrumbs: [],
  labelsFilter: {},
};

export default withStyles(ProductListView, styles);
