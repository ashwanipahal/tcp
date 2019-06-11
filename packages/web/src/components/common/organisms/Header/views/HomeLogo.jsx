import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import Anchor from '@tcp/core/src/components/common/atoms/Anchor';
import Image from '@tcp/core/src/components/common/atoms/Image';

const HomeLogo = ({ alt, dataLocator, href, imgSrc, title, width }) => (
  <Fragment>
    <Anchor className={dataLocator} to={href} title={title}>
      <Image src={imgSrc} alt={alt} title={title} width={width} />
    </Anchor>
  </Fragment>
);

HomeLogo.propTypes = {
  alt: PropTypes.string.isRequired,
  dataLocator: PropTypes.string.isRequired,
  imgSrc: PropTypes.string.isRequired,
  href: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  width: PropTypes.string.isRequired,
};

export default HomeLogo;
