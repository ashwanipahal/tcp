import React from 'react';
import { connect } from 'react-redux';
import AddGiftCardForm from '../views/AddGiftCardForm.native';
import { addGiftCardRequest } from './AddGiftCard.actions';
import { getAddGiftCardResponse, getAddGiftCardError } from './AddGiftCard.selector';

// @flow
type Props = {
  onAddGiftCardClick: Function,
  getAddGiftCardErr: String,
  labels: object,
  addGiftCardResponse: String,
  toggleModal: Function,
};

class AddGiftCardContainer extends React.PureComponent<Props> {
  render() {
    const {
      onAddGiftCardClick,
      addGiftCardResponse,
      getAddGiftCardErr,
      labels,
      toggleModal,
    } = this.props;

    if (addGiftCardResponse === 'success') {
      toggleModal();
    }

    return (
      <AddGiftCardForm
        onAddGiftCardClick={onAddGiftCardClick}
        labels={labels}
        toggleModal={toggleModal}
        addGiftCardResponse={getAddGiftCardErr}
      />
    );
  }
}

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
    getAddGiftCardErr: getAddGiftCardError(state),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AddGiftCardContainer);
