import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {
  getCardList,
  setDeleteModalMountedState,
  deleteCard,
  checkBalance,
  setDefaultPayment,
  setPaymentNotification,
  fetchModuleX,
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
  getPaymentBannerContentId,
  getPaymentBannerRichTextSelector,
} from './Payment.selectors';
import PaymentView from '../views/PaymentView';

import utils from '../../../../../utils';

export class PaymentContainer extends React.Component {
  componentDidMount() {
    const { getCardListAction, paymentBannerContentId, getPaymentBannerRichText } = this.props;
    getCardListAction();
    getPaymentBannerRichText(paymentBannerContentId);
  }

  componentWillUnmount() {
    const { clearPaymentNotification } = this.props;
    clearPaymentNotification();
  }

  addNewCreditCard = () => {
    utils.routerPush('/account?id=add-credit-card', '/account/payment/add-credit-card');
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
      paymentBannerRichText,
      labels,
    } = this.props;

    const updatedLabels = { ...labels, ACC_PAYMNET_BANNER_LABEL: paymentBannerRichText };

    return (
      <PaymentView
        deleteModalMountedState={deleteModalMountedState}
        setDeleteModalMountState={setDeleteModalMountState}
        showNotification={showNotification}
        showNotificationCaptcha={showNotificationCaptcha}
        onDeleteCard={onDeleteCard}
        showUpdatedNotificationOnModal={showUpdatedNotificationOnModal}
        labels={updatedLabels}
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

export const mapDispatchToProps = dispatch => {
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
    getPaymentBannerRichText: cid => {
      dispatch(fetchModuleX(cid));
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
    paymentBannerContentId: getPaymentBannerContentId(state),
    paymentBannerRichText: getPaymentBannerRichTextSelector(state),
  };
};

PaymentContainer.defaultProps = {
  clearPaymentNotification: null,
};

PaymentContainer.propTypes = {
  getCardListAction: PropTypes.func.isRequired,
  showNotification: PropTypes.string.isRequired,
  deleteModalMountedState: PropTypes.bool.isRequired,
  setDeleteModalMountState: PropTypes.func.isRequired,
  onDeleteCard: PropTypes.func.isRequired,
  showUpdatedNotificationOnModal: PropTypes.string.isRequired,
  creditCardList: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  venmoCardList: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  giftCardList: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  cardList: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  onGetBalanceCard: PropTypes.func.isRequired,
  checkbalanceValueInfo: PropTypes.string.isRequired,
  setDefaultPaymentMethod: PropTypes.func.isRequired,
  getPaymentBannerRichText: PropTypes.func.isRequired,
  paymentBannerContentId: PropTypes.string.isRequired,
  showNotificationCaptcha: PropTypes.bool.isRequired,
  paymentBannerRichText: PropTypes.string.isRequired,
  clearPaymentNotification: PropTypes.func,
  labels: PropTypes.shape({}).isRequired,
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PaymentContainer);
