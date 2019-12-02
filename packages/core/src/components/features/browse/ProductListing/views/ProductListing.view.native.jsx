import React from 'react';
import { ScrollView } from 'react-native';
import PropTypes from 'prop-types';
import BodyCopy from '@tcp/core/src/components/common/atoms/BodyCopy';
import { getLabelValue } from '@tcp/core/src/utils/utils';
import withStyles from '../../../../common/hoc/withStyles.native';
import ProductList from '../molecules/ProductList/views';
import {
  styles,
  PageContainer,
  ListHeaderContainer,
  FilterContainer,
  EmptyView,
  RowContainer,
  ItemCountContainer,
} from '../styles/ProductListing.style.native';
import FilterModal from '../molecules/FilterModal';
import PickupStoreModal from '../../../../common/organisms/PickupStoreModal';
import PLPSkeleton from '../../../../common/atoms/PLPSkeleton';
import PLPQRScannerAnimation from '../molecules/PLPQRScannerAnimation';
import PromoModules from '../../../../common/organisms/PromoModules';

const renderItemCountView = (itemCount, labelsFavorite, isBothTcpAndGymProductAreAvailable) => {
  if (itemCount === undefined) {
    return <EmptyView />;
  }

  return (
    <RowContainer margins="12px 0 0 0">
      {isBothTcpAndGymProductAreAvailable ? (
        <BodyCopy
          dataLocator="fav_brand_title"
          mobileFontFamily="secondary"
          fontSize="fs14"
          fontWeight="regular"
          color="gray.1700"
          text={getLabelValue(labelsFavorite, 'lbl_fav_brand')}
        />
      ) : (
        <EmptyView />
      )}
      <ItemCountContainer>
        <BodyCopy
          dataLocator="pdp_product_badges"
          mobileFontFamily="secondary"
          fontSize="fs14"
          fontWeight="semibold"
          color="gray.900"
          text={itemCount}
        />
        <BodyCopy
          margin="0 0 0 4px"
          dataLocator="pdp_product_badges"
          mobileFontFamily="secondary"
          fontSize="fs14"
          fontWeight="regular"
          color="gray.900"
          text="Items"
        />
      </ItemCountContainer>
    </RowContainer>
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
    setSelectedFilter,
    selectedFilterValue,
    isKeepModalOpen,
    isLoadingMore,
    labelsFavorite,
    isBothTcpAndGymProductAreAvailable,
    filtersLength,
  } = data;

  let appliedfilters = false;
  appliedfilters =
    filtersLength &&
    Object.keys(filtersLength).some(key => {
      return filtersLength[key] > 0;
    });

  return (
    <ListHeaderContainer>
      {(totalProductsCount > 1 || appliedfilters || isFavorite) && (
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
      {renderItemCountView(totalProductsCount, labelsFavorite, isBothTcpAndGymProductAreAvailable)}
      {renderBrandFilter && renderBrandFilter()}
    </ListHeaderContainer>
  );
};

const renderPromModules = (isSearchListing, plpTopPromos, navigation, isPlcc, isLoggedIn) => {
  return (
    !isSearchListing && (
      <PromoModules
        plpTopPromos={plpTopPromos}
        navigation={navigation}
        isPlcc={isPlcc}
        isLoggedIn={isLoggedIn}
      />
    )
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
  isPlcc,
  isLoadingMore,
  AddToFavoriteErrorMsg,
  removeAddToFavoritesErrorMsg,
  setSelectedFilter,
  selectedFilterValue,
  plpTopPromos,
  isSearchListing,
  isKeepModalOpen,
  showCustomLoader,
  labelsFavorite,
  isBothTcpAndGymProductAreAvailable,
  renderMoveToList,
  filtersLength,
  updateAppTypeHandler,
  QRAnimationURL,
  resetCustomLoader,
  ...otherProps
}) => {
  const title = navigation && navigation.getParam('title');
  if (isDataLoading && !isKeepModalOpen && !showCustomLoader) return <PLPSkeleton col={20} />;
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
    labelsFavorite,
    isBothTcpAndGymProductAreAvailable,
    filtersLength,
  };
  return showCustomLoader ? (
    <PLPQRScannerAnimation
      url={QRAnimationURL}
      navigation={navigation}
      resetCustomLoader={resetCustomLoader}
      isOpen={showCustomLoader}
    />
  ) : (
    <ScrollView>
      {renderPromModules(isSearchListing, plpTopPromos, navigation, isPlcc, isLoggedIn)}
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
            isFavorite={isFavorite}
            onAddItemToFavorites={onAddItemToFavorites}
            isLoggedIn={isLoggedIn}
            labelsLogin={labelsLogin}
            AddToFavoriteErrorMsg={AddToFavoriteErrorMsg}
            removeAddToFavoritesErrorMsg={removeAddToFavoritesErrorMsg}
            isSearchListing={isSearchListing}
            renderMoveToList={renderMoveToList}
            updateAppTypeHandler={updateAppTypeHandler}
            {...otherProps}
          />
        )}
        {isPickupModalOpen ? <PickupStoreModal navigation={navigation} /> : null}
      </PageContainer>
      {isLoadingMore ? <PLPSkeleton col={20} /> : null}
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
  labelsFavorite: PropTypes.shape({}),
  isBothTcpAndGymProductAreAvailable: PropTypes.bool,
  renderMoveToList: PropTypes.func,
  addToBagEcom: PropTypes.func,
  isPlcc: PropTypes.bool,
  filtersLength: PropTypes.number,
  showCustomLoader: PropTypes.bool,
  QRAnimationURL: PropTypes.string.isRequired,
  resetCustomLoader: PropTypes.func,
  updateAppTypeHandler: PropTypes.func.isRequired,
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
  labelsFavorite: {},
  isBothTcpAndGymProductAreAvailable: false,
  renderMoveToList: () => {},
  addToBagEcom: () => {},
  isPlcc: false,
  filtersLength: 0,
  showCustomLoader: false,
  resetCustomLoader: () => {},
};

export default withStyles(ProductListView, styles);
export { ProductListView as ProductListViewVanilla };
