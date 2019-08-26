import React from 'react';

const TextItems = ({ textItems }) => {
  return textItems.map(({ style, text }, index) => (
    <span className={style}>{index ? ` ${text}` : text}</span>
  ));
};

export default TextItems;
