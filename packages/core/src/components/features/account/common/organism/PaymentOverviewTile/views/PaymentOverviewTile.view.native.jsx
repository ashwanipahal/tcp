import React from 'react';
import { View } from 'react-native';
import BodyCopy from '@tcp/core/src/components/common/atoms/BodyCopy';
import { getIconCard } from '@tcp/core/src/utils/index.native';
import PaymentItem from '../../../molecule/Payment';

const cardIconMapping = {
  DISC: 'disc-small',
  MC: 'mc-small',
  Amex: 'amex-small',
  Visa: 'visa-small',
  GC: 'gift-card-small',
  'PLACE CARD': 'place-card-small',
  VENMO: 'venmo-blue-acceptance-mark',
};

export class PaymentOverviewTile extends React.PureComponent {
  render() {
    const ctaTitle = 'View Payment & Gift Cards';
    const paymentInfo = {
      icon: getIconCard(cardIconMapping.Visa),
      title: 'Venmo',
      variation: 'add',
      defaultText: 'You have not added a credit card yet',
    };
    return (
      <View>
        <BodyCopy title={ctaTitle} />
        <PaymentItem paymentInfo={paymentInfo} />
      </View>
    );
  }
}

export default PaymentOverviewTile;
