import React from 'react';
import { SafeAreaView, ScrollView } from 'react-native';
import PropTypes from 'prop-types';
import { reduxForm, Field, change } from 'redux-form';
import BodyCopy from '@tcp/core/src/components/common/atoms/BodyCopy';
import Address from '@tcp/core/src/components/common/molecules/Address';
import Button from '@tcp/core/src/components/common/atoms/Button';
import { Heading } from '@tcp/core/src/components/common/atoms';
import AddEditAddressContainer from '@tcp/core/src/components/common/organisms/AddEditAddress/container/AddEditAddress.container';
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
  CustomAddress,
  TextWrapper,
  dropDownStyle,
  itemStyle,
} from '../styles/CreditCardForm.native.style';

export class CreditCardForm extends React.PureComponent<Props, State> {
  static propTypes = {
    className: PropTypes.string,
    labels: PropTypes.shape({}),
    addressLabels: PropTypes.shape({}).isRequired,
    addressList: PropTypes.shape({}).isRequired,
    onFileAddressKey: PropTypes.string,
    isEdit: PropTypes.bool,
    handleSubmit: PropTypes.func.isRequired,
    dispatch: PropTypes.func.isRequired,
    initialValues: PropTypes.shape({}).isRequired,
    dto: PropTypes.shape({}),
    selectedCard: PropTypes.shape({}),
  };

  static defaultProps = {
    className: '',
    onFileAddressKey: '',
    isEdit: false,
    dto: {},
    selectedCard: null,
    labels: {
      paymentGC: {
        lbl_payment_billingAddress: '',
        lbl_payment_ccAdressSelect: '',
        lbl_payment_addCard: '',
      },
      common: { lbl_common_updateCTA: '' },
    },
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
    let addressOptions =
      (addressList &&
        addressList.map(address => ({
          id: address.addressId,
          label: `${address.firstName} ${address.lastName} ${
            address.primary === 'true' ? '(Default)' : ''
          }`,
          content: address,
          primary: address.primary === 'true',
        }))) ||
      [];

    addressOptions = addressOptions.push({
      id: '',
      label: labels.paymentGC.lbl_payment_addNewAddCta,
      content: '',
      primary: false,
    });

    return addressOptions.valueSeq().toArray();
  };

  getSelectedAddress = (addressList, onFileAddresskey) => {
    const { dispatch } = this.props;
    const defaultAddress = onFileAddresskey
      ? addressList && addressList.find(add => add.addressId === onFileAddresskey)
      : addressList && addressList.find(add => add.primary);
    dispatch(
      change(
        'addEditCreditCard',
        'onFileAddressKey',
        (defaultAddress && defaultAddress.addressId) || ''
      )
    );
    return defaultAddress;
  };

  handleComponentChange = item => {
    const { dispatch } = this.props;
    this.setState({ selectedAddress: item });
    dispatch(change('addEditCreditCard', 'onFileAddressKey', item));
  };

  updateExpiryDate = (month, year) => {
    const { dispatch } = this.props;

    // Setting form value to take dropdown values.
    dispatch(change('addEditCreditCard', 'expYear', year));
    dispatch(change('addEditCreditCard', 'expMonth', month));
  };

  toggleModal = () => {
    const { addAddressMount } = this.state;
    this.setState({
      addAddressMount: !addAddressMount,
    });
  };

  render() {
    const {
      labels,
      addressLabels,
      addressList,
      isEdit,
      onClose,
      dto,
      selectedCard,
      onFileAddresskey,
      dispatch,
      handleSubmit,
    } = this.props;
    const { addAddressMount, selectedAddress } = this.state;
    const addressComponentList = this.getAddressOptions();
    const defaultAddress = this.getSelectedAddress(addressList, selectedAddress);
    if (isEdit && selectedCard) {
      const { expMonth, expYear } = selectedCard;
      // Setting form value to take dropdown values.
      this.updateExpiryDate(expMonth, expYear);
      dispatch(change(constants.FORM_NAME, 'creditCardId', selectedCard.creditCardId));
    }
    return (
      <ScrollView showsVerticalScrollIndicator={false} {...this.props}>
        <CreditCardContainer>
          <CreditCardWrapper>
            <CreditCardFields
              {...this.props}
              updateExpiryDate={this.updateExpiryDate}
              dto={dto}
              selectedCard={selectedCard}
            />
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
            <TextWrapper>
              <BodyCopy
                fontFamily="secondary"
                fontSize="fs12"
                textAlign="left"
                fontWeight="semibold"
                marginTop="10"
                text={labels.paymentGC.lbl_payment_ccAdressSelect}
              />
            </TextWrapper>

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
                labels={labels}
                selectedValue={onFileAddresskey}
              />
            )}
            {addressComponentList && addressComponentList.length > 1 && (
              <DefaultAddress>
                <LeftBracket />
                <Address
                  address={defaultAddress}
                  showCountry={false}
                  showPhone={false}
                  showName
                  dataLocatorPrefix="address"
                  customStyle={CustomAddress}
                />
                <RightBracket />
              </DefaultAddress>
            )}
          </AddressWrapper>
          <ActionsWrapper>
            <Button
              fill="BLUE"
              buttonVariation="variable-width"
              text={
                isEdit ? labels.common.lbl_common_updateCTA : labels.paymentGC.lbl_payment_addCard
              }
              style={AddAddressButton}
              onPress={handleSubmit}
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
            <ModalNative
              isOpen={addAddressMount}
              onRequestClose={this.toggleModal}
              heading={labels.addressBook.ACC_LBL_ADD_NEW_ADDRESS_CTA}
            >
              <SafeAreaView>
                <ModalViewWrapper>
                  <AddEditAddressContainer
                    onCancel={this.toggleModal}
                    addressBookLabels={addressLabels}
                    showHeading={false}
                    currentForm="AddAddress"
                    toggleAddressModal={this.toggleModal}
                  />
                </ModalViewWrapper>
              </SafeAreaView>
            </ModalNative>
          )}
        </CreditCardContainer>
      </ScrollView>
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
