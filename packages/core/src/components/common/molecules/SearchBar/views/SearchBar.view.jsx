import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Image, BodyCopy } from '@tcp/core/src/components/common/atoms';
import { getIconPath, routerPush } from '@tcp/core/src/utils';
import { getLabelValue } from '@tcp/core/src/utils/utils';
import { breakpoints } from '@tcp/core/styles/themes/TCP/mediaQuery';
import logger from '@tcp/core/src/utils/loggerInstance';
import withStyles from '@tcp/core/src/components/common/hoc/withStyles';
import SearchBarStyle from '../SearchBar.style';
import searchData from '../SearchBar.mock';
import { getSearchResult } from '../SearchBar.actions';

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
      showProduct: false,
      ...props,
    };

    this.searchInput = React.createRef();
    this.openSearchBar = this.openSearchBar.bind(this);
    this.closeSearchBar = this.closeSearchBar.bind(this);
    this.changeSearchText = this.changeSearchText.bind(this);
    this.initiateSearch = this.initiateSearch.bind(this);
  }

  componentDidUpdate(prevProps) {
    const currentProp = this.props;
    if (currentProp.isSearchOpen && prevProps.isSearchOpen !== currentProp.isSearchOpen) {
      this.searchInput.current.focus();
    }
  }

  openSearchBar = e => {
    e.preventDefault();
    const { setSearchState } = this.props;
    if (window.innerWidth <= breakpoints.large) {
      routerPush('/search', '/search');
    } else {
      setSearchState(true);
    }
  };

  closeSearchBar = e => {
    e.preventDefault();
    const { setSearchState } = this.props;
    setSearchState(false);
  };

  initiateSearch = e => {
    e.preventDefault();
    const { setSearchState } = this.props;
    const searchText = this.searchInput.current.value;
    if (searchText) {
      this.redirectToSearchPage(searchText);
    }
    setSearchState(false);
  };

  redirectToSearchPage = searchText => {
    routerPush(`/search?searchQuery=${searchText}`, `/search/${searchText}`, { shallow: true });
  };

  changeSearchText = e => {
    e.preventDefault();
    const { startSearch, labels } = this.props;
    const searchText = this.searchInput.current.value;
    this.setState({ showProduct: Boolean(searchText.length) }, () => {
      const payload = {
        searchText,
        slpLabels: labels,
      };
      startSearch(payload);
    });
  };

  render() {
    const { className, fromCondensedHeader, searchResults, labels, isSearchOpen } = this.props;
    const { showProduct } = this.state;

    logger.debug(searchResults); // only for use purpose (temporary)

    return (
      <React.Fragment>
        <BodyCopy className={className} component="div">
          {isSearchOpen ? (
            <div className="searchWrapper">
              <div className="searchbar">
                <input
                  ref={this.searchInput}
                  onChange={this.changeSearchText}
                  className="search-input"
                  maxLength="50"
                />
                <Image
                  alt="search"
                  className="search-image icon-small"
                  onClick={this.initiateSearch}
                  src={getIconPath('search-icon')}
                  data-locator="search-icon"
                  height="25px"
                />
                <Image
                  alt="close"
                  className="close-image icon-small"
                  onClick={this.closeSearchBar}
                  src={getIconPath('search-close-icon')}
                  data-locator="close-icon"
                  height="25px"
                />

                {!showProduct ? (
                  <div className="suggestionBox">
                    <div className="trendingBox">
                      <BodyCopy fontFamily="secondary" className="boxHead trendingBoxHead">
                        {getLabelValue(labels, 'lbl_search_whats_trending')}
                      </BodyCopy>
                      <BodyCopy className="trendingBoxBody" lineHeight="39" component="div">
                        <ul>
                          {searchData.trending.map(item => {
                            return (
                              <BodyCopy
                                component="li"
                                fontSize="fs14"
                                fontFamily="secondary"
                                key={item.id}
                                className="tagName"
                              >
                                {item.text}
                              </BodyCopy>
                            );
                          })}
                        </ul>
                      </BodyCopy>
                    </div>
                    <div className="recentBox">
                      <BodyCopy fontFamily="secondary" className="boxHead recentBoxHead">
                        {getLabelValue(labels, 'lbl_search_recent_search')}
                      </BodyCopy>
                      <BodyCopy component="div" className="recentBoxBody" lineHeight="39">
                        <ul>
                          {searchData.recent.map(item => {
                            return (
                              <BodyCopy
                                component="li"
                                fontFamily="secondary"
                                fontSize="fs14"
                                key={item.id}
                                className="recentTag"
                              >
                                {item.text}
                              </BodyCopy>
                            );
                          })}
                        </ul>
                      </BodyCopy>
                    </div>
                  </div>
                ) : (
                  <div className="matchBox">
                    <div className="matchLinkBox">
                      <BodyCopy fontFamily="secondary" className="boxHead matchLinkBoxHead">
                        {getLabelValue(labels, 'lbl_search_looking_for')}
                      </BodyCopy>
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
                                        {itemData.text}
                                      </BodyCopy>
                                    );
                                  })}
                              </ul>
                            </BodyCopy>
                          );
                        })}
                    </div>
                    <div className="matchProductBox">
                      <BodyCopy fontFamily="secondary" className="boxHead matchProductHead">
                        {getLabelValue(labels, 'lbl_search_product_matches')}
                      </BodyCopy>
                      <BodyCopy className="matchProductBody" lineHeight="39" component="div">
                        <ul>
                          {searchResults &&
                            searchResults.autosuggestProducts &&
                            searchResults.autosuggestProducts.map(item => {
                              return (
                                <BodyCopy component="li" key={item.id} className="productBox">
                                  {item.name}
                                </BodyCopy>
                              );
                            })}
                        </ul>
                      </BodyCopy>
                    </div>
                  </div>
                )}
              </div>
            </div>
          ) : (
            <Image
              alt="close"
              className="search-image icon`"
              onClick={this.openSearchBar}
              src={getIconPath(fromCondensedHeader ? 'search-icon-blue' : 'search-icon')}
              data-locator="close-icon"
              height="25px"
            />
          )}
        </BodyCopy>
      </React.Fragment>
    );
  }
}

SearchBar.propTypes = {
  className: PropTypes.string.isRequired,
  fromCondensedHeader: PropTypes.bool,
  startSearch: PropTypes.func.isRequired,
  setSearchState: PropTypes.func.isRequired,
  isSearchOpen: PropTypes.bool,
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
};

SearchBar.defaultProps = {
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
  }),
};

const mapStateToProps = state => {
  return {
    labels: state.Labels.global && state.Labels.global.Search,
    searchResults: state.Search.searchResults,
  };
};

export const mapDispatchToProps = dispatch => {
  return {
    startSearch: payload => {
      dispatch(getSearchResult(payload));
    },
  };
};

export { SearchBar as SearchBarVanilla };
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(SearchBar, SearchBarStyle));
