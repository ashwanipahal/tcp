import React from 'react';
import PropTypes from 'prop-types';
import { reduxForm } from 'redux-form';
import BodyCopy from '../../../../../../common/atoms/BodyCopy';
import Button from '../../../../../../common/atoms/Button';
import constants from '../container/CreditCard.constants';

class CardEditFormView extends React.PureComponent {
  render() {
    const {
      handleSubmit,
      renderCardDetailsHeading,
      getAddNewCCForm,
      unsetFormEditState,
      labels: { saveButtonText, cancelButtonText },
      AddressForm,
      onEditCardFocus,
    } = this.props;
    return (
      <form name={constants.EDIT_FORM_NAME} noValidate onSubmit={handleSubmit}>
        {renderCardDetailsHeading({ hideAnchor: true })}
        {getAddNewCCForm({
          onCardFocus: onEditCardFocus,
          editMode: true,
        })}
        <AddressForm editMode key="cardEditAddressForm" />
        <div className="card-edit-buttons">
          <Button
            // aria-label={ariaLabelBackLink}
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
            // aria-label={ariaLabelNextButton}
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
  }).isRequired,
  renderCardDetailsHeading: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  getAddNewCCForm: PropTypes.func.isRequired,
  unsetFormEditState: PropTypes.func.isRequired,
  AddressForm: PropTypes.shape({}).isRequired,
  onEditCardFocus: PropTypes.func.isRequired,
};

const CardEditReduxForm = props => {
  const {
    selectedCard,
    addressForm: AddressForm,
    handleEditFromSubmit,
    renderCardDetailsHeading,
    getAddNewCCForm,
    unsetFormEditState,
    onEditCardFocus,
    labels,
  } = props;
  const { accountNo, ccBrand, ccType, expMonth, expYear, addressDetails: address } = selectedCard;
  const CartEditForm = reduxForm({
    form: constants.EDIT_FORM_NAME, // a unique identifier for this form
    enableReinitialize: true,
  })(CardEditFormView);

  return (
    <CartEditForm
      onSubmit={handleEditFromSubmit}
      initialValues={{
        cardNumber: accountNo,
        expMonth: expMonth.trim(),
        expYear,
        ccBrand,
        ccType,
        address,
      }}
      onEditCardFocus={onEditCardFocus}
      AddressForm={AddressForm}
      renderCardDetailsHeading={renderCardDetailsHeading}
      getAddNewCCForm={getAddNewCCForm}
      unsetFormEditState={unsetFormEditState}
      labels={labels}
    />
  );
};

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
  handleEditFromSubmit: PropTypes.func.isRequired,
  selectedCard: PropTypes.shape({
    accountNo: PropTypes.string,
    ccBrand: PropTypes.string,
    ccType: PropTypes.string,
    expMonth: PropTypes.string,
    expYear: PropTypes.string,
    addressDetails: PropTypes.shape({}),
  }).isRequired,
};

export default CardEditReduxForm;
