import React from 'react';

import PropTypes from 'prop-types';
import withStyles from '../../../../common/hoc/withStyles.native';
import ProductList from '../molecules/ProductList/views';
import { styles, PageContainer } from '../styles/ProductListing.style.native';
import FilterModal from '../molecules/FilterModal';

const ProductListView = ({
  products,
  filters,
  labelsFilter,
  breadCrumbs,
  onPressFilter,
  onPressSort,
  ...otherProps
}) => {
  return (
    <PageContainer>
      <FilterModal filters={filters} labelsFilter={labelsFilter} />
      <ProductList products={products} {...otherProps} />
    </PageContainer>
  );
};

ProductListView.propTypes = {
  products: PropTypes.arrayOf(PropTypes.shape({})),
  filters: PropTypes.shape({}),
  breadCrumbs: PropTypes.arrayOf(PropTypes.shape({})),
  labelsFilter: PropTypes.shape({}),
  onPressFilter: PropTypes.func.isRequired,
  onPressSort: PropTypes.func.isRequired,
};

ProductListView.defaultProps = {
  products: [],
  filters: {},
  breadCrumbs: [],
  labelsFilter: {},
};

export default withStyles(ProductListView, styles);
