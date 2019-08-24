import React from 'react';
import Heading from '../../../../common/atoms/Heading';
import styles from '../styles/CardList.style';
import withStyles from '../../../../common/hoc/withStyles';
import { CardView } from './Card.view';

// @flow
type Props = {
  labels: object,
  venmoCardList: object,
  className: string,
  setDeleteModalMountState: Function,
  deleteModalMountedState: false,
  onDeleteCard: Function,
  showUpdatedNotificationOnModal: any,
  onGetBalanceCard: Function,
  checkbalanceValueInfo: any,
  showNotification: boolean,
  showNotificationCaptcha: boolean,
  setSelectedCard: string,
};

const VenmoCardList = ({
  labels,
  venmoCardList,
  className,
  setDeleteModalMountState,
  deleteModalMountedState,
  onDeleteCard,
  showUpdatedNotificationOnModal,
  onGetBalanceCard,
  checkbalanceValueInfo,
  showNotification,
  showNotificationCaptcha,
  setSelectedCard,
}: Props) => {
  return (
    <div className={className}>
      <Heading variant="h6" className="cardList__heading" dataLocator="payment-venmocardtile">
        {labels.paymentGC.lbl_payment_venmoHeading}
      </Heading>
      {venmoCardList.size !== 0 && (
        <CardView
          labels={labels}
          deleteModalMountedState={deleteModalMountedState}
          setDeleteModalMountState={setDeleteModalMountState}
          onDeleteCard={onDeleteCard}
          showUpdatedNotificationOnModal={showUpdatedNotificationOnModal}
          cardList={venmoCardList}
          onGetBalanceCard={onGetBalanceCard}
          checkbalanceValueInfo={checkbalanceValueInfo}
          showNotification={showNotification}
          showNotificationCaptcha={showNotificationCaptcha}
          setSelectedCard={setSelectedCard}
        />
      )}
    </div>
  );
};

export default withStyles(VenmoCardList, styles);
export { VenmoCardList as VenmoCardListVanilla };
