import PropTypes from 'prop-types';

export const listingHeader = 'listing-header';
export const listingType = 'listing';
export const detailsType = 'detail';

export const propTypes = {
  className: PropTypes.string,
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
    lbl_storelocators_details_getdirections_btn: PropTypes.string,
    lbl_storelocators_details_callstore_btn: PropTypes.string,
    lbl_storelocators_details_changestore_btn: PropTypes.string,
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
  openCallStore: PropTypes.func,
  storeIndex: PropTypes.number,
  setFavoriteStore: PropTypes.func,
  locatorGetDirections: PropTypes.string,
  locatorSetFavStore: PropTypes.string,
  showSetFavorite: PropTypes.bool,
  titleClickCb: PropTypes.func,
};

export const defaultProps = {
  className: null,
  children: null,
  variation: detailsType,
  isFavorite: false,
  isListingHeader: false,
  openStoreDetail: null,
  openStoreDirections: null,
  openCallStore: null,
  setFavoriteStore: null,
  storeIndex: 0,
  titleClickCb: null,
  locatorDirections: 'get-store-directions',
  locatorSetFavStore: 'set-favorite-store',
};
