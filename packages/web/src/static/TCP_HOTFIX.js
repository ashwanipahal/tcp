/* eslint-disable extra-rules/no-commented-out-code */

/**
 * EXAMPLE FILE FOR REFERENCE ONLY
 * ===============================
 */

/**
 * This script would be authored and deployed independently from
 * the main app. The global functions could come from anywhere,
 * such as scripts injected through analytics, split testing, etc.
 */

/**
 * These functions are used within the `withHotfix()` HOC's `useLayoutEffect()`.
 * They are for DOM override stuff only. They typically don't need to return
 * any value, but they can return a function if needed, which will be used
 * by React's effect hook to perform cleanup when the component unmounts.
 *
 * @example
 * ProductsGridItem(element) {
 *   const eventHandler = () => null;
 *   element.addEventListner('eventType', eventHandler);
 *   return () => element.removeEventListner('eventType', eventHandler);
 * }
 */
Object.assign(window.TCP_HOTFIX_BROWSER, {
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
});
