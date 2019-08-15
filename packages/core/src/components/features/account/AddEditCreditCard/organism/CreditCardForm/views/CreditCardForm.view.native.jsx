import React from 'react';
import { View, Text } from 'react-native';
import PropTypes from 'prop-types';
import withStyles from '@tcp/core/src/components/common/hoc/withStyles';
import { reduxForm } from 'redux-form';
import createValidateMethod from '../../../../../../../utils/formValidation/createValidateMethod';
import getStandardConfig from '../../../../../../../utils/formValidation/validatorStandardConfig';
import Button from '../../../../../../common/atoms/Button';
import constants from '../../../container/AddEditCreditCard.constants';
import { CreditCardFields } from '../../../molecule/CreditCardFields/views/CreditCardFields.view.native';
import AddressFields from '../../../../common/molecule/AddressFields';
import styles from '../styles/CreditCardForm.style';

class CreditCardForm extends React.PureComponent {
  static propTypes = {
    className: PropTypes.string,
    labels: PropTypes.shape({}).isRequired,
    addressLabels: PropTypes.shape({}).isRequired,
    addressList: PropTypes.shape({}).isRequired,
    onFileAddressKey: PropTypes.string,
    isEdit: PropTypes.bool,
    backToPaymentClick: PropTypes.func.isRequired,
    pristine: PropTypes.bool.isRequired,
    invalid: PropTypes.bool.isRequired,
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
    const { addressList, labels } = this.props;
    let addressOptions = addressList.map(address => ({
      value: address.addressId,
      title: `${address.firstName} ${address.lastName} ${
        address.primary === 'true' ? '(Default)' : ''
      }`,
      content: (
        <View
          address={address}
          showCountry={false}
          showPhone={false}
          isDefault={address.primary === 'true'}
        />
      ),
    }));

    addressOptions = addressOptions.push({
      value: '',
      title: labels.paymentGC.lbl_payment_addNewAddCta,
      content: (
        <Button fullWidth buttonVariation="variable-width" fill="BLUE">
          {labels.paymentGC.lbl_payment_addNewAddCta}
        </Button>
      ),
    });

    return addressOptions;
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
      invalid,
      handleSubmit,
      dispatch,
      initialValues,
    } = this.props;
    return (
      <View>
        <CreditCardFields {...this.props} />
      </View>
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
})(withStyles(CreditCardForm, styles));
