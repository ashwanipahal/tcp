import React from 'react';
import { PropTypes } from 'prop-types';
// eslint-disable-next-line
import Link from 'next/link';
import { buildUrl } from '@tcp/core/src/utils/url';
import withStyles from '@tcp/core/src/components/common/hoc/withStyles';

import styles from '../Anchor.style';

// The prop anchorVariation determines the color of the anchor.
// The values supported for anchorVariation are : primary, secondary, tertiary.
// The prop fontSizeVariation determines the font size of the anchor.
// The value supported for fontSizeVariation are : small, medium, large.
// The values of these are picked up from the theme.
// An additional prop noLink is added to support simple anchor or next's Link conditionally.

const Anchor = ({
  children,
  to,
  as,
  className,
  scroll,
  noLink,
  handleLinkClick,
  shallow,
  title,
  target,
  ...other
}) =>
  noLink ? (
    <a
      href={buildUrl(to)}
      className={className}
      onClick={handleLinkClick}
      {...other}
      title={title}
      target={target}
    >
      {children}
    </a>
  ) : (
    <Link href={to} as={as} shallow={shallow} scroll={scroll}>
      <a href={as || buildUrl(to)} className={className} title={title}>
        {children}
      </a>
    </Link>
  );

Anchor.propTypes = {
  children: PropTypes.string.isRequired,
  to: PropTypes.string.isRequired,
  as: PropTypes.string,
  scroll: PropTypes.string,
  className: PropTypes.string.isRequired,
  noLink: PropTypes.bool,
  handleLinkClick: PropTypes.func,
  shallow: PropTypes.bool,
  title: PropTypes.string,
  target: PropTypes.string,
};

Anchor.defaultProps = {
  as: '',
  scroll: '',
  noLink: false,
  handleLinkClick: () => {},
  shallow: false,
  title: '',
  target: '',
};

export default withStyles(Anchor, styles);
export { Anchor as AnchorVanilla };
