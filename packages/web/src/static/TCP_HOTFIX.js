/* eslint-disable extra-rules/no-commented-out-code */

/**
 * This script would be authored and deployed independantly
 * from the main app. The global functions could come from anywhere,
 * such as analytics, split testing, etc.
 */

/**
 * Used in the withHotfix HOC render()
 * This should be universal (no DOM stuff)
 */
window.TCP_HOTFIX_PROPS = {
  ProductsGridItem(props) {
    console.log('TCP_HOTFIX_PROPS > ProductsGridItem', props);
    return {
      // Props values here will be merged in
    };
  },
  ProductListingPage(props) {
    console.log('TCP_HOTFIX_PROPS > ProductListingPage', props);
    return {
      // Props values here will be merged in
    };
  },
  ProductDetailPage(props) {
    console.log('TCP_HOTFIX_PROPS > ProductDetailPage', props);
    return {
      // Props values here will be merged in
    };
  },
};

/**
 * Used within the withHotfix HOC useLayoutEffect()
 * For DOM stuff only
 */
window.TCP_HOTFIX_BROWSER = {
  ProductsGridItem(element, props) {
    console.log('TCP_HOTFIX_BROWSER > ProductsGridItem', element, props);
    // element.style.setProperty('background', 'yellow');
  },
  ProductListingPage(element, props) {
    console.log('TCP_HOTFIX_BROWSER > ProductListingPage', element, props);
    // element.style.setProperty('background', 'lightblue');
  },
  ProductDetailPage(element, props) {
    console.log('TCP_HOTFIX_BROWSER > ProductDetailPage', element, props);
    // element.style.setProperty('background', 'lightgreen');
  },
};
