/**
 * This object will contain the mapping of event object keys with the event name for Account module.
 * This eventName should be same as the name passed on TRACK_PAGE_CLICK event payload
 */
export const account = {
  manage_plcc:
    'pageName, prop2, prop4, prop5, prop6, prop27, prop29, eVar1, eVar7, eVar8, eVar10, eVar13, eVar29, eVar31, eVar32, eVar65, eVar74, eVar93, currencyCode, events',
  order_tracking:
    'pageName, prop2, prop4, prop5, prop6, prop27, prop29, eVar1, eVar7, eVar8, eVar10, eVar13, eVar28, eVar29, eVar31, eVar32, eVar65, eVar74, eVar93, events',
  login_success: 'prop21, prop27, eVar10, eVar13, eVar31, eVar32, eVar93, events, currencyCode',
  register_success:
    'prop21, prop27, eVar10, eVar13, eVar31, eVar32, eVar93, eVar33, events, currencyCode',
  birthday_success:
    'pageName, prop2, prop4, prop5, prop6, prop21, prop27, prop29, eVar1, eVar7, eVar8, eVar10, eVar13, eVar28, eVar29, eVar31, eVar32, eVar62, eVar65, eVar74, eVar93, events',
};

export default account;
