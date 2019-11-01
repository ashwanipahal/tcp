import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { BodyCopy } from '@tcp/core/src/components/common/atoms';
import { routerPush } from '@tcp/core/src/utils';
import { breakpoints } from '@tcp/core/styles/themes/TCP/mediaQuery';
import withStyles from '@tcp/core/src/components/common/hoc/withStyles';
import SearchBarStyle from '../SearchBar.style';
import { getSearchResult, setShowMoreProductFlag } from '../SearchBar.actions';
import { setRecentStoreToLocalStorage, getRecentStoreFromLocalStorage } from '../userRecentStore';

import RECENT_SEARCH_CONSTANTS from '../SearchBar.constants';
import SearchBarPropTypes from '../SearchBar.PropTypes';
import SearchImageWrapper from './SearchImageWrapper.view';

/**
 * This component produces a Search Bar component for Header
 * Expects textItems array consisting of objects in below format
 * {
 *    style: "",
 *    text: ""
 * }
 * This component uses BodyCopy atom and accepts all properties of BodyCopy
 * @param {*} props
 */
class SearchBar extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      ...props,
    };

    this.openSearchBar = this.openSearchBar.bind(this);
    this.closeSearchBar = this.closeSearchBar.bind(this);
    this.closeModalSearch = this.closeModalSearch.bind(this);
  }

  openFullSizeSearchModel = () => {
    this.commonCloseClick();
    const elementExists = document.getElementById('search-input');
    if (elementExists) {
      document.getElementById('search-input').focus();
    }
  };

  openSearchBar = e => {
    e.preventDefault();
    const { setSearchState } = this.props;

    if (window.innerWidth <= breakpoints.values.lg) {
      this.openFullSizeSearchModel();
    } else {
      setSearchState(true);
    }
  };

  closeModalIfMobile = e => {
    e.preventDefault();
    if (window.innerWidth <= breakpoints.values.lg) {
      this.commonCloseClick();
    }
  };

  closeSearchBar = e => {
    e.preventDefault();
    const { setSearchState, toggleSearchResults } = this.props;
    setSearchState(false);
    toggleSearchResults(false);
  };

  closeSearchLayover = () => {
    const { setSearchState, toggleSearchResults } = this.props;
    setSearchState(false);
    toggleSearchResults(false);
  };

  closeModalSearch = e => {
    e.preventDefault();
    const { setSearchState, toggleSearchResults } = this.props;
    toggleSearchResults(false);
    setSearchState(false);
    this.commonCloseClick();
  };

  arrayRemove = (arr, value) => {
    return arr.filter(ele => {
      return ele !== value;
    });
  };

  setDataInLocalStorage = searchText => {
    if (searchText) {
      const searchTextParam = searchText.trim().toLowerCase();
      const getPreviousSearchResults = getRecentStoreFromLocalStorage();
      let filteredSearchResults;
      if (getPreviousSearchResults) {
        filteredSearchResults = JSON.parse(getPreviousSearchResults.toLowerCase().split(','));
        if (filteredSearchResults.indexOf(searchTextParam) === -1) {
          filteredSearchResults.push(searchTextParam);
        } else {
          filteredSearchResults = this.arrayRemove(filteredSearchResults, searchTextParam);
          filteredSearchResults.push(searchTextParam);
        }
      } else {
        filteredSearchResults = [];
        filteredSearchResults.push(searchTextParam);
      }
      if (
        filteredSearchResults &&
        filteredSearchResults.length > RECENT_SEARCH_CONSTANTS.RECENT_SEARCHES_NUM_MAX
      ) {
        filteredSearchResults.shift();
      }

      setRecentStoreToLocalStorage(filteredSearchResults);
    }
  };

  commonCloseClick = () => {
    const { onCloseClick } = this.props;
    onCloseClick();
  };

  redirectToSearchPage = searchText => {
    const { toggleSearchResults } = this.props;
    toggleSearchResults(false);
    routerPush(`/search?searchQuery=${searchText}`, `/search/${searchText}`, { shallow: true });
  };

  getLatestSearchResultsExists = latestSearchResults => {
    return !!(latestSearchResults && latestSearchResults.length > 0);
  };

  redirectToSuggestedUrl = searchText => {
    if (searchText) {
      this.setDataInLocalStorage(searchText);
    }

    routerPush(`/search?searchQuery=${searchText}`, `/search/${searchText}`, { shallow: true });
  };

  hideOverlayAfterClick = (e, searchText) => {
    e.preventDefault();
    e.stopPropagation();
    this.setDataInLocalStorage(searchText);
    routerPush(`/search?searchQuery=${searchText}`, `/search/${searchText}`, { shallow: true });
    const { setSearchState, toggleSearchResults } = this.props;
    setSearchState(false);
    toggleSearchResults(false);
  };

  render() {
    const {
      className,
      showProduct,
      fromCondensedHeader,
      searchResults,
      isSearchOpen,
      labels,
      setSearchState,
      startSearch,
      toggleSearchResults,
    } = this.props;

    const getRecentStore = getRecentStoreFromLocalStorage();
    let latestSearchResults;

    if (getRecentStore) {
      latestSearchResults = JSON.parse(getRecentStore.split(','));
    } else {
      latestSearchResults = [];
    }

    const isLatestSearchResultsExists = this.getLatestSearchResultsExists(latestSearchResults);

    return (
      <React.Fragment>
        <BodyCopy className={className} component="div">
          <SearchImageWrapper
            fromCondensedHeader={fromCondensedHeader}
            className={className}
            initiateSearchBySubmit={this.initiateSearchBySubmit}
            openSearchBar={this.openSearchBar}
            labels={labels}
            showProduct={showProduct}
            closeSearchBar={this.closeSearchBar}
            closeModalSearch={this.closeModalSearch}
            isLatestSearchResultsExists={isLatestSearchResultsExists}
            latestSearchResults={latestSearchResults}
            hideOverlayAfterClick={this.hideOverlayAfterClick}
            searchResults={searchResults}
            redirectToSuggestedUrl={this.redirectToSuggestedUrl}
            setSearchState={setSearchState}
            setDataInLocalStorage={this.setDataInLocalStorage}
            redirectToSearchPage={this.redirectToSearchPage}
            startSearch={startSearch}
            isSearchOpen={isSearchOpen}
            commonCloseClick={this.commonCloseClick}
            toggleSearchResults={toggleSearchResults}
            closeSearchLayover={this.closeSearchLayover}
          />
        </BodyCopy>
      </React.Fragment>
    );
  }
}

SearchBar.propTypes = SearchBarPropTypes;

SearchBar.defaultProps = {
  isSearchOpen: false,
  fromCondensedHeader: false,
  showProduct: false,
  searchResults: {
    trends: {},
    categories: {},
    products: {},
  },
  labels: PropTypes.shape({
    lbl_search_whats_trending: '',
    lbl_search_recent_search: '',
    lbl_search_looking_for: '',
    lbl_search_product_matches: '',
    lbl_what_looking_for: '',
  }),
};

const mapStateToProps = state => {
  return {
    labels: state.Labels.global && state.Labels.global.Search,
    searchResults: state.Search.searchResults,
    showProduct: state.Search.showProduct,
  };
};

export const mapDispatchToProps = dispatch => {
  return {
    startSearch: payload => {
      dispatch(getSearchResult(payload));
    },
    toggleSearchResults: payload => {
      dispatch(setShowMoreProductFlag(payload));
    },
  };
};

export { SearchBar as SearchBarVanilla };
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(SearchBar, SearchBarStyle));
