import React from 'react';
import { Field, reduxForm, change } from 'redux-form';
import { PropTypes } from 'prop-types';
// import { GooglePlacesInput } from '@tcp/core/src/components/common/atoms/GoogleAutoSuggest/AutoCompleteComponent';
import TextBox from '../../atoms/TextBox';
import DropDown from '../../atoms/DropDown/views/DropDown.native';
import InputCheckbox from '../../atoms/InputCheckbox';
import Button from '../../atoms/Button';
import createValidateMethod from '../../../../utils/formValidation/createValidateMethod';
import getStandardConfig from '../../../../utils/formValidation/validatorStandardConfig';
import { AutoCompleteComponent } from '../../atoms/GoogleAutoSuggest/AutoCompleteComponent';
import {
  countriesOptionsMap,
  CAcountriesStatesTable,
  UScountriesStatesTable,
} from './CountriesAndStates.constants';
import {
  AddAddressButton,
  CancelButton,
  SaveButtonWrapper,
  CancelButtonWrapper,
  dropDownStyle,
  itemStyle,
  InputFieldPhoneNumber,
  InputFieldHalf,
  StateZipCodeContainer,
  Separator,
  SetDefaultShippingWrapper,
  StyledLabel,
  AddAddressWrapper,
} from './AddressForm.native.style';

export class AddressForm extends React.PureComponent<Props, State> {
  constructor(props) {
    super(props);
    this.state = {
      country: 'US',
      dropDownItem: UScountriesStatesTable[0].displayName,
    };
  }

  StateCountryChange = e => {
    this.setState({
      country: e.target.value ? e.target.value : '',
    });
  };

  handlePlaceSelected = (place, inputValue) => {
    const { dispatch } = this.props;
    const address = AutoCompleteComponent.getAddressFromPlace(place, inputValue);
    dispatch(change('AddressForm', 'city', address.city));
    dispatch(change('AddressForm', 'zipCode', address.zip));
    dispatch(change('AddressForm', 'state', address.state));
    dispatch(change('AddressForm', 'addressLine1', address.street));
  };

  renderStyledLabel = label => {
    return <StyledLabel>{label}</StyledLabel>;
  };

