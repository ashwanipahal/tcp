import React from 'react';
// import withStyles from '@tcp/core/src/components/common/hoc/withStyles';
// import styles from '../styles/Payment.style';
// import DeleteCardModal from './DeleteCardModal';
import { CardList } from './CardList.view';

// @flow

type Props = {
  labels: object,
  setDeleteModalMountState: Function,
  // deleteModalMountedState: false,
  // onDeleteCard: Function,
  // showUpdatedNotificationOnModal: any,
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
