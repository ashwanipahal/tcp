import React from 'react';
import PropTypes from 'prop-types';
import AddGiftCardFormView from './AddGiftCardForm.native';

const AddGiftCardComponent = props => {
  const { onAddGiftCardClick, addGiftCardResponse, labels, toggleModal } = props;
  return (
    <AddGiftCardFormView
      onAddGiftCardClick={onAddGiftCardClick}
      labels={labels}
      toggleModal={toggleModal}
      addGiftCardResponse={addGiftCardResponse}
    />
  );
};

AddGiftCardComponent.propTypes = {
  onAddGiftCardClick: PropTypes.func,
  addGiftCardResponse: PropTypes.string,
  labels: PropTypes.shape({}),
  toggleModal: PropTypes.func,
};

AddGiftCardComponent.defaultProps = {
  onAddGiftCardClick: () => {},
  addGiftCardResponse: null,
  labels: {},
  toggleModal: () => {},
};

export default AddGiftCardComponent;
