import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Image } from '@tcp/core/src/components/common/atoms';
import { getLabelValue } from '@tcp/core/src/utils/utils';
import { getIconPath } from '@tcp/core/src/utils';
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
class SearchImageWrapper extends React.PureComponent {
  render() {
    const {
      fromCondensedHeader,
      className,
      initiateSearchBySubmit,
      openSearchBar,
      labels,
      initiateSearch,
    } = this.props;
    const SEARCH_BLUE_IMAGE = 'search-icon-blue';
    return (
      <React.Fragment>
        {!fromCondensedHeader ? (
          <div className="search-input-wrapper">
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
                  placeHolder={getLabelValue(labels, 'lbl_search_looking_for')}
                />
              </form>
              <Image
                alt="search"
                id="search-image-typeAhead"
                className="searchBar-image-typeAhead icon-small"
                onClick={initiateSearch}
                src={getIconPath(`${SEARCH_BLUE_IMAGE}`)}
                data-locator="search-icon"
                height="25px"
              />
            </div>
          </div>
        ) : (
          <Image
            alt="search-image"
            className="search-image icon"
            onClick={openSearchBar}
            src={getIconPath(`${SEARCH_BLUE_IMAGE}`)}
            data-locator="search-icon"
            height="25px"
          />
        )}
      </React.Fragment>
    );
  }
}

SearchImageWrapper.propTypes = {
  className: PropTypes.string.isRequired,
  fromCondensedHeader: PropTypes.bool,
  initiateSearchBySubmit: PropTypes.func.isRequired,
  openSearchBar: PropTypes.func.isRequired,
  initiateSearch: PropTypes.func.isRequired,
  labels: PropTypes.shape({
    lbl_search_looking_for: PropTypes.string,
  }),
};

SearchImageWrapper.defaultProps = {
  fromCondensedHeader: false,
  labels: PropTypes.shape({
    lbl_search_looking_for: '',
  }),
};

export default connect()(withStyles(SearchImageWrapper, SearchBarStyle));
