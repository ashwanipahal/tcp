import React from 'react';
import { Field, reduxForm, change } from 'redux-form';
import { GooglePlacesInput } from '@tcp/core/src/components/common/atoms/GoogleAutoSuggest/AutoCompleteComponent';
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
  InputField,
  AddressFormView,
  AddAddressButton,
  CancelButton,
  EmptyView,
  CtaView,
  dropDownStyle,
  itemStyle,
  InputFieldHalf,
} from './AddressForm.native.style';

// @flow
type Props = {
  handleSubmit: any,
  invalid: any,
  dispatch: any,
  submitAddressFormAction: any,
  addressFormLabels: object,
  isEdit?: boolean,
  isMakeDefaultDisabled?: boolean,
  onCancel: any,
};

type State = {
  country: string,
};
export class AddressForm extends React.PureComponent<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      country: 'US',
      dropDownItem: UScountriesStatesTable[0].displayName,
    };
  }

  StateCountryChange = (e: Object) => {
    this.setState({
      country: e.target.value ? e.target.value : '',
    });
  };

  handlePlaceSelected = (place: Object, inputValue: string) => {
    const { dispatch } = this.props;
    const address = AutoCompleteComponent.getAddressFromPlace(place, inputValue);
    dispatch(change('AddressForm', 'city', address.city));
    dispatch(change('AddressForm', 'zipCode', address.zip));
    dispatch(change('AddressForm', 'state', address.state));
    dispatch(change('AddressForm', 'addressLine1', address.street));
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
      <AddressFormView>
        <InputField>
          <Field
            name="firstName"
            id="firstName"
            label={addressFormLabels.firstName}
            type="text"
            component={TextBox}
            maxLength={50}
            dataLocator="addnewaddress-firstname"
          />
        </InputField>
        <InputField>
          <Field
            id="lastName"
            name="lastName"
            label={addressFormLabels.lastName}
            component={TextBox}
            dataLocator="addnewaddress-lastname"
          />
        </InputField>
        <InputField>
          <Field
            id="addressLine1"
            name="addressLine1"
            headerTitle={addressFormLabels.addressLine1}
            component={GooglePlacesInput}
            dataLocator="addnewaddress-addressl1"
          />
        </InputField>

        <InputField>
          <Field
            id="addressLine2"
            name="addressLine2"
            label={addressFormLabels.addressLine2}
            component={TextBox}
            dataLocator="addnewaddress-addressl2"
          />
        </InputField>
        <InputFieldHalf>
          <Field
            id="city"
            name="city"
            label={addressFormLabels.city}
            component={TextBox}
            dataLocator="addnewaddress-city"
          />
        </InputFieldHalf>
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
        <InputField>
          <Field
            id="zipCode"
            name="zipCode"
            label={country === 'CA' ? addressFormLabels.postalCode : addressFormLabels.zipCode}
            maxLength={country === 'CA' ? 6 : 5}
            component={TextBox}
            dataLocator="addnewaddress-zipcode"
          />
        </InputField>
        <InputField>
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
        </InputField>
        <InputField>
          <Field
            id="phoneNumber"
            name="phoneNumber"
            label={addressFormLabels.phoneNumber}
            component={TextBox}
            dataLocator="addnewaddress-phnumber"
            type="tel"
          />
        </InputField>
        <InputField>
          <Field
            id="primary"
            name="primary"
            component={InputCheckbox}
            dataLocator="addnewaddress-city"
            disabled={isMakeDefaultDisabled}
            rightText={addressFormLabels.setDefaultMsg}
          />
        </InputField>
        <CtaView>
          <Button
            fill="BLUE"
            type="submit"
            disabled={invalid}
            onPress={handleSubmit(submitAddressFormAction)}
            buttonVariation="variable-width"
            text={isEdit ? addressFormLabels.update : addressFormLabels.addAddress}
            style={AddAddressButton}
          />
          <EmptyView />
          <Button
            fill="WHITE"
            onPress={onCancel}
            buttonVariation="variable-width"
            text={addressFormLabels.cancel}
            style={CancelButton}
          />
        </CtaView>
      </AddressFormView>
    );
  }
}

AddressForm.defaultProps = {
  isEdit: false,
  isMakeDefaultDisabled: false,
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
