import React from 'react';
import PropTypes from 'prop-types';
import { CardList } from './CardList.view';

// @flow

// type Props = {
//   labels: object,
//   setDeleteModalMountState: Function,
//   cardList: Array<object>,
//   onGetBalanceCard: Function,
//   checkbalanceValueInfo: any,
//   showNotification: boolean,
//   showNotificationCaptcha: boolean,
//   setSelectedCard: string,
//   setDefaultPaymentMethod: Function,
// };

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

CardView.propTypes = {
  labels: PropTypes.shape({}).isRequired,
  setDeleteModalMountState: PropTypes.func.isRequired,
  cardList: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  onGetBalanceCard: PropTypes.func.isRequired,
  checkbalanceValueInfo: PropTypes.string.isRequired,
  showNotification: PropTypes.bool.isRequired,
  showNotificationCaptcha: PropTypes.bool.isRequired,
  setSelectedCard: PropTypes.string.isRequired,
  setDefaultPaymentMethod: PropTypes.func.isRequired,
};
export default CardView;
