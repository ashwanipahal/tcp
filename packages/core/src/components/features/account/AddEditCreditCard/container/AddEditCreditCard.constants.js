export default {
  FORM_NAME: 'addEditCreditCard',
  CREDIT_CARDS_BIN_RANGES: {
    'PLACE CARD': [{ from: 578097, to: 578097 }],
    VISA: [{ from: 400000, to: 499999 }],
    AMEX: [{ from: 340000, to: 349999 }, { from: 370000, to: 379999 }],
    MC: [{ from: 510000, to: 559999 }, { from: 222100, to: 272099 }],
    DISC: [
      { from: 601100, to: 601109 },
      { from: 601120, to: 601149 },
      { from: 601174, to: 601199 },
      { from: 644000, to: 659999 },
      { from: 352800, to: 358999 },
      { from: 300000, to: 309999 },
      { from: 352000, to: 369999 },
      { from: 380000, to: 399999 },
      { from: 940000, to: 959999 },
      { from: 389000, to: 389999 },
      { from: 900000, to: 999999 },
      { from: 622126, to: 622925 },
      { from: 624000, to: 626999 },
      { from: 628200, to: 628899 },
    ],
  },
  ACCEPTED_CREDIT_CARDS: {
    'PLACE CARD': 'PLACE CARD',
    VISA: 'VISA',
    AMEX: 'AMEX',
    MC: 'MC',
    DISC: 'DISC',
    PAYPAL: 'PAYPAL',
    VENMO: 'VENMO',
  },
  CREDIT_CARDS_PAYMETHODID: {
    'PLACE CARD': 'ADSPlaceCard',
    VISA: 'COMPASSVISA',
    AMEX: 'COMPASSAMEX',
    MC: 'COMPASSMASTERCARD',
    DISC: 'COMPASSDISCOVER',
    VENMO: 'VENMO',
  },
  ADD_CREDIT_CARD: 'ADD_CREDIT_CARD',
  EDIT_CREDIT_CARD: 'EDIT_CREDIT_CARD',
  ADD_CREDIT_CARD_SUCCESS: 'ADD_CREDIT_CARD_SUCCESS',
  ADD_CREDIT_CARD_ERROR: 'ADD_CREDIT_CARD_ERROR',
  RESET_ADD_CREDIT_CARD: 'RESET_ADD_CREDIT_CARD',
  COUNTRY_US: 'US',
  COUNTRY_CA: 'CA',
};
