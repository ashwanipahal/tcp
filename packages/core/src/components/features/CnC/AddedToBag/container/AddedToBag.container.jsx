import React from 'react';
import { connect } from 'react-redux';
import { addToCartEcom } from './AddedToBag.actions';
import {
  //   getCreditDebitCards,
  //   getCardListFetchingState,
  //   getShowNotificationState,
  //   getGiftCards,
  //   getVenmoCards,
  getCardListState,
} from './AddedToBag.selectors';
// import labels from './Payment.labels';
import AddedToBagContainer from '../views/AddedToBag.view';

// @flow
type Props = {
  // getCardListAction: Function,
  // creditCardList: List<any>,
  // venmoCardList: List<any>,
  // giftCardList: List<any>,
  // showNotification: any,
  // isFetching: boolean,
  // cardList: List<any>,
};

export class AddedToBag extends React.Component<Props> {
  componentDidMount() {
    // const { getCardListAction } = this.props;
    // getCardListAction();
  }

  render() {
    return <AddedToBag openState={openState} onRequestClose={this.closeQuickViewModal} />;
    //   const {
    //     creditCardList,
    //     giftCardList,
    //     venmoCardList,
    //     isFetching,
    //     showNotification,
    //     cardList,
    //   } = this.props;
    //   if (isFetching) return <p>Loading...</p>;
    //   return (
    //     <PaymentView
    //       labels={labels}
    //       showNotification={showNotification}
    //       creditCardList={creditCardList}
    //       giftCardList={giftCardList}
    //       venmoCardList={venmoCardList}
    //       cardList={cardList}
    //     />
    //   );
    // }
  }
}

const mapDispatchToProps = (dispatch: ({}) => void) => {
  return {
    addToCartEcom: payload => {
      dispatch(addToCartEcom(payload));
    },
  };
};

const mapStateToProps = state => {
  return {
    cardList: getCardListState(state),
    // creditCardList: getCreditDebitCards(state),
    // giftCardList: getGiftCards(state),
    // venmoCardList: getVenmoCards(state),
    // isFetching: getCardListFetchingState(state),
    // showNotification: getShowNotificationState(state),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AddedToBagContainer);
