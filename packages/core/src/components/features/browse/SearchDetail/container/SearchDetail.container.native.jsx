import React from 'react';
import { PropTypes } from 'prop-types';
import SearchDetail from '../views/SearchDetail.view';

class SearchDetailContainer extends React.PureComponent {
  renderSearchDetails = () => {
    const { navigation } = this.props;
    const title = navigation && navigation.getParam('title');
    return <SearchDetail searchedText={title} />;
  };

  render() {
    return <React.Fragment>{this.renderSearchDetails()}</React.Fragment>;
  }
}

SearchDetailContainer.propTypes = {
  navigation: PropTypes.instanceOf(Object),
};

SearchDetailContainer.defaultProps = {
  navigation: null,
};

export default SearchDetailContainer;
