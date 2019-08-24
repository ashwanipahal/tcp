import React from 'react';
import PropTypes from 'prop-types';
import withStyles from '../../../hoc/withStyles';
import BodyCopy from '../../../atoms/BodyCopy';
import Anchor from '../../../atoms/Anchor/views/Anchor';
import styles from '../styles/MyProfileTile.style';

export const AccountOverviewTile = ({
  title,
  ctaTitle,
  ctaLink,
  ctaPath,
  children,
  className,
  dataLocator,
}) => {
  return (
    <BodyCopy component="div" className={className}>
      <BodyCopy component="div" className="container">
        <BodyCopy
          component="h3"
          fontSize="fs16"
          fontFamily="secondary"
          fontWeight="extrabold"
          className="heading"
          data-locator={`${dataLocator}_header`}
        >
          {title}
        </BodyCopy>
        <BodyCopy component="div" className={`${title ? 'elem-pt-LRG' : ''} elem-pb-XL content`}>
          {children}
        </BodyCopy>

        {ctaTitle && (
          <Anchor
            to={ctaLink}
            asPath={ctaPath}
            anchorVariation="button"
            buttonVariation="fixed-width"
            fullWidth
            fill="BLUE"
            centered
            className="elem-mb-SM"
            data-locator={`${dataLocator}_btn`}
          >
            {ctaTitle}
          </Anchor>
        )}
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
  dataLocator: PropTypes.string,
};

AccountOverviewTile.defaultProps = {
  title: '',
  ctaTitle: '',
  ctaLink: '',
  ctaPath: '',
  className: '',
  dataLocator: '',
};

export default withStyles(AccountOverviewTile, styles);
