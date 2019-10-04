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

CardView.defaultProps = {
  labels: {},
  setDeleteModalMountState: null,
  cardList: [],
  onGetBalanceCard: null,
  checkbalanceValueInfo: '',
  showNotification: null,
  showNotificationCaptcha: null,
  setSelectedCard: '',
  setDefaultPaymentMethod: null,
};

CardView.propTypes = {
  labels: PropTypes.shape(),
  setDeleteModalMountState: PropTypes.func,
  cardList: PropTypes.arrayOf(PropTypes.shape()),
  onGetBalanceCard: PropTypes.func,
  checkbalanceValueInfo: PropTypes.string,
  showNotification: PropTypes.bool,
  showNotificationCaptcha: PropTypes.bool,
  setSelectedCard: PropTypes.string,
  setDefaultPaymentMethod: PropTypes.func,
};
export default CardView;
