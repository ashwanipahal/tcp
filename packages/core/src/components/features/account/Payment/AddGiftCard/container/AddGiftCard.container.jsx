import React from 'react';
import { connect } from 'react-redux';
import AddGiftCardComponent from '../views/AddGiftCard.view';
import { addGiftCardRequest, resetShowNotification } from './AddGiftCard.actions';
import { getAddGiftCardResponse } from './AddGiftCard.selector';
import labels from './AddGiftCard.labels';
import Router from 'next/router'; //eslint-disable-line

// @flow

type Props = {
  onAddGiftCardClick: Function,
  addGiftCardResponse: String,
  resetNotificationStateAction: Function,
};

export class AddGiftCardContainer extends React.Component<Props> {
  componentWillUnmount() {
    const { resetNotificationStateAction } = this.props;
    resetNotificationStateAction();
  }

  goBackToPayment = () => {
    Router.push('/account?id=payment', '/account/payment');
    return null;
  };

  render() {
    const { onAddGiftCardClick, addGiftCardResponse } = this.props;

    if (addGiftCardResponse === 'success') {
      return this.goBackToPayment();
    }
    return (
      <AddGiftCardComponent
        onAddGiftCardClick={onAddGiftCardClick}
        labels={labels}
        addGiftCardResponse={addGiftCardResponse}
        goBackToPayment={this.goBackToPayment}
      />
    );
  }
}

export const mapDispatchToProps = (dispatch: ({}) => void) => {
  return {
    onAddGiftCardClick: (payload: {}) => {
      dispatch(addGiftCardRequest(payload));
    },
    resetNotificationStateAction: () => {
      dispatch(resetShowNotification());
    },
  };
};

const mapStateToProps = state => {
  return {
    addGiftCardResponse: getAddGiftCardResponse(state),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AddGiftCardContainer);
