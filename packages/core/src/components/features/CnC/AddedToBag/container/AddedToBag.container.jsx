/* eslint-disable */
import React from 'react';
import { connect } from 'react-redux';
import { addToCartEcom, closeAddedToBag } from './AddedToBag.actions';
import {
  //   getCreditDebitCards,
  //   getCardListFetchingState,
  //   getShowNotificationState,
  //   getGiftCards,
  //   getVenmoCards,
  getAddedToBagData,
  isOpenAddedToBag,
} from './AddedToBag.selectors';
// import labels from './Payment.labels';
import AddedToBag from '../views/AddedToBag.view';

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

export class AddedToBagContainer extends React.Component<Props> {
  constructor(props) {
    super(props);

    this.closeModal = this.closeModal.bind(this);
  }

  componentDidMount() {
    // const { getCardListAction } = this.props;
    // getCardListAction();
  }

  closeModal() {
    const { closeModal } = this.props;
    closeModal();
  }

  render() {
    const { addedToBagData, isOpenDialog, ...rest } = this.props;
    return (
      <AddedToBag
        {...rest}
        openState={isOpenDialog}
        onRequestClose={this.closeModal}
        addedToBagData={addedToBagData}
      />
    );
  }
}

const mapDispatchToProps = (dispatch: ({}) => void) => {
  return {
    addToCartEcom: payload => {
      dispatch(addToCartEcom(payload));
    },
    closeModal: () => {
      dispatch(closeAddedToBag());
    },
  };
};

const mapStateToProps = state => {
  return {
    addedToBagData: getAddedToBagData(state),
    isOpenDialog: isOpenAddedToBag(state),
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
