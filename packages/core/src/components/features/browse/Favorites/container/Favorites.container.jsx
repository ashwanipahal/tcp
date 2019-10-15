import React from 'react';
import { PropTypes } from 'prop-types';
import { connect } from 'react-redux';
import { openQuickViewWithValues } from '@tcp/core/src/components/common/organisms/QuickViewModal/container/QuickViewModal.actions';
import Favorites from '../views';
import {
  getSetWishlistsSummariesAction,
  createNewWishListMoveItemAction,
  deleteWishListAction,
  getActiveWishlistAction,
  createNewWishListAction,
  setLastDeletedItemIdAction,
} from './Favorites.actions';
import { fetchCurrencySymbol, getLabelsFavorites } from './Favorites.selectors';

class FavoritesContainer extends React.PureComponent {
  state = {
    selectedColorProductId: '',
  };

  componentDidMount() {
    const { loadWishList } = this.props;
    loadWishList();
  }

  openQuickViewModal = (payload, allColors) => {
    const { onQuickViewOpenClick } = this.props;
    this.setState(
      {
        selectedColorProductId: !allColors ? payload.colorProductId : '',
      },
      () => onQuickViewOpenClick(payload)
    );
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
      currencySymbol,
      labels,
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
        currencySymbol={currencySymbol}
        labels={labels}
        onQuickViewOpenClick={this.openQuickViewModal}
        selectedColorProductId={selectedColorProductId}
      />
    );
  }
}

const mapStateToProps = state => {
  const FavoritesState = state.Favorites;
  return {
    wishlistsSummaries: FavoritesState.get('wishlistsSummaries'),
    activeWishList: FavoritesState.get('activeWishList'),
    currencySymbol: fetchCurrencySymbol(state),
    labels: getLabelsFavorites(state),
  };
};

const mapDispatchToProps = dispatch => {
  return {
    loadWishList: () => dispatch(getSetWishlistsSummariesAction()),
    createNewWishListMoveItem: wishListId => dispatch(createNewWishListMoveItemAction(wishListId)),
    deleteWishList: wishListId => dispatch(deleteWishListAction(wishListId)),
    getActiveWishlist: payload => dispatch(getActiveWishlistAction(payload)),
    createNewWishList: formData => dispatch(createNewWishListAction(formData)),
    setLastDeletedItemId: itemId => dispatch(setLastDeletedItemIdAction(itemId)),
    onQuickViewOpenClick: payload => dispatch(openQuickViewWithValues(payload)),
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
  onQuickViewOpenClick: PropTypes.func.isRequired,
  currencySymbol: PropTypes.string,
  labels: PropTypes.objectOf(PropTypes.oneOfType([PropTypes.string])),
};

FavoritesContainer.defaultProps = {
  wishlistsSummaries: [],
  activeWishList: {},
  currencySymbol: '$',
  labels: {},
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(FavoritesContainer);

export { FavoritesContainer as FavoritesContainerVanilla };
