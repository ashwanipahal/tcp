import React from 'react';
import { PropTypes } from 'prop-types';
import { connect } from 'react-redux';
import { openQuickViewWithValues } from '@tcp/core/src/components/common/organisms/QuickViewModal/container/QuickViewModal.actions';
import { isMobileApp } from '@tcp/core/src/utils/utils';
import * as labelsSelectors from '@tcp/core/src/reduxStore/selectors/labels.selectors';
import Favorites from '../views';
import {
  getSetWishlistsSummariesAction,
  createNewWishListMoveItemAction,
  deleteWishListAction,
  getActiveWishlistAction,
  createNewWishListAction,
  setLastDeletedItemIdAction,
} from './Favorites.actions';

import {
  selectWishlistsSummaries,
  selectActiveWishlistId,
  selectActiveWishList,
  selectActiveWishlistProducts,
  selectActiveDisplayName,
  selectTotalProductsCount,
  fetchCurrencySymbol,
  getLabelsFavorites,
  getSLPLabels,
  getIsDataLoading,
  selectDefaultWishlist,
} from './Favorites.selectors';
import { getLabelsOutOfStock } from '../../ProductListing/container/ProductListing.selectors';
import { getIsKeepAliveProduct } from '../../../../../reduxStore/selectors/session.selectors';

class FavoritesContainer extends React.PureComponent {
  state = {
    selectedColorProductId: '',
    filteredId: 'ALL',
    sortId: '',
    gymSelected: false,
    tcpSelected: false,
  };

  componentDidMount() {
    const { loadWishList } = this.props;
    loadWishList({ isDataLoading: true });
  }

  onFilterSelection = filteredId => {
    this.setState({
      filteredId,
    });
  };

  onSortSelection = sortId => {
    this.setState({
      sortId,
    });
  };

  selectBrandType = event => {
    const {
      target: { id, checked },
    } = event;
    this.setState({
      gymSelected: id === 'gymboreeOption' && checked,
      tcpSelected: id === 'tcpOption' && checked,
    });
  };

  openQuickViewModal = (payload, allColors) => {
    const { onQuickViewOpenClick } = this.props;
    this.setState(
      {
        selectedColorProductId: !allColors ? payload.colorProductId : '',
      },
      () => onQuickViewOpenClick(payload)
    );
  };

  onGoToPDPPage = (title, pdpUrl, selectedColorProductId, productInfo) => {
    const { navigation } = this.props;
    const { bundleProduct } = productInfo;
    const routeName = bundleProduct ? 'BundleDetail' : 'ProductDetail';
    navigation.navigate(routeName, {
      title,
      pdpUrl,
      selectedColorProductId,
      reset: true,
    });
  };

  render() {
    const {
      wishlistsSummaries,
      activeWishList,
      createNewWishListMoveItem,
      deleteWishList,
      getActiveWishlist,
      createNewWishList,
      setLastDeletedItemId,
      activeWishListId,
      activeWishListProducts,
      activeDisplayName,
      currencySymbol,
      labels,
      slpLabels,
      navigation,
      onQuickViewOpenClick,
      totalProductsCount,
      isDataLoading,
      labelsPlpTiles,
      isKeepAliveEnabled,
      outOfStockLabels,
      defaultWishList,
    } = this.props;

    const { selectedColorProductId } = this.state;

    return (
      <Favorites
        wishlistsSummaries={wishlistsSummaries}
        activeWishList={activeWishList}
        createNewWishListMoveItem={createNewWishListMoveItem}
        deleteWishList={deleteWishList}
        getActiveWishlist={getActiveWishlist}
        createNewWishList={createNewWishList}
        setLastDeletedItemId={setLastDeletedItemId}
        activeWishListId={activeWishListId}
        activeWishListProducts={activeWishListProducts}
        activeDisplayName={activeDisplayName}
        currencySymbol={currencySymbol}
        labels={labels}
        slpLabels={slpLabels}
        onQuickViewOpenClick={isMobileApp() ? onQuickViewOpenClick : this.openQuickViewModal}
        selectedColorProductId={selectedColorProductId}
        navigation={navigation}
        onGoToPDPPage={this.onGoToPDPPage}
        onFilterSelection={this.onFilterSelection}
        onSortSelection={this.onSortSelection}
        selectBrandType={this.selectBrandType}
        totalProductsCount={totalProductsCount}
        isDataLoading={isDataLoading}
        labelsPlpTiles={labelsPlpTiles}
        isKeepAliveEnabled={isKeepAliveEnabled}
        outOfStockLabels={outOfStockLabels}
        defaultWishList={defaultWishList}
        {...this.state}
      />
    );
  }
}

