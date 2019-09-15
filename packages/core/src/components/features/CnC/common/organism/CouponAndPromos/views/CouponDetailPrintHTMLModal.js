import { getLabelValue } from '@tcp/core/src/utils';

export default function getMarkupForPrint(coupon, labels, addToBagCTALabel, validityDate, uri) {
  return `<div style='text-align:center;'>
  <div class="sc-uJMKN kmFLTp">
     <div font-weight="black" style='font-size:40px;margin-bottom: 16px;' >${coupon.title}</div>
     <div font-weight="bold" font-family="secondaryFontFamily" style='font-size:22px;margin-bottom: 16px;'>${validityDate}</div>
     <div data-locator="couponDetailModal_available_BarCode">
     <img width="70px" height="50px" src="data:image/png;base64, ${uri}" />
     </div>
     <div><button type="button" style='font-size:14px;margin-bottom: 16px;margin-top: 16px;'>${addToBagCTALabel}</button></div>
     <div><a href="/us/#" title="" target="_self" data-locator="couponDetailModal_available_printAch" anchorvariation="primary" font-size="14px">${getLabelValue(
       labels,
       'PRINT_ANCHOR_TEXT'
     )}</a></div>
     <div style='font-size:14px;margin-bottom: 16px;'>${coupon.legalText}</div>
     <div style='font-size:14px;margin-bottom: 16px;'>${getLabelValue(
       labels,
       'MODAL_SHORT_DESCRIPTION'
     )} <a  href="/us" title="" target="_self" data-locator="couponDetailModal_available_tAndC" font-size="14">${getLabelValue(
    labels,
    'TERMS_AND_CONDITIONS'
  )}</a> and <a  href="/us" title="" target="_self" data-locator="couponDetailModal_available_pp" font-size="14"> ${getLabelValue(
    labels,
    'PRIVACY_POLICY'
  )}</a></div>
  </div>
</div>`;
}
