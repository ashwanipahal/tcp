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
  getLabels,
  getPaymentBannerRichTextSelector,
  getPaymentBannerContentId,
} from './Payment.selectors';
import PaymentView from '../views/PaymentView';
import CardViewSkeleton from '../skeleton/CardViewSkeleton.view.native';

export class PaymentContainer extends React.Component<Props> {
  static propTypes = {
    getCardListAction: PropTypes.func,
    showNotification: PropTypes.string,
    deleteModalMountedState: PropTypes.bool,
    setDeleteModalMountState: PropTypes.func,
    onDeleteCard: PropTypes.func,
    showUpdatedNotificationOnModal: PropTypes.string,
    creditCardList: PropTypes.shape({}),
    venmoCardList: PropTypes.shape({}),
    giftCardList: PropTypes.shape({}),
    cardList: PropTypes.shape({}),
    onGetBalanceCard: PropTypes.func,
    checkbalanceValueInfo: PropTypes.string,
    setDefaultPaymentMethod: PropTypes.func,
    showNotificationCaptcha: PropTypes.bool,
    clearPaymentNotification: PropTypes.func,
    labels: PropTypes.shape({}),
    isFetching: PropTypes.bool,
  };

  static defaultProps = {
    getCardListAction: () => {},
    showNotification: '',
    deleteModalMountedState: false,
    setDeleteModalMountState: false,
    onDeleteCard: () => {},
    showUpdatedNotificationOnModal: '',
    creditCardList: null,
    venmoCardList: null,
    giftCardList: null,
    cardList: null,
    onGetBalanceCard: () => {},
    checkbalanceValueInfo: '',
    setDefaultPaymentMethod: () => {},
    showNotificationCaptcha: '',
    clearPaymentNotification: () => {},
    labels: {},
    isFetching: false,
  };

  componentDidMount() {
    const { getCardListAction, paymentBannerContentId, getPaymentBannerRichText } = this.props;
    getCardListAction();
    getPaymentBannerRichText(paymentBannerContentId);
  }

  componentWillUnmount() {
    const { clearPaymentNotification } = this.props;
    clearPaymentNotification();
  }

  updateCardList = () => {
    const { getCardListAction } = this.props;
    getCardListAction();
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
      labels,
      paymentBannerRichText,
      isFetching,
    } = this.props;
    const updatedLabels = { ...labels, ACC_PAYMNET_BANNER_LABEL: paymentBannerRichText };
    if (isFetching) {
      return <CardViewSkeleton labels={updatedLabels} />;
    }
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
        updateCardList={this.updateCardList}
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
    labels: getLabels(state),
    paymentBannerContentId: getPaymentBannerContentId(state),
    paymentBannerRichText: getPaymentBannerRichTextSelector(state),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PaymentContainer);
