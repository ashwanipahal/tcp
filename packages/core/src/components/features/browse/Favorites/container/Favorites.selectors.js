export const fetchCurrencySymbol = state => {
  const currency = state.session && state.session.siteDetails.currency;
  if (currency) {
    return currency === 'USD' || currency === 'CA' ? '$' : currency;
  }
  return '$';
};

export const getLabelsFavorites = state => state.Labels && state.Labels.Favorites;

export default fetchCurrencySymbol;
