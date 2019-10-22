import React from 'react';
import { PointsValueText } from '../molecules/GuestMprPlccSection/styles/GuestMprPlccSection.style.native';

const mobileHashValues = (str, key, value, isPlcc) => {
  const textArr = str.split(' ');
  const keyIndex = textArr.indexOf(key);
  textArr.map((obj, i) => {
    textArr[i] = `${obj} `;
    return textArr[i];
  });
  textArr[keyIndex] =
    value == null ? '' : <PointsValueText isPlcc={isPlcc}>{`${value} `}</PointsValueText>;
  return textArr;
};

export default mobileHashValues;
