import React from 'react';
import PropTypes from 'prop-types';
import { Anchor, Image } from '@tcp/core/src/components/common/atoms';
import withStyles from '@tcp/core/src/components/common/hoc/withStyles';
import style from './BrandLogo.style';

const BrandLogo = ({ className, alt, dataLocator, imgSrc }) => (
  <div className={className}>
    <Anchor to="/" dataLocator={dataLocator}>
      <Image src={imgSrc} alt={alt} />
    </Anchor>
  </div>
);

BrandLogo.propTypes = {
  alt: PropTypes.string.isRequired,
  className: PropTypes.string.isRequired,
  dataLocator: PropTypes.string.isRequired,
  imgSrc: PropTypes.string.isRequired,
};

export default withStyles(BrandLogo, style);
export { BrandLogo as BrandLogoVanilla };
