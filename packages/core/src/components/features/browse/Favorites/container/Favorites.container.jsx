import React from 'react';
import { PropTypes } from 'prop-types';
import { connect } from 'react-redux';
import Favorites from '../views';
import {
  getSetWishlistsSummariesActn,
  createNewWishListMoveItemActn,
  deleteWishListActn,
  getActiveWishlistActn,
  createNewWishListActn,
  setLastDeletedItemIdActn,
} from './Favorites.actions';

class FavoritesContainer extends React.PureComponent {
  componentDidMount() {
    const { loadWishList } = this.props;
    loadWishList();
  }

  render() {
    const {
      wishlistsSummaries,
      activeWishList,
      createNewWishListMoveItem,
      deleteWishList,
      getActiveWishlist,
      createNewWishList,
      setLastDeletedItemId,
    } = this.props;
    return (
      <Favorites
        wishlistsSummaries={wishlistsSummaries}
        activeWishList={activeWishList}
        createNewWishListMoveItem={createNewWishListMoveItem}
        deleteWishList={deleteWishList}
        getActiveWishlist={getActiveWishlist}
        createNewWishList={createNewWishList}
        setLastDeletedItemId={setLastDeletedItemId}
      />
    );
  }
}

const mapStateToProps = state => {
  const FavoritesState = state.Favorites;
  return {
    wishlistsSummaries: FavoritesState.get('wishlistsSummaries'),
    activeWishList: FavoritesState.get('activeWishList'),
  };
};

const mapDispatchToProps = dispatch => {
  return {
    loadWishList: () => dispatch(getSetWishlistsSummariesActn()),
    createNewWishListMoveItem: wishListId => dispatch(createNewWishListMoveItemActn(wishListId)),
    deleteWishList: wishListId => dispatch(deleteWishListActn(wishListId)),
    getActiveWishlist: payload => dispatch(getActiveWishlistActn(payload)),
    createNewWishList: formData => dispatch(createNewWishListActn(formData)),
    setLastDeletedItemId: itemId => dispatch(setLastDeletedItemIdActn(itemId)),
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
};

FavoritesContainer.defaultProps = {
  wishlistsSummaries: [],
  activeWishList: {},
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(FavoritesContainer);

export { FavoritesContainer as FavoritesContainerVanilla };
