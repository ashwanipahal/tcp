import React from 'react';

const TextItems = ({ textItems }) => {
  if (!textItems) {
    return null;
  }
  return textItems.map(({ style, text }, index) => (
    <span key={index.toString()} className={style}>
      {index ? ` ${text}` : text}
    </span>
  ));
};

export default TextItems;
