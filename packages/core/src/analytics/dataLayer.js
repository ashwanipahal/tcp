/**
 * @module analytics/dataLayer
 *
 * @description The base object to extend for assigning as a global
 * data layer for third-party analytics scripts to reference. This
 * object defines the shape of the data layer, and should be as flat
 * as possible. When extending the object, we can use getters to retain
 * the existing property names while looking the values up within deep
 * object structures elsewhere.
 *
 * @example
 * global.myDataLayer = Object.create(defaultDataLayer, {
 *   // Use getters pointing to the Redux state
 *   pageName: {
 *     get: () => store.getState().page.name
 *   }
 * })
 */

import * as utils from './utils';
/* eslint-disable extra-rules/no-commented-out-code */
export default {
  eventData: {},
  ...utils,
  // TODO: For these values, determine if we need them.
  // _dataManager.eventData.errorFields
  // _dataManager.eventData.eventName
  // _dataManager.eventData.featureName
  // _dataManager.eventData.navLinkName
  // _dataManager.page.date
  // _dataManager.page.emailMessageId
  // _dataManager.page.errorType
  // _dataManager.page.externalReferrer
  // _dataManager.page.hostname
  // _dataManager.page.siteType
  // _dataManager.page.url
  // _dataManager.productListing.fullCategoryName
  billingCountry: null, // _dataManager.order.billingCountry
  billingZip: null, // _dataManager.order.billingZip
  campaignId: null, // _dataManager.page.campaignId
  cartType: null, // _dataManager.cart.type
  checkoutType: null, // _dataManager.cart.checkoutType
  countryId: null, // _dataManager.page.countryId
  currencyCode: null, // _dataManager.page.currencyCode
  customerEmail: null, // _dataManager.profile.emailAddress
  customerId: null, // _dataManager.profile.customerId
  customerType: null, // _dataManager.profile.customerType
  giftType: null, // _dataManager.order.giftType
  internalCampaignId: null, // _dataManager.page.internalCampaignId
  listingCategory: null, // _dataManager.productListing.categoryName
  listingCount: null, // _dataManager.productListing.totalProducts
  listingDepartment: null, // _dataManager.productListing.departmentName
  listingFilterList: null, // _dataManager.productListing.fullFilterList
  listingSortList: null, // _dataManager.productListing.fullFilterSortList
  listingSubCategory: null, // _dataManager.productListing.subCategoryName
  locale: null, // _dataManager.page.locale
  orderId: null, // _dataManager.order.id
  orderSubtotal: null, // _dataManager.order.roundedSubtotal
  pageName: null, // _dataManager.page.name
  pageNavigationText: null, // _dataManager.page.navLinkName
  pagePrimarySection: null, // _dataManager.page.section
  pageSecondarySection: null, // _dataManager.page.subSection
  pageShortName: null, // _dataManager.page.shortName
  pageTertiarySection: null, // _dataManager.page.subSubSection
  pageType: null, // _dataManager.page.type
  paymentMethod: null, // _dataManager.order.paymentMethod
  productId: null, // _dataManager.page.pdpProductId
  productNavigationText: null, // _dataManager.page.productNavLinkName (???)
  profileEmailRecipient: null, // _dataManager.profile.emailRecipientId (???)
  profileReplayId: null, // _dataManager.profile.replayId (???)
  searchResultsCount: null, // _dataManager.productListing.searchResults
  searchText: null, // _dataManager.page.searchText
  searchType: null, // _dataManager.page.searchType
  socialNetwork: null, // _dataManager.eventData.socialNetwork
  storeId: null, // _dataManager.profile.storeId
  storeSearchCriteria: null, // _dataManager.eventData.stores.searchCriteria
  storeSearchDistance: null, // _dataManager.eventData.stores.customerDistance
};
/* eslint-enable extra-rules/no-commented-out-code */
