import React from 'react';
import { connect } from 'react-redux';
import { getCardList, setDefaultPayment } from './Payment.actions';
import {
  getCreditDebitCards,
  getCardListFetchingState,
  getShowNotificationState,
  getGiftCards,
  getVenmoCards,
  getCardListState,
} from './Payment.selectors';
import labels from './Payment.labels';
import PaymentView from '../views/PaymentView';

// @flow
type Props = {
  getCardListAction: Function,
  creditCardList: List<any>,
  venmoCardList: List<any>,
  giftCardList: List<any>,
  showNotification: any,
  isFetching: boolean,
  cardList: List<any>,
  setDefaultPaymentMethod: Function,
};

export class PaymentContainer extends React.Component<Props> {
  componentDidMount() {
    const { getCardListAction } = this.props;
    getCardListAction();
  }

  render() {
    const {
      creditCardList,
      giftCardList,
      venmoCardList,
      isFetching,
      showNotification,
      cardList,
      setDefaultPaymentMethod,
    } = this.props;
    if (isFetching) return <p>Loading...</p>;
    return (
      <PaymentView
        labels={labels}
        showNotification={showNotification}
        creditCardList={creditCardList}
        giftCardList={giftCardList}
        venmoCardList={venmoCardList}
        cardList={cardList}
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
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PaymentContainer);
