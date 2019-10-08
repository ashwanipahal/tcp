import React from 'react';
import { connect } from 'react-redux';
import { PropTypes } from 'prop-types';

import withStyles from '../../../../common/hoc/withStyles';
import { styles } from '../NoResponseSearchDetail.style.native';
import { BodyCopy } from '../../../../common/atoms';
import { getSearchResult } from '../container/SearchDetail.actions';
import { routerPush } from '../../../../../utils/index';

class NoResponseSearchDetailView extends React.PureComponent {
  // eslint-disable-next-line
  constructor(props) {
    super(props);
  }

  redirectToSearchPage = searchText => {
    routerPush(`/search?searchQuery=${searchText}`, `/search/${searchText}`, { shallow: true });
  };

  render() {
    const { searchedText } = this.props;

    return (
      <BodyCopy
        margin="12px 0 0 12px"
        dataLocator="slp_store_name_value"
        fontFamily="secondary"
        fontSize="fs16"
        fontWeight="semibold"
        color="gray.900"
        text={`No result found ${searchedText}`}
      />
    );
  }
}

NoResponseSearchDetailView.propTypes = {
  searchedText: PropTypes.string,
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
  searchedText: '',
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

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(NoResponseSearchDetailView, styles));
