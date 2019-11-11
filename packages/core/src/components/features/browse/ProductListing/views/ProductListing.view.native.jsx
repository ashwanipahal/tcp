import React from 'react';
import PropTypes from 'prop-types';
import withStyles from '../../../../common/hoc/withStyles.native';
import ProductList from '../molecules/ProductList/views';
import QuickViewModal from '../../../../common/organisms/QuickViewModal/container/QuickViewModal.container';
import { styles, PageContainer, ListHeaderContainer } from '../styles/ProductListing.style.native';
import FilterModal from '../molecules/FilterModal';
import AddedToBagContainer from '../../../CnC/AddedToBag';
import PickupStoreModal from '../../../../common/organisms/PickupStoreModal';
import PLPSkeleton from '../../../../common/atoms/PLPSkeleton';

const renderItemCountView = itemCount => {
  if (itemCount === undefined) {
    return itemCount;
  }

  return itemCount;
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
      {totalProductsCount > 1 && (
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
      )}

      {renderBrandFilter && renderBrandFilter()}
    </ListHeaderContainer>
  );
};

const ProductListView = ({
  products,
  filters,
  labelsFilter,
  labelsLogin,
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
  onAddItemToFavorites,
  isLoggedIn,
  isLoadingMore,
  AddToFavoriteErrorMsg,
  removeAddToFavoritesErrorMsg,
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
        onrenderItemCountView={() => renderItemCountView(totalProductsCount)}
        isFavorite={isFavorite}
        onAddItemToFavorites={onAddItemToFavorites}
        isLoggedIn={isLoggedIn}
        labelsLogin={labelsLogin}
        AddToFavoriteErrorMsg={AddToFavoriteErrorMsg}
        removeAddToFavoritesErrorMsg={removeAddToFavoritesErrorMsg}
        {...otherProps}
      />
      {isLoadingMore ? <PLPSkeleton col={20} /> : null}
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
  onAddItemToFavorites: PropTypes.func,
  isLoggedIn: PropTypes.bool,
  labelsLogin: PropTypes.objectOf(PropTypes.oneOfType([PropTypes.string])),
  isLoadingMore: PropTypes.bool.isRequired,
  AddToFavoriteErrorMsg: PropTypes.string,
  removeAddToFavoritesErrorMsg: PropTypes.func,
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
  onAddItemToFavorites: null,
  isLoggedIn: false,
  labelsLogin: {},
  AddToFavoriteErrorMsg: '',
  removeAddToFavoritesErrorMsg: () => {},
};

export default withStyles(ProductListView, styles);
export { ProductListView as ProductListViewVanilla };
