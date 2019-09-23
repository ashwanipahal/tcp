import PropTypes from 'prop-types';

export const listingHeader = 'listing-header';
export const listingType = 'listing';
export const detailsType = 'detail';

export const propTypes = {
  className: PropTypes.string.isRequired,
  children: PropTypes.arrayOf(PropTypes.node),
  variation: PropTypes.oneOf([listingType, detailsType, listingHeader]),
  labels: PropTypes.shape({
    lbl_storelocators_landingpage_storedetails_link: PropTypes.string,
    lbl_storelocators_landingpage_getdirections_link: PropTypes.string,
    lbl_storelocators_landingpage_setfavStore: PropTypes.string,
    lbl_storelocators_landingpage_favStore: PropTypes.string,
    lbl_storelocators_common_atThisPlace: PropTypes.string,
    lbl_storelocators_landingpage_openInterval: PropTypes.string,
    lbl_storelocators_landingpage_milesAway: PropTypes.string,
  }).isRequired,
  store: PropTypes.shape({
    basicInfo: PropTypes.shape({
      address: PropTypes.shape({
        addressLine1: PropTypes.string,
        city: PropTypes.string,
        state: PropTypes.string,
        zipCode: PropTypes.string,
      }),
      phone: PropTypes.string,
      storeName: PropTypes.string,
      coordinates: PropTypes.shape({
        lat: PropTypes.number,
        long: PropTypes.number,
      }),
    }),
    hours: PropTypes.shape({}),
    distance: PropTypes.string,
    features: PropTypes.shape({
      storeType: PropTypes.string,
    }),
    isGym: PropTypes.bool,
  }).isRequired,
  isFavorite: PropTypes.bool,
  isListingHeader: PropTypes.bool,
  openStoreDetail: PropTypes.func,
  openStoreDirections: PropTypes.func,
  storeIndex: PropTypes.number,
  setFavoriteStore: PropTypes.func,
};

export const defaultProps = {
  children: null,
  variation: detailsType,
  isFavorite: false,
  isListingHeader: false,
  openStoreDetail: null,
  openStoreDirections: null,
  setFavoriteStore: null,
  storeIndex: 0,
};
