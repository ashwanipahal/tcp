import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'next/router'; //eslint-disable-line
import { PropTypes } from 'prop-types';
import SearchDetail from '../views/SearchDetail.view';
import getSearchedResult from './SearchDetail.selectors';
import { getSearchResult } from '../../../../../../../web/src/components/features/content/Header/molecules/SearchBar/SearchBar.actions';

class SearchDetailContainer extends React.PureComponent {
  componentDidMount() {
    const {
      router: {
        query: { sq },
      },
      fetchSearchResults,
    } = this.props;
    fetchSearchResults(sq);
  }

  render() {
    const { searchedResult } = this.props;
    return <SearchDetail searchedResult={searchedResult} />;
  }
}

function mapStateToProps(state) {
  return {
    searchedResult: getSearchedResult(state),
  };
}

function mapDispatchToProps(dispatch) {
  return {
    fetchSearchResults: searchQuery => {
      dispatch(getSearchResult(searchQuery));
    },
  };
}

SearchDetailContainer.propTypes = {
  router: PropTypes.shape({
    query: PropTypes.shape({
      sq: PropTypes.string,
    }),
  }).isRequired,
  fetchSearchResults: PropTypes.func.isRequired,
  searchedResult: PropTypes.arrayOf(PropTypes.shape({})),
};

SearchDetailContainer.defaultProps = {
  searchedResult: {},
};

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(SearchDetailContainer)
);
