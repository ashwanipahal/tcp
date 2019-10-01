import React from 'react';
import { connect } from 'react-redux';
import Favorites from '../views';

class FavoritesContainer extends React.PureComponent {
  render() {
    return <Favorites />;
  }
}

function mapStateToProps(state) {
  return {
    state,
  };
}

export default connect(mapStateToProps)(FavoritesContainer);
