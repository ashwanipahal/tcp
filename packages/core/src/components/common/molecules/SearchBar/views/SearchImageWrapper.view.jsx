import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Image } from '@tcp/core/src/components/common/atoms';
import { getLabelValue, isGymboree } from '@tcp/core/src/utils/utils';
import { getIconPath } from '@tcp/core/src/utils';
import withStyles from '@tcp/core/src/components/common/hoc/withStyles';
import SearchBarStyle from '../SearchBar.style';
import SearchLayoutWrapper from './SearchLayoutWrapper.view';

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
class SearchImageWrapper extends React.PureComponent {
  render() {
    const {
      fromCondensedHeader,
      className,
      initiateSearchBySubmit,
      openSearchBar,
      labels,
      showProduct,
      isLatestSearchResultsExists,
      latestSearchResults,
      searchResults,
      isSearchOpen,
      closeSearchBar,
      hideOverlayAfterClick,
      redirectToSuggestedUrl,
      setSearchState,
      setDataInLocalStorage,
      redirectToSearchPage,
      startSearch,
      closeModalSearch,
      commonCloseClick,
      toggleSearchResults,
      closeSearchLayover,
    } = this.props;
    const SEARCH_BLUE_IMAGE = 'search-icon-blue';
    const SEARCH_IMAGE = 'search-icon';
    return (
      <React.Fragment>
        {!isSearchOpen && (
          <div>
            {!fromCondensedHeader ? (
              <div id="search-input-wrapper" className="search-input-wrapper">
                <div className="searchBar-input-wrapper">
                  <form
                    id="search-input-form"
                    className={`${className} searchBar-input-form`}
                    noValidate
                    onSubmit={initiateSearchBySubmit}
                  >
                    <input
                      id="search-input"
                      ref={this.searchBarInput}
                      onClick={openSearchBar}
                      className="searchBar-input"
                      maxLength="50"
                      autoComplete="off"
                      placeHolder={getLabelValue(labels, 'lbl_what_looking_for')}
                      readOnly
                    />
                  </form>
                  <Image
                    alt="search"
                    id="search-image-typeAhead"
                    className="searchBar-image-typeAhead icon-small"
                    src={getIconPath(`${SEARCH_BLUE_IMAGE}`)}
                    data-locator="search-icon"
                    height="25px"
                    onClick={openSearchBar}
                  />
                </div>
              </div>
            ) : (
              <Image
                alt="search-image"
                className="search-image icon"
                onClick={openSearchBar}
                src={getIconPath(
                  fromCondensedHeader && !isGymboree() ? `${SEARCH_BLUE_IMAGE}` : `${SEARCH_IMAGE}`
                )}
                data-locator="search-icon"
                height="25px"
              />
            )}
          </div>
        )}

        <div>
          {isSearchOpen && (
            <SearchLayoutWrapper
              showProduct={showProduct}
              closeSearchBar={closeSearchBar}
              isLatestSearchResultsExists={isLatestSearchResultsExists}
              latestSearchResults={latestSearchResults}
              labels={labels}
              searchResults={searchResults}
              hideOverlayAfterClick={hideOverlayAfterClick}
              redirectToSuggestedUrl={redirectToSuggestedUrl}
              setSearchState={setSearchState}
              setDataInLocalStorage={setDataInLocalStorage}
              redirectToSearchPage={redirectToSearchPage}
              startSearch={startSearch}
              closeModalSearch={closeModalSearch}
              commonCloseClick={commonCloseClick}
              toggleSearchResults={toggleSearchResults}
              closeSearchLayover={closeSearchLayover}
            />
          )}
        </div>
      </React.Fragment>
    );
  }
}

SearchImageWrapper.propTypes = {
  className: PropTypes.string.isRequired,
  initiateSearchBySubmit: PropTypes.func.isRequired,
  openSearchBar: PropTypes.func.isRequired,
  closeSearchBar: PropTypes.func.isRequired,
  closeSearchLayover: PropTypes.func.isRequired,
  hideOverlayAfterClick: PropTypes.func.isRequired,
  redirectToSuggestedUrl: PropTypes.func.isRequired,
  setSearchState: PropTypes.func.isRequired,
  setDataInLocalStorage: PropTypes.func.isRequired,
  redirectToSearchPage: PropTypes.func.isRequired,
  startSearch: PropTypes.func.isRequired,
  toggleSearchResults: PropTypes.func.isRequired,
  closeModalSearch: PropTypes.func.isRequired,
  commonCloseClick: PropTypes.func.isRequired,
  showProduct: PropTypes.bool,
  isLatestSearchResultsExists: PropTypes.bool,
  isSearchOpen: PropTypes.bool,
  fromCondensedHeader: PropTypes.bool,
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

SearchImageWrapper.defaultProps = {
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

export default connect()(withStyles(SearchImageWrapper, SearchBarStyle));
