import React from 'react';
import PropTypes from 'prop-types';
import { reduxForm, submit } from 'redux-form';
import BodyCopy from '../../../../../../common/atoms/BodyCopy';
import Button from '../../../../../../common/atoms/Button';
import constants from '../container/CreditCard.constants';
import AddressFields from '../../../../../../common/molecules/AddressFields';
import createValidateMethod from '../../../../../../../utils/formValidation/createValidateMethod';
import getStandardConfig from '../../../../../../../utils/formValidation/validatorStandardConfig';
import ErrorMessage from '../../../../common/molecules/ErrorMessage';

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
          onCardFocus: onEditCardFocus,
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
            onClick={unsetFormEditState}
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

export const handleEditFromSubmit = updateCardDetail => data => {
  const formData = data;
  formData.onFileAddressKey = formData.address.addressId || '';
  return new Promise((resolve, reject) => updateCardDetail({ formData, resolve, reject }));
};

const CardEditReduxForm = React.memo(props => {
  const {
    selectedCard,
    addressForm: AddressForm,
    updateCardDetail,
    renderCardDetailsHeading,
    getAddNewCCForm,
    unsetFormEditState,
    onEditCardFocus,
    labels,
    dispatch,
    editModeSubmissionError,
    errorMessageRef,
  } = props;
  const { accountNo, expMonth, expYear, addressDetails: address, creditCardId } = selectedCard;

  const validateMethod = createValidateMethod({
    address: AddressFields.addressValidationConfig,
    ...getStandardConfig(['expYear', 'expMonth']),
  });

  const CartEditForm = reduxForm({
    form: constants.EDIT_FORM_NAME, // a unique identifier for this form
    enableReinitialize: true,
    keepDirtyOnReinitialize: true,
    destroyOnUnmount: false,
    ...validateMethod,
    onSubmitSuccess: () => {
      unsetFormEditState();
    },
  })(CardEditFormView);

  return (
    <CartEditForm
      onSubmit={handleEditFromSubmit(updateCardDetail)}
      initialValues={{
        cardNumber: accountNo,
        expMonth: expMonth.trim(),
        expYear,
        address,
        creditCardId,
      }}
      dispatch={dispatch}
      onEditCardFocus={onEditCardFocus}
      AddressForm={AddressForm}
      renderCardDetailsHeading={renderCardDetailsHeading}
      getAddNewCCForm={getAddNewCCForm}
      unsetFormEditState={unsetFormEditState}
      labels={labels}
      editModeSubmissionError={editModeSubmissionError}
      errorMessageRef={errorMessageRef}
    />
  );
});

CardEditReduxForm.propTypes = {
  labels: PropTypes.shape({
    saveButtonText: PropTypes.string,
    cancelButtonText: PropTypes.string,
  }).isRequired,
  renderCardDetailsHeading: PropTypes.func.isRequired,
  getAddNewCCForm: PropTypes.func.isRequired,
  unsetFormEditState: PropTypes.func.isRequired,
  addressForm: PropTypes.shape({}).isRequired,
  onEditCardFocus: PropTypes.func.isRequired,
  updateCardDetail: PropTypes.func.isRequired,
  editModeSubmissionError: PropTypes.string.isRequired,
  errorMessageRef: PropTypes.shape({}).isRequired,
  dispatch: PropTypes.func.isRequired,
  selectedCard: PropTypes.shape({
    accountNo: PropTypes.string,
    expMonth: PropTypes.string,
    expYear: PropTypes.string,
    addressDetails: PropTypes.shape({}),
  }).isRequired,
};

export default CardEditReduxForm;

export { CardEditFormView as CardEditFormViewVanilla };
