import React from 'react';
import { connect } from 'react-redux';
import { PropTypes } from 'prop-types';
import { getIconPath } from '@tcp/core/src/utils';
import { Image } from '@tcp/core/src/components/common/atoms';
import { getLabelValue } from '@tcp/core/src/utils/utils';
import withStyles from '../../../../common/hoc/withStyles';
import SearchListingStyle from '../SearchDetail.style';
import { Anchor, Row, Col, BodyCopy } from '../../../../common/atoms';
import { getSearchResult } from '../container/SearchDetail.actions';
import searchData from '../../../../../../../web/src/components/features/content/Header/molecules/SearchBar/SearchBar.mock';

class NoResponseSearchDetailView extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      showProduct: false,
      ...props,
    };

    this.searchInput = React.createRef();
    this.changeSearchText = this.changeSearchText.bind(this);
    this.getSearchResults = this.getSearchResults.bind(this);
  }

  redirectToSearchPage = () => {
    // redirect to search page integration pending
  };

  changeSearchText = e => {
    e.preventDefault();
    const { startSearch } = this.props;
    const searchText = this.searchInput.current.value;
    this.setState({ showProduct: Boolean(searchText.length) }, () => {
      startSearch(searchText);
    });
  };

  getSearchResults = e => {
    e.preventDefault();
    const searchText = this.searchInput.current.value;
    this.redirectToSearchPage(searchText);
  };

  render() {
    const { className, slpLabels, searchedText, searchResultSuggestions, labels } = this.props;

    const { showProduct } = this.state;

    const searchResultSuggestionsArg =
      searchResultSuggestions && searchResultSuggestions.length
        ? searchResultSuggestions.map(searchSuggestion => searchSuggestion.suggestion)
        : slpLabels.lbl_no_suggestion;

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
              <span className="empty-searched-label">{` "${searchedText}"`}</span>
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
              <span className="empty-searched-label-title">{` "${searchedText}"`}</span>
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
                {slpLabels.lbl_didYouMean}
                <Anchor
                  asPath={`/search/${searchResultSuggestionsArg}`}
                  to={`/search?searchQuery=${searchResultSuggestionsArg}`}
                  className="suggestion-label"
                >
                  {` "${searchResultSuggestionsArg}" ?`}
                </Anchor>
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
              <input
                className="empty-search-input"
                maxLength="150"
                placeholder={slpLabels.lbl_looking_for}
                onChange={this.changeSearchText}
                ref={this.searchInput}
              />
              <Image
                alt="close"
                className="empty-search-image icon-small"
                src={getIconPath('search-icon')}
                data-locator="close-icon"
                height="25px"
                onClick={this.getSearchResults}
              />

              {!showProduct ? (
                <BodyCopy fontFamily="secondary" className="boxHead matchLinkBoxHead">
                  {slpLabels.lbl_noresults_found}
                </BodyCopy>
              ) : (
                <div className="matchBox">
                  <div className="matchLinkBox">
                    <BodyCopy fontFamily="secondary" className="boxHead matchLinkBoxHead">
                      {getLabelValue(labels, 'lbl_search_looking_for')}
                    </BodyCopy>
                    <BodyCopy component="div" className="matchLinkBoxBody" lineHeight="39">
                      <ul>
                        {searchData.looking.map(item => {
                          return (
                            <BodyCopy
                              component="li"
                              fontFamily="secondary"
                              fontSize="fs14"
                              key={item.id}
                              className="linkName"
                            >
                              {item.text}
                            </BodyCopy>
                          );
                        })}
                      </ul>
                    </BodyCopy>
                  </div>
                  <div className="matchProductBox">
                    <BodyCopy fontFamily="secondary" className="boxHead matchProductHead">
                      {getLabelValue(labels, 'lbl_search_product_matches')}
                    </BodyCopy>
                    <BodyCopy className="matchProductBody" lineHeight="39" component="div">
                      <ul>
                        {searchData.products.map(item => {
                          return <BodyCopy component="li" key={item.id} className="productBox" />;
                        })}
                      </ul>
                    </BodyCopy>
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
};

const mapStateToProps = state => {
  return {
    searchResults: state.Search.searchResults,
    labels: state.Labels.global && state.Labels.global.Search,
  };
};

export const mapDispatchToProps = dispatch => {
  return {
    startSearch: searchTerm => {
      dispatch(getSearchResult(searchTerm));
    },
  };
};

// export default withStyles(NoResponseSearchDetailView, SearchListingStyle);
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(NoResponseSearchDetailView, SearchListingStyle));
