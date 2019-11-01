import React from 'react';
import PropTypes from 'prop-types';
import withStyles from '../../../hoc/withStyles';
import BodyCopy from '../../../atoms/BodyCopy';
import Anchor from '../../../atoms/Anchor/views/Anchor';
import styles from '../styles/AccountOverviewTile.style';

export const AccountOverviewTile = ({
  title,
  ctaTitle,
  ctaLink,
  ctaPath,
  target,
  children,
  className,
  dataLocatorPrefix,
}) => {
  return (
    <BodyCopy component="div" className={className}>
      <BodyCopy component="div" className="container">
        <BodyCopy
          component="h3"
          fontSize="fs16"
          fontWeight="extrabold"
          className="heading"
          fontFamily="secondary"
          data-locator={`accountoverview-${dataLocatorPrefix}-header`}
        >
          {title}
        </BodyCopy>
        <BodyCopy component="div" className="elem-pt-LRG elem-pb-XL content">
          {children}
        </BodyCopy>
        <Anchor
          to={ctaLink}
          asPath={ctaPath}
          anchorVariation="button"
          buttonVariation="fixed-width"
          fullWidth
          fill="BLUE"
          centered
          className="elem-mb-SM"
          target={target}
          dataLocator={`accountoverview-${dataLocatorPrefix}-viewallcta`}
        >
          {ctaTitle}
        </Anchor>
      </BodyCopy>
    </BodyCopy>
  );
};

AccountOverviewTile.propTypes = {
  title: PropTypes.string,
  ctaTitle: PropTypes.string,
  ctaLink: PropTypes.string,
  ctaPath: PropTypes.string,
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
  dataLocatorPrefix: PropTypes.string,
  target: PropTypes.string,
};

AccountOverviewTile.defaultProps = {
  title: '',
  ctaTitle: '',
  ctaLink: '',
  ctaPath: '',
  className: '',
  dataLocatorPrefix: '',
  target: '_self',
};

export default withStyles(AccountOverviewTile, styles);
