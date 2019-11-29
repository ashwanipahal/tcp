/**
 * This object will contain the mapping of event object keys with the event name for Checkout module.
 * This eventName should be same as the name passed on TRACK_PAGE_CLICK event payload
 */
export const checkout = {
  gift_options:
    'pageName, prop2, prop4, prop5, prop6, prop27, eVar1, eVar7, eVar10, eVar13, eVar28, eVar29, eVar32, eVar65, eVar74, eVar86, eVar93, eVar98, events, products',
  continue_guest:
    'prop2, prop4, prop5, prop6, prop27, prop28, pageName, eVar1, eVar7, eVar10, eVar12, eVar13, eVar14, eVar28, eVar29, eVar32, eVar65, eVar74, eVar86, eVar93, eVar98, currencyCode, events, products',
  coupon_success:
    'pageName, Server, prop2, prop4, prop5, prop6, prop27, eVar1, eVar6, eVar7, eVar10, eVar13, eVar14, eVar28, eVar29, eVar32, eVar65, eVar74, eVar86, eVar93, eVar98, currencyCode, events, products',
  coupon_fails: 'pageName, prop27, prop28, eVar10, eVar13, eVar32, eVar93, events, products',
};

export default checkout;
