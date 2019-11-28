import React from 'react';
import { PropTypes } from 'prop-types';
import { connect } from 'react-redux';
import { fetchRecommendationsData } from '@tcp/core/src/components/common/molecules/Recommendations/container/Recommendations.actions';
import {
  openQuickViewWithValues,
  updateAppTypeWithParams,
} from '@tcp/core/src/components/common/organisms/QuickViewModal/container/QuickViewModal.actions';
import { isMobileApp } from '@tcp/core/src/utils/utils';
import * as labelsSelectors from '@tcp/core/src/reduxStore/selectors/labels.selectors';
import Favorites from '../views';
import {
  getSetWishlistsSummariesAction,
  createNewWishListMoveItemAction,
  deleteWishListAction,
  getActiveWishlistAction,
  getActiveWishlistGuestAction,
  createNewWishListAction,
  setLastDeletedItemIdAction,
  updateWishListAction,
  sendWishListMailAction,
  setWishListShareSuccess,
  setReplaceWishlistItem,
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
  getBothTcpAndGymProductAreAvailability,
  selectWishListShareStatus,
  getFormErrorLabels,
} from './Favorites.selectors';
import {
  getUserEmail,
  getUserLoggedInState,
  isRememberedUser,
} from '../../../account/User/container/User.selectors';
import { getLabelsOutOfStock } from '../../ProductListing/container/ProductListing.selectors';
import { getIsKeepAliveProduct } from '../../../../../reduxStore/selectors/session.selectors';

class FavoritesContainer extends React.PureComponent {
  constructor(props) {
    super(props);
    this.guestAccessKey = '';
    this.wishListId = '';
  }
  state = {
    selectedColorProductId: '',
    filteredId: 'ALL',
    sortId: '',
    gymSelected: false,
    tcpSelected: false,
  };

  componentDidMount() {
    const { loadWishList, getActiveWishlistGuest } = this.props;

    if (!isMobileApp()) {
      this.wishListId = this.getParameterByName('wishlistId');
      this.guestAccessKey = this.getParameterByName('guestAccessKey');
      if (this.wishListId !== '' && this.guestAccessKey !== '') {
        const { wishListId, guestAccessKey } = this;
        getActiveWishlistGuest({ wishListId, guestAccessKey });
      }
    }
    if (this.wishListId === '' && this.guestAccessKey === '') {
      loadWishList({ isDataLoading: true });
    }
  }

  getParameterByName = name => {
    const location = typeof window !== 'undefined' && window.location && window.location.search;
    const key = name.replace(/[[]/, '\\[').replace(/[\]]/, '\\]');
    const regex = new RegExp(`[\\?&]${key}=([^&#]*)`);
    const results = regex.exec(location);
    return results === null ? '' : decodeURIComponent(results[1].replace(/\+/g, ' '));
  };

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

  resetBrandFilters = () => {
    this.setState({
      gymSelected: false,
      tcpSelected: false,
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

  deleteWishListHandler = () => {
    const { deleteWishList, activeWishListId } = this.props;
    if (deleteWishList && activeWishListId) {
      deleteWishList(activeWishListId);
    }
  };

  onLoadRecommendations = payload => {
    const { loadRecommendations } = this.props;
    if (loadRecommendations) {
      loadRecommendations(payload);
    }
  };

  onReplaceWishlistItem = data => {
    const { replaceWishlistItem } = this.props;
    if (replaceWishlistItem) {
      replaceWishlistItem(data);
    }
  };

  render() {
    const {
      wishlistsSummaries,
      activeWishList,
      createNewWishListMoveItem,
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
      updateWishList,
      isBothTcpAndGymProductAreAvailable,
      userEmail,
      sendWishListEmail,
      wishlistShareStatus,
      setListShareSuccess,
      guestAccessKey,
      formErrorMessage,
      isLoggedIn,
      updateAppTypeHandler,
    } = this.props;
    const { selectedColorProductId } = this.state;
    return (
      <Favorites
        wishlistsSummaries={wishlistsSummaries}
        activeWishList={activeWishList}
        createNewWishListMoveItem={createNewWishListMoveItem}
        deleteWishList={this.deleteWishListHandler}
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
        updateWishList={updateWishList}
        isBothTcpAndGymProductAreAvailable={isBothTcpAndGymProductAreAvailable}
        userEmail={userEmail}
        sendWishListEmail={sendWishListEmail}
        wishlistShareStatus={wishlistShareStatus}
        setListShareSuccess={setListShareSuccess}
        resetBrandFilters={this.resetBrandFilters}
        guestAccessKey={this.guestAccessKey}
        formErrorMessage={formErrorMessage}
        isLoggedIn={isLoggedIn}
        onLoadRecommendations={this.onLoadRecommendations}
        onReplaceWishlistItem={this.onReplaceWishlistItem}
        updateAppTypeHandler={updateAppTypeHandler}
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
    isBothTcpAndGymProductAreAvailable: getBothTcpAndGymProductAreAvailability(state),
    userEmail: getUserEmail(state),
    wishlistShareStatus: selectWishListShareStatus(state),
    formErrorMessage: getFormErrorLabels(state),
    isLoggedIn: getUserLoggedInState(state) && !isRememberedUser(state),
  };
};

const mapDispatchToProps = dispatch => {
  return {
    loadWishList: payload => dispatch(getSetWishlistsSummariesAction(payload)),
    createNewWishListMoveItem: formData => {
      dispatch(createNewWishListMoveItemAction(formData));
    },
    deleteWishList: wishListId => {
      dispatch(deleteWishListAction(wishListId));
    },
    getActiveWishlistGuest: payload => dispatch(getActiveWishlistGuestAction(payload)),
    getActiveWishlist: payload => dispatch(getActiveWishlistAction(payload)),
    createNewWishList: formData => {
      dispatch(createNewWishListAction(formData));
    },
    setLastDeletedItemId: itemId => {
      dispatch(setLastDeletedItemIdAction(itemId));
    },
    sendWishListEmail: payload => dispatch(sendWishListMailAction(payload)),
    setListShareSuccess: payload => dispatch(setWishListShareSuccess(payload)),
    onQuickViewOpenClick: payload => {
      dispatch(openQuickViewWithValues(payload));
    },
    updateWishList: payload => {
      dispatch(updateWishListAction(payload));
    },
    loadRecommendations: action => dispatch(fetchRecommendationsData(action)),
    replaceWishlistItem: payload => dispatch(setReplaceWishlistItem(payload)),
    updateAppTypeHandler: payload => {
      dispatch(updateAppTypeWithParams(payload));
    },
  };
};

FavoritesContainer.propTypes = {
  loadWishList: PropTypes.func.isRequired,
  wishlistsSummaries: PropTypes.arrayOf({}),
  activeWishList: PropTypes.shape({}),
  createNewWishListMoveItem: PropTypes.func.isRequired,
  deleteWishList: PropTypes.func.isRequired,
  sendWishListEmail: PropTypes.func.isRequired,
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
  updateWishList: PropTypes.func.isRequired,
  isBothTcpAndGymProductAreAvailable: PropTypes.bool.isRequired,
  userEmail: PropTypes.string.isRequired,
  wishlistShareStatus: PropTypes.bool,
  setListShareSuccess: PropTypes.func.isRequired,
  isLoggedIn: PropTypes.bool,
  loadRecommendations: PropTypes.func.isRequired,
  replaceWishlistItem: PropTypes.func.isRequired,
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
  wishlistShareStatus: false,
  isLoggedIn: false,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(FavoritesContainer);

export { FavoritesContainer as FavoritesContainerVanilla };