  render() {
    const {
      handleSubmit,
      invalid,
      addressFormLabels,
      isEdit,
      isMakeDefaultDisabled,
      submitAddressFormAction,
      onCancel,
    } = this.props;
    const { country, dropDownItem } = this.state;

    return (
      <AddAddressWrapper>
        <Field
          name="firstName"
          id="firstName"
          label={addressFormLabels.firstName}
          type="text"
          component={TextBox}
          maxLength={50}
          dataLocator="addnewaddress-firstname"
        />
        <Field
          id="lastName"
          name="lastName"
          label={addressFormLabels.lastName}
          component={TextBox}
          dataLocator="addnewaddress-lastname"
        />
        {/* <Field
          id="addressLine1"
          name="addressLine1"
          headerTitle={addressFormLabels.addressLine1}
          component={GooglePlacesInput}
          dataLocator="addnewaddress-addressl1"
        /> */}

        <Field
          id="addressLine2"
          name="addressLine2"
          label={addressFormLabels.addressLine2}
          component={TextBox}
          dataLocator="addnewaddress-addressl2"
        />

        <Field
          id="city"
          name="city"
          label={addressFormLabels.city}
          component={TextBox}
          dataLocator="addnewaddress-city"
        />

        <StateZipCodeContainer>
          <InputFieldHalf>
            <Field
              id="state"
              name="state"
              component={DropDown}
              dataLocator="addnewaddress-city"
              selectedValue={dropDownItem}
              data={country === 'CA' ? CAcountriesStatesTable : UScountriesStatesTable}
              onValueChange={itemValue => {
                this.setState({ dropDownItem: itemValue });
              }}
              variation="secondary"
              dropDownStyle={{ ...dropDownStyle }}
              itemStyle={{ ...itemStyle }}
            />
          </InputFieldHalf>

          <Separator />

          <InputFieldHalf>
            <Field
              id="zipCode"
              name="zipCode"
              label={country === 'CA' ? addressFormLabels.postalCode : addressFormLabels.zipCode}
              maxLength={country === 'CA' ? 6 : 5}
              component={TextBox}
              dataLocator="addnewaddress-zipcode"
            />
          </InputFieldHalf>
        </StateZipCodeContainer>

        <Field
          id="country"
          name="country"
          component={DropDown}
          selectedValue={country}
          data={countriesOptionsMap}
          dataLocator="addnewaddress-country"
          onValueChange={itemValue => {
            this.setState({ country: itemValue });
          }}
          variation="secondary"
          dropDownStyle={{ ...dropDownStyle }}
          itemStyle={{ ...itemStyle }}
        />

        <InputFieldPhoneNumber>
          <Field
            id="phoneNumber"
            name="phoneNumber"
            label={addressFormLabels.phoneNumber}
            component={TextBox}
            dataLocator="addnewaddress-phnumber"
            type="tel"
          />
        </InputFieldPhoneNumber>

        <SetDefaultShippingWrapper>
          <Field
            id="primary"
            name="primary"
            component={InputCheckbox}
            dataLocator="addnewaddress-city"
            disabled={isMakeDefaultDisabled}
            rightText={addressFormLabels.setDefaultMsg}
          />
        </SetDefaultShippingWrapper>

        <SaveButtonWrapper>
          <Button
            fill="BLUE"
            type="submit"
            disabled={invalid}
            onPress={handleSubmit(submitAddressFormAction)}
            buttonVariation="variable-width"
            text={isEdit ? addressFormLabels.update : addressFormLabels.addAddress}
            style={AddAddressButton}
          />
        </SaveButtonWrapper>

        <CancelButtonWrapper>
          <Button
            fill="WHITE"
            onPress={onCancel}
            buttonVariation="variable-width"
            text={addressFormLabels.cancel}
            style={CancelButton}
          />
        </CancelButtonWrapper>
      </AddAddressWrapper>
    );
  }
}

AddressForm.propTypes = {
  handleSubmit: PropTypes.func,
  invalid: PropTypes.bool,
  dispatch: PropTypes.func,
  submitAddressFormAction: PropTypes.func,
  addressFormLabels: PropTypes.shape({
    firstName: PropTypes.string,
    lastName: PropTypes.string,
    addressLine1: PropTypes.string,
    addressLine2: PropTypes.string,
    city: PropTypes.string,
    postalCode: PropTypes.string,
    zipCode: PropTypes.string,
    country: PropTypes.string,
    phoneNumber: PropTypes.string,
    setDefaultMsg: PropTypes.string,
    update: PropTypes.string,
    addAddress: PropTypes.string,
    cancel: PropTypes.string,
  }),
  isEdit: PropTypes.bool,
  isMakeDefaultDisabled: PropTypes.bool,
  onCancel: PropTypes.func,
};

AddressForm.defaultProps = {
  isEdit: false,
  isMakeDefaultDisabled: false,
  invalid: false,
  handleSubmit: () => {},
  addressFormLabels: {
    firstName: '',
    lastName: '',
    addressLine1: '',
    addressLine2: '',
    city: '',
    postalCode: '',
    zipCode: '',
    country: '',
    phoneNumber: '',
    setDefaultMsg: '',
    update: '',
    addAddress: '',
    cancel: '',
  },
  dispatch: () => {},
  onCancel: () => {},
  submitAddressFormAction: () => {},
};

const validateMethod = createValidateMethod(
  getStandardConfig([
    'firstName',
    'lastName',
    'addressLine1',
    'addressLine2',
    'city',
    'state',
    'zipCode',
    'country',
    'phoneNumber',
  ])
);

export default reduxForm({
  form: 'AddressForm', // a unique identifier for this form
  enableReinitialize: true,
  ...validateMethod,
})(AddressForm);
