import React from 'react';
import { SafeAreaView } from 'react-native';
import PropTypes from 'prop-types';
import { reduxForm, Field, FormSection } from 'redux-form';
import BodyCopy from '@tcp/core/src/components/common/atoms/BodyCopy';
import Address from '@tcp/core/src/components/common/molecules/Address';
import Button from '@tcp/core/src/components/common/atoms/Button';
import AddressFields from '@tcp/core/src/components/features/account/common/molecule/AddressFields';
import { Heading } from '@tcp/core/src/components/common/atoms';
import AddEditAddressContainer from '@tcp/core/src/components/features/account/AddEditAddress/container/AddEditAddress.container';
import ModalNative from '@tcp/core/src/components/common/molecules/Modal';
import AddressDropdown from '@tcp/core/src/components/features/account/AddEditCreditCard/molecule/AddressDropdown/views/AddressDropdown.view.native';
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
  DefaultAddress,
  LeftBracket,
  RightBracket,
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
    const { onFileAddresskey } = props;
    this.state = {
      addAddressMount: false,
      selectedAddress: onFileAddresskey,
    };
  }

  getAddressOptions = () => {
    const { addressList, labels } = this.props;
    let addressOptions = addressList.map(address => ({
      id: address.addressId,
      label: `${address.firstName} ${address.lastName} ${
        address.primary === 'true' ? '(Default)' : ''
      }`,
      content: address,
    }));

    addressOptions = addressOptions.push({
      id: '',
      label: labels.paymentGC.lbl_payment_addNewAddCta,
      content: '',
    });

    return addressOptions.valueSeq().toArray();
  };

  getSelectedAddress = (addressList, onFileAddresskey) =>
    onFileAddresskey
      ? addressList && addressList.find(add => add.addressId === onFileAddresskey)
      : addressList && addressList.find(add => add.primary);

  handleComponentChange = item => {
    this.setState({ selectedAddress: item });
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
    const { addAddressMount, selectedAddress } = this.state;
    const dropDownStyle = {
      height: 30,
      borderBottomWidth: 1,
      marginTop: 15,
    };
    const itemStyle = {
      height: 100,
    };
    const addressComponentList = this.getAddressOptions();
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

          {addressComponentList && (
            <Field
              selectListTitle={labels.paymentGC.lbl_payment_ccAdressSelect}
              name="onFileAddressKey"
              id="onFileAddressKey"
              component={AddressDropdown}
              dataLocator="payment-billingaddressdd"
              data={addressComponentList}
              variation="secondary"
              dropDownStyle={{ ...dropDownStyle }}
              itemStyle={{ ...itemStyle }}
              addAddress={this.toggleModal}
              onValueChange={itemValue => {
                this.handleComponentChange(itemValue);
              }}
            />
          )}
          <DefaultAddress>
            <LeftBracket />
            <Address
              address={this.getSelectedAddress(addressList, selectedAddress)}
              showCountry={false}
              showPhone={false}
              showName
              className="CreditCardForm__address"
              dataLocatorPrefix="payment"
            />
            <RightBracket />
          </DefaultAddress>
        </AddressWrapper>
        <ActionsWrapper>
          <Button
            fill="BLUE"
            disabled={invalid}
            buttonVariation="variable-width"
            text={isEdit ? labels.common.lbl_common_updateCTA : labels.common.lbl_common_addCTA}
            style={AddAddressButton}
            onPress={handleSubmit}
            type="submit"
            external
          />
          <Button
            fill="WHITE"
            onPress={onClose}
            buttonVariation="variable-width"
            text={labels.common.lbl_common_cancelCTA}
            style={CancelButton}
          />
        </ActionsWrapper>
      </CreditCardContainer>
    );
  }
}

const validateMethod = createValidateMethod({
  ...getStandardConfig(['cardNumber', 'expMonth', 'expYear']),
});

export default reduxForm({
  form: constants.FORM_NAME, // a unique identifier for this form
  enableReinitialize: true,
  ...validateMethod,
})(CreditCardForm);
