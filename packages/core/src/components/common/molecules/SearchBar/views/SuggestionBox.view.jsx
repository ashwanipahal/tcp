import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { BodyCopy, Anchor } from '@tcp/core/src/components/common/atoms';
import { getSiteId, getLabelValue } from '@tcp/core/src/utils/utils';
import withStyles from '@tcp/core/src/components/common/hoc/withStyles';
import SearchBarStyle from '../SearchBar.style';

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
class SuggestionBox extends React.PureComponent {
  render() {
    const {
      isLatestSearchResultsExists,
      latestSearchResults,
      labels,
      redirectToSuggestedUrl,
    } = this.props;

    return (
      <React.Fragment>
        <div className="suggestionBox">
          {isLatestSearchResultsExists && (
            <div className="recentBox">
              {latestSearchResults && latestSearchResults.length > 0 && (
                <BodyCopy fontFamily="secondary" className="boxHead recentBoxHead">
                  {getLabelValue(labels, 'lbl_search_recent_search')}
                </BodyCopy>
              )}

              <BodyCopy component="div" className="recentBoxBody" lineHeight="39">
                <ul>
                  {latestSearchResults.reverse().map(item => {
                    const itemParts = item.split('<url>');
                    return (
                      <BodyCopy
                        component="li"
                        fontFamily="secondary"
                        fontSize="fs14"
                        key={item.id}
                        className="recentTag"
                        onClick={e => {
                          e.preventDefault();
                          redirectToSuggestedUrl(`${itemParts[0]}`, itemParts[1]);
                        }}
                      >
                        <Anchor
                          noLink
                          className="suggestion-label"
                          to={
                            itemParts[1]
                              ? `/${getSiteId()}${itemParts[1]}`
                              : `/${getSiteId()}/search/${itemParts[0]}`
                          }
                        >
                          {itemParts[0].charAt(0).toUpperCase() + itemParts[0].slice(1)}
                        </Anchor>
                      </BodyCopy>
                    );
                  })}
                </ul>
              </BodyCopy>
            </div>
          )}
        </div>
      </React.Fragment>
    );
  }
}

SuggestionBox.propTypes = {
  labels: PropTypes.shape({
    lbl_search_recent_search: PropTypes.string,
  }),
  isLatestSearchResultsExists: PropTypes.bool,
  latestSearchResults: PropTypes.arrayOf(PropTypes.shape({})),
  redirectToSuggestedUrl: PropTypes.func.isRequired,
};

SuggestionBox.defaultProps = {
  labels: PropTypes.shape({
    lbl_search_recent_search: '',
  }),
  latestSearchResults: [],
  isLatestSearchResultsExists: false,
};

const mapStateToProps = state => {
  return {
    labels: state.Labels.global && state.Labels.global.Search,
  };
};

export default connect(mapStateToProps)(withStyles(SuggestionBox, SearchBarStyle));
