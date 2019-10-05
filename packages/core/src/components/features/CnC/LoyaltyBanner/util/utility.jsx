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

export default labelsHashValuesReplace;
