import React from 'react';
import PropTypes from 'prop-types';
import BodyCopy from '@tcp/core/src/components/common/atoms/BodyCopy';
import withStyles from '../../../../common/hoc/withStyles.native';
import ProductList from '../molecules/ProductList/views';
import QuickViewModal from '../../../../common/organisms/QuickViewModal/container/QuickViewModal.container';
import {
  styles,
  PageContainer,
  ItemCountContainer,
  ListHeaderContainer,
} from '../styles/ProductListing.style.native';
import FilterModal from '../molecules/FilterModal';
import AddedToBagContainer from '../../../CnC/AddedToBag';

const renderItemCountView = itemCount => {
  if (itemCount === undefined) {
    return itemCount;
  }

  return (
    <ItemCountContainer>
      <BodyCopy
        dataLocator="pdp_product_badges"
        mobileFontFamily="secondary"
        fontSize="fs14"
        fontWeight="semibold"
        color="gray.900"
        text={`${itemCount} `}
      />
      <BodyCopy
        dataLocator="pdp_product_badges"
        mobileFontFamily="secondary"
        fontSize="fs14"
        fontWeight="regular"
        color="gray.900"
        text="Items"
      />
    </ItemCountContainer>
  );
};

const onRenderHeader = (
  filters,
  labelsFilter,
  onSubmit,
  getProducts,
  navigation,
  sortLabels,
  totalProductsInCurrCategory
) => {
  return (
    <React.Fragment>
      <ListHeaderContainer>
        <FilterModal
          filters={filters}
          labelsFilter={labelsFilter}
          onSubmit={onSubmit}
          getProducts={getProducts}
          navigation={navigation}
          sortLabels={sortLabels}
        />
        {renderItemCountView(totalProductsInCurrCategory)}
      </ListHeaderContainer>
    </React.Fragment>
  );
};

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
  totalProductsInCurrCategory,
  scrollToTop,
  onPickUpOpenClick,
  ...otherProps
}) => {
  const title = navigation && navigation.getParam('title');
  return (
    <PageContainer>
      <ProductList
        products={products}
        title={title}
        scrollToTop={scrollToTop}
        totalProductsInCurrCategory={totalProductsInCurrCategory}
        onRenderHeader={() =>
          onRenderHeader(
            filters,
            labelsFilter,
            onSubmit,
            getProducts,
            navigation,
            sortLabels,
            totalProductsInCurrCategory
          )
        }
        {...otherProps}
      />
      <QuickViewModal navigation={navigation} onPickUpOpenClick={onPickUpOpenClick} />
      <AddedToBagContainer navigation={navigation} />
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
  totalProductsInCurrCategory: PropTypes.number.isRequired,
  scrollToTop: PropTypes.bool.isRequired,
  onPickUpOpenClick: PropTypes.func,
};

ProductListView.defaultProps = {
  products: [],
  filters: {},
  breadCrumbs: [],
  labelsFilter: {},
  navigation: {},
  sortLabels: [],
  onPickUpOpenClick: () => {},
};

export default withStyles(ProductListView, styles);
