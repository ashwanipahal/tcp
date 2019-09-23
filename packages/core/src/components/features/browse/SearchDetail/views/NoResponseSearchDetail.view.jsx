import React from 'react';
import { PropTypes } from 'prop-types';
import { getIconPath } from '@tcp/core/src/utils';
import { Image } from '@tcp/core/src/components/common/atoms';
import withStyles from '../../../../common/hoc/withStyles';
import SearchListingStyle from '../SearchDetail.style';
import { Anchor, Row, Col, BodyCopy } from '../../../../common/atoms';

class NoResponseSearchDetailView extends React.PureComponent {
  render() {
    const { className, slpLabels, searchedText, searchResultSuggestions } = this.props;

    const searchResultSuggestionsArg =
      searchResultSuggestions && searchResultSuggestions.length
        ? searchResultSuggestions.map(searchSuggestion => searchSuggestion.suggestion)
        : 'No Suggestions Found';

    return (
      <div className={className}>
        <Row className="search-by-keywords-container">
          <Col colSize={{ small: 6, medium: 8, large: 12 }}>
            <BodyCopy fontSize="fs14" component="div" fontFamily="secondary" fontWeight="regular">
              {slpLabels.lbl_searched_for}
              <span className="empty-searched-label">{` "${searchedText}"`}</span>
            </BodyCopy>
          </Col>
        </Row>
        <Row className="empty-search-result-title">
          <Col colSize={{ small: 6, medium: 8, large: 12 }}>
            <BodyCopy
              component="div"
              fontSize="fs32"
              fontFamily="secondary"
              fontWeight="semibold"
              textAlign="center"
            >
              {slpLabels.lbl_nothing_matched}
              <span className="searched-label">{` "${searchedText}"`}</span>
            </BodyCopy>
          </Col>
        </Row>
        <Row className="empty-search-result-suggestion">
          <Col colSize={{ small: 6, medium: 8, large: 12 }}>
            <BodyCopy
              fontSize="fs32"
              component="div"
              fontFamily="secondary"
              fontWeight="semibold"
              textAlign="center"
            >
              {slpLabels.lbl_didYouMean}
              {/* <span className="suggestion-label" onClick={() => this.suggestionClick(searchResultSuggestionsArg,searchedText)}>{` "${searchResultSuggestionsArg }"`}</span> */}
              <Anchor
                asPath={`/search/${searchResultSuggestionsArg}`}
                to={`/search?sq=${searchResultSuggestionsArg}`}
                className="suggestion-label"
              >
                {` "${searchResultSuggestionsArg}"`}
              </Anchor>
            </BodyCopy>
          </Col>
        </Row>
        <Row className="empty-search-inputBox-container-wrapper">
          <Col className="empty-search-inputBox-col" colSize={{ small: 6, medium: 8, large: 3 }}>
            <BodyCopy
              fontSize="fs14"
              fontFamily="secondary"
              fontWeight="regular"
              className="empty-search-inputBox-container"
            >
              <input
                className="empty-search-input"
                maxLength="150"
                placeholder="What are you looking for ?"
              />
              <Image
                alt="close"
                className="empty-search-image icon-small"
                src={getIconPath('search-icon')}
                data-locator="close-icon"
                height="25px"
              />
            </BodyCopy>
          </Col>
        </Row>

        <Row className="search-tips-message-container-wrapper">
          <Col colSize={{ small: 6, medium: 8, large: 12 }}>
            <BodyCopy fontSize="fs16" component="div" fontFamily="secondary" textAlign="center">
              <BodyCopy
                fontSize="fs16"
                component="div"
                textAlign="center"
                fontWeight="black"
                className="empty-search-tips-title"
              >
                {slpLabels.lbl_tips}
              </BodyCopy>
              <BodyCopy className="empty-search-tips-items">
                <BodyCopy fontSize="fs16" textAlign="center">
                  {slpLabels.lbl_check_your_spelling}
                </BodyCopy>
                <BodyCopy fontSize="fs16" textAlign="center">
                  {slpLabels.lbl_simplified_keywords}
                </BodyCopy>
                <BodyCopy fontSize="fs16" textAlign="center">
                  {slpLabels.lbl_try_searching}
                </BodyCopy>
                <BodyCopy fontSize="fs16" textAlign="center">
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
  searchResultSuggestions: PropTypes.arrayOf(PropTypes.shape({})),
};

NoResponseSearchDetailView.defaultProps = {
  className: '',
  slpLabels: {},
  searchedText: '',
  searchResultSuggestions: [],
};

export default withStyles(NoResponseSearchDetailView, SearchListingStyle);
