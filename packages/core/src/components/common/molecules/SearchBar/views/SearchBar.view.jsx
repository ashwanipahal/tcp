import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Image, BodyCopy, Anchor } from '@tcp/core/src/components/common/atoms';
import { getIconPath, isGymboree, routerPush } from '@tcp/core/src/utils';
import { getLabelValue } from '@tcp/core/src/utils/utils';
import { breakpoints } from '@tcp/core/styles/themes/TCP/mediaQuery';
import withStyles from '@tcp/core/src/components/common/hoc/withStyles';
import SearchBarStyle from '../SearchBar.style';
import { getSearchResult, setShowMoreProductFlag } from '../SearchBar.actions';
import { setRecentStoreToLocalStorage, getRecentStoreFromLocalStorage } from '../userRecentStore';
import CancelSearch from './CancelSearch.view';
import SuggestionBox from './SuggestionBox.view';
import RECENT_SEARCH_CONSTANTS from '../SearchBar.constants';
import SearchBarPropTypes from '../SearchBar.PropTypes';
import LookingForProductDetail from './LookingForProductDetail.view';

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

    this.searchInput = React.createRef();
    this.openSearchBar = this.openSearchBar.bind(this);
    this.closeSearchBar = this.closeSearchBar.bind(this);
    this.closeModalSearch = this.closeModalSearch.bind(this);
    this.changeSearchText = this.changeSearchText.bind(this);
    this.initiateSearch = this.initiateSearch.bind(this);
  }

  componentDidUpdate(prevProps) {
    const currentProp = this.props;
    if (currentProp.isSearchOpen && prevProps.isSearchOpen !== currentProp.isSearchOpen) {
      this.searchInput.current.focus();
    }
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

  closeModalSearch = e => {
    e.preventDefault();
    const { setSearchState, toggleSearchResults } = this.props;
    toggleSearchResults(false);
    setSearchState(false);
    this.commonCloseClick();
  };

  cancelSearchBar = e => {
    e.preventDefault();
    const searchText = this.searchInput.current.value;
    const CLOSE_IMAGE = 'close-mobile-image';
    const CLOSE_IMAGE_MOBILE = 'close-image-mobile';
    if (searchText) {
      document.getElementById('search-input-form').reset();
      document.getElementById(`${CLOSE_IMAGE}`).classList.remove(`${CLOSE_IMAGE_MOBILE}`);
    }
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

  startInitiateSearch = () => {
    const { setSearchState } = this.props;
    const searchText = this.searchInput.current.value;
    if (searchText) {
      this.setDataInLocalStorage(searchText);
      this.redirectToSearchPage(searchText);
    } else {
      routerPush(`/search?searchQuery=`, `/search/`, { shallow: true });
    }
    setSearchState(false);
  };

  commonCloseClick = () => {
    const { onCloseClick } = this.props;
    onCloseClick();
  };

  initiateSearchByModal = e => {
    e.preventDefault();
    this.startInitiateSearch();
    this.commonCloseClick();
  };

  initiateSearch = e => {
    e.preventDefault();
    this.startInitiateSearch();
  };

  initiateSearchBySubmit = () => {
    this.startInitiateSearch();
    if (window.innerWidth <= breakpoints.values.lg) {
      this.commonCloseClick();
    }
  };

  redirectToSearchPage = searchText => {
    const { toggleSearchResults } = this.props;
    toggleSearchResults(false);
    routerPush(`/search?searchQuery=${searchText}`, `/search/${searchText}`, { shallow: true });
  };

  changeSearchText = e => {
    e.preventDefault();
    const { startSearch, labels } = this.props;
    const searchText = this.searchInput.current.value;
    const CLOSE_IMAGE = 'close-mobile-image';
    const CLOSE_IMAGE_MOBILE = 'close-image-mobile';
    const searchImage = document
      .getElementById(`${CLOSE_IMAGE}`)
      .classList.contains(`${CLOSE_IMAGE_MOBILE}`);

    if (searchText.length > RECENT_SEARCH_CONSTANTS.MIN_SEARCH_CHARS) {
      const payload = {
        searchText,
        slpLabels: labels,
      };
      startSearch(payload);
    }

    if (searchText.length >= 1 && !searchImage) {
      document.getElementById(`${CLOSE_IMAGE}`).classList.add(`${CLOSE_IMAGE_MOBILE}`);
    } else if (searchText.length < 1 && searchImage) {
      document.getElementById(`${CLOSE_IMAGE}`).classList.remove(`${CLOSE_IMAGE_MOBILE}`);
    }
  };

  getLatestSearchResultsExists = latestSearchResults => {
    return !!(latestSearchResults && latestSearchResults.length > 0);
  };

  highlight = inputTextParam => {
    const text = this.searchInput.current.value;
    let { inputText } = inputTextParam;
    inputText = inputText.toLowerCase();
    const index = inputText.indexOf(text.toLowerCase());
    if (index >= 0) {
      return (
        <div className="lookingFor-textWrapper-div">
          {`${inputText.substring(0, index).toUpperCase()}`}
          <span className="highlight-search-result">
            {`${inputText.substring(index, index + text.length).toUpperCase()}`}
          </span>
          {`${inputText.substring(index + text.length).toUpperCase()}`}
        </div>
      );
    }
    return null;
  };

  isLookingForExist = searchResults => {
    const { labels } = this.props;
    if (
      searchResults &&
      searchResults.autosuggestList &&
      searchResults.autosuggestList[0] &&
      searchResults.autosuggestList[0].suggestions.length > 0
    ) {
      return (
        <BodyCopy fontFamily="secondary" className="boxHead matchLinkBoxHead">
          {getLabelValue(labels, 'lbl_search_looking_for')}
        </BodyCopy>
      );
    }
    return null;
  };

  isLookingForProductsExist = searchResults => {
    const { labels } = this.props;
    if (
      searchResults &&
      searchResults.autosuggestProducts &&
      searchResults.autosuggestProducts.length > 0
    ) {
      return (
        <BodyCopy fontFamily="secondary" className="boxHead matchProductHead">
          {getLabelValue(labels, 'lbl_search_product_matches')}
        </BodyCopy>
      );
    }
    return null;
  };

  redirectToSuggestedUrl = searchText => {
    if (searchText) {
      this.setDataInLocalStorage(searchText);
    }

    routerPush(`/search?searchQuery=${searchText}`, `/search/${searchText}`, { shallow: true });
    this.commonCloseClick();
  };

  hideOverlayAfterClick = searchText => {
    this.setDataInLocalStorage(searchText);
    routerPush(`/search?searchQuery=${searchText}`, `/search/${searchText}`, { shallow: true });
    const { toggleSearchResults } = this.props;
    toggleSearchResults(false);
  };

  render() {
    const { className, showProduct, fromCondensedHeader, searchResults, isSearchOpen } = this.props;

    const getRecentStore = getRecentStoreFromLocalStorage();
    let latestSearchResults;

    if (getRecentStore) {
      latestSearchResults = JSON.parse(getRecentStore.split(','));
    } else {
      latestSearchResults = [];
    }

    const isLatestSearchResultsExists = this.getLatestSearchResultsExists(latestSearchResults);

    const LookingForLabel = () => {
      return this.isLookingForExist(searchResults);
    };

    const LookingForProductLabel = () => {
      return this.isLookingForProductsExist(searchResults);
    };

    const HighLightSearch = inputText => this.highlight(inputText);
    const SEARCH_IMAGE = 'search-icon';
    const SEARCH_BLUE_IMAGE = 'search-icon-blue';

    return (
      <React.Fragment>
        <BodyCopy className={className} component="div">
          {isSearchOpen ? (
            <div className="searchWrapper">
              <div className="searchbar">
                <Image
                  alt="search-mobile"
                  id="search-image-mobile"
                  className="search-mobile-image icon-small"
                  onClick={this.initiateSearchByModal}
                  src={getIconPath(`${SEARCH_BLUE_IMAGE}`)}
                  data-locator="search-mobile-icon"
                  height="25px"
                />
                <form
                  id="search-input-form"
                  className={className}
                  noValidate
                  onSubmit={this.initiateSearchBySubmit}
                >
                  <input
                    id="search-input"
                    ref={this.searchInput}
                    onChange={this.changeSearchText}
                    className="search-input"
                    maxLength="50"
                    autoComplete="off"
                  />
                </form>
                <Image
                  alt="search"
                  id="search-image-typeAhead"
                  className="search-image-typeAhead icon-small"
                  onClick={this.initiateSearch}
                  src={getIconPath(`${SEARCH_BLUE_IMAGE}`)}
                  data-locator="search-icon"
                  height="25px"
                />

                <CancelSearch
                  closeSearchBar={this.closeSearchBar}
                  closeModalSearch={this.closeModalSearch}
                  cancelSearchBar={this.cancelSearchBar}
                  labels
                />

                {!showProduct ? (
                  <SuggestionBox
                    isLatestSearchResultsExists={isLatestSearchResultsExists}
                    latestSearchResults={latestSearchResults}
                    labels
                    hideOverlayAfterClick={this.hideOverlayAfterClick}
                  />
                ) : (
                  <div className="matchBox">
                    <div className="matchLinkBox">
                      <LookingForLabel searchResults={searchResults} />
                      {searchResults &&
                        searchResults.autosuggestList &&
                        searchResults.autosuggestList.map(item => {
                          return (
                            <BodyCopy component="div" className="matchLinkBoxBody" lineHeight="39">
                              <ul>
                                {item &&
                                  item.suggestions &&
                                  item.suggestions.map(itemData => {
                                    return (
                                      <BodyCopy
                                        component="li"
                                        fontFamily="secondary"
                                        fontSize="fs14"
                                        key={item.id}
                                        className="linkName"
                                      >
                                        <Anchor
                                          noLink
                                          className="suggestion-label"
                                          onClick={() =>
                                            this.redirectToSuggestedUrl(`${itemData.text}`)
                                          }
                                        >
                                          {itemData && itemData.text && (
                                            <HighLightSearch inputText={`${itemData.text}`} />
                                          )}
                                        </Anchor>
                                      </BodyCopy>
                                    );
                                  })}
                              </ul>
                            </BodyCopy>
                          );
                        })}
                    </div>
                    <div className="matchProductBox">
                      <LookingForProductLabel searchResults={searchResults} />
                      <LookingForProductDetail searchResults={searchResults} />
                    </div>
                  </div>
                )}
              </div>
            </div>
          ) : (
            <Image
              alt="search-image"
              className="search-image icon`"
              onClick={this.openSearchBar}
              src={getIconPath(
                fromCondensedHeader && !isGymboree() ? `${SEARCH_BLUE_IMAGE}` : `${SEARCH_IMAGE}`
              )}
              data-locator="search-icon"
              height="25px"
            />
          )}
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
