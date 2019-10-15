import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { BodyCopy, Anchor } from '@tcp/core/src/components/common/atoms';
import { getLabelValue } from '@tcp/core/src/utils/utils';
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
  isRecentResultExist = searchResults => {
    const { labels } = this.props;
    if (searchResults.length > 0) {
      return (
        <BodyCopy fontFamily="secondary" className="boxHead recentBoxHead">
          {getLabelValue(labels, 'lbl_search_recent_search')}
        </BodyCopy>
      );
    }
    return null;
  };

  render() {
    const { className, isLatestSearchResultsExists, latestSearchResults } = this.props;

    const RecentResultsLabel = () => {
      return this.isRecentResultExist(latestSearchResults);
    };

    return (
      <React.Fragment>
        <div className={`${className} suggestionBox`}>
          {isLatestSearchResultsExists && (
            <div className="recentBox">
              <RecentResultsLabel latestSearchResults={latestSearchResults} />
              <BodyCopy component="div" className="recentBoxBody" lineHeight="39">
                <ul>
                  {latestSearchResults.map(item => {
                    return (
                      <BodyCopy
                        component="li"
                        fontFamily="secondary"
                        fontSize="fs14"
                        key={item.id}
                        className="recentTag"
                      >
                        <Anchor
                          asPath={`/search/${item}`}
                          to={`/search?searchQuery=${item}`}
                          className="suggestion-label"
                        >
                          {item.toUpperCase()}
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
  className: PropTypes.string.isRequired,
  labels: PropTypes.shape({
    lbl_search_recent_search: PropTypes.string,
  }),
  isLatestSearchResultsExists: PropTypes.bool,
  latestSearchResults: PropTypes.arrayOf(PropTypes.shape({})),
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
