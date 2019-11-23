import React from 'react';
import { ScrollView } from 'react-native';
import PropTypes from 'prop-types';
import withStyles from '../../../../common/hoc/withStyles.native';
import ProductList from '../molecules/ProductList/views';
import QuickViewModal from '../../../../common/organisms/QuickViewModal/container/QuickViewModal.container';
import {
  styles,
  PageContainer,
  ListHeaderContainer,
  FilterContainer,
} from '../styles/ProductListing.style.native';
import FilterModal from '../molecules/FilterModal';
import PickupStoreModal from '../../../../common/organisms/PickupStoreModal';
import PLPSkeleton from '../../../../common/atoms/PLPSkeleton';
import PromoModules from '../../../../common/organisms/PromoModules';

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
    setSelectedFilter,
    selectedFilterValue,
    isKeepModalOpen,
    isLoadingMore,
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
          setSelectedFilter={setSelectedFilter}
          selectedFilterValue={selectedFilterValue}
          isKeepModalOpen={isKeepModalOpen}
          isLoadingMore={isLoadingMore}
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
  setSelectedFilter,
  selectedFilterValue,
  plpTopPromos,
  isSearchListing,
  isKeepModalOpen,
  ...otherProps
}) => {
  const title = navigation && navigation.getParam('title');
  if (isDataLoading && !isKeepModalOpen) return <PLPSkeleton col={20} />;
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
    setSelectedFilter,
    selectedFilterValue,
    plpTopPromos,
    isKeepModalOpen,
    isLoadingMore,
  };
  return (
    <ScrollView>
      {!isSearchListing && <PromoModules plpTopPromos={plpTopPromos} navigation={navigation} />}
      <PageContainer margins={margins} paddings={paddings}>
        <FilterContainer>{onRenderHeader(headerData)}</FilterContainer>
        {!isLoadingMore && (
          <ProductList
            getProducts={getProducts}
            navigation={navigation}
            products={products}
            title={title}
            scrollToTop={scrollToTop}
            totalProductsCount={totalProductsCount}
            onrenderItemCountView={() => renderItemCountView(totalProductsCount)}
            isFavorite={isFavorite}
            onAddItemToFavorites={onAddItemToFavorites}
            isLoggedIn={isLoggedIn}
            labelsLogin={labelsLogin}
            AddToFavoriteErrorMsg={AddToFavoriteErrorMsg}
            removeAddToFavoritesErrorMsg={removeAddToFavoritesErrorMsg}
            isSearchListing={isSearchListing}
            {...otherProps}
          />
        )}
        {isLoadingMore ? <PLPSkeleton col={20} /> : null}
        <QuickViewModal navigation={navigation} onPickUpOpenClick={onPickUpOpenClick} />
        {isPickupModalOpen ? <PickupStoreModal navigation={navigation} /> : null}
      </PageContainer>
    </ScrollView>
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
  selectedFilterValue: PropTypes.shape({}).isRequired,
  setSelectedFilter: PropTypes.func.isRequired,
  plpTopPromos: PropTypes.arrayOf(PropTypes.shape({})),
  isSearchListing: PropTypes.bool,
  isKeepModalOpen: PropTypes.bool,
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
  plpTopPromos: [],
  isSearchListing: false,
  isKeepModalOpen: false,
};

export default withStyles(ProductListView, styles);
export { ProductListView as ProductListViewVanilla };
