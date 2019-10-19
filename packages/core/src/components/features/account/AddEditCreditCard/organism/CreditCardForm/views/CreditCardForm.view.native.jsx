import React from 'react';
import { ScrollView } from 'react-native';
import PropTypes from 'prop-types';
import { reduxForm, Field, change, FormSection } from 'redux-form';
import BodyCopy from '@tcp/core/src/components/common/atoms/BodyCopy';
import Address from '@tcp/core/src/components/common/molecules/Address';
import Button from '@tcp/core/src/components/common/atoms/Button';
import { Heading } from '@tcp/core/src/components/common/atoms';
import { ViewWithSpacing } from '@tcp/core/src/components/common/atoms/styledWrapper';
import AddressDropdown from '@tcp/core/src/components/features/account/AddEditCreditCard/molecule/AddressDropdown/views/AddressDropdown.view.native';
import { fromJS } from 'immutable';
import createValidateMethod from '../../../../../../../utils/formValidation/createValidateMethod';
import getStandardConfig from '../../../../../../../utils/formValidation/validatorStandardConfig';
import constants from '../../../container/AddEditCreditCard.constants';
import CreditCardFields from '../../../../../../common/molecules/CreditCardFields';
import AddressFields from '../../../../../../common/molecules/AddressFields';
import {
  AddressWrapper,
  ActionsWrapper,
  AddAddressButton,
  CancelButton,
  CreditCardContainer,
  DefaultAddress,
  LeftBracket,
  RightBracket,
  CustomAddress,
  TextWrapper,
  dropDownStyle,
  itemStyle,
} from '../styles/CreditCardForm.native.style';
import { getLabelValue } from '../../../../../../../utils';

export class CreditCardForm extends React.PureComponent<Props, State> {
  static propTypes = {
    className: PropTypes.string,
    labels: PropTypes.shape({}),
    addressLabels: PropTypes.shape({}).isRequired,
    addressList: PropTypes.shape({}).isRequired,
    onFileAddressKey: PropTypes.string,
    isEdit: PropTypes.bool,
    mailingAddress: PropTypes.bool,
    handleSubmit: PropTypes.func.isRequired,
    dispatch: PropTypes.func.isRequired,
    initialValues: PropTypes.shape({}).isRequired,
    dto: PropTypes.shape({}),
    selectedCard: PropTypes.shape({}),
    showCreditCardFields: PropTypes.bool,
    showUserName: PropTypes.bool,
    showEmailAddress: PropTypes.bool,
    subHeading: PropTypes.string,
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
    mailingAddress: false,
    showCreditCardFields: true,
    showUserName: true,
    subHeading: null,
    showEmailAddress: true,
  };

  constructor(props) {
    super(props);
    const { onFileAddressKey } = props;
    this.state = {
      selectedAddress: onFileAddressKey,
    };
  }

  static getDerivedStateFromProps(props, state) {
    if (!state.selectedAddress && props.pristine && props.initialValues.onFileAddressKey) {
      return {
        selectedAddress: props.initialValues.onFileAddressKey,
      };
    }
    return null;
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
      fromJS([]);

    addressOptions = addressOptions.push({
      id: '',
      label: getLabelValue(labels, 'lbl_payment_addNewAddCta', 'paymentGC'),
      content: '',
      primary: false,
    });

    return addressOptions.valueSeq().toArray();
  };

