import React from 'react';
import { Image } from '..';
import errorBoundary from '../../hoc/withErrorBoundary';
import withStyles from '../../hoc/withStyles';
import { getIconPath } from '../../../../utils';
import textItemStyle from './TextItems.style';

const getIcon = icon => icon && <Image src={getIconPath(icon)} className="header-icon" />;

const TextItems = ({ className, textItems, icon }) => {
  const { placement, icon: name } = icon;
  console.log(placement);
  console.log(name);

  if (!textItems) {
    return null;
  }
  return textItems.map(({ style, text }, index) => {
    return (
      <span className={className}>
        {name && placement && placement === 'left' && getIcon(name)}
        <span key={index.toString()} className={style}>
          {index ? ` ${text}` : text}
        </span>
        {name && placement && placement === 'right' && getIcon(name)}
      </span>
    );
  });
};

export default withStyles(errorBoundary(TextItems), textItemStyle);
