import React from 'react';
import PropTypes from 'prop-types';
import AddGiftCardFormView from '../../../../../common/organisms/AddGiftCardForm/AddGiftCardForm.native';

const AddGiftCardComponent = props => {
  const { onAddGiftCardClick, addGiftCardResponse, labels, toggleModal, showNotification } = props;
  return (
    <AddGiftCardFormView
      onAddGiftCardClick={onAddGiftCardClick}
      labels={labels && labels.paymentGC}
      toggleModal={toggleModal}
      addGiftCardResponse={addGiftCardResponse}
      showNotification={showNotification}
    />
  );
};

AddGiftCardComponent.propTypes = {
  onAddGiftCardClick: PropTypes.func,
  addGiftCardResponse: PropTypes.string,
  labels: PropTypes.shape({}),
  toggleModal: PropTypes.func,
  showNotification: PropTypes.bool,
};

AddGiftCardComponent.defaultProps = {
  onAddGiftCardClick: () => {},
  addGiftCardResponse: null,
  labels: {},
  toggleModal: () => {},
  showNotification: false,
};

export default AddGiftCardComponent;
