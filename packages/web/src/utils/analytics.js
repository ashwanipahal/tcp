/**
 * This is the
 * @param {*} name
 * @param {*} payload
 */

// TODO: Replace with actual global tracking function
function trackEvent(name, payload) {
  console.log(`🛰 Tracking: ${name}`, payload);
}

// Core events

// Tracking event payloads can come directly as arguments...
export function trackPageViewed(name) {
  trackEvent('page_viewed', name);
}

// ...payloads could also come from the tracking data global as well
export function trackProductListViewed() {
  trackEvent('product_listing_viewed', global.trackingData.listingCategory);
}

export function trackProductListFiltered() {}

export function trackProductsSearched() {}

export function trackPromotionViewed() {}

export function trackProductClicked() {}

export function trackProductViewed() {}

export function trackProductAdded() {}

export function trackProductRemoved() {}

export function trackCartViewed() {}

export function trackCheckoutStarted() {}

export function trackCheckoutStepViewed() {}

export function trackCheckoutStepCompleted() {}

export function trackPaymentInfoEntered() {}

export function trackOrderCompleted() {}

export function trackOrderUpdated() {}

export function trackOrderRefunded() {}

export function trackOrderCancelled() {}

// Account events

export function trackAccountLoggedIn() {}

export function trackAccountRegistered() {}

// Coupon events

export function trackCouponEntered() {}

export function trackCouponApplied() {}

export function trackCouponDenied() {}

export function trackCouponRemoved() {}

// Wishlist events

export function trackWishlistCreated() {}

export function trackWishlistDeleted() {}

export function trackProductAddedToWishlist() {}

export function trackProductRemovedFromWishlist() {}

export function trackWishlistProductAddedToCart() {}

// Sharing events

export function trackProductShared() {}

export function trackCartShared() {}

export function trackPageShared() {}

// Review events

export function trackProductReviewed() {}
