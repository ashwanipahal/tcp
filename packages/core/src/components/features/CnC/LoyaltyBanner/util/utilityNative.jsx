import React from 'react';
import { ShippingNew } from '../../FreeShippingBanner/molecules/FreeShippingBannerSection/styles/FreeShippingBannerSection.style.native';
import { MyPlaceRewards } from '../molecules/GuestMprPlccSection/styles/GuestMprPlccSection.style.native';

const mobileHashValues = (str, utilArr) => {
  let textArr = [];
  utilArr.map((obj, index) => {
    if (utilArr[index].key === '#tagOpen#') {
      let tagMaking;
      const startingStr = str.substring(0, str.indexOf('#tagOpen#'));
      const tagsStr = str.substring(str.indexOf('#tagOpen#') + 9, str.indexOf('#tagClose#'));
      const endingStr = str.substring(str.indexOf('#tagClose#') + 10, str.length);
      textArr = startingStr.split(' ');
      textArr.map((value, i) => {
        textArr[i] = `${value} `;
        return textArr[i];
      });
      if (utilArr[index].value === 'ShippingNew') {
        tagMaking = <ShippingNew>{tagsStr}</ShippingNew>;
      } else if (utilArr[index].value === 'MyPlaceRewards') {
        tagMaking = <MyPlaceRewards>{tagsStr}</MyPlaceRewards>;
      }
      textArr.push(tagMaking);
      const endingArr = endingStr.split(' ');
      endingArr.map((value, i) => {
        endingArr[i] = `${value} `;
        return endingArr[i];
      });
      textArr = textArr.concat(endingArr);
      return textArr;
    }
    textArr = str.split(' ');
    textArr.map((value, i) => {
      textArr[i] = `${value} `;
      return textArr[i];
    });
    const keyIndex = textArr.indexOf(obj.key);
    textArr[keyIndex] = obj.value == null ? '' : obj.value;
    return textArr;
  });

  return textArr;
};

export default mobileHashValues;
