import React from 'react';
import { View, ScrollView } from 'react-native';
import withStyles from '../../../../../../common/hoc/withStyles.native';
import { ParentContainer, StyledHeading, UnderlineStyle } from '../PaymentSection.style.native';
import OffersSection from '../../../molecules/OffersSection';
import MoneyCards from '../../../molecules/MoneyCards';
import GiftCards from '../../../molecules/GiftCards';
import BodyCopy from '../../../../../../common/atoms/BodyCopy';
import VenmoCards from '../../../molecules/VenmoCards';

// @flow
type Props = {
  labels: Object,
  creditCardList: object,
  setDefaultPaymentMethod: Function,
  giftCardList: object,
  cardList: object,
  venmoCardList: object,
};

const PaymentView = (props: Props) => {
  const {
    labels,
    creditCardList,
    giftCardList,
    cardList,
    setDefaultPaymentMethod,
    venmoCardList,
  } = props;
  return (
    <View {...props}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <StyledHeading>
          <BodyCopy
            fontSize="fs16"
            fontWeight="extrabold"
            text={labels.paymentGC.ACC_LBL_PAYMENT_HEADING}
          />
        </StyledHeading>
        <UnderlineStyle />
        {cardList && <OffersSection labels={labels} />}
        {creditCardList && (
          <MoneyCards
            labels={labels}
            creditCardList={creditCardList}
            setDefaultPaymentMethod={setDefaultPaymentMethod}
          />
        )}
        {venmoCardList && venmoCardList.size > 0 && (
          <VenmoCards labels={labels} venmoCardList={venmoCardList} />
        )}
        {giftCardList && <GiftCards labels={labels} giftCardList={giftCardList} />}
      </ScrollView>
    </View>
  );
};

export default withStyles(PaymentView, ParentContainer);
export { PaymentView as PaymentViewVanilla };
