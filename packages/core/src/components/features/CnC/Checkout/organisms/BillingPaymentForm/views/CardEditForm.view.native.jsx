import React from 'react';
import PropTypes from 'prop-types';
import { reduxForm } from 'redux-form';
import { View } from 'react-native';
import Button from '../../../../../../common/atoms/Button';
import constants from '../container/CreditCard.constants';
import AddressFields from '../../../../../../common/molecules/AddressFields';
import createValidateMethod from '../../../../../../../utils/formValidation/createValidateMethod';
import getStandardConfig from '../../../../../../../utils/formValidation/validatorStandardConfig';
import ErrorMessage from '../../../../common/molecules/ErrorMessage';
import {
  SaveButtonWrapper,
  CancelButtonWrapper,
  BillingAddressWrapper,
  CardDetailsWrapper,
  AddAddressWrapper,
} from '../styles/CardEditForm.style.native';

class CardEditFormView extends React.Component {
  handleFormSubmit = e => {
    const { handleSubmit, onSubmit } = this.props;
    e.preventDefault();
    e.stopPropagation();
    handleSubmit(data => {
      // eslint-disable-next-line no-console
      console.log(`handleSubmit${JSON.stringify(data)}`);
      onSubmit(data);
    })();
  };

  render() {
    const {
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
      // editModeSubmissionError,
      errorMessageRef,
      onUpdateAddress,
    } = this.props;
    return (
      <AddAddressWrapper>
        <View>
          {error && <ErrorMessage error={error.message} />}
          <AddAddressWrapper>
            <CardDetailsWrapper>
              {getAddNewCCForm({
                onCardFocus: onEditCardFocus,
                editMode: true,
              })}
            </CardDetailsWrapper>
            <BillingAddressWrapper>
              <AddressForm editMode onUpdateAddress={onUpdateAddress} />
            </BillingAddressWrapper>
          </AddAddressWrapper>
          {/* <View className="edit-card-error-container">
          {editModeSubmissionError && (
            <ErrorMessage error={editModeSubmissionError} className="edit-card-error" />
          )}
        </View> */}
        </View>
        <SaveButtonWrapper ref={errorMessageRef}>
          <Button
            aria-label={ariaLabelSaveButtonText}
            onPress={this.handleFormSubmit}
            fontSize="fs14"
            fontWeight="extrabold"
            buttonVariation="variable-width"
            fill="BLUE"
            text={saveButtonText}
          />
        </SaveButtonWrapper>
        <CancelButtonWrapper>
          <Button
            aria-label={ariaLabelCancelButtonText}
            type="button"
            className="card-edit-button card-edit-cancel"
            onPress={unsetFormEditState}
            text={cancelButtonText}
          />
        </CancelButtonWrapper>
      </AddAddressWrapper>
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
  getAddNewCCForm: PropTypes.func.isRequired,
  unsetFormEditState: PropTypes.func.isRequired,
  AddressForm: PropTypes.shape({}).isRequired,
  onEditCardFocus: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  error: PropTypes.shape({}).isRequired,
  // editModeSubmissionError: PropTypes.string.isRequired,
  errorMessageRef: PropTypes.shape({}).isRequired,
  onUpdateAddress: PropTypes.func.isRequired,
};

export const handleEditFromSubmit = updateCardDetail => data => {
  const formData = data;
  // eslint-disable-next-line no-console
  console.log(`handleEditFromSubmit${JSON.stringify(formData)}`);
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
    onUpdateAddress,
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
    destroyOnUnmount: true,
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
        expMonth: expMonth && expMonth.trim(),
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
      onUpdateAddress={onUpdateAddress}
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
  onUpdateAddress: PropTypes.func.isRequired,
};

export default CardEditReduxForm;

export { CardEditFormView as CardEditFormViewVanilla };
