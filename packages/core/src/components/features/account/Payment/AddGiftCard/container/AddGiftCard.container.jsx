// @flow

import React from 'react';
import { connect } from 'react-redux';
import AddGiftCardComponent from '../views/AddGiftCard.view';
import { addGiftCardRequest } from './AddGiftCard.actions';
import getAddGiftCardResponse from './AddGiftCard.selector';

type Props = {
  onAddGiftCardClick: Function,
};

const AddGiftCardContainer = ({ onAddGiftCardClick }: Props) => {
  return <AddGiftCardComponent onAddGiftCardClick={onAddGiftCardClick} />;
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
