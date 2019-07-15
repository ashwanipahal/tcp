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
};

export class CardView extends React.PureComponent<Props> {
  render() {
    const {
      labels,
      setDeleteModalMountState,
      cardList,
      onGetBalanceCard,
      checkbalanceValueInfo,
      showNotification,
      showNotificationCaptcha,
      setSelectedCard,
    } = this.props;
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
        />
      </React.Fragment>
    );
  }
}
export default CardView;
