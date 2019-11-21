import React from 'react';
import { Image } from '../..';
import errorBoundary from '../../../hoc/withErrorBoundary';
import withStyles from '../../../hoc/withStyles';
import { getIconPath } from '../../../../../utils';
import textItemStyle from '../TextItems.style';

const getIcon = icon => icon && <Image src={getIconPath(icon)} className="header-icon" />;

const finalText = (str, placement, icon) => {
  const text = str.split(' ');
  if (text.length > 1 && icon && placement && placement === 'middle') {
    return (
      <>
        {text[0]}
        {getIcon(icon)}
        {text.slice(1, text.length).join(' ')}
      </>
    );
  }
  return str;
};

const TextItems = ({ className, textItems, icon }) => {
  const { placement, icon: iconName } = icon || {};
  if (!textItems) {
    return null;
  }
  return textItems.map(({ style, text }, index) => {
    return (
      <span className={className}>
        {iconName && placement && placement === 'left' && getIcon(iconName)}
        <span key={index.toString()} className={style}>
          {index ? ` ${text}` : finalText(text, placement, iconName)}
        </span>
        {iconName && placement && placement === 'right' && getIcon(iconName)}
      </span>
    );
  });
};

export default withStyles(errorBoundary(TextItems), textItemStyle);
