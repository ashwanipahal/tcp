import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Anchor from '@tcp/core/src/components/common/atoms/Anchor';

const LogoImage = styled.img`
  width: 172px;

  @media ${props => props.theme.mediaQuery.mediumMax} {
    display: none;
  }
`;

const HomeLogo = ({ alt, dataLocator, href, imgSrc, title }) => (
  <Fragment>
    <Anchor className={dataLocator} to={href} title={title}>
      <LogoImage src={imgSrc} alt={alt} title={title} />
    </Anchor>
  </Fragment>
);

HomeLogo.propTypes = {
  alt: PropTypes.string.isRequired,
  dataLocator: PropTypes.string.isRequired,
  imgSrc: PropTypes.string.isRequired,
  href: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
};

export default HomeLogo;
