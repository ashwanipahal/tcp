import React from 'react';

const labelsHashValuesReplace = (str, utilArr) => {
  let finalString = str;
  utilArr.map(obj => {
    finalString =
      finalString &&
      finalString.replace(
        obj.key,
        obj.value == null ? '' : `<span class="${obj.classValue}">${obj.value}</span>`
      );
    return finalString;
  });
  return finalString;
};

const convertHtml = value => {
  // eslint-disable-next-line react/no-danger
  return <span dangerouslySetInnerHTML={{ __html: value }} />;
};

export { labelsHashValuesReplace, convertHtml };
