import React from 'react';
import { PropTypes } from 'prop-types';
// eslint-disable-next-line
import Link from 'next/link';
import { buildUrl, getAsPathWithSlug, getMappedPageHref } from '../../../../../utils';
import withStyles from '../../../hoc/withStyles';

import styles from '../Anchor.style';

const getAsLinkPath = (IsSlugPathAdded, asPath, incomingUrl) => {
  return IsSlugPathAdded ? asPath || incomingUrl : getAsPathWithSlug(asPath || incomingUrl);
};

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
  dataLocator,
  IsSlugPathAdded,
  ...other
}) => {
  const targetVal = target || '_self';
  let incomingUrl = to || url;
  const asLinkPath = getAsLinkPath(IsSlugPathAdded, asPath, incomingUrl);
  if (!noLink) {
    incomingUrl = getMappedPageHref(incomingUrl);
  }
  const hrefUrl = asLinkPath || buildUrl(incomingUrl);
  let AnchorComponent = null;
  if (children || text) {
    AnchorComponent = noLink ? (
      <a
        href={buildUrl(incomingUrl)}
        className={className}
        onClick={handleLinkClick}
        title={title}
        target={targetVal}
        data-locator={dataLocator}
        {...other}
      >
        {children}
      </a>
    ) : (
      <Link href={incomingUrl} as={asLinkPath} shallow={shallow} scroll={scroll}>
        <a
          className={className}
          href={hrefUrl}
          title={title}
          target={targetVal}
          data-locator={dataLocator}
          {...other}
        >
          {children || text}
        </a>
      </Link>
    );
  }
  return AnchorComponent;
};

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
  dataLocator: PropTypes.string,
  IsSlugPathAdded: PropTypes.bool,
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
  dataLocator: '',
  IsSlugPathAdded: false,
};

export default withStyles(Anchor, styles);
export { Anchor as AnchorVanilla };
