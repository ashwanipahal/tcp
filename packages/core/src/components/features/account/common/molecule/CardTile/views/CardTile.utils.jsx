import React from 'react';
import Address from '../../../../../../common/molecules/Address';
import BodyCopy from '../../../../../../common/atoms/BodyCopy';

const getDataLocatorPrefix = ({ card }) => {
  switch (card.ccType) {
    case 'GiftCard':
      return 'giftcard';
    case 'VENMO':
      return 'venmo';
    default:
      return 'creditdebit';
  }
};

const getCardName = ({ card, labels }) => {
  switch (card.ccType) {
    case 'GiftCard':
      return labels.ACC_LBL_GIFT_CARD;
    case 'PLACE CARD':
      return labels.ACC_LBL_PLCC_CARD;
    case 'VENMO':
      return labels.ACC_LBL_VENMO_ACCOUNT;
    default:
      return labels.ACC_LBL_DEFAULT_CARD_NAME;
  }
};

const cardIconMapping = {
  DISC: 'disc-small',
  MC: 'mc-small',
  Amex: 'amex-small',
  Visa: 'visa-small',
  GC: 'gift-card-small',
  'PLACE CARD': 'place-card-small',
  VENMO: 'venmo-blue-acceptance-mark',
};

const getAddressDetails = ({ card }) => {
  return (
    card.addressDetails && (
      <Address
        address={card.addressDetails}
        fontWeight="normal"
        showCountry={false}
        showPhone={false}
        dataLocatorPrefix="payment-creditcard"
      />
    )
  );
};

const loading = (labels, HideCaptchaBtn, balance) => {
  return (
    <React.Fragment>
      {HideCaptchaBtn && !balance && (
        <BodyCopy
          tag="span"
          fontSize="fs24"
          fontFamily="secondary"
          fontWeight="extrabold"
          className=""
          lineHeights="lh115"
        >
          {labels.ACC_LBL_LOADING}
        </BodyCopy>
      )}
    </React.Fragment>
  );
};

export { getDataLocatorPrefix, getCardName, cardIconMapping, getAddressDetails, loading };
