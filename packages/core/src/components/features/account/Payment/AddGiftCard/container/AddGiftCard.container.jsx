import React from 'react';
import { connect } from 'react-redux';
import AddGiftCardComponent from '../views/AddGiftCard.view';
import { addGiftCardRequest, resetShowNotification } from './AddGiftCard.actions';
import { getAddGiftCardResponse, getAddGiftCardError } from './AddGiftCard.selector';
import utils from '../../../../../../utils';

// @flow

type Props = {
  onAddGiftCardClick: Function,
  addGiftCardResponse: String,
  getAddGiftCardErr: String,
  resetNotificationStateAction: Function,
  labels: object,
};

export class AddGiftCardContainer extends React.Component<Props> {
  componentWillUnmount() {
    const { getAddGiftCardErr } = this.props;
    if (getAddGiftCardErr) {
      const { resetNotificationStateAction } = this.props;
      resetNotificationStateAction();
    }
  }

  goBackToPayment = () => {
    utils.routerPush('/account?id=payment', '/account/payment');
    return null;
  };

  render() {
    const { onAddGiftCardClick, addGiftCardResponse, getAddGiftCardErr, labels } = this.props;

    if (addGiftCardResponse === 'success') {
      return this.goBackToPayment();
    }
    return (
      <AddGiftCardComponent
        onAddGiftCardClick={onAddGiftCardClick}
        labels={labels}
        addGiftCardResponse={getAddGiftCardErr}
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
    getAddGiftCardErr: getAddGiftCardError(state),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AddGiftCardContainer);
