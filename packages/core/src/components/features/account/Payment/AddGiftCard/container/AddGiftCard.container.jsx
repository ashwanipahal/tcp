// @flow

import React from 'react';
import { connect } from 'react-redux';
import AddGiftCardComponent from '../views/AddGiftCard.view';
import { addGiftCardRequest } from './AddGiftCard.actions';
import getAddGiftCardResponse from './AddGiftCard.selector';
import labels from './AddGiftCard.labels';

type Props = {
  onAddGiftCardClick: Function,
  addGiftCardResponse: String,
};

const AddGiftCardContainer = ({ onAddGiftCardClick, addGiftCardResponse }: Props) => {
  return (
    <AddGiftCardComponent
      onAddGiftCardClick={onAddGiftCardClick}
      labels={labels}
      addGiftCardResponse={addGiftCardResponse}
    />
  );
};

const mapDispatchToProps = (dispatch: ({}) => void) => {
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
