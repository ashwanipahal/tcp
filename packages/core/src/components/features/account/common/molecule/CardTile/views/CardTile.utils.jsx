import React from 'react';
import { getLabelValue } from '@tcp/core/src/utils/utils';
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
      return getLabelValue(labels, 'lbl_payment_giftCard', 'paymentGC');
    case 'PLACE CARD':
      return getLabelValue(labels, 'lbl_payment_plccCard', 'paymentGC');
    case 'VENMO':
      return getLabelValue(labels, 'lbl_payment_venmoAccount', 'paymentGC');
    default:
      return getLabelValue(labels, 'lbl_payment_defaultCardName', 'paymentGC');
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
  VISA: 'visa-small',
  AMEX: 'amex-small',
  paypal: 'paypal-icon',
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
          {getLabelValue(labels, 'lbl_payment_loading', 'paymentGC')}
        </BodyCopy>
      )}
    </React.Fragment>
  );
};

export { getDataLocatorPrefix, getCardName, cardIconMapping, getAddressDetails, loading };
