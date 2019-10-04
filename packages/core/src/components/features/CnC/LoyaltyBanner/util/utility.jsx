const labelsHashValuesReplace = (str, valueArr) => {
  let finalString = '';
  valueArr.map(obj => {
    finalString = str.replace(
      str.substring(str.indexOf('#'), str.split('#', 2).join('#').length + 1),
      `<span class="${obj.classValue}">${obj.value}</span>`
    );
    return finalString;
  });
  return finalString;
};

export default labelsHashValuesReplace;
