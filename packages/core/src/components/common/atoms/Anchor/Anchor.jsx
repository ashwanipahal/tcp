/* eslint-disable */
//TODO - Fix the eslint issues in this file
import Link from 'next/link';
import React from 'react';
import styles from './Anchor.style';
import withStyles from '../../hoc/withStyles';

const buildUrl = () => {
  return 'abdc';
};

const Anchor = ({
  children,
  to,
  as,
  className,
  inheritedClass,
  noLink,
  inheritedStyles,
  handleLinkClick,
  shallow,
  scroll,
  forceClick,
  customStyle,
  slnId,
  ...other
}) =>
  noLink ? (
    <a
      href={buildUrl(to)}
      className={className}
      onClick={handleLinkClick}
      data-sln-id={slnId}
      {...other}
    >
      {children}
    </a>
  ) : (
    <Link href={to} as={as} shallow={shallow} scroll={scroll}>
      {forceClick ? (
        <div className={customStyle}>
          <a
            href={to}
            className={className}
            onClick={handleLinkClick}
            data-sln-id={slnId}
            {...other}
          >
            {children}
          </a>
        </div>
      ) : (
        <a href={as || buildUrl(to)} className={className} data-sln-id={slnId} {...other}>
          {children}
        </a>
      )}
    </Link>
  );

Anchor.defaultProps = {};

export default withStyles(Anchor, styles);

export { Anchor as AnchorVanilla };
