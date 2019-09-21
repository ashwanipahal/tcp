import { getLabelValue } from '@tcp/core/src/utils';

export default function getMarkupForPrint(coupon, labels, validityDate, uri) {
  return `<div style='text-align:center;'>
  <div>
     <div font-weight="black" style='font-size:40px;margin-bottom: 16px;' >${coupon.title}</div>
     <div font-weight="bold" font-family="secondaryFontFamily" style='font-size:22px;margin-bottom: 16px;'>${validityDate}</div>
     <hr height"1px" width="100%" style='margin-bottom:16px;'>
     <div>
        <img width="70px" height="50px" src="data:image/png;base64, ${uri}" />
     </div>
     <hr height"1px" width="100%" style='margin-bottom: 16px;margin-top: 16px;'>
     <div style='font-size:14px;margin-bottom: 16px;margin-top: 16px;'>${coupon.legalText}</div>
     <div style='font-size:14px;margin-bottom: 16px;'>${getLabelValue(
       labels,
       'MODAL_SHORT_DESCRIPTION'
     )} <span font-size="14px">${getLabelValue(
    labels,
    'TERMS_AND_CONDITIONS'
  )}</span> and <span font-size="14px"> ${getLabelValue(labels, 'PRIVACY_POLICY')}</span></div>
  </div>
</div>`;
}
