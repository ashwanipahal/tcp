import React from 'react';
import PropTypes from 'prop-types';
import { getIconCard } from '@tcp/core/src/utils/index.native';
import { cardIconMapping } from '../../../../features/account/common/molecule/CardTile/views/CardTile.utils';
import BodyCopy from '../../../atoms/BodyCopy';
import Image from '../../../atoms/Image';
import { Container, ImageWrapper } from '../styles/CardImage.style';

const CardImage = ({ card, cardNumber }) => {
  const cardIcon = getIconCard(cardIconMapping[card.ccBrand]);

  return (
    <Container>
      <ImageWrapper>
        <Image source={cardIcon} width="47" height="30" dataLocator="cardLogo" />
      </ImageWrapper>
      <BodyCopy fontSize="fs16" mobileFontFamily="secondary" text={cardNumber} />
    </Container>
  );
};

CardImage.propTypes = {
  card: PropTypes.shape({}),
  cardNumber: PropTypes.string,
};
CardImage.defaultProps = {
  cardNumber: '',
  card: '',
};

export default CardImage;
