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
        <Anchor
          id="close-image"
          noLink
          onClick={e => {
            e.preventDefault();
            closeSearchBar(e);
          }}
          className="close-image close-image-toggle"
          data-locator="close-icon"
        >
          <Image
            alt="close"
            className="icon-small"
            src={getIconPath('search-close-icon')}
            height="25px"
          />
        </Anchor>
        <Anchor
          noLink
          id="close-mobile-image"
          onClick={e => {
            e.preventDefault();
            cancelSearchBar(e);
          }}
          className="close-mobile-image search-close-icon-wrapper close-mobile-image-toggle"
          data-locator="close-mobile-con"
        >
          <Image
            alt="mobile-close"
            className="icon-small "
            src={getIconPath('search-close-icon')}
            height="25px"
          />
        </Anchor>
        <Anchor
          noLink
          onClick={e => {
            e.preventDefault();
            closeModalSearch(e);
          }}
          className="cancel-search-label-wrapper"
        >
          <BodyCopy
            component="span"
            fontFamily="secondary"
            fontSize="fs14"
            className={`${className} cancel-search-label`}
          >
            {getLabelValue(labels, 'lbl_cancel_search')}
          </BodyCopy>
        </Anchor>
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
