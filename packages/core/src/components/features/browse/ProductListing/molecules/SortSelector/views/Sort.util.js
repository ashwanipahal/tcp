const getSortOptions = sortLabels => {
  return [
    { displayName: sortLabels.lbl_recommended, id: '' }, // Default, no sort param required.
    { displayName: sortLabels.lbl_min_offer_price_desc, id: 'min_offer_price desc' },
    { displayName: sortLabels.lbl_min_offer_price_asc, id: 'min_offer_price asc' },
    { displayName: sortLabels.lbl_newest_score, id: 'newest_score desc' },
    { displayName: sortLabels.lbl_favoritedcount, id: 'favoritedcount desc' },
    { displayName: sortLabels.lbl_TCPBazaarVoiceRating, id: 'TCPBazaarVoiceRating desc' },
  ];
};

export default getSortOptions;
