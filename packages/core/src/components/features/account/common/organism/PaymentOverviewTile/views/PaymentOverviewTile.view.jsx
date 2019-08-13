import React from 'react';
import PropTypes from 'prop-types';
import { getIconPath } from '../../../../../../../utils';
import { Image } from '../../../../../../common/atoms';

import AccountOverviewTile from '../../../../../../common/molecules/AccountOverviewTile';

export const PaymentOverviewTile = ({ labels, creditCardDefault, giftCardList, venmoCardList }) => {
  const cardIconMapping = {
    DISC: 'disc-small',
    MC: 'mc-small',
    Amex: 'amex-small',
    Visa: 'visa-small',
    GC: 'gift-card-small',
    'PLACE CARD': 'place-card-small',
    VENMO: 'venmo-blue-acceptance-mark',
  };
  return (
    <AccountOverviewTile
      title={labels.lbl_overview_paymentHeading}
      ctaTitle={labels.lbl_overview_paymentCTA}
    >
      {creditCardDefault && creditCardDefault.ccBrand && (
        <>
          <div>Default Credit Card</div>
          <Image
            className="creditCardDefault__img"
            src={getIconPath(cardIconMapping[creditCardDefault.ccBrand])}
          />
        </>
      )}
      {venmoCardList && venmoCardList.ccBrand && (
        <>
          <div>Venmo Card1</div>
          <Image
            className="venmoCardList_img"
            src={getIconPath(cardIconMapping[venmoCardList.ccBrand])}
          />
        </>
      )}
      {giftCardList && giftCardList.ccBrand && (
        <>
          <div>Gift Card</div>
          <Image
            className="giftCardList_img"
            src={getIconPath(cardIconMapping[giftCardList.ccBrand])}
          />
        </>
      )}
    </AccountOverviewTile>
  );
};

PaymentOverviewTile.propTypes = {
  labels: PropTypes.shape({
    lbl_overview_paymentHeading: PropTypes.string,
    lbl_overview_paymentCTA: PropTypes.string,
  }),
  creditCardDefault: PropTypes.shape({}),
  giftCardList: PropTypes.shape({}),
  venmoCardList: PropTypes.shape({}),
};

PaymentOverviewTile.defaultProps = {
  labels: {
    lbl_overview_paymentHeading: '',
    lbl_overview_paymentCTA: '',
  },
  creditCardDefault: {},
  giftCardList: {},
  venmoCardList: {},
};

export default PaymentOverviewTile;
