import React from 'react';
import PropTypes from 'prop-types';
import AddGiftCardFormView from '../../../../../common/organisms/AddGiftCardForm/AddGiftCardForm.native';

const AddGiftCardComponent = props => {
  const { onAddGiftCardClick, addGiftCardResponse, labels, toggleModal } = props;
  return (
    <AddGiftCardFormView
      onAddGiftCardClick={onAddGiftCardClick}
      labels={labels && labels.paymentGC}
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
