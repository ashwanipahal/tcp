import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Image, BodyCopy, Anchor } from '@tcp/core/src/components/common/atoms';
import { getIconPath } from '@tcp/core/src/utils';
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
class CancelSearch extends React.PureComponent {
  render() {
    const { className, closeModalSearch, cancelSearchBar, closeSearchBar, labels } = this.props;

    return (
      <React.Fragment>
        <Image
          alt="close"
          id="close-image"
          className="close-image icon-small close-image-toggle"
          onClick={closeSearchBar}
          src={getIconPath('search-close-icon')}
          data-locator="close-icon"
          height="25px"
        />
        <span className="search-close-icon-wrapper">
          <Image
            alt="mobile-close"
            id="close-mobile-image"
            className="close-mobile-image icon-small close-mobile-image-toggle"
            onClick={cancelSearchBar}
            src={getIconPath('search-close-icon')}
            data-locator="close-mobile-con"
            height="25px"
          />
        </span>
        <BodyCopy
          component="span"
          fontFamily="secondary"
          fontSize="fs14"
          className={`${className} cancel-search-label-wrapper`}
        >
          <Anchor onClick={closeModalSearch} className="cancel-search-label">
            {getLabelValue(labels, 'lbl_cancel_search')}
          </Anchor>
        </BodyCopy>
      </React.Fragment>
    );
  }
}

CancelSearch.propTypes = {
  className: PropTypes.string.isRequired,
  labels: PropTypes.shape({
    lbl_cancel_search: PropTypes.string,
  }),
  closeModalSearch: PropTypes.func.isRequired,
  cancelSearchBar: PropTypes.func.isRequired,
  closeSearchBar: PropTypes.func.isRequired,
};

CancelSearch.defaultProps = {
  labels: PropTypes.shape({
    lbl_cancel_search: '',
  }),
};

const mapStateToProps = state => {
  return {
    labels: state.Labels.global && state.Labels.global.Search,
  };
};

export default connect(mapStateToProps)(withStyles(CancelSearch, SearchBarStyle));
