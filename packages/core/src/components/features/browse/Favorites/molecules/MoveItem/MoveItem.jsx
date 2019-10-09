import React from 'react';
import { PropTypes } from 'prop-types';
import ErrorMessage from '@tcp/core/src/components/common/hoc/ErrorMessage';
import CreateWishlistForm from '../CreateWishlistForm';

export class MoveItem extends React.Component {
  state = {
    isOpenMoveList: false,
    isCreateNewList: false,
  };

  handleCreateWishlist = () => {
    this.setState({ isCreateNewList: true });
  };

  handleCloseCreateWishlist = () => {
    this.setState({
      isCreateNewList: false,
      isOpenMoveList: false,
    });
  };

  handleCreateWishlistSubmit = formData => {
    const { wishlistItemId, createNewWishListMoveItem } = this.props;
    createNewWishListMoveItem({
      ...formData,
      itemId: wishlistItemId,
    });
    this.handleCloseCreateWishlist();
  };

  handleToggleMoveList = () => {
    this.setState(prevState => ({
      isOpenMoveList: !prevState.isOpenMoveList,
    }));
  };

  handleDeleteWishList = () => {
    const { deleteWishList, wishlistItemId } = this.props;
    deleteWishList(wishlistItemId);
  };

  moveItem() {
    const { id, wishlistItemId, createNewWishListMoveItem } = this.props;
    createNewWishListMoveItem({
      toWishListId: id,
      itemId: wishlistItemId,
    });
  }

  render() {
    const { favoriteList } = this.props;
    const { isCreateNewList, isOpenMoveList, error } = this.state;
    const createWishListButtonProps = {
      disabled: favoriteList.length >= 4,
      onClick: this.handleCreateWishlist,
    };

    return (
      <div className="move-item-container">
        <button className="" onClick={this.handleToggleMoveList}>
          Move to another list
        </button>
        {isOpenMoveList && (
          <div className="move-item-content">
            <span className="title-move">My Favorites List</span>

            {favoriteList.map(item => {
              const { displayName, itemsCount, isDefault } = item;
              return (
                <button className="" onClick={this.moveItem}>
                  <span className="">
                    {displayName}
                    {isDefault && <i className="heart-icon-container" />}
                  </span>
                  <span className="number-items favorite-item-detail">
                    {itemsCount}
                    item
                    {itemsCount !== 1 ? 's' : ''}
                  </span>
                </button>
              );
            })}

            {error && <ErrorMessage error={error} />}

            <button className="button-quaternary button-new" {...createWishListButtonProps}>
              + Create a new list
            </button>

            {isCreateNewList && (
              <CreateWishlistForm
                onSubmit={this.handleCreateWishlistSubmit}
                onClose={this.handleCloseCreateWishlist}
                deleteWishList={this.handleDeleteWishList}
              />
            )}
          </div>
        )}
      </div>
    );
  }
}

MoveItem.propTypes = {
  onCreateSubmit: PropTypes.func.isRequired,
  createNewWishListMoveItem: PropTypes.func.isRequired,
  deleteWishList: PropTypes.func.isRequired,
  wishlistItemId: PropTypes.string,
  favoriteList: PropTypes.arrayOf({}),
  id: PropTypes.string,
};

MoveItem.defaultProps = {
  wishlistItemId: '',
  favoriteList: [],
  id: '',
};

export default MoveItem;
