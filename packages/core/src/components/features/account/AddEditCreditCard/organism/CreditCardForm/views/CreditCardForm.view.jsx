import React from 'react';
import PropTypes from 'prop-types';
import withStyles from '@tcp/core/src/components/common/hoc/withStyles';
import { reduxForm, Field, FormSection } from 'redux-form';
import createValidateMethod from '../../../../../../../utils/formValidation/createValidateMethod';
import getStandardConfig from '../../../../../../../utils/formValidation/validatorStandardConfig';
import Row from '../../../../../../common/atoms/Row';
import Col from '../../../../../../common/atoms/Col';
import Button from '../../../../../../common/atoms/Button';
import constants from '../../../container/AddEditCreditCard.constants';
import CreditCardFields from '../../../molecule/CreditCardFields';
import { Heading } from '../../../../../../common/atoms';
import Select from '../../../../../../common/atoms/Select';
import AddressFields from '../../../../common/molecule/AddressFields';
import Address from '../../../../../../common/molecules/Address';
import styles from '../styles/CreditCardForm.style';

export class CreditCardForm extends React.PureComponent {
  static propTypes = {
    className: PropTypes.string,
    labels: PropTypes.shape({}).isRequired,
    addressLabels: PropTypes.shape({}).isRequired,
    addressList: PropTypes.shape({}).isRequired,
    onFileAddressKey: PropTypes.string,
    isEdit: PropTypes.bool,
    backToPaymentClick: PropTypes.func.isRequired,
    pristine: PropTypes.bool.isRequired,
    handleSubmit: PropTypes.func.isRequired,
    dispatch: PropTypes.func.isRequired,
    initialValues: PropTypes.shape({}).isRequired,
  };

  static defaultProps = {
    className: '',
    onFileAddressKey: '',
    isEdit: false,
  };

  getAddressOptions = () => {
    const { addressList } = this.props;
    const addressOptions = addressList.map(address => ({
      id: address.addressId,
      displayName: `${address.firstName} ${address.lastName} ${
        address.primary === 'true' ? '(Default)' : ''
      }`,
    }));

    return addressOptions.push({
      id: '',
      displayName: '+ Add New Address',
    });
  };

  getSelectedAddress = (addressList, onFileAddresskey) => {
    return addressList.find(add => add.addressId === onFileAddresskey);
  };

  render() {
    const {
      className,
      labels,
      addressLabels,
      addressList,
      onFileAddressKey,
      isEdit,
      backToPaymentClick,
      pristine,
      handleSubmit,
      dispatch,
      initialValues,
    } = this.props;
    const showAddressForm = pristine ? !initialValues.onFileAddressKey : !onFileAddressKey;
    return (
      <form name={constants.FORM_NAME} noValidate onSubmit={handleSubmit} className={className}>
        <CreditCardFields {...this.props} />
        {addressList && addressList.size > 0 && (
          <Row fullBleed>
            <Col
              colSize={{
                large: 6,
                small: 6,
                medium: 4,
              }}
            >
              <Heading
                component="h3"
                variant="listMenu"
                className="addressDropdownHeading"
                dataLocator="payment-bilingaddresslabel"
              >
                {labels.ACC_LBL_CC_HEADING}
              </Heading>
              <Field
                placeholder={labels.ACC_LBL_CC_ADDRESS_SELECT}
                name="onFileAddressKey"
                id="onFileAddressKey"
                component={Select}
                dataLocator="payment-billingaddressdd"
                options={this.getAddressOptions()}
              />
            </Col>
            <Col
              colSize={{
                large: 6,
                medium: 4,
                small: 6,
              }}
            >
              {onFileAddressKey && (
                <Address
                  address={this.getSelectedAddress(addressList, onFileAddressKey)}
                  showCountry={false}
                  showPhone={false}
                  className="CreditCardForm__address"
                  dataLocatorPrefix="payment"
                />
              )}
            </Col>
          </Row>
        )}

        {showAddressForm && (
          <FormSection name="address">
            <AddressFields
              labels={addressLabels}
              showDefaultCheckbox={false}
              showPhoneNumber={false}
              formName={constants.FORM_NAME}
              formSection="address"
              dispatch={dispatch}
            />
          </FormSection>
        )}
        <Row fullBleed className="CreditCardForm__ctaContainer">
          <Col
            className="CreditCardForm__cancel"
            colSize={{ small: 4, medium: 3, large: 3 }}
            offsetLeft={{ small: 1, medium: 1, large: 6 }}
          >
            <Button
              onClick={backToPaymentClick}
              buttonVariation="fixed-width"
              type="button"
              data-locator="payment-cancelbtn"
            >
              {labels.ACC_LBL_CANCEL_CTA}
            </Button>
          </Col>
          <Col
            className="CreditCardForm__submit"
            colSize={{ small: 4, medium: 3, large: 3 }}
            offsetLeft={{ small: 1 }}
          >
            <Button
              fill="BLUE"
              disabled={!isEdit && pristine}
              type="submit"
              buttonVariation="fixed-width"
              data-locator="payment-addcardbtn"
            >
              {isEdit ? labels.ACC_LBL_UPDATE_CTA : labels.ACC_LBL_ADD_CTA}
            </Button>
          </Col>
        </Row>
      </form>
    );
  }
}

const validateMethod = createValidateMethod({
  ...getStandardConfig(['cardNumber', 'expMonth', 'expYear']),
  address: AddressFields.addressValidationConfig,
});

export default reduxForm({
  form: constants.FORM_NAME, // a unique identifier for this form
  enableReinitialize: true,
  ...validateMethod,
})(withStyles(CreditCardForm, styles));
