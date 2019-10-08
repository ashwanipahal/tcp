import React from 'react';
import PropTypes from 'prop-types';
import PaymentSection from '../../../organisms/PaymentSection';

// @flow
// type Props = {
//   labels: Object,
//   creditCardList: object,
//   setDefaultPaymentMethod: Function,
//   giftCardList: object,
//   venmoCardList: object,
//   cardList: object,
//   onGetBalanceCard: Function,
//   checkbalanceValueInfo: any,
//   onDeleteCard: any,
//   deleteModalMountedState: any,
//   updateCardList: Function,
// };

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
  updateCardList,
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
      updateCardList={updateCardList}
    />
  );
};

PaymentViewContainer.propTypes = {
  labels: PropTypes.shape({}).isRequired,
  creditCardList: PropTypes.shape({}).isRequired,
  setDefaultPaymentMethod: PropTypes.func.isRequired,
  giftCardList: PropTypes.shape({}).isRequired,
  venmoCardList: PropTypes.shape({}).isRequired,
  cardList: PropTypes.shape({}).isRequired,
  onGetBalanceCard: PropTypes.func.isRequired,
  checkbalanceValueInfo: PropTypes.string.isRequired,
  onDeleteCard: PropTypes.string.isRequired,
  deleteModalMountedState: PropTypes.string.isRequired,
  updateCardList: PropTypes.func.isRequired,
};

export default PaymentViewContainer;
