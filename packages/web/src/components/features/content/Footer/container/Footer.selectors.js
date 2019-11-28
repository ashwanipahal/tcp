export const isLocationEnabledForGuest = state => {
  return state.session.siteDetails.IS_LOCATION_ENABLED_FOR_GUEST;
};

export const isLocationEnabledForLoggedInUser = state => {
  return state.session.siteDetails.IS_LOCATION_ENABLED_FOR_LOGGED_IN_USER;
};
