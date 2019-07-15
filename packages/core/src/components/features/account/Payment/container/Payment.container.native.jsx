import React from 'react';
import { Text } from 'react-native';
import { connect } from 'react-redux';
import PaymentView from '../views/PaymentView';
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

// @flow
type Props = {
  getCardListAction: Function,
  creditCardList: object,
  giftCardList: object,
  venmoCardList: object,
  isFetching: boolean,
  showNotification: string,
  cardList: object,
  setDefaultPaymentMethod: Function,
};

export class PaymentViewContainer extends React.Component<Props> {
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
    if (isFetching) return <Text>Loading...</Text>;
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
)(PaymentViewContainer);
