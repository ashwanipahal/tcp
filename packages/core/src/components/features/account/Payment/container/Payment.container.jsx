import React from 'react';
import { connect } from 'react-redux';
import {
  getCardList,
  setDeleteModalMountedState,
  deleteCard,
  checkBalance,
  setDefaultPayment,
  setPaymentNotification,
  getEspots,
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
  getEspotValue,
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
  getEspotAction: Function,
  showNotificationCaptcha: boolean,
  espotsValue: string,
  clearPaymentNotification: () => void,
};

export class PaymentContainer extends React.Component<Props> {
  componentDidMount() {
    const { getCardListAction, getEspotAction } = this.props;
    getCardListAction();
    getEspotAction();
  }

  componentWillUnmount() {
    const { clearPaymentNotification } = this.props;
    clearPaymentNotification();
  }

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
      espotsValue,
    } = this.props;
    const updateLabels = { ...labels, ACC_LBL_PAYMENT_BANNER_DETAIL: espotsValue };

    return (
      <PaymentView
        deleteModalMountedState={deleteModalMountedState}
        setDeleteModalMountState={setDeleteModalMountState}
        showNotification={showNotification}
        showNotificationCaptcha={showNotificationCaptcha}
        onDeleteCard={onDeleteCard}
        showUpdatedNotificationOnModal={showUpdatedNotificationOnModal}
        labels={updateLabels}
        creditCardList={creditCardList}
        giftCardList={giftCardList}
        venmoCardList={venmoCardList}
        cardList={cardList}
        onGetBalanceCard={onGetBalanceCard}
        checkbalanceValueInfo={checkbalanceValueInfo}
        setDefaultPaymentMethod={setDefaultPaymentMethod}
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
    clearPaymentNotification: () => {
      dispatch(
        setPaymentNotification({
          status: '',
        })
      );
    },
    getEspotAction: () => {
      dispatch(getEspots(labels.ACC_LBL_PAYMENT_BANNER));
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
    espotsValue: getEspotValue(state),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PaymentContainer);
