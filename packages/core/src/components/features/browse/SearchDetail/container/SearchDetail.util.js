export const isSearched = () => {
  return true;
};

// Inline function to get sum of object array element
const sumValues = obj => Object.values(obj).reduce((a, b) => a + b);

function getIsShowCategoryGrouping(state) {
  const isL2Category = state.ProductListing.get('breadCrumbTrail').length === 2;
  // const isNotAppliedSort = !state.productListing.appliedSortId;
  const isNotAppliedSort = !null;
  const appliedFilters = state.ProductListing.appliedFiltersIds;
  const isNotAppliedFilter =
    (appliedFilters && appliedFilters.length > 0 && !sumValues(appliedFilters)) || true;

  return isL2Category && isNotAppliedSort && isNotAppliedFilter;
}

export function getProductsAndTitleBlocks(state, productBlocks = []) {
  const productsAndTitleBlocks = [];
  let lastCategoryName = null;

  productBlocks.forEach(block => {
    const productsAndTitleBlock = [];
    // For each product in this block try to extract the category name if new
    block.forEach(product => {
      const { categoryName } = product.miscInfo;

      // This is to inject Dynamic Marketing Espots into our product Grid
      // Use this for promo tiles if required later - injectionHandler.marketing(productsAndTitleBlock, currentProductIndex, categoryName);

      // push: If we should group and we hit a new category name push on array
      // Add separator if required in the RWD design - injectionHandler.seperator(productsAndTitleBlock, categoryName);
      const shouldGroup =
        state.ProductListing.get('breadCrumbTrail') && getIsShowCategoryGrouping(state);
      if (shouldGroup && (categoryName && categoryName !== lastCategoryName)) {
        productsAndTitleBlock.push(categoryName);
        lastCategoryName = categoryName;
      }
      // push: product onto block
      productsAndTitleBlock.push(product);
    });

    // push: product block onto matrix
    productsAndTitleBlocks.push(productsAndTitleBlock);
  });

  return productsAndTitleBlocks;
}
