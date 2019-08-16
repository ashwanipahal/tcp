import React from 'react';
import { View, SafeAreaView } from 'react-native';
import PropTypes from 'prop-types';
import { reduxForm } from 'redux-form';
import BodyCopy from '@tcp/core/src/components/common/atoms/BodyCopy';
import Address from '@tcp/core/src/components/common/molecules/Address';
import Button from '@tcp/core/src/components/common/atoms/Button';
import AddressFields from '@tcp/core/src/components/features/account/common/molecule/AddressFields';
import { Heading } from '@tcp/core/src/components/common/atoms';
import AddEditAddressContainer from '@tcp/core/src/components/features/account/AddEditAddress/container/AddEditAddress.container';
import ModalNative from '@tcp/core/src/components/common/molecules/Modal';
import createValidateMethod from '../../../../../../../utils/formValidation/createValidateMethod';
import getStandardConfig from '../../../../../../../utils/formValidation/validatorStandardConfig';
import constants from '../../../container/AddEditCreditCard.constants';
import { CreditCardFields } from '../../../molecule/CreditCardFields/views/CreditCardFields.view.native';
import {
  CreditCardWrapper,
  AddressWrapper,
  ActionsWrapper,
  AddAddressButton,
  CancelButton,
  CreditCardContainer,
  ModalViewWrapper,
} from '../styles/CreditCardForm.native.style';

class CreditCardForm extends React.PureComponent<Props, State> {
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

  constructor(props) {
    super(props);
    this.state = {
      addAddressMount: false,
    };
  }

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
    return (addressList && addressList.find(add => add.addressId === onFileAddresskey)) || {};
  };

  toggleModal = () => {
    const { addAddressMount } = this.state;
    this.setState({
      addAddressMount: !addAddressMount,
    });
  };

  render() {
    const {
      className,
      labels,
      addressLabels,
      addressList,
      onFileAddressKey,
      isEdit,
      pristine,
      invalid,
      handleSubmit,
      dispatch,
      initialValues,
      onClose,
    } = this.props;
    const { addAddressMount } = this.state;
    return (
      <CreditCardContainer>
        <CreditCardWrapper>
          <CreditCardFields {...this.props} />
        </CreditCardWrapper>
        <AddressWrapper>
          <Heading
            fontFamily="secondary"
            fontSize="fs14"
            letterSpacing="ls167"
            textAlign="left"
            fontWeight="black"
            text={labels.paymentGC.lbl_payment_billingAddress}
          />
          <BodyCopy
            fontFamily="secondary"
            fontSize="fs13"
            textAlign="left"
            fontWeight="black"
            text="Select from Address Book"
          />

          <Address
            address={this.getSelectedAddress(addressList, onFileAddressKey)}
            showCountry={false}
            showPhone={false}
            className="CreditCardForm__address"
            dataLocatorPrefix="payment"
          />
        </AddressWrapper>
        <ActionsWrapper>
          <Button
            fill="BLUE"
            type="submit"
            disabled={invalid}
            onPress={this.toggleModal}
            buttonVariation="variable-width"
            text={isEdit ? labels.common.lbl_common_updateCTA : labels.common.lbl_common_addCTA}
            style={AddAddressButton}
          />
          <Button
            fill="WHITE"
            onPress={onClose}
            buttonVariation="variable-width"
            text={labels.common.lbl_common_cancelCTA}
            style={CancelButton}
          />
        </ActionsWrapper>
        {addAddressMount && (
          <ModalNative onRequestClose={this.toggleModal}>
            <SafeAreaView>
              <ModalViewWrapper>
                <AddEditAddressContainer labels={addressLabels} onCancel={this.toggleModal} />
              </ModalViewWrapper>
            </SafeAreaView>
          </ModalNative>
        )}
      </CreditCardContainer>
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
})(CreditCardForm);
