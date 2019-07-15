import React from 'react';
import { View } from 'react-native';
import withStyles from '../../../../../../common/hoc/withStyles.native';
import { StyledHeading, UnderlineStyle } from '../PaymentSection.style.native';
import OffersSection from '../../../molecules/OffersSection';
import MoneyCards from '../../../molecules/MoneyCards';
import GiftCards from '../../../molecules/GiftCards';

// @flow
type Props = {
  labels: Object,
};

const PaymentView = (props: Props) => {
  const { labels } = props;
  return (
    <View {...props}>
      <StyledHeading>{labels.ACC_LBL_PAYMENT_HEADING}</StyledHeading>
      <UnderlineStyle />
      <OffersSection labels={labels} />
      <MoneyCards labels={labels} />
      <GiftCards labels={labels} />
    </View>
  );
};

export default withStyles(PaymentView);
export { PaymentView as PaymentViewVanilla };
