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
  onSubmit,
  getProducts,
  navigation,
  sortLabels,
  ...otherProps
}) => {
  const title = navigation && navigation.getParam('title');
  return (
    <PageContainer>
      <FilterModal
        filters={filters}
        labelsFilter={labelsFilter}
        onSubmit={onSubmit}
        getProducts={getProducts}
        navigation={navigation}
        sortLabels={sortLabels}
      />
      <ProductList products={products} title={title} {...otherProps} />
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
  onSubmit: PropTypes.func.isRequired,
  getProducts: PropTypes.func.isRequired,
  navigation: PropTypes.objectOf(PropTypes.oneOfType([PropTypes.string])),
  sortLabels: PropTypes.arrayOf(PropTypes.shape({})),
};

ProductListView.defaultProps = {
  products: [],
  filters: {},
  breadCrumbs: [],
  labelsFilter: {},
  navigation: {},
  sortLabels: [],
};

export default withStyles(ProductListView, styles);
