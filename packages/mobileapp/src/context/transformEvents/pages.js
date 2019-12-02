/**
 * This object will contain the mapping of event object keys with the page name.
 * This pageName should be same as the screenName passed on TRACK_PAGE_VIEW event payload
 */
const pages = {
  Navigation: 'pageName, pageType, eVar65',
  bagPage:
    'prop2, prop4, prop5, prop6, prop21, prop27, prop28, pageName, eVar1, eVar7, eVar10, eVar12, eVar13, eVar14, eVar28, eVar29, eVar32, eVar65, eVar74, eVar86, eVar93, eVar98, events, products',
  pickup:
    'prop2, prop4, prop5, prop6, prop27, prop28, pageName, eVar1, eVar7, eVar10, eVar12, eVar13, eVar14, eVar29, eVar32, eVar65, eVar74, eVar86, eVar93, eVar98, currencyCode, events, products',
  shipping:
    'prop2, prop4, prop5, prop6, prop27, prop28, pageName, eVar1, eVar7, eVar10, eVar12, eVar13, eVar14, eVar28, eVar29, eVar32, eVar65, eVar74, eVar86, eVar93, eVar98, currencyCode, events, products',
  billing:
    'pageName, prop2, prop4, prop5, prop6, prop27, prop28, eVar1, eVar7, eVar10, eVar12, eVar13, eVar14, eVar28, eVar29, eVar32, eVar65, eVar74, eVar86, eVar93, eVar98, currencyCode, events, products',
  review:
    'pageName, prop2, prop4, prop5, prop6, prop27, prop28, eVar1, eVar3, eVar4, eVar7, eVar9, eVar10, eVar12, eVar13, eVar14, eVar28, eVar29, eVar32, eVar65, eVar68, eVar73, eVar74, eVar86, eVar93, eVar98, currencyCode, events, products',
  confirmation:
    'pageName, prop2, prop4, prop5, prop6, prop27, prop28, eVar1, eVar3, eVar4, eVar7, eVar9, eVar10, eVar12, eVar13, eVar14, eVar28, eVar29, eVar32, eVar65, eVar68, eVar73, eVar74, eVar86, eVar93, eVar98, currencyCode, events, products',
};

export default pages;
