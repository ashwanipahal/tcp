import React from 'react';
import { GooglePlacesInput } from '@tcp/core/src/components/common/atoms/GoogleAutoSuggest/AutoCompleteComponent';
import TextBox from '../../../../../common/atoms/TextBox';
import DropDown from '../../../../../common/atoms/DropDown/views/DropDown.native';
import InputCheckbox from '../../../../../common/atoms/InputCheckbox';
import Button from '../../../../../common/atoms/Button';
import createValidateMethod from '../../../../../../utils/formValidation/createValidateMethod';
import getStandardConfig from '../../../../../../utils/formValidation/validatorStandardConfig';
import { AutoCompleteComponent } from '../../../../../common/atoms/GoogleAutoSuggest/AutoCompleteComponent';
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
  labels: object,
  isEdit?: boolean,
  isMakeDefaultDisabled?: boolean,
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
      labels,
      isEdit,
      isMakeDefaultDisabled,
      submitAddressFormAction,
    } = this.props;
    const { country, dropDownItem } = this.state;
    return (
      <AddressFormView>
        <InputField>
          <Field
            name="firstName"
            id="firstName"
            label={labels.acc_lbl_first_name}
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
            label={labels.acc_lbl_last_name}
            component={TextBox}
            dataLocator="addnewaddress-lastname"
          />
        </InputField>
        <InputField>
          <Field
            id="addressLine1"
            name="addressLine1"
            headerTitle={labels.acc_lbl_address_line1}
            component={GooglePlacesInput}
            dataLocator="addnewaddress-addressl1"
          />
        </InputField>

        <InputField>
          <Field
            id="addressLine2"
            name="addressLine2"
            label={labels.acc_lbl_address_line2}
            component={TextBox}
            dataLocator="addnewaddress-addressl2"
          />
        </InputField>
        <InputFieldHalf>
          <Field
            id="city"
            name="city"
            label={labels.acc_lbl_city}
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
            label={country === 'CA' ? labels.acc_lbl_postal_code : labels.acc_lbl_zip_code}
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
            label={labels.acc_lbl_phone_number}
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
            rightText={labels.acc_lbl_set_default}
          />
        </InputField>
        <CtaView>
          <Button
            fill="BLUE"
            type="submit"
            disabled={invalid}
            onPress={handleSubmit(submitAddressFormAction)}
            buttonVariation="variable-width"
            text={isEdit ? labels.acc_lbl_update_address_cta : labels.acc_lbl_add_address_cta}
            style={AddAddressButton}
          />
          <EmptyView />
          <Button
            fill="WHITE"
            type="submit"
            onPress={() => null}
            buttonVariation="variable-width"
            text={labels.acc_lbl_cancel_cta}
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
