import React from 'react';
import Router from 'next/router'; // eslint-disable-line
import { connect } from 'react-redux';
import {
  getCardList,
  setDeleteModalMountedState,
  deleteCard,
  checkBalance,
  setDefaultPayment,
} from './Payment.actions';
import {
  getCreditDebitCards,
  getCardListFetchingState,
  getShowNotificationState,
  deleteModalOpenState,
  showUpdatedNotificationOnModalState,
  getGiftCards,
  getVenmoCards,
  getCardListState,
  checkbalanceValue,
  getShowNotificationCaptchaState,
} from './Payment.selectors';
import labels from './Payment.labels';
import PaymentView from '../views/PaymentView';

// @flow
type Props = {
  getCardListAction: Function,
  showNotification: any,
  deleteModalMountedState: boolean,
  setDeleteModalMountState: Function,
  onDeleteCard: Function,
  showUpdatedNotificationOnModal: any,
  creditCardList: List<any>,
  venmoCardList: List<any>,
  giftCardList: List<any>,
  cardList: List<any>,
  onGetBalanceCard: Function,
  checkbalanceValueInfo: any,
  setDefaultPaymentMethod: Function,
  showNotificationCaptcha: boolean,
};

export class PaymentContainer extends React.Component<Props> {
  componentDidMount() {
    const { getCardListAction } = this.props;
    getCardListAction();
  }

  addNewCreditCard = () => {
    Router.push('/account?id=add-credit-card', '/account/payment/add-credit-card');
  };

  render() {
    const {
      showNotification,
      setDeleteModalMountState,
      deleteModalMountedState,
      onDeleteCard,
      showUpdatedNotificationOnModal,
      creditCardList,
      giftCardList,
      venmoCardList,
      cardList,
      onGetBalanceCard,
      checkbalanceValueInfo,
      setDefaultPaymentMethod,
      showNotificationCaptcha,
    } = this.props;
    return (
      <PaymentView
        deleteModalMountedState={deleteModalMountedState}
        setDeleteModalMountState={setDeleteModalMountState}
        showNotification={showNotification}
        showNotificationCaptcha={showNotificationCaptcha}
        onDeleteCard={onDeleteCard}
        showUpdatedNotificationOnModal={showUpdatedNotificationOnModal}
        labels={labels}
        creditCardList={creditCardList}
        giftCardList={giftCardList}
        venmoCardList={venmoCardList}
        cardList={cardList}
        onGetBalanceCard={onGetBalanceCard}
        checkbalanceValueInfo={checkbalanceValueInfo}
        setDefaultPaymentMethod={setDefaultPaymentMethod}
        addCreditCard={this.addNewCreditCard}
      />
    );
  }
}

export const mapDispatchToProps = (dispatch: ({}) => void) => {
  return {
    getCardListAction: () => {
      dispatch(getCardList());
    },
    setDeleteModalMountState: payload => {
      dispatch(setDeleteModalMountedState(payload));
    },
    onDeleteCard: payload => {
      dispatch(deleteCard(payload));
    },
    onGetBalanceCard: payload => {
      dispatch(checkBalance(payload));
    },
    setDefaultPaymentMethod: payload => {
      dispatch(setDefaultPayment(payload));
    },
  };
};

const mapStateToProps = state => {
  return {
    cardList: getCardListState(state),
    creditCardList: getCreditDebitCards(state),
    giftCardList: getGiftCards(state),
    venmoCardList: getVenmoCards(state),
    isFetching: getCardListFetchingState(state),
    showNotification: getShowNotificationState(state),
    showNotificationCaptcha: getShowNotificationCaptchaState(state),
    deleteModalMountedState: deleteModalOpenState(state),
    showUpdatedNotificationOnModal: showUpdatedNotificationOnModalState(state),
    checkbalanceValueInfo: checkbalanceValue(state),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PaymentContainer);
