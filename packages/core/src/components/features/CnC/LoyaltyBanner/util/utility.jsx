import React from 'react';
// import { Text } from 'react-native';
import { PointsValueText } from '../molecules/GuestMprPlccSection/styles/GuestMprPlccSection.style.native';

const labelsHashValuesReplace = (str, utilArr) => {
  let finalString = '';
  utilArr.map(obj => {
    finalString =
      str &&
      str.replace(
        obj.key,
        obj.value == null ? '' : `<span class="${obj.classValue}">${obj.value}</span>`
      );
    return finalString;
  });
  return finalString;
};

const mobileHashValues = (str, key, value, classValue) => {
  const textArr = str.split(' ');
  const keyIndex = textArr.indexOf(key);
  textArr.map((obj, i) => {
    textArr[i] = `${obj} `;
    return textArr[i];
  });
  textArr[keyIndex] =
    value == null ? '' : <PointsValueText class={classValue}>{value}</PointsValueText>;
  return textArr;
};

export { labelsHashValuesReplace, mobileHashValues };
