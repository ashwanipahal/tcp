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
      return labels.paymentGC.lbl_payment_giftCard;
    case 'PLACE CARD':
      return labels.paymentGC.lbl_payment_plccCard;
    case 'VENMO':
      return labels.paymentGC.lbl_payment_venmoAccount;
    default:
      return labels.paymentGC.lbl_payment_defaultCardName;
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

const loading = (isGiftCardBalanceRequested, labels, balance) => {
  return (
    <React.Fragment>
      {isGiftCardBalanceRequested && !balance && (
        <BodyCopy
          tag="span"
          fontSize="fs24"
          fontFamily="secondary"
          fontWeight="extrabold"
          className=""
          lineHeights="lh115"
        >
          {labels.paymentGC.lbl_payment_loading}
        </BodyCopy>
      )}
    </React.Fragment>
  );
};

export { getDataLocatorPrefix, getCardName, cardIconMapping, getAddressDetails, loading };
