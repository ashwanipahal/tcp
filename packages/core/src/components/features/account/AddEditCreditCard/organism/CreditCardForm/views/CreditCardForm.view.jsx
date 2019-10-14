import React from 'react';
import PropTypes from 'prop-types';
import withStyles from '@tcp/core/src/components/common/hoc/withStyles';
import { reduxForm, Field, FormSection } from 'redux-form';
import createValidateMethod from '../../../../../../../utils/formValidation/createValidateMethod';
import getStandardConfig from '../../../../../../../utils/formValidation/validatorStandardConfig';
import Row from '../../../../../../common/atoms/Row';
import Col from '../../../../../../common/atoms/Col';
import Button from '../../../../../../common/atoms/Button';
import CreditCardFields from '../../../../../../common/molecules/CreditCardFields';
import constants from '../../../container/AddEditCreditCard.constants';
import { Heading } from '../../../../../../common/atoms';
import AddressDropdown from '../../../molecule/AddressDropdown';
import AddressFields from '../../../../../../common/molecules/AddressFields';
import Address from '../../../../../../common/molecules/Address';
import styles from '../styles/CreditCardForm.style';
import { getLabelValue } from '../../../../../../../utils';

const creditCardProps = {
  cardNumbProps: {
    colSize: {
      small: 6,
      medium: 8,
      large: 6,
    },
  },
  expMonthProps: {
    colSize: {
      small: 6,
      medium: 2,
      large: 3,
    },
  },
  expYearProps: {
    colSize: {
      small: 6,
      medium: 2,
      large: 3,
    },
  },
  cardNumberInnerProps: {
    colSize: {
      small: 6,
      medium: 4,
      large: 12,
    },
  },
};

export class CreditCardForm extends React.PureComponent {
  static propTypes = {
    className: PropTypes.string,
    labels: PropTypes.shape({}).isRequired,
    addressLabels: PropTypes.shape({}).isRequired,
    addressList: PropTypes.shape({}).isRequired,
    onFileAddressKey: PropTypes.string,
    isEdit: PropTypes.bool,
    mailingAddress: PropTypes.bool,
    backToPaymentClick: PropTypes.func.isRequired,
    pristine: PropTypes.bool.isRequired,
    invalid: PropTypes.bool.isRequired,
    handleSubmit: PropTypes.func.isRequired,
    dispatch: PropTypes.func.isRequired,
    initialValues: PropTypes.shape({}).isRequired,
    addressFormLabels: PropTypes.shape({}).isRequired,
    showCreditCardFields: PropTypes.bool,
    showUserName: PropTypes.bool,
    subHeading: PropTypes.string,
  };

  static defaultProps = {
    className: '',
    onFileAddressKey: '',
    isEdit: false,
    mailingAddress: false,
    showCreditCardFields: true,
    showUserName: true,
    subHeading: null,
  };

  getAddressOptions = () => {
    const { addressList, labels } = this.props;
    let addressOptions = addressList.map(address => ({
      value: address.addressId,
      title: `${address.firstName} ${address.lastName} ${
        address.primary === 'true' ? '(Default)' : ''
      }`,
      content: (
        <Address
          address={address}
          showCountry={false}
          showPhone={false}
          isDefault={address.primary === 'true'}
        />
      ),
    }));

    addressOptions = addressOptions.push({
      value: '',
      title: getLabelValue(labels, 'lbl_payment_addNewAddCta', 'paymentGC'),
      content: (
        <Button fullWidth buttonVariation="variable-width" fill="BLUE">
          {getLabelValue(labels, 'lbl_payment_addNewAddCta', 'paymentGC')}
        </Button>
      ),
    });

    return addressOptions;
  };

  getSelectedAddress = (addressList, onFileAddresskey) => {
    return addressList.find(add => add.addressId === onFileAddresskey);
  };

  getCreditFieldLabels = () => {
    const { labels } = this.props;
    return {
      creditCardNumber: getLabelValue(labels, 'lbl_payment_cardNumber', 'paymentGC'),
      expMonth: getLabelValue(labels, 'lbl_payment_expMonth', 'paymentGC'),
      expYear: getLabelValue(labels, 'lbl_payment_expYear', 'paymentGC'),
    };
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
      invalid,
      handleSubmit,
      dispatch,
      initialValues,
      addressFormLabels,
      mailingAddress,
      showUserName,
      showCreditCardFields,
      subHeading,
    } = this.props;
    const showAddressForm = pristine ? !initialValues.onFileAddressKey : !onFileAddressKey;

    const getSubHeading = pagesubHeading => {
      let subheading = getLabelValue(labels, 'lbl_payment_billingAddress', 'paymentGC');
      if (pagesubHeading) {
        subheading = pagesubHeading;
      }
      return subheading;
    };
    return (
      <form name={constants.FORM_NAME} noValidate onSubmit={handleSubmit} className={className}>
        {showCreditCardFields && (
          <CreditCardFields
            {...this.props}
            {...creditCardProps}
            creditFieldLabels={this.getCreditFieldLabels()}
            cardNumberWrapper
            showCvv={false}
          />
        )}
        <Heading
          component="h3"
          variant="listMenu"
          className="addressDropdownHeading"
          dataLocator="payment-bilingaddresslabel"
        >
          {getSubHeading(subHeading)}
        </Heading>
        {addressList && addressList.size > 0 && (
          <Row fullBleed className="elem-mb-XL">
            <Col
              colSize={{
                large: 6,
                small: 6,
                medium: 4,
              }}
              className="creditCardForm__addressBook"
            >
              <Field
                selectListTitle={getLabelValue(labels, 'lbl_payment_ccAdressSelect', 'paymentGC')}
                name="onFileAddressKey"
                id="onFileAddressKey"
                component={AddressDropdown}
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
              className="addressContainer"
            >
              {onFileAddressKey && (
                <Address
                  address={this.getSelectedAddress(addressList, onFileAddressKey)}
                  showCountry={false}
                  showPhone={false}
                  className="CreditCardForm__address"
                  dataLocatorPrefix="payment"
                  singleLineAddress
                />
              )}
            </Col>
          </Row>
        )}

        {showAddressForm && (
          <div className="elem-mb-XL">
            <FormSection name="address">
              <AddressFields
                labels={addressLabels}
                showDefaultCheckbox={false}
                showPhoneNumber={false}
                formName={constants.FORM_NAME}
                formSection="address"
                dispatch={dispatch}
                addressFormLabels={addressFormLabels}
                showUserName={showUserName}
              />
            </FormSection>
          </div>
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
              {getLabelValue(labels, 'lbl_common_cancelCTA', 'common')}
            </Button>
          </Col>
          <Col
            className="CreditCardForm__submit"
            colSize={{ small: 4, medium: 3, large: 3 }}
            offsetLeft={{ small: 1 }}
          >
            <Button
              fill="BLUE"
              disabled={invalid}
              type="submit"
              buttonVariation="fixed-width"
              data-locator="payment-addcardbtn"
            >
              {!mailingAddress &&
                (isEdit
                  ? getLabelValue(labels, 'lbl_common_updateCTA', 'common')
                  : getLabelValue(labels, 'lbl_common_addCTA', 'common'))}
              {mailingAddress && getLabelValue(labels, 'lbl_common_saveCTA', 'common')}
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
