/* getTopBadge  */
export const getTopBadge = (isMatchingFamily, badge1) => {
  return isMatchingFamily && badge1.matchBadge ? badge1.matchBadge : badge1 && badge1.defaultBadge;
};

/* get video url */
export const getVideoUrl = curentColorEntry => {
  return curentColorEntry && Array.isArray(curentColorEntry.miscInfo.videoUrl)
    ? curentColorEntry.miscInfo.videoUrl[0]
    : '';
};
