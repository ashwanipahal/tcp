import React from 'react';
import { connect } from 'react-redux';
import { getCardList } from './Payment.actions';
import {
  getCardListState,
  getCardListFetchingState,
  getShowNotificationState,
} from './Payment.selectors';
import labels from './Payment.labels';
import PaymentView from '../views/Payment.view';

// @flow
type Props = {
  getCardListAction: Function,
  cardList: List<any>,
  showNotification: any,
  isFetching: boolean,
};

export class PaymentContainer extends React.Component<Props> {
  componentDidMount() {
    const { getCardListAction } = this.props;
    getCardListAction();
  }

  render() {
    const { cardList, isFetching, showNotification } = this.props;
    console.log('cardList', cardList);
    if (isFetching) return <p>Loading...</p>;
    return <PaymentView labels={labels} showNotification={showNotification} />;
  }
}

export const mapDispatchToProps = (dispatch: ({}) => void) => {
  return {
    getCardListAction: () => {
      dispatch(getCardList());
    },
  };
};

const mapStateToProps = state => {
  return {
    cardList: getCardListState(state),
    isFetching: getCardListFetchingState(state),
    showNotification: getShowNotificationState(state),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PaymentContainer);
