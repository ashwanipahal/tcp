import React from 'react';
import PropTypes from 'prop-types';
import { Anchor, Image } from '@tcp/core/src/components/common/atoms';
import withStyles from '@tcp/core/src/components/common/hoc/withStyles';
import style from './BrandLogo.style';
import ClickTracker from '../ClickTracker';

const BrandLogo = ({ className, alt, dataLocator, imgSrc }) => (
  <ClickTracker className={className} name="brand_logo">
    <Anchor to="/home" dataLocator={dataLocator}>
      <Image src={imgSrc} alt={alt} />
    </Anchor>
  </ClickTracker>
);

BrandLogo.propTypes = {
  alt: PropTypes.string.isRequired,
  className: PropTypes.string.isRequired,
  dataLocator: PropTypes.string.isRequired,
  imgSrc: PropTypes.string.isRequired,
};

export default withStyles(BrandLogo, style);
export { BrandLogo as BrandLogoVanilla };
