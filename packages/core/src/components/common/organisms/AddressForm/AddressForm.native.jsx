import React from 'react';
import { Field, reduxForm, change } from 'redux-form';
import { getAddressFromPlace } from '@tcp/core/src/utils';
import { GooglePlacesInput } from '@tcp/core/src/components/common/atoms/GoogleAutoSuggest/AutoCompleteComponent';
import { PropTypes } from 'prop-types';
import TextBox from '../../atoms/TextBox';
import DropDown from '../../atoms/DropDown/views/DropDown.native';
import InputCheckbox from '../../atoms/InputCheckbox';
import Button from '../../atoms/Button';
import createValidateMethod from '../../../../utils/formValidation/createValidateMethod';
import getStandardConfig from '../../../../utils/formValidation/validatorStandardConfig';
import {
  countriesOptionsMap,
  CAcountriesStatesTable,
  UScountriesStatesTable,
} from './CountriesAndStates.constants';
import {
  SaveButtonWrapper,
  CancelButtonWrapper,
  dropDownStyle,
  itemStyle,
  InputFieldPhoneNumber,
  InputFieldHalf,
  StateZipCodeContainer,
  Separator,
  SetDefaultShippingWrapper,
  AddAddressWrapper,
  GooglePlaceInputWrapper,
  OptionalAdressWrapper,
} from './AddressForm.native.style';

class AddressForm extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      country: 'US',
      dropDownItem: UScountriesStatesTable[0].displayName,
    };
  }

  componentDidMount() {
    const { dispatch, initialValues } = this.props;
    dispatch(change('AddressForm', 'state', UScountriesStatesTable[0].id));
    dispatch(change('AddressForm', 'country', initialValues.country));
    dispatch(change('AddressForm', 'addressLine1', initialValues.addressLine1));
  }

  handlePlaceSelected = (place, inputValue) => {
    const { dispatch, setAddressLine1 } = this.props;
    const address = getAddressFromPlace(place, inputValue);
    dispatch(change('AddressForm', 'city', address.city));
    dispatch(change('AddressForm', 'zipCode', address.zip));
    dispatch(change('AddressForm', 'state', address.state));
    dispatch(change('AddressForm', 'addressLine1', address.street));
    this.setState({ dropDownItem: address.state });
    setAddressLine1(address.street);
  };

  render() {
    const {
      addressFormLabels,
      isEdit,
      isMakeDefaultDisabled,
      onCancel,
      invalid,
      handleSubmit,
      dispatch,
      addressLine1,
    } = this.props;
    const { dropDownItem, country } = this.state;
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

        <GooglePlaceInputWrapper>
          <Field
            id="addressLine1"
            name="addressLine1"
            headerTitle={addressFormLabels.addressLine1}
            component={GooglePlacesInput}
            onValueChange={(data, inputValue) => {
              this.handlePlaceSelected(data, inputValue);
            }}
            initialValue={addressLine1}
            dataLocator="addnewaddress-addressl1"
            componentRestrictions={{ ...{ country: [country] } }}
          />
        </GooglePlaceInputWrapper>

        <OptionalAdressWrapper>
          <Field
            id="addressLine2"
            name="addressLine2"
            label={addressFormLabels.addressLine2}
            component={TextBox}
            dataLocator="addnewaddress-addressl2"
          />
        </OptionalAdressWrapper>

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
              bounces={false}
              component={DropDown}
              heading={country === 'CA' ? addressFormLabels.province : addressFormLabels.stateLbl}
              dataLocator="addnewaddress-city"
              selectedValue={dropDownItem}
              data={country === 'CA' ? CAcountriesStatesTable : UScountriesStatesTable}
              onValueChange={itemValue => {
                dispatch(change('AddressForm', 'state', itemValue));
                this.setState({ dropDownItem: itemValue });
              }}
              variation="secondary"
              dropDownStyle={{ ...dropDownStyle }}
              itemStyle={{ ...itemStyle }}
            />
          </InputFieldHalf>

          <Separator />

          <InputFieldHalf zipCode>
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
          heading={addressFormLabels.country}
          selectedValue={
            country === 'US'
              ? countriesOptionsMap[0].displayName
              : countriesOptionsMap[1].displayName
          }
          data={countriesOptionsMap}
          dataLocator="addnewaddress-country"
          onValueChange={itemValue => {
            dispatch(change('AddressForm', 'country', itemValue));
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
            isChecked={isMakeDefaultDisabled}
            disabled={isMakeDefaultDisabled}
            rightText={addressFormLabels.setDefaultMsg}
          />
        </SetDefaultShippingWrapper>

        <SaveButtonWrapper>
          <Button
            fill="BLUE"
            type="submit"
            color="white"
            disabled={invalid}
            onPress={handleSubmit}
            buttonVariation="variable-width"
            text={isEdit ? addressFormLabels.update : addressFormLabels.addAddress}
          />
        </SaveButtonWrapper>

        <CancelButtonWrapper>
          <Button
            fill="WHITE"
            onPress={onCancel}
            buttonVariation="variable-width"
            text={addressFormLabels.cancel}
          />
        </CancelButtonWrapper>
      </AddAddressWrapper>
    );
  }
}

AddressForm.propTypes = {
  dispatch: PropTypes.func,
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
  isMakeDefaultDisabled: PropTypes.bool.isRequired,
  onCancel: PropTypes.func,
  handleSubmit: PropTypes.func,
  invalid: PropTypes.func,
  initialValues: PropTypes.shape({
    state: PropTypes.string,
    country: PropTypes.string,
    addressLine1: PropTypes.string,
  }),
  setAddressLine1: PropTypes.func,
  addressLine1: PropTypes.string,
};

AddressForm.defaultProps = {
  isEdit: false,
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
  invalid: () => {},
  handleSubmit: () => {},
  initialValues: {
    state: '',
    country: '',
    addressLine1: '',
  },
  setAddressLine1: () => {},
  addressLine1: '',
};

const validateMethod = createValidateMethod(
  getStandardConfig([
    'firstName',
    'lastName',
    'addressLine2',
    'city',
    'state',
    'country',
    'phoneNumber',
    'zipCode',
  ])
);

export default reduxForm({
  form: 'AddressForm', // a unique identifier for this form
  enableReinitialize: true,
  destroyOnUnmount: false,
  keepDirtyOnReinitialize: true,
  ...validateMethod,
})(AddressForm);

export { AddressForm as AddressFormVanilla };
