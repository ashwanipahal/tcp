import React from 'react';
import { connect } from 'react-redux';
import AddGiftCardComponent from '../views/AddGiftCard.view';
import { addGiftCardRequest } from './AddGiftCard.actions';
import { getAddGiftCardResponse } from './AddGiftCard.selector';
import labels from './AddGiftCard.labels';
import Router from 'next/router'; //eslint-disable-line

// @flow

type Props = {
  onAddGiftCardClick: Function,
  addGiftCardResponse: String,
};

export const AddGiftCardContainer = ({ onAddGiftCardClick, addGiftCardResponse }: Props) => {
  const goBackToPayment = () => {
    Router.push('/account?id=payment', '/account/payment');
    return null;
  };

  if (addGiftCardResponse === 'success') {
    return goBackToPayment();
  }
  return (
    <AddGiftCardComponent
      onAddGiftCardClick={onAddGiftCardClick}
      labels={labels}
      addGiftCardResponse={addGiftCardResponse}
      goBackToPayment={goBackToPayment}
    />
  );
};

export const mapDispatchToProps = (dispatch: ({}) => void) => {
  return {
    onAddGiftCardClick: (payload: {}) => {
      dispatch(addGiftCardRequest(payload));
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
