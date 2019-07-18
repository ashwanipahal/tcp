import React from 'react';
import { CardList } from './CardList.view';

// @flow

type Props = {
  labels: object,
  setDeleteModalMountState: Function,
  cardList: Array<object>,
  onGetBalanceCard: Function,
  checkbalanceValueInfo: any,
  showNotification: boolean,
  showNotificationCaptcha: boolean,
  setSelectedCard: string,
  setDefaultPaymentMethod: Function,
};

export const CardView = ({
  labels,
  setDeleteModalMountState,
  cardList,
  onGetBalanceCard,
  checkbalanceValueInfo,
  showNotification,
  showNotificationCaptcha,
  setSelectedCard,
  setDefaultPaymentMethod,
}: Props) => {
  return (
    <React.Fragment>
      <CardList
        setDeleteModalMountState={setDeleteModalMountState}
        setSelectedGiftCard={setSelectedCard}
        cardList={cardList}
        onGetBalanceCard={onGetBalanceCard}
        checkbalanceValueInfo={checkbalanceValueInfo}
        labels={labels}
        showNotification={showNotification}
        showNotificationCaptcha={showNotificationCaptcha}
        setDefaultPaymentMethod={setDefaultPaymentMethod}
      />
    </React.Fragment>
  );
};

export default CardView;
