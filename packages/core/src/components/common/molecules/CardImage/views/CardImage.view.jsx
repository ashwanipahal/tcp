import React from 'react';
import PropTypes from 'prop-types';
import { getIconPath } from '../../../../../utils';
import { cardIconMapping } from '../../../../features/account/common/molecule/CardTile/views/CardTile.utils';
import BodyCopy from '../../../atoms/BodyCopy';
import withStyles from '../../../hoc/withStyles';
import CardStyle from '../../Card/Card.style';
import constants from '../../../../features/CnC/Checkout/organisms/BillingPaymentForm/container/CreditCard.constants';

const CardImage = ({ card, cardNumber }) => {
  let cardTopMargin = 'elem-mt-XL';
  if (card.defaultInd) {
    cardTopMargin = 'elem-mt-XS';
  } else if (
    card.ccType !== constants.ACCEPTED_CREDIT_CARDS.GIFT_CARD &&
    card.ccType !== constants.ACCEPTED_CREDIT_CARDS.VENMO
  ) {
    cardTopMargin = 'elem-mt-MED';
  }
  const cardIcon = getIconPath(cardIconMapping[card.ccBrand]);

  return (
    <>
      <div className={`cardImage-wrapper ${cardTopMargin}`}>
        <div className="cardImage-img-wrapper">
          <img
            className="cardImage-img"
            data-locator={card.ccBrand}
            alt={card.ccType}
            src={cardIcon}
          />
        </div>
        <BodyCopy component="p" fontFamily="secondary" className="cardImage-card-number">
          {cardNumber}
        </BodyCopy>
      </div>
    </>
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
