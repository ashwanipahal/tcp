import React from 'react';
import PropTypes from 'prop-types';
import { reduxForm } from 'redux-form';
import { View, ScrollView } from 'react-native';
import Button from '../../../../../../common/atoms/Button';
import constants from '../container/CreditCard.constants';
import AddressFields from '../../../../../../common/molecules/AddressFields';
import createValidateMethod from '../../../../../../../utils/formValidation/createValidateMethod';
import getStandardConfig from '../../../../../../../utils/formValidation/validatorStandardConfig';
import {
  SaveButtonWrapper,
  CancelButtonWrapper,
  BillingAddressWrapper,
  CardDetailsWrapper,
  AddAddressWrapper,
  ErrorMessageWrapper,
} from '../styles/CardEditForm.style.native';
import ErrorMessage from '../../../../../../common/atoms/ErrorDisplay';

class CardEditFormView extends React.PureComponent {
  componentDidUpdate(prevProps) {
    const { toastMessage, error } = this.props;
    if (error !== prevProps.error) {
      toastMessage(error.message);
    }
  }

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
      editModeSubmissionError,
      errorMessageRef,
      getDefaultPayment,
      selectedCard,
      labels,
      handleSubmit,
    } = this.props;
    return (
      <View>
        <ScrollView ref={errorMessageRef}>
          <View>
            <AddAddressWrapper>
              <CardDetailsWrapper>
                {getAddNewCCForm({
                  onCardFocus: onEditCardFocus,
                  editMode: true,
                })}
              </CardDetailsWrapper>
              <BillingAddressWrapper>
                <AddressForm editMode />
              </BillingAddressWrapper>
            </AddAddressWrapper>
            {getDefaultPayment(selectedCard, labels, true)}
            {editModeSubmissionError ? (
              <ErrorMessageWrapper>
                <ErrorMessage error={editModeSubmissionError} />
              </ErrorMessageWrapper>
            ) : null}
          </View>
          <View>
            <SaveButtonWrapper>
              <Button
                aria-label={ariaLabelSaveButtonText}
                onPress={handleSubmit}
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
          </View>
        </ScrollView>
      </View>
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
  toastMessage: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  error: PropTypes.shape({}).isRequired,
  editModeSubmissionError: PropTypes.string.isRequired,
  errorMessageRef: PropTypes.shape({}).isRequired,
  getDefaultPayment: PropTypes.func.isRequired,
  selectedCard: PropTypes.shape({
    accountNo: PropTypes.string,
    expMonth: PropTypes.string,
    expYear: PropTypes.string,
    addressDetails: PropTypes.shape({}),
  }).isRequired,
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
    getDefaultPayment,
    toastMessage,
  } = props;
  const {
    accountNo,
    expMonth,
    expYear,
    addressDetails: address,
    creditCardId,
    defaultInd,
  } = selectedCard;
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
        expMonth: expMonth && expMonth.trim(),
        expYear,
        address,
        creditCardId,
        isDefault: defaultInd,
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
      getDefaultPayment={getDefaultPayment}
      selectedCard={selectedCard}
      toastMessage={toastMessage}
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
  getDefaultPayment: PropTypes.func.isRequired,
  toastMessage: PropTypes.func.isRequired,
};

export default CardEditReduxForm;

export { CardEditFormView as CardEditFormViewVanilla };
