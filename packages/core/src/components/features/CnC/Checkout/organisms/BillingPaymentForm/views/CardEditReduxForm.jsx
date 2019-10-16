import React from 'react';
import PropTypes from 'prop-types';
import { reduxForm } from 'redux-form';
import AddressFields from '../../../../../../common/molecules/AddressFields';
import createValidateMethod from '../../../../../../../utils/formValidation/createValidateMethod';
import getStandardConfig from '../../../../../../../utils/formValidation/validatorStandardConfig';
import constants from '../container/CreditCard.constants';

export const handleEditFromSubmit = updateCardDetail => data => {
  const formData = data;
  formData.onFileAddressKey = formData.address.addressId || '';
  return new Promise((resolve, reject) => updateCardDetail({ formData, resolve, reject }));
};

export const withCardEditReduxForm = Component => {
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
    })(Component);

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
  return CardEditReduxForm;
};
