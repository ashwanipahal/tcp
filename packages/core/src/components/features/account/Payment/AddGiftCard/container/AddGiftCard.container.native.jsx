import React from 'react';
import { connect } from 'react-redux';
import { PropTypes } from 'prop-types';
import AddGiftCardForm from '../views/AddGiftCardForm.native';
import { addGiftCardRequest } from './AddGiftCard.actions';
import { getAddGiftCardResponse, getAddGiftCardError } from './AddGiftCard.selector';

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

export const mapDispatchToProps = dispatch => {
  return {
    onAddGiftCardClick: payload => {
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

AddGiftCardContainer.propTypes = {
  onAddGiftCardClick: PropTypes.func,
  getAddGiftCardErr: PropTypes.string,
  labels: PropTypes.shape({}),
  addGiftCardResponse: PropTypes.string,
  toggleModal: PropTypes.func,
};

AddGiftCardContainer.defaultProps = {
  onAddGiftCardClick: () => {},
  getAddGiftCardErr: null,
  labels: PropTypes.shape({}),
  addGiftCardResponse: null,
  toggleModal: () => {},
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AddGiftCardContainer);
export { AddGiftCardContainer as AddGiftCardContainerVanilla };
