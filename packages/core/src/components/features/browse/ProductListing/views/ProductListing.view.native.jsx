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
import PickupStoreModal from '../../../../common/organisms/PickupStoreModal';
import PLPSkeleton from '../../../../common/atoms/PLPSkeleton';

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

const onRenderHeader = data => {
  const {
    filters,
    labelsFilter,
    onSubmit,
    getProducts,
    navigation,
    sortLabels,
    totalProductsCount,
    isFavorite,
    onFilterSelection,
    onSortSelection,
    filteredId,
    renderBrandFilter,
  } = data;
  return (
    <ListHeaderContainer>
      <FilterModal
        filters={filters}
        labelsFilter={labelsFilter}
        onSubmit={onSubmit}
        getProducts={getProducts}
        navigation={navigation}
        sortLabels={sortLabels}
        isFavorite={isFavorite}
        onFilterSelection={onFilterSelection}
        onSortSelection={onSortSelection}
        filteredId={filteredId}
      />

      {renderItemCountView(totalProductsCount)}
      {renderBrandFilter && renderBrandFilter()}
    </ListHeaderContainer>
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
  scrollToTop,
  onPickUpOpenClick,
  isPickupModalOpen,
  totalProductsCount,
  isDataLoading,
  isFavorite,
  onFilterSelection,
  onSortSelection,
  filteredId,
  renderBrandFilter,
  margins,
  paddings,
  ...otherProps
}) => {
  const title = navigation && navigation.getParam('title');
  if (isDataLoading) return <PLPSkeleton col={20} />;
  const headerData = {
    filters,
    labelsFilter,
    onSubmit,
    getProducts,
    navigation,
    sortLabels,
    totalProductsCount,
    isFavorite,
    onFilterSelection,
    onSortSelection,
    filteredId,
    renderBrandFilter,
  };
  return (
    <PageContainer margins={margins} paddings={paddings}>
      <ProductList
        products={products}
        title={title}
        scrollToTop={scrollToTop}
        totalProductsCount={totalProductsCount}
        onRenderHeader={() => onRenderHeader(headerData)}
        isFavorite={isFavorite}
        {...otherProps}
      />
      <QuickViewModal navigation={navigation} onPickUpOpenClick={onPickUpOpenClick} />
      <AddedToBagContainer navigation={navigation} />
      {isPickupModalOpen ? <PickupStoreModal navigation={navigation} /> : null}
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
  isPickupModalOpen: PropTypes.bool.isRequired,
  getProducts: PropTypes.func.isRequired,
  navigation: PropTypes.objectOf(PropTypes.oneOfType([PropTypes.string])),
  sortLabels: PropTypes.arrayOf(PropTypes.shape({})),
  scrollToTop: PropTypes.bool.isRequired,
  onPickUpOpenClick: PropTypes.func,
  totalProductsCount: PropTypes.number.isRequired,
  isDataLoading: PropTypes.bool.isRequired,
  isFavorite: PropTypes.bool,
  onFilterSelection: PropTypes.func,
  onSortSelection: PropTypes.func,
  filteredId: PropTypes.string,
  renderBrandFilter: PropTypes.func,
  margins: PropTypes.string,
  paddings: PropTypes.string,
};

ProductListView.defaultProps = {
  products: [],
  filters: {},
  breadCrumbs: [],
  labelsFilter: {},
  navigation: {},
  sortLabels: [],
  onPickUpOpenClick: () => {},
  isFavorite: false,
  onFilterSelection: () => {},
  onSortSelection: () => {},
  filteredId: 'ALL',
  renderBrandFilter: null,
  margins: null,
  paddings: null,
};

export default withStyles(ProductListView, styles);
