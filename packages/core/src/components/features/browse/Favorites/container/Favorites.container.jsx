import React from 'react';
import { PropTypes } from 'prop-types';
import { connect } from 'react-redux';
import Favorites from '../views';
import { getSetWishlistsSummariesActn } from './Favorites.actions';

class FavoritesContainer extends React.PureComponent {
  componentDidMount() {
    const { loadWishList } = this.props;
    loadWishList();
  }

  render() {
    return <Favorites />;
  }
}

const mapStateToProps = state => {
  const FavoritesState = state.Favorites;
  return {
    wishlistsSummaries: FavoritesState.get('wishlistsSummaries'),
  };
};

const mapDispatchToProps = dispatch => {
  return {
    loadWishList: () => dispatch(getSetWishlistsSummariesActn()),
  };
};

FavoritesContainer.propTypes = {
  loadWishList: PropTypes.func.isRequired,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(FavoritesContainer);
