import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { BodyCopy, Anchor } from '@tcp/core/src/components/common/atoms';
import { getLabelValue } from '@tcp/core/src/utils/utils';
import withStyles from '@tcp/core/src/components/common/hoc/withStyles';
import SearchListingStyle from '../SearchDetail.style';

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
class CategoryMatches extends React.PureComponent {
  render() {
    const { searchResults, labels, redirectToSuggestedUrl } = this.props;

    return (
      <React.Fragment>
        <div className="suggestionBox">
          {searchResults &&
            searchResults.autosuggestList &&
            searchResults.autosuggestList.length > 0 &&
            searchResults.autosuggestList.map(item => {
              const isCategory = item.heading === getLabelValue(labels, 'lbl_category_matches');
              return (
                <div>
                  {item && item.suggestions.length > 0 && (
                    <BodyCopy fontFamily="secondary" className="boxHead matchLinkBoxHead">
                      {item.heading}
                    </BodyCopy>
                  )}
                  <BodyCopy component="div" className="matchLinkBoxBody" lineHeight="39">
                    <ul>
                      {item &&
                        item.suggestions &&
                        item.suggestions.map(itemData => {
                          const itemUrl = isCategory ? itemData.url.replace(/'/g, '') : undefined;
                          return (
                            <BodyCopy
                              component="li"
                              fontFamily="secondary"
                              fontSize="fs14"
                              key={item.id}
                              className="empty-search-linkName"
                            >
                              <Anchor
                                className="suggestion-label"
                                to={isCategory ? `${itemUrl}` : `/search/${itemData.text}`}
                                onClick={e => {
                                  e.preventDefault();
                                  redirectToSuggestedUrl(`${itemData.text}`, itemUrl);
                                }}
                              >
                                {itemData.text}
                              </Anchor>
                            </BodyCopy>
                          );
                        })}
                    </ul>
                  </BodyCopy>
                </div>
              );
            })}
        </div>
      </React.Fragment>
    );
  }
}

CategoryMatches.propTypes = {
  labels: PropTypes.shape({
    lbl_search_recent_search: PropTypes.string,
  }),
  searchResults: PropTypes.arrayOf(PropTypes.shape({})),
  redirectToSuggestedUrl: PropTypes.func.isRequired,
};

CategoryMatches.defaultProps = {
  labels: PropTypes.shape({
    lbl_search_recent_search: '',
  }),
  searchResults: [],
};

const mapStateToProps = state => {
  return {
    labels: state.Labels.global && state.Labels.global.Search,
  };
};

export default connect(mapStateToProps)(withStyles(CategoryMatches, SearchListingStyle));