const mapStateToProps = state => {
  return {
    wishlistsSummaries: selectWishlistsSummaries(state),
    activeWishList: selectActiveWishList(state),
    activeWishListId: selectActiveWishlistId(state),
    defaultWishList: selectDefaultWishlist(state),
    activeWishListProducts: selectActiveWishlistProducts(state),
    activeDisplayName: selectActiveDisplayName(state),
    currencySymbol: fetchCurrencySymbol(state),
    labels: getLabelsFavorites(state),
    slpLabels: getSLPLabels(state),
    totalProductsCount: selectTotalProductsCount(state),
    isDataLoading: getIsDataLoading(state),
    labelsPlpTiles: labelsSelectors.getPlpTilesLabels(state),
    isKeepAliveEnabled: getIsKeepAliveProduct(state),
    outOfStockLabels: getLabelsOutOfStock(state),
  };
};

const mapDispatchToProps = dispatch => {
  return {
    loadWishList: payload => dispatch(getSetWishlistsSummariesAction(payload)),
    createNewWishListMoveItem: wishListId => dispatch(createNewWishListMoveItemAction(wishListId)),
    deleteWishList: wishListId => {
      dispatch(deleteWishListAction(wishListId));
    },
    getActiveWishlist: payload => dispatch(getActiveWishlistAction(payload)),
    createNewWishList: formData => dispatch(createNewWishListAction(formData)),
    setLastDeletedItemId: itemId => {
      dispatch(setLastDeletedItemIdAction(itemId));
    },
    onQuickViewOpenClick: payload => {
      dispatch(openQuickViewWithValues(payload));
    },
  };
};

FavoritesContainer.propTypes = {
  loadWishList: PropTypes.func.isRequired,
  wishlistsSummaries: PropTypes.arrayOf({}),
  activeWishList: PropTypes.shape({}),
  createNewWishListMoveItem: PropTypes.func.isRequired,
  deleteWishList: PropTypes.func.isRequired,
  getActiveWishlist: PropTypes.func.isRequired,
  createNewWishList: PropTypes.func.isRequired,
  setLastDeletedItemId: PropTypes.func.isRequired,
  activeWishListId: PropTypes.number.isRequired,
  activeWishListProducts: PropTypes.shape({}).isRequired,
  activeDisplayName: PropTypes.string.isRequired,
  onQuickViewOpenClick: PropTypes.func.isRequired,
  currencySymbol: PropTypes.string,
  labels: PropTypes.objectOf(PropTypes.oneOfType([PropTypes.string])),
  slpLabels: PropTypes.shape({}),
  navigation: PropTypes.shape({}).isRequired,
  totalProductsCount: PropTypes.string,
  isDataLoading: PropTypes.bool,
  labelsPlpTiles: PropTypes.shape({}),
  isKeepAliveEnabled: PropTypes.bool,
  outOfStockLabels: PropTypes.shape({}),
  defaultWishList: PropTypes.shape({}),
};

FavoritesContainer.defaultProps = {
  wishlistsSummaries: [],
  activeWishList: {},
  currencySymbol: '$',
  labels: {},
  slpLabels: {},
  totalProductsCount: '0',
  isDataLoading: false,
  labelsPlpTiles: {},
  isKeepAliveEnabled: false,
  outOfStockLabels: {},
  defaultWishList: {},
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(FavoritesContainer);

export { FavoritesContainer as FavoritesContainerVanilla };
