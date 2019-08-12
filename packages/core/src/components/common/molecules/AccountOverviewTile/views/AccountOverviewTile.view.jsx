import React from 'react';
import PropTypes from 'prop-types';
import withStyles from '../../../hoc/withStyles';
import BodyCopy from '../../../atoms/BodyCopy';
import Anchor from '../../../atoms/Anchor/views/Anchor';
import styles from '../styles/AccountOverviewTile.style';

export const AccountOverviewTile = ({ title, ctaTitle, ctaLink, ctaPath, children, className }) => {
  return (
    <BodyCopy component="div" className={className}>
      <BodyCopy component="div" className="container">
        <BodyCopy component="h3" fontSize="fs16" fontWeight="semibold" className="heading">
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
};

AccountOverviewTile.defaultProps = {
  title: '',
  ctaTitle: '',
  ctaLink: '',
  ctaPath: '',
  className: '',
};

export default withStyles(AccountOverviewTile, styles);
