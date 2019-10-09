import PropTypes from 'prop-types';

export const listingHeader = 'listing-header';
export const listingType = 'listing';
export const detailsType = 'detail';

export const propTypes = {
  className: PropTypes.string,
  children: PropTypes.arrayOf(PropTypes.node),
  variation: PropTypes.oneOf([listingType, detailsType, listingHeader]),
  labels: PropTypes.shape({
    lbl_storelanding_storedetails_link: PropTypes.string,
    lbl_storelanding_getdirections_link: PropTypes.string,
    lbl_storelanding_setfavStore: PropTypes.string,
    lbl_storelanding_favStore: PropTypes.string,
    lbl_storelanding_atThisPlace: PropTypes.string,
    lbl_storelanding_openInterval: PropTypes.string,
    lbl_storelanding_milesAway: PropTypes.string,
    lbl_storedetails_getdirections_btn: PropTypes.string,
    lbl_storedetails_callstore_btn: PropTypes.string,
    lbl_storedetails_changestore_btn: PropTypes.string,
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
  dataLocatorKey: PropTypes.string,
};

export const defaultProps = {
  className: null,
  children: null,
  variation: detailsType,
  isFavorite: false,
  isListingHeader: false,
  openStoreDetail: null,
  openStoreDirections: store => store,
  openCallStore: null,
  setFavoriteStore: null,
  storeIndex: 0,
  titleClickCb: null,
  locatorDirections: 'get-store-directions',
  locatorSetFavStore: 'set-favorite-store',
  dataLocatorKey: '',
};
