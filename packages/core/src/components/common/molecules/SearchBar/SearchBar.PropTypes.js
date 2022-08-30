import PropTypes from 'prop-types';

const SearchBarPropTypes = {
  className: PropTypes.string.isRequired,
  fromCondensedHeader: PropTypes.bool,
  startSearch: PropTypes.func.isRequired,
  setSearchState: PropTypes.func.isRequired,
  isSearchOpen: PropTypes.bool,
  showProduct: PropTypes.bool,
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
  onCloseClick: PropTypes.func.isRequired,
};

export default SearchBarPropTypes;
