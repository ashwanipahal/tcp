import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import enhanceWithClickOutside from 'react-click-outside';
import { Image, BodyCopy, Anchor } from '@tcp/core/src/components/common/atoms';
import { getSiteId, getLabelValue, isGymboree } from '@tcp/core/src/utils/utils';
import { getIconPath, disableBodyScroll, enableBodyScroll } from '@tcp/core/src/utils';
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
    this.targetElement = React.createRef();
  }

  componentDidMount() {
    if (window.innerWidth <= breakpoints.values.lg) {
      disableBodyScroll(this.targetElement.current);
    }
  }

  componentDidUpdate(prevProps) {
    const currentProp = this.props;
    if (currentProp.isSearchOpen && prevProps.isSearchOpen !== currentProp.isSearchOpen) {
      this.searchInput.current.focus();
    }
  }

  componentWillUnmount() {
    if (window.innerWidth <= breakpoints.values.lg) {
      enableBodyScroll(this.targetElement.current);
    }
  }

  startInitiateSearch = () => {
    const {
      setSearchState,
      setDataInLocalStorage,
      redirectToSearchPage,
      commonCloseClick,
    } = this.props;

    const searchText =
      this.searchInput && this.searchInput.current ? this.searchInput.current.value : '';
    if (searchText) {
      setDataInLocalStorage(searchText);
      redirectToSearchPage(searchText);
      setSearchState(false);
      if (window.innerWidth <= breakpoints.values.lg) {
        commonCloseClick();
      }
    }
  };

  cancelSearchBar = e => {
    const { startSearch, labels } = this.props;
    e.preventDefault();
    const searchText =
      this.searchInput && this.searchInput.current ? this.searchInput.current.value : '';
    const CLOSE_IMAGE = 'close-mobile-image';
    const CLOSE_IMAGE_MOBILE = 'close-image-mobile';
    if (searchText) {
      document.getElementById('searchBar-input-form').reset();
      document.getElementById(`${CLOSE_IMAGE}`).classList.remove(`${CLOSE_IMAGE_MOBILE}`);
    }
    const payload = {
      searchText: '',
      slpLabels: labels,
    };
    startSearch(payload);
  };

  changeCaseFirstLetter = params => {
    if (typeof params === 'string') {
      return params.charAt(0).toUpperCase() + params.slice(1);
    }
    return null;
  };

  highlight = inputTextParam => {
    const text = this.searchInput && this.searchInput.current ? this.searchInput.current.value : '';
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

  initiateSearchByModal = e => {
    e.preventDefault();
    this.startInitiateSearch();
  };

  initiateSearch = e => {
    e.preventDefault();
    this.startInitiateSearch();
  };

  initiateSearchBySubmit = e => {
    e.preventDefault();
    this.startInitiateSearch();
  };

  changeSearchText = e => {
    e.preventDefault();
    const { startSearch, labels, toggleSearchResults } = this.props;
    const searchText =
      this.searchInput && this.searchInput.current ? this.searchInput.current.value : '';
    const CLOSE_IMAGE = 'close-mobile-image';
    const CLOSE_IMAGE_MOBILE = 'close-image-mobile';
    const searchImage = document
      .getElementById(`${CLOSE_IMAGE}`)
      .classList.contains(`${CLOSE_IMAGE_MOBILE}`);

    const termLength = 1;
    if (searchText.length <= termLength) {
      toggleSearchResults(false);
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

  suggestionFound = searchResults => {
    let flag = false;
    if (searchResults && searchResults.autosuggestList) {
      searchResults.autosuggestList.forEach(type => {
        if (type.suggestions && type.suggestions.length > 0) {
          flag = true;
          return false;
        }
        return true;
      });
    }
    return flag;
  };

  setTypeAheadLayout = () => {
    const { showProduct, isLatestSearchResultsExists } = this.props;
    const SEARCH_IMAGE_BAR = 'search-image-icon';
    const SEARCH_BAR = 'searchBar-wrapper';
    const element = !!document.getElementById(`${SEARCH_IMAGE_BAR}`);
    if (!isLatestSearchResultsExists) {
      if (element) {
        if (showProduct) {
          document.getElementById(`${SEARCH_BAR}`).style.borderBottomRightRadius = '0px';
          document.getElementById(`${SEARCH_BAR}`).style.borderBottomLeftRadius = '0px';
        } else {
          document.getElementById(`${SEARCH_BAR}`).removeAttribute('style');
        }
      }
    } else if (element) {
      document.getElementById(`${SEARCH_BAR}`).style.borderBottomRightRadius = '0px';
      document.getElementById(`${SEARCH_BAR}`).style.borderBottomLeftRadius = '0px';
    }
  };

  getSearchBarClassName = () => {
    const { isLatestSearchResultsExists } = this.props;
    return isLatestSearchResultsExists ? 'searchbar-withRecent' : 'searchbar';
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
      fromCondensedHeader,
    } = this.props;

    const HighLightSearch = inputText => this.highlight(inputText);

    const SEARCH_IMAGE = 'search-icon';
    const SEARCH_BLUE_IMAGE = 'search-icon-blue';

    const suggestionFound = this.suggestionFound(searchResults);

    this.setTypeAheadLayout();

    const searchBarClassName = this.getSearchBarClassName();

    return (
      <React.Fragment>
        <div className="searchWrapper" ref={this.targetElement}>
          <div id="searchBar-wrapper" className={`${searchBarClassName}`}>
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
                placeHolder={getLabelValue(labels, 'lbl_what_looking_for')}
                // eslint-disable-next-line jsx-a11y/no-autofocus
                autoFocus
                maxLength="50"
                autoComplete="off"
              />
            </form>
            <Anchor
              id="search-image-typeAhead"
              noLink
              onClick={e => {
                e.preventDefault();
                this.initiateSearch(e);
              }}
              className="search-image-typeAhead"
              data-locator="search-icon"
            >
              <Image
                id="search-image-icon"
                alt="search"
                className="icon-small"
                src={getIconPath(
                  fromCondensedHeader && !isGymboree() ? `${SEARCH_BLUE_IMAGE}` : `${SEARCH_IMAGE}`
                )}
                height="25px"
              />
            </Anchor>
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
                {suggestionFound && (
                  <div className="matchLinkBox">
                    {searchResults.autosuggestList.map(item => {
                      if (item && item.suggestions && item.suggestions.length > 0) {
                        return (
                          <div>
                            <BodyCopy fontFamily="secondary" className="boxHead matchLinkBoxHead">
                              {item.heading}
                            </BodyCopy>
                            <BodyCopy component="div" className="matchLinkBoxBody" lineHeight="39">
                              <ul>
                                {item.suggestions.map(itemData => {
                                  const isCategory =
                                    item.heading === getLabelValue(labels, 'lbl_category_matches');
                                  let itemUrl;
                                  let toPath = `/${getSiteId()}/search/${itemData.text}`;
                                  if (isCategory) {
                                    itemUrl = itemData.url.replace(/'/g, '');
                                    toPath = `/${getSiteId()}${itemUrl}`;
                                  }
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
                                        to={toPath}
                                        onClick={e => {
                                          e.preventDefault();
                                          redirectToSuggestedUrl(`${itemData.text}`, itemUrl);
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
                          </div>
                        );
                      }
                      return '';
                    })}
                  </div>
                )}

                {searchResults &&
                  searchResults.autosuggestProducts &&
                  searchResults.autosuggestProducts.length > 0 && (
                    <div className="matchProductBox">
                      <BodyCopy fontFamily="secondary" className="boxHead matchProductHead">
                        {getLabelValue(labels, 'lbl_search_product_matches')}
                      </BodyCopy>
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
  toggleSearchResults: PropTypes.func.isRequired,
  commonCloseClick: PropTypes.func.isRequired,
  showProduct: PropTypes.bool,
  isSearchOpen: PropTypes.bool,
  fromCondensedHeader: PropTypes.bool,
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
  fromCondensedHeader: false,
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
