import React from 'react';
import { PropTypes } from 'prop-types';
// eslint-disable-next-line
import Link from 'next/link';
import { buildUrl } from '@tcp/core/src/utils/url';

import styles from './Anchor.style';
import withStyles from '../../hoc/withStyles';

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
