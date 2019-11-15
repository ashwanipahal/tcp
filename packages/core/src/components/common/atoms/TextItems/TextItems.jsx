import React from 'react';
import { Image } from '..';
import errorBoundary from '../../hoc/withErrorBoundary';
import { getIconPath } from '../../../../utils';

const TextItems = ({ textItems, icon: { placement, icon } }) => {
  if (!textItems) {
    return null;
  }
  return textItems.map(({ style, text }, index) => {
    return (
      <span key={index.toString()} className={style}>
        {placement === 'left' ? <Image src={getIconPath(icon)} /> : null}
        {index ? ` ${text}` : text}
        {placement === 'right' ? <Image src={getIconPath(icon)} /> : null}
      </span>
    );
  });
};

export default errorBoundary(TextItems);
