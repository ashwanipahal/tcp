const getMyFavoriteStoreLabels = state => {
  const {
    account: {
      common: {
        lbl_common_edit: edit,
        lbl_common_myFavoriteStore: myFavoriteStore,
        lbl_common_addAStore: addAStore,
        lbl_common_accessBuyOnline: accessBuyOnline,
        lbl_common_favStoreNotAdded: favStoreNotAdded,
        lbl_common_updateFavoriteStore: updateFavoriteStore,
      },
    },
  } = state.Labels;

  return {
    myFavoriteStore,
    addAStore,
    accessBuyOnline,
    favStoreNotAdded,
    updateFavoriteStore,
    edit,
  };
};

export default getMyFavoriteStoreLabels;
