export const isSearched = () => {
  return true;
};

// Inline function to get sum of object array element
const sumValues = obj => Object.values(obj).reduce((a, b) => a + b);

function getIsShowCategoryGrouping(state) {
  const isL2Category = state.ProductListing.breadCrumbTrail.length === 2;
  // const isNotAppliedSort = !state.productListing.appliedSortId;
  const isNotAppliedSort = !null;
  const appliedFilters = state.ProductListing.appliedFiltersIds;
  const isNotAppliedFilter =
    (appliedFilters && appliedFilters.length > 0 && !sumValues(appliedFilters)) || true;

  return isL2Category && isNotAppliedSort && isNotAppliedFilter;
}
