import React from 'react';
import { connect } from 'react-redux';
import { getCardList, setDeleteModalMountedState } from './Payment.actions';
import {
  getCardListState,
  getCardListFetchingState,
  getShowNotificationState,
  deleteModalOpenState,
} from './Payment.selectors';
import labels from './Payment.labels';
import PaymentView from '../views/Payment.view';

// @flow
type Props = {
  getCardListAction: Function,
  showNotification: any,
  isFetching: boolean,
  deleteModalMountedState: boolean,
  setDeleteModalMountState: Function,
};

export class PaymentContainer extends React.Component<Props> {
  componentDidMount() {
    const { getCardListAction } = this.props;
    getCardListAction();
  }

  render() {
    const {
      isFetching,
      showNotification,
      setDeleteModalMountState,
      deleteModalMountedState,
    } = this.props;
    if (isFetching) return <p>Loading...</p>;
    return (
      <PaymentView
        deleteModalMountedState={deleteModalMountedState}
        labels={labels}
        setDeleteModalMountState={setDeleteModalMountState}
        showNotification={showNotification}
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
  };
};

const mapStateToProps = state => {
  return {
    cardList: getCardListState(state),
    isFetching: getCardListFetchingState(state),
    showNotification: getShowNotificationState(state),
    deleteModalMountedState: deleteModalOpenState(state),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PaymentContainer);
