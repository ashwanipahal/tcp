import React from 'react';
import PaymentSection from '../../../organisms/PaymentSection';

// @flow
type Props = {
  labels: Object,
  creditCardList: object,
  setDefaultPaymentMethod: Function,
  giftCardList: object,
  venmoCardList: object,
  cardList: object,
};

const PaymentViewContainer = ({ labels,creditCardList,
  giftCardList,
  venmoCardList,cardList,setDefaultPaymentMethod }: Props) => {
  return (
    <PaymentSection
      labels={labels}
      creditCardList={creditCardList}
      giftCardList={giftCardList}
      venmoCardList={venmoCardList}
      cardList={cardList}
      setDefaultPaymentMethod={setDefaultPaymentMethod}
    />
);
};

export default PaymentViewContainer;