  getSelectedAddress = (addressList, onFileAddressKey) => {
    return addressList && addressList.find(add => add.addressId === onFileAddressKey);
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

  showAddressDropdown = addressComponentList => {
    return addressComponentList && addressComponentList.length > 1;
  };

  addressFormVisible = selectedAddress => {
    return !selectedAddress;
  };

  getSubHeading = (labels, pagesubHeading) => {
    return pagesubHeading || getLabelValue(labels, 'lbl_payment_billingAddress', 'paymentGC');
  };

  getSubmitCTAText = (labels, mailingAddress, isEdit) => {
    if (mailingAddress) {
      return getLabelValue(labels, 'lbl_common_saveCTA', 'common');
    }
    return isEdit
      ? getLabelValue(labels, 'lbl_common_updateCTA', 'common')
      : getLabelValue(labels, 'lbl_payment_addCard', 'paymentGC');
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
      labels,
      addressLabels,
      addressList,
      isEdit,
      onClose,
      dto,
      selectedCard,
      onFileAddressKey,
      dispatch,
      handleSubmit,
      showCreditCardFields,
      addressFormLabels,
      showUserName,
      showEmailAddress,
      initialValues,
      subHeading,
      mailingAddress,
      pristine,
      invalid,
    } = this.props;
    const { selectedAddress } = this.state;
    const addressComponentList = this.getAddressOptions();
    const addressDropdown = this.showAddressDropdown(addressComponentList);
    const isAddressFormVisible = pristine ? !initialValues.onFileAddressKey : !onFileAddressKey;

    const defaultAddress = this.getSelectedAddress(addressList, selectedAddress);
    if (isEdit && selectedCard) {
      const { expMonth, expYear } = selectedCard;

      this.updateExpiryDate(expMonth, expYear);
      dispatch(change(constants.FORM_NAME, 'creditCardId', selectedCard.creditCardId));
    }

    return (
      <ScrollView
        showsVerticalScrollIndicator={false}
        {...this.props}
        keyboardShouldPersistTaps="handled"
      >
        <CreditCardContainer>
          {showCreditCardFields && (
            <CreditCardFields
              {...this.props}
              updateExpiryDate={this.updateExpiryDate}
              dto={dto}
              selectedCard={selectedCard}
              creditFieldLabels={this.getCreditFieldLabels()}
              showCvv={false}
            />
          )}
          <AddressWrapper>
            {(addressDropdown || mailingAddress) && (
              <Heading
                mobilefontFamily="secondary"
                fontSize="fs14"
                letterSpacing="ls167"
                textAlign="left"
                fontWeight="black"
                text={this.getSubHeading(labels, subHeading)}
              />
            )}
            {addressDropdown && (
              <>
                <TextWrapper>
                  <BodyCopy
                    fontFamily="secondary"
                    fontSize="fs12"
                    textAlign="left"
                    fontWeight="black"
                    marginTop="10"
                    text={getLabelValue(labels, 'lbl_payment_ccAdressSelect', 'paymentGC')}
                  />
                </TextWrapper>
                <Field
                  selectListTitle={getLabelValue(labels, 'lbl_payment_ccAdressSelect', 'paymentGC')}
                  name="onFileAddressKey"
                  id="onFileAddressKey"
                  component={AddressDropdown}
                  dataLocator="payment-billingaddressdd"
                  data={addressComponentList}
                  variation="secondary"
                  dropDownStyle={{ ...dropDownStyle }}
                  itemStyle={{ ...itemStyle }}
                  addAddress={() => {
                    this.handleComponentChange('');
                  }}
                  onValueChange={itemValue => {
                    this.handleComponentChange(itemValue);
                  }}
                  labels={labels}
                  selectedValue={onFileAddressKey}
                />
              </>
            )}
            {defaultAddress && (
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
            {isAddressFormVisible && (
              <ViewWithSpacing spacingStyles="margin-top-LRG">
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
                    showEmailAddress={showEmailAddress}
                    initialValues={initialValues}
                  />
                </FormSection>
              </ViewWithSpacing>
            )}
          </AddressWrapper>
          <ActionsWrapper>
            <Button
              fill="BLUE"
              text={this.getSubmitCTAText(labels, mailingAddress, isEdit)}
              style={AddAddressButton}
              disableButton={invalid}
              onPress={handleSubmit}
            />
            <Button
              fill="WHITE"
              onPress={onClose}
              text={getLabelValue(labels, 'lbl_common_cancelCTA', 'common')}
              style={CancelButton}
            />
          </ActionsWrapper>
        </CreditCardContainer>
      </ScrollView>
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
})(CreditCardForm);
