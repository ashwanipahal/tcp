import React from 'react';
import { PropTypes } from 'prop-types';
// eslint-disable-next-line
import Link from 'next/link';
import { buildUrl } from '../../../../../utils';
import withStyles from '../../../hoc/withStyles';

import styles from '../Anchor.style';

/**
 * @param {object} props : Props for Anchor
 * @desc This is an anchor component. The prop anchorVariation determines the color of the anchor.
 * The values supported for anchorVariation are : primary, secondary, tertiary.
 * The prop fontSizeVariation determines the font size of the anchor.
 * The value supported for fontSizeVariation are : small, medium, large.
 * The values of these are picked up from the theme.
 * An additional prop noLink is added to support simple anchor or next's Link conditionally.
 */

const Anchor = ({
  children,
  to,
  asPath,
  className,
  scroll,
  noLink,
  handleLinkClick,
  shallow,
  title,
  target,
  url,
  text,
  ...other
}) =>
  noLink ? (
    <a
      href={buildUrl(to) || buildUrl(url)}
      className={className}
      {...other}
      onClick={handleLinkClick}
      title={title}
      target={target}
    >
      {children}
    </a>
  ) : (
    <Link href={to || url} as={asPath} shallow={shallow} scroll={scroll}>
      <a className={className} title={title} target={target} {...other}>
        {children || text}
      </a>
    </Link>
  );

Anchor.propTypes = {
  children: PropTypes.string.isRequired,
  to: PropTypes.string.isRequired,
  asPath: PropTypes.string,
  scroll: PropTypes.string,
  className: PropTypes.string.isRequired,
  noLink: PropTypes.bool,
  handleLinkClick: PropTypes.func,
  shallow: PropTypes.bool,
  title: PropTypes.string,
  target: PropTypes.string,
  url: PropTypes.string,
  text: PropTypes.string,
};

Anchor.defaultProps = {
  asPath: '',
  scroll: '',
  noLink: false,
  handleLinkClick: () => {},
  shallow: false,
  title: '',
  target: '',
  url: '',
  text: '',
};

export default withStyles(Anchor, styles);
export { Anchor as AnchorVanilla };
