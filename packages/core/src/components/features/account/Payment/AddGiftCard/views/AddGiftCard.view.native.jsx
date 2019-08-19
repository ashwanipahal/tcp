import React from 'react';
import PropTypes from 'prop-types';
import AddGiftCardForm from './AddGiftCardForm.native';

const AddGiftCardComponent = props => {
  const { onAddGiftCardClick, getAddGiftCardErr, labels, toggleModal } = props;
  return (
    <AddGiftCardForm
      onAddGiftCardClick={onAddGiftCardClick}
      labels={labels}
      toggleModal={toggleModal}
      addGiftCardResponse={getAddGiftCardErr}
    />
  );
};

AddGiftCardComponent.propTypes = {
  onAddGiftCardClick: PropTypes.func,
  getAddGiftCardErr: PropTypes.string,
  labels: PropTypes.shape({}),
  toggleModal: PropTypes.func,
};

AddGiftCardComponent.defaultProps = {
  onAddGiftCardClick: () => {},
  getAddGiftCardErr: null,
  labels: PropTypes.shape({}),
  toggleModal: () => {},
};

export default AddGiftCardComponent;
