const mobileHashValues = (str, utilArr) => {
  const textArr = str.split(' ');
  textArr.map((obj, i) => {
    textArr[i] = `${obj} `;
    return textArr[i];
  });

  utilArr.map(obj => {
    const keyIndex = textArr.indexOf(obj.key);
    textArr[keyIndex] = obj.value == null ? '' : obj.value;
    return textArr[keyIndex];
  });

  return textArr;
};

export default mobileHashValues;
