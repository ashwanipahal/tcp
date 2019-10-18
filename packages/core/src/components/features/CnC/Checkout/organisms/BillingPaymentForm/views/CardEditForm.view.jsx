import React from 'react';
import PropTypes from 'prop-types';
import { submit } from 'redux-form';
import BodyCopy from '../../../../../../common/atoms/BodyCopy';
import Button from '../../../../../../common/atoms/Button';
import constants from '../container/CreditCard.constants';
import ErrorMessage from '../../../../common/molecules/ErrorMessage';
import { withCardEditReduxForm } from './CardEditReduxForm';

class CardEditFormView extends React.PureComponent {
  handleSubmit = e => {
    const { dispatch } = this.props;
    e.preventDefault();
    e.stopPropagation();
    dispatch(submit(constants.EDIT_FORM_NAME));
  };

  render() {
    const {
      renderCardDetailsHeading,
      getAddNewCCForm,
      unsetFormEditState,
      labels: {
        saveButtonText,
        cancelButtonText,
        ariaLabelSaveButtonText,
        ariaLabelCancelButtonText,
      },
      AddressForm,
      onEditCardFocus,
      error,
      editModeSubmissionError,
      errorMessageRef,
    } = this.props;
    return (
      <form name={constants.EDIT_FORM_NAME} noValidate onSubmit={this.handleSubmit}>
        {renderCardDetailsHeading({ hideAnchor: true })}
        {error && <ErrorMessage error={error.message} className="edit-card-error" />}
        {getAddNewCCForm({
          onCardFocus: () => onEditCardFocus(this),
          editMode: true,
        })}
        <AddressForm editMode key="cardEditAddressForm" />
        <div className="edit-card-error-container">
          {editModeSubmissionError && (
            <ErrorMessage error={editModeSubmissionError} className="edit-card-error" />
          )}
        </div>
        <div className="card-edit-buttons" ref={errorMessageRef}>
          <Button
            aria-label={ariaLabelSaveButtonText}
            type="submit"
            className="card-edit-button card-edit-save-mob"
            fontSize="fs14"
            fontWeight="extrabold"
            buttonVariation="variable-width"
            fill="BLUE"
          >
            {saveButtonText}
          </Button>

          <Button
            aria-label={ariaLabelCancelButtonText}
            type="button"
            className="card-edit-button card-edit-cancel"
            onClick={e => unsetFormEditState(e)}
          >
            <BodyCopy
              component="span"
              color="text.secondary"
              fontWeight="extrabold"
              fontFamily="secondary"
              fontSize="fs14"
            >
              {cancelButtonText}
            </BodyCopy>
          </Button>
          <Button
            aria-label={ariaLabelSaveButtonText}
            type="submit"
            className="card-edit-button card-edit-save"
            fontSize="fs14"
            fontWeight="extrabold"
            buttonVariation="variable-width"
            fill="BLUE"
          >
            {saveButtonText}
          </Button>
        </div>
      </form>
    );
  }
}

CardEditFormView.propTypes = {
  labels: PropTypes.shape({
    saveButtonText: PropTypes.string,
    cancelButtonText: PropTypes.string,
    ariaLabelCancelButtonText: PropTypes.string,
    ariaLabelSaveButtonText: PropTypes.string,
  }).isRequired,
  renderCardDetailsHeading: PropTypes.func.isRequired,
  getAddNewCCForm: PropTypes.func.isRequired,
  unsetFormEditState: PropTypes.func.isRequired,
  AddressForm: PropTypes.shape({}).isRequired,
  onEditCardFocus: PropTypes.func.isRequired,
  dispatch: PropTypes.func.isRequired,
  error: PropTypes.shape({}).isRequired,
  editModeSubmissionError: PropTypes.string.isRequired,
  errorMessageRef: PropTypes.shape({}).isRequired,
};

export default withCardEditReduxForm(CardEditFormView);

export { CardEditFormView as CardEditFormViewVanilla };
