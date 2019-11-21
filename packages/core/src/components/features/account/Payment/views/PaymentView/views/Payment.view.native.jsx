import React from 'react';
import PropTypes from 'prop-types';
import PaymentSection from '../../../organisms/PaymentSection';

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
}) => {
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
