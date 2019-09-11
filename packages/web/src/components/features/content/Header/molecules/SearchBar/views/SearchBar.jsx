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

  changeSearchText = e => {
    e.preventDefault();
    const { startSearch } = this.props;
    const searchText = this.searchInput.current.value;
    this.setState({ showProduct: Boolean(searchText.length) }, () => {
      startSearch(searchText);
    });
  };

  render() {
    const { className, searchResults, labels, isSearchOpen } = this.props;

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
                  alt="close"
                  className="search-image icon-small"
                  onClick={this.closeSearchBar}
                  src={getIconPath('search-icon')}
                  data-locator="close-icon"
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
                      <BodyCopy className="trendingBoxHead">
                        {getLabelValue(labels, 'lbl_search_whats_trending')}
                      </BodyCopy>
                      <BodyCopy
                        className="trendingBoxBody"
                        fontFamily="Nunito"
                        fontSize="15px"
                        lineHeight="39"
                        component="div"
                      >
                        <ul>
                          {searchData.trending.map(item => {
                            return (
                              <li key={item.id} className="tagName">
                                {item.text}
                              </li>
                            );
                          })}
                        </ul>
                      </BodyCopy>
                    </div>
                    <div className="recentBox">
                      <BodyCopy className="recentBoxHead">
                        {getLabelValue(labels, 'lbl_search_recent_search')}
                      </BodyCopy>
                      <BodyCopy
                        component="div"
                        className="recentBoxBody"
                        fontFamily="Nunito"
                        fontSize="15px"
                        lineHeight="39"
                      >
                        <ul>
                          {searchData.recent.map(item => {
                            return (
                              <li key={item.id} className="recentTag">
                                {item.text}
                              </li>
                            );
                          })}
                        </ul>
                      </BodyCopy>
                    </div>
                  </div>
                ) : (
                  <div className="matchBox">
                    <div className="matchLinkBox">
                      <BodyCopy className="matchLinkBoxHead">
                        {getLabelValue(labels, 'lbl_search_looking_for')}
                      </BodyCopy>
                      <BodyCopy
                        component="div"
                        className="matchLinkBoxBody"
                        fontFamily="Nunito"
                        fontSize="15px"
                        lineHeight="39"
                      >
                        <ul>
                          {searchData.looking.map(item => {
                            return (
                              <li key={item.id} className="linkName">
                                {item.text}
                              </li>
                            );
                          })}
                        </ul>
                      </BodyCopy>
                    </div>
                    <div className="matchProductBox">
                      <BodyCopy className="matchProductHead">
                        {getLabelValue(labels, 'lbl_search_product_matches')}
                      </BodyCopy>
                      <BodyCopy
                        className="matchProductBody"
                        fontFamily="Nunito"
                        fontSize="15px"
                        lineHeight="39"
                        component="div"
                      >
                        <ul>
                          {searchData.products.map(item => {
                            return <li key={item.id} className="productBox" />;
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
              src={getIconPath('search-icon')}
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
    startSearch: searchTerm => {
      dispatch(getSearchResult(searchTerm));
    },
  };
};

export { SearchBar as SearchBarVanilla };
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(SearchBar, SearchBarStyle));
