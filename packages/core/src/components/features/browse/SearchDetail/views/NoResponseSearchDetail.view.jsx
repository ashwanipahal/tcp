/* eslint-disable max-lines */
import React from 'react';
import { connect } from 'react-redux';
import { PropTypes } from 'prop-types';
import { getIconPath } from '@tcp/core/src/utils';
import { getSiteId } from '@tcp/core/src/utils/utils';
import { Image } from '@tcp/core/src/components/common/atoms';
import Constants from '@tcp/core/src/components/common/molecules/Recommendations/container/Recommendations.constants';
import Recommendations from '@tcp/web/src/components/common/molecules/Recommendations';
import withStyles from '../../../../common/hoc/withStyles';
import SearchListingStyle from '../SearchDetail.style';
import { Anchor, Row, Col, BodyCopy } from '../../../../common/atoms';
import { getSearchResult } from '../container/SearchDetail.actions';
import {
  updateLocalStorageData,
  getRecentStoreFromLocalStorage,
} from '../../../../common/molecules/SearchBar/userRecentStore';
import { routerPush } from '../../../../../utils/index';
import SuggestionBox from '../../../../common/molecules/SearchBar/views/SuggestionBox.view';
import CategoryMatches from './CategoryMatches.view';
import { getLatestSearchResultsExists } from '../container/SearchDetail.util';

