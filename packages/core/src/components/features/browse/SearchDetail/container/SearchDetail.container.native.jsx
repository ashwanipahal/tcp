import React from 'react';
import { PropTypes } from 'prop-types';
import SearchDetail from '../views/SearchDetail.view';

class SearchDetailContainer extends React.PureComponent {
  renderSearchDetails = () => {
    const { searchedText } = this.props;

    return <SearchDetail searchedText={searchedText} />;
  };

  render() {
    return <React.Fragment>{this.renderSearchDetails()}</React.Fragment>;
  }
}

SearchDetailContainer.propTypes = {
  searchedText: PropTypes.string,
};

SearchDetailContainer.defaultProps = {
  searchedText: '',
};

export default SearchDetailContainer;
