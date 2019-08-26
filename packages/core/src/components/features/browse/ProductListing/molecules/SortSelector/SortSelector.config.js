const SORT_OPTIONS_MAP_US = [
    { displayName: 'Recommended', id: '' }, // Default, no sort param required.
    { displayName: 'Price: High to Low', id: 'min_offer_price desc' },
    { displayName: 'Price: Low to High', id: 'min_offer_price asc' },
    { displayName: 'Newest', id: 'newest_score desc' },
    { displayName: 'Most Favorited', id: 'favoritedcount desc' },
    { displayName: 'Top Rated', id: 'TCPBazaarVoiceRating desc' },
];

export default SORT_OPTIONS_MAP_US;