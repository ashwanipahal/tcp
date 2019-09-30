import React from 'react';
import PropTypes from 'prop-types';
import Image from '@tcp/core/src/components/common/atoms/Image';
import { getIconCard } from '@tcp/core/src/utils/index.native';
import { cardIconMapping } from '../../../../features/account/common/molecule/CardTile/views/CardTile.utils';
import BodyCopy from '../../../atoms/BodyCopy';
import withStyles from '../../../hoc/withStyles';
import CardStyle from '../Card.style';

import { ImageWrapper, ImageViewWrapper, CardWrapper } from '../CardImage.style.native';

export const CardImage = ({ card, cardNumber }) => {
  const cardIcon = getIconCard(cardIconMapping[card.ccBrand]);
  return (
    <ImageViewWrapper>
      {card.ccType && (
        <ImageWrapper>
          <Image source={cardIcon} width="40" height="30" />
        </ImageWrapper>
      )}
      <CardWrapper>
        <BodyCopy mobileFontFamily="secondary" text={cardNumber} />
      </CardWrapper>
    </ImageViewWrapper>
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
export default withStyles(CardImage, CardStyle);
export { CardImage as CardImageVanilla };
