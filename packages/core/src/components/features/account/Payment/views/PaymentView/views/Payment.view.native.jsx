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
  onGetBalanceCard: Function,
  checkbalanceValueInfo: any,
  onDeleteCard: any,
  deleteModalMountedState: any,
};

const PaymentViewContainer = ({
  labels,
  creditCardList,
  giftCardList,
  venmoCardList,
  cardList,
  setDefaultPaymentMethod,
  onGetBalanceCard,
  checkbalanceValueInfo,
  onDeleteCard,
  deleteModalMountedState,
}: Props) => {
  return (
    <PaymentSection
      labels={labels}
      creditCardList={creditCardList}
      giftCardList={giftCardList}
      venmoCardList={venmoCardList}
      cardList={cardList}
      onGetBalanceCard={onGetBalanceCard}
      checkbalanceValueInfo={checkbalanceValueInfo}
      setDefaultPaymentMethod={setDefaultPaymentMethod}
      onDeleteCard={onDeleteCard}
      deleteModalMountedState={deleteModalMountedState}
    />
  );
};

export default PaymentViewContainer;
