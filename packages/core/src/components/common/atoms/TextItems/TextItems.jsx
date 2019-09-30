import React from 'react';
import errorBoundary from '../../hoc/withErrorBoundary';

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

export default errorBoundary(TextItems);