class NoResponseSearchDetailView extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      showProduct: false,
    };

    this.searchInput = React.createRef();
    this.changeSearchText = this.changeSearchText.bind(this);
    this.getSearchResults = this.getSearchResults.bind(this);
  }

  componentDidMount() {
    const { trackPageLoad, searchType, searchedText } = this.props;
    if (searchType && searchedText) {
      trackPageLoad({
        products: [],
        pageSearchType: searchType,
        pageSearchText: searchedText,
        pageType: 'search',
        pageName: 'search:results',
        pageSection: 'search',
        pageSubSection: 'search',
        customEvents: ['event91', 'event92', 'event80', 'event21'],
        internalCampaignId: 'non-internal campaign',
        listingCount: 'Zero',
      });
    }
  }

  formatProductsData = products => {
    return products.map((tile, index) => {
      const {
        productInfo: { listPrice, offerPrice, name, generalProductId, priceRange },
        miscInfo: { categoryName },
      } = tile;
      const productId = generalProductId && generalProductId.split('_')[0];
      const productName = name;
      return {
        id: productId,
        colorId: generalProductId,
        name: productName,
        price: offerPrice,
        listPrice,
        extPrice: priceRange.lowOfferPrice,
        position: index + 1,
        type: categoryName,
      };
    });
  };

  changeSearchText = e => {
    e.preventDefault();
    const { startSearch, slpLabels, searchResults } = this.props;
    let searchText = this.searchInput.current.value;
    searchText = searchText.replace(/ %|% |%/g, ' ').trim();

    const showMatchBox = this.getMatchBoxStatus(searchResults);

    this.setState({ showProduct: Boolean(searchText.length) }, () => {
      const payload = {
        slpLabels,
        searchText,
      };
      startSearch(payload);
    });

    if (searchText.length > 3 && !showMatchBox) {
      this.setState({ showProduct: false });
    }
  };

  getSearchResults = e => {
    e.preventDefault();
    let searchText = this.searchInput.current.value;
    searchText = searchText.replace(/ %|% |%/g, ' ').trim();
    if (searchText) {
      this.redirectToSuggestedUrl(searchText);
    }
  };

  startInitiateSearch = () => {
    let searchText = this.searchInput.current.value;
    if (searchText) {
      searchText = searchText.toLowerCase();
      searchText = searchText.replace(/ %|% |%/g, ' ').trim();
      this.redirectToSuggestedUrl(searchText);
    }
  };

  initiateSearchBySubmit = e => {
    e.preventDefault();
    this.startInitiateSearch();
  };

  getMatchBoxStatus = searchResults => {
    return (
      (searchResults &&
        searchResults.autosuggestList &&
        searchResults.autosuggestList[0].suggestions &&
        searchResults.autosuggestList[0].suggestions.length > 0) ||
      (searchResults &&
        searchResults.autosuggestProducts &&
        searchResults.autosuggestProducts.length > 0)
    );
  };

  setDataInLocalStorage = (searchText, url) => {
    updateLocalStorageData(searchText, url);
  };

  redirectToSuggestedUrl = (searchText, url) => {
    if (searchText) {
      this.setDataInLocalStorage(searchText, url);
      if (url) {
        routerPush(`/c?cid=${url.split('/c/')[1]}`, `${url}`, { shallow: false });
      } else {
        routerPush(`/search?searchQuery=${searchText}`, `/search/${searchText}`, { shallow: true });
      }
    }
  };

  getEmptySearchInputClassName = isLatestSearchResultsExists => {
    const { showProduct } = this.state;

    return isLatestSearchResultsExists && showProduct
      ? 'empty-search-input-withRecent'
      : 'empty-search-input';
  };

  render() {
    const {
      className,
      slpLabels,
      searchedText,
      searchResultSuggestions,
      searchResults,
      pdpLabels,
    } = this.props;

    const { showProduct } = this.state;

    const searchResultSuggestionsArg =
      searchResultSuggestions && searchResultSuggestions.length
        ? searchResultSuggestions.map(searchSuggestion => searchSuggestion.suggestion)
        : slpLabels.lbl_no_suggestion;

    const recommendationAttributes = {
      variations: 'moduleO',
      page: Constants.RECOMMENDATIONS_PAGES_MAPPING.NULL_SEARCH,
      showLoyaltyPromotionMessage: false,
      headerAlignment: 'left',
    };

    const getRecentStore = getRecentStoreFromLocalStorage();
    let latestSearchResults;

    if (getRecentStore) {
      latestSearchResults = JSON.parse(getRecentStore.split(','));
    } else {
      latestSearchResults = [];
    }

    const isLatestSearchResultsExists = getLatestSearchResultsExists(latestSearchResults);
    const emptySearchInputClassName = this.getEmptySearchInputClassName(
      isLatestSearchResultsExists
    );

    return (
      <div className={className}>
        <Row className="search-by-keywords-container">
          <Col colSize={{ small: 6, medium: 8, large: 12 }}>
            <BodyCopy
              fontSize={['fs16', 'fs14', 'fs14']}
              component="div"
              fontFamily="secondary"
              fontWeight="regular"
            >
              {slpLabels.lbl_searched_for}
              <span className="empty-searched-label">{` "${searchedText.split('?')[0]}"`}</span>
            </BodyCopy>
          </Col>
        </Row>
        <Row className="empty-search-result-title">
          <Col colSize={{ small: 6, medium: 8, large: 12 }}>
            <BodyCopy
              component="div"
              fontSize={['fs16', 'fs32', 'fs32']}
              fontFamily="secondary"
              fontWeight="semibold"
              textAlign="center"
            >
              {slpLabels.lbl_nothing_matched}
              <span className="empty-searched-label-title">
                {` "${searchedText.split('?')[0]}"`}
              </span>
            </BodyCopy>
          </Col>
        </Row>
        {searchResultSuggestionsArg !== slpLabels.lbl_no_suggestion && (
          <Row className="empty-search-result-suggestion">
            <Col colSize={{ small: 6, medium: 8, large: 12 }}>
              <BodyCopy
                fontSize={['fs16', 'fs32', 'fs32']}
                component="div"
                fontFamily="secondary"
                fontWeight="semibold"
                textAlign="center"
              >
                {`${slpLabels.lbl_didYouMean} "`}
                <Anchor
                  noLink
                  className="suggestion-label"
                  to={`/${getSiteId()}/search/${searchResultSuggestionsArg}`}
                  onClick={e => {
                    e.preventDefault();
                    this.redirectToSuggestedUrl(`${searchResultSuggestionsArg}`);
                  }}
                >
                  {` ${searchResultSuggestionsArg}`}
                </Anchor>
                {`"?`}
              </BodyCopy>
            </Col>
          </Row>
        )}
        <Row className="empty-search-inputBox-container-wrapper">
          <Col className="empty-search-inputBox-col" colSize={{ small: 6, medium: 8, large: 3 }}>
            <BodyCopy
              fontSize={['fs16', 'fs32', 'fs32']}
              fontFamily="secondary"
              fontWeight="regular"
              className="empty-search-inputBox-container"
            >
              <form className={className} noValidate onSubmit={this.initiateSearchBySubmit}>
                <input
                  id="emptySearchInput"
                  className={`${emptySearchInputClassName}`}
                  maxLength="150"
                  placeholder={slpLabels.lbl_looking_for}
                  onChange={this.changeSearchText}
                  ref={this.searchInput}
                  autoComplete="off"
                />
              </form>

              <Image
                alt="search"
                className="empty-search-image icon-small"
                src={getIconPath('search-icon')}
                data-locator="search-icon"
                height="25px"
                onClick={this.getSearchResults}
              />

              {!showProduct ? (
                <BodyCopy
                  fontFamily="secondary"
                  className="boxHead matchLinkBoxHead suggestionHide"
                >
                  {slpLabels.lbl_noresults_found}
                </BodyCopy>
              ) : (
                <div className="matchBox">
                  <div className="matchLinkBox">
                    <SuggestionBox
                      isLatestSearchResultsExists={isLatestSearchResultsExists}
                      latestSearchResults={latestSearchResults}
                      labels={slpLabels}
                      redirectToSuggestedUrl={this.redirectToSuggestedUrl}
                    />
                    <CategoryMatches
                      searchResults={searchResults}
                      labels={slpLabels}
                      redirectToSuggestedUrl={this.redirectToSuggestedUrl}
                    />
                  </div>
                </div>
              )}
            </BodyCopy>
          </Col>
        </Row>

        <Row className="search-tips-message-container-wrapper">
          <Col colSize={{ small: 6, medium: 8, large: 12 }}>
            <BodyCopy fontSize="fs16" component="div" fontFamily="secondary" textAlign="center">
              <BodyCopy
                fontSize={['fs12', 'fs16', 'fs16']}
                component="div"
                textAlign="center"
                fontWeight="black"
                className="empty-search-tips-title"
                fontFamily="secondary"
              >
                {slpLabels.lbl_tips}
              </BodyCopy>
              <BodyCopy className="empty-search-tips-items">
                <BodyCopy
                  fontSize={['fs12', 'fs16', 'fs16']}
                  color="gray.1000"
                  fontFamily="secondary"
                  textAlign="center"
                >
                  {slpLabels.lbl_check_your_spelling}
                </BodyCopy>
                <BodyCopy
                  fontSize={['fs12', 'fs16', 'fs16']}
                  color="gray.1000"
                  fontFamily="secondary"
                  textAlign="center"
                >
                  {slpLabels.lbl_simplified_keywords}
                </BodyCopy>
                <BodyCopy
                  fontSize={['fs12', 'fs16', 'fs16']}
                  color="gray.1000"
                  fontFamily="secondary"
                  textAlign="center"
                >
                  {slpLabels.lbl_try_searching}
                </BodyCopy>
                <BodyCopy
                  fontSize={['fs12', 'fs16', 'fs16']}
                  color="gray.1000"
                  fontFamily="secondary"
                  textAlign="center"
                >
                  {slpLabels.lbl_narrow_searches}
                </BodyCopy>
              </BodyCopy>
            </BodyCopy>
          </Col>
        </Row>
        <Row>
          <Col colSize={{ small: 6, medium: 8, large: 12 }}>
            <div className={`${className} product-description-list`}>
              <Recommendations {...recommendationAttributes} />
            </div>
          </Col>
        </Row>
        <Row>
          <Col colSize={{ small: 6, medium: 8, large: 12 }}>
            <div className="product-detail-section">
              <Recommendations
                headerLabel={pdpLabels.recentlyViewed}
                portalValue={Constants.RECOMMENDATIONS_MBOXNAMES.RECENTLY_VIEWED}
                {...recommendationAttributes}
              />
            </div>
          </Col>
        </Row>
      </div>
    );
  }
}

