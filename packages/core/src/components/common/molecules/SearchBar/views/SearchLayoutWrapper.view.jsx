import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import enhanceWithClickOutside from 'react-click-outside';
import { Image, BodyCopy, Anchor } from '@tcp/core/src/components/common/atoms';
import { getLabelValue } from '@tcp/core/src/utils/utils';
import { getIconPath, routerPush } from '@tcp/core/src/utils';
import withStyles from '@tcp/core/src/components/common/hoc/withStyles';
import { breakpoints } from '@tcp/core/styles/themes/TCP/mediaQuery';
import SearchBarStyle from '../SearchBar.style';
import CancelSearch from './CancelSearch.view';
import SuggestionBox from './SuggestionBox.view';
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
class SearchLayoutWrapper extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      ...props,
    };
    this.searchInput = React.createRef();
    this.changeSearchText = this.changeSearchText.bind(this);
    this.initiateSearch = this.initiateSearch.bind(this);
  }

  componentDidUpdate(prevProps) {
    const currentProp = this.props;
    if (currentProp.isSearchOpen && prevProps.isSearchOpen !== currentProp.isSearchOpen) {
      this.searchInput.current.focus();
    }
  }

  startInitiateSearch = () => {
    const { setSearchState, setDataInLocalStorage, redirectToSearchPage } = this.props;
    const searchText = this.searchInput.current.value;
    if (searchText) {
      setDataInLocalStorage(searchText);
      redirectToSearchPage(searchText);
    } else {
      routerPush(`/search?searchQuery=`, `/search/`, { shallow: true });
    }
    setSearchState(false);
  };

  cancelSearchBar = e => {
    e.preventDefault();
    const searchText = this.searchInput.current.value;
    const CLOSE_IMAGE = 'close-mobile-image';
    const CLOSE_IMAGE_MOBILE = 'close-image-mobile';
    if (searchText) {
      document.getElementById('searchBar-input-form').reset();
      document.getElementById(`${CLOSE_IMAGE}`).classList.remove(`${CLOSE_IMAGE_MOBILE}`);
    }
  };

  changeCaseFirstLetter = params => {
    if (typeof params === 'string') {
      return params.charAt(0).toUpperCase() + params.slice(1);
    }
    return null;
  };

  highlight = inputTextParam => {
    const text = this.searchInput.current.value;
    let { inputText } = inputTextParam;
    inputText = inputText.toLowerCase();
    const index = inputText.indexOf(text.toLowerCase());
    inputText = this.changeCaseFirstLetter(inputText);
    if (index >= 0 && inputText) {
      return (
        <div className="lookingFor-textWrapper-div">
          {`${inputText.substring(0, index)}`}
          <span className="highlight-search-result">
            {`${inputText.substring(index, index + text.length)}`}
          </span>
          {`${inputText.substring(index + text.length)}`}
        </div>
      );
    }

    return <div className="lookingFor-textWrapper-div">{`${inputText}`}</div>;
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

  initiateSearchByModal = e => {
    const { commonCloseClick } = this.props;
    e.preventDefault();
    this.startInitiateSearch();
    commonCloseClick();
  };

  initiateSearch = e => {
    e.preventDefault();
    this.startInitiateSearch();
  };

  initiateSearchBySubmit = () => {
    const { commonCloseClick } = this.props;
    this.startInitiateSearch();
    if (window.innerWidth <= breakpoints.values.lg) {
      commonCloseClick();
    }
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

    const termLength = 1;
    if (searchText.length <= termLength) {
      const payload = {
        searchText: '',
        slpLabels: labels,
      };
      startSearch(payload);
    } else {
      const payload = {
        searchText,
        slpLabels: labels,
      };
      startSearch(payload);

      if (searchText.length >= 1 && !searchImage) {
        document.getElementById(`${CLOSE_IMAGE}`).classList.add(`${CLOSE_IMAGE_MOBILE}`);
      } else if (searchText.length < 1 && searchImage) {
        document.getElementById(`${CLOSE_IMAGE}`).classList.remove(`${CLOSE_IMAGE_MOBILE}`);
      }
    }
  };

  handleClickOutside() {
    const { setSearchState, isSearchOpen } = this.props;
    if (isSearchOpen && window.innerWidth > breakpoints.values.lg) {
      setSearchState(false);
    }
  }

  render() {
    const {
      className,
      showProduct,
      closeSearchBar,
      closeModalSearch,
      isLatestSearchResultsExists,
      latestSearchResults,
      labels,
      searchResults,
      redirectToSuggestedUrl,
      closeSearchLayover,
    } = this.props;

    const LookingForLabel = () => {
      return this.isLookingForExist(searchResults);
    };

    const LookingForProductLabel = () => {
      return this.isLookingForProductsExist(searchResults);
    };

    const HighLightSearch = inputText => this.highlight(inputText);

    // const SEARCH_BLUE_IMAGE = 'search-icon';
    const SEARCH_BLUE_IMAGE = 'search-icon-blue';

    return (
      <React.Fragment>
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
              id="searchBar-input-form"
              className={className}
              noValidate
              onSubmit={this.initiateSearchBySubmit}
            >
              <input
                id="search-input"
                ref={this.searchInput}
                onChange={this.changeSearchText}
                className="search-input"
                // eslint-disable-next-line jsx-a11y/no-autofocus
                autoFocus
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
              closeSearchBar={closeSearchBar}
              closeModalSearch={closeModalSearch}
              cancelSearchBar={this.cancelSearchBar}
              labels={labels}
            />

            {!showProduct ? (
              <SuggestionBox
                isLatestSearchResultsExists={isLatestSearchResultsExists}
                latestSearchResults={latestSearchResults}
                labels={labels}
                redirectToSuggestedUrl={redirectToSuggestedUrl}
              />
            ) : (
              <div className="matchBox" id="matchBox-wrapper">
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
                                      to={`/search/${itemData.text}`}
                                      onClick={e => {
                                        e.preventDefault();
                                        redirectToSuggestedUrl(`${itemData.text}`);
                                      }}
                                    >
                                      {itemData.text && (
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

                {searchResults &&
                  searchResults.autosuggestProducts &&
                  searchResults.autosuggestProducts.length > 0 && (
                    <div className="matchProductBox">
                      <LookingForProductLabel searchResults={searchResults} />
                      <LookingForProductDetail
                        searchResults={searchResults}
                        closeSearchLayover={closeSearchLayover}
                      />
                    </div>
                  )}
              </div>
            )}
          </div>
        </div>
      </React.Fragment>
    );
  }
}

SearchLayoutWrapper.propTypes = {
  className: PropTypes.string.isRequired,
  closeSearchBar: PropTypes.func.isRequired,
  closeSearchLayover: PropTypes.func.isRequired,
  closeModalSearch: PropTypes.func.isRequired,
  redirectToSuggestedUrl: PropTypes.func.isRequired,
  setSearchState: PropTypes.func.isRequired,
  setDataInLocalStorage: PropTypes.func.isRequired,
  redirectToSearchPage: PropTypes.func.isRequired,
  startSearch: PropTypes.func.isRequired,
  commonCloseClick: PropTypes.func.isRequired,
  showProduct: PropTypes.bool,
  isSearchOpen: PropTypes.bool,
  isLatestSearchResultsExists: PropTypes.bool,
  searchResults: PropTypes.shape({
    trends: PropTypes.shape({}),
    categories: PropTypes.shape({}),
    products: PropTypes.shape({}),
  }),
  labels: PropTypes.shape({
    lbl_search_whats_trending: PropTypes.string,
    lbl_search_recent_search: PropTypes.string,
    lbl_search_looking_for: PropTypes.string,
    lbl_search_product_matches: PropTypes.string,
  }),
  latestSearchResults: PropTypes.shape([]),
};

SearchLayoutWrapper.defaultProps = {
  showProduct: false,
  isSearchOpen: false,
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
  isLatestSearchResultsExists: false,
  latestSearchResults: [],
};

export default connect()(withStyles(enhanceWithClickOutside(SearchLayoutWrapper), SearchBarStyle));
