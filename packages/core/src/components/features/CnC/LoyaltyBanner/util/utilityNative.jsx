import React from 'react';
import { ShippingNew } from '../../FreeShippingBanner/molecules/FreeShippingBannerSection/styles/FreeShippingBannerSection.style.native';
import { MyPlaceRewards } from '../molecules/GuestMprPlccSection/styles/GuestMprPlccSection.style.native';

/**
 * @method mobileHashValues
 * @description replacement of hash values to required text with styles
 */
const mobileHashValues = (str, utilArr) => {
  let textArr = str.split(' ');
  textArr.map((value, i) => {
    textArr[i] = `${value} `;
    return textArr[i];
  });
  // utilArr contains all the key value pairs to be modified
  utilArr.forEach((obj, index) => {
    // KeyIndex is the placement of the pawrticular key in the string
    const keyIndex = textArr.indexOf(obj.key);
    // if not present return
    if (keyIndex === -1) return;
    if (utilArr[index].key === '#tagOpen# ') {
      textArr = [];
      let tagMaking;
      // string before tag
      const startingStr = str.substring(0, str.indexOf('#tagOpen# '));
      // string inside tag
      const tagsStr = str.substring(str.indexOf('#tagOpen#') + 9, str.indexOf('#tagClose# '));
      // string after tag
      const endingStr = str.substring(str.indexOf('#tagClose# ') + 10, str.length);
      textArr = startingStr.split(' ');
      textArr.map((value, i) => {
        textArr[i] = `${value} `;
        return textArr[i];
      });
      // making of the tah and adding the value
      if (utilArr[index].value === 'ShippingNew') {
        tagMaking = <ShippingNew>{tagsStr}</ShippingNew>;
      } else if (utilArr[index].value === 'MyPlaceRewards') {
        tagMaking = <MyPlaceRewards>{tagsStr}</MyPlaceRewards>;
      }
      // combining the new string
      textArr.push(tagMaking);
      const endingArr = endingStr.split(' ');
      endingArr.map((value, i) => {
        endingArr[i] = `${value} `;
        return endingArr[i];
      });
      textArr = textArr.concat(endingArr);
      return;
    }
    textArr[keyIndex] = obj.value == null ? '' : obj.value;
  });

  return textArr;
};

export default mobileHashValues;