NoResponseSearchDetailView.propTypes = {
  className: PropTypes.string,
  slpLabels: PropTypes.objectOf(PropTypes.oneOfType([PropTypes.string])),
  searchedText: PropTypes.string,
  searchResultSuggestions: PropTypes.arrayOf(
    PropTypes.shape({
      suggestion: PropTypes.string.isRequired,
    })
  ),
  startSearch: PropTypes.func.isRequired,
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
  pdpLabels: PropTypes.objectOf(PropTypes.oneOfType([PropTypes.string])),
  trackPageLoad: PropTypes.func,
  products: PropTypes.arrayOf(PropTypes.shape({})),
  searchType: PropTypes.string,
};

NoResponseSearchDetailView.defaultProps = {
  className: '',
  slpLabels: {},
  searchedText: '',
  searchResultSuggestions: [],
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
  pdpLabels: {},
  searchType: 'keyword',
  products: [],
  trackPageLoad: () => {},
};

const mapStateToProps = state => {
  return {
    searchResults: state.Search.searchResults,
    labels: state.Labels.global && state.Labels.global.Search,
  };
};

export const mapDispatchToProps = dispatch => {
  return {
    startSearch: payload => {
      dispatch(getSearchResult(payload));
    },
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(NoResponseSearchDetailView, SearchListingStyle));
