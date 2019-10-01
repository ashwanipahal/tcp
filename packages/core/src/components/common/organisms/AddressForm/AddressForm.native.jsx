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
  InputFieldHalf,
  StateZipCodeContainer,
  Separator,
  SetDefaultShippingWrapper,
  AddAddressWrapper,
  CountryContainer,
  HiddenStateWrapper,
} from './AddressForm.native.style';

class AddressForm extends React.PureComponent {
  constructor(props) {
    super(props);

    const selectArray = [
      {
        id: ``,
        fullName: '',
        displayName: 'Select',
      },
    ];

    this.CAcountriesStates = [...selectArray, ...CAcountriesStatesTable];
    this.UScountriesStates = [...selectArray, ...UScountriesStatesTable];

    this.state = {
      country: 'US',
      dropDownItem: props.countryState ? props.countryState : this.UScountriesStates[0].displayName,
    };

    this.locationRef = null;
  }

  componentDidMount() {
    const { dispatch, initialValues } = this.props;
    dispatch(change('AddressForm', 'country', initialValues.country));
  }

  handlePlaceSelected = (place, inputValue) => {
    const { dispatch } = this.props;
    const address = getAddressFromPlace(place, inputValue);
    dispatch(change('AddressForm', 'city', address.city));
    dispatch(change('AddressForm', 'zipCode', address.zip));
    dispatch(change('AddressForm', 'state', address.state));
    dispatch(change('AddressForm', 'addressLine1', address.street));
    this.setState({ dropDownItem: address.state });
  };

  render() {
    const {
      addressFormLabels,
      isEdit,
      isMakeDefaultDisabled,
      onCancel,
      handleSubmit,
      dispatch,
      addressLine1,
      initialValues,
      setModalHeading,
    } = this.props;
    const { dropDownItem, country } = this.state;
    const disabledProps = {
      isChecked: initialValues.primary,
    };
    if (isMakeDefaultDisabled) {
      disabledProps.isChecked = true;
      disabledProps.disabled = true;
    }
    setModalHeading(); // set modal heading
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
        <Field
          headerTitle={addressFormLabels.addressLine1}
          component={GooglePlacesInput}
          onValueChange={this.handlePlaceSelected}
          initialValue={addressLine1}
          dataLocator="addnewaddress-addressl1"
          componentRestrictions={{ ...{ country: [country] } }}
          id="addressLine1"
          name="addressLine1"
        />
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
              bounces={false}
              component={DropDown}
              heading={country === 'CA' ? addressFormLabels.province : addressFormLabels.stateLbl}
              dataLocator="addnewaddress-city"
              selectedValue={dropDownItem}
              data={country === 'CA' ? this.CAcountriesStates : this.UScountriesStates}
              onValueChange={itemValue => {
                dispatch(change('AddressForm', 'state', itemValue));
                this.setState({ dropDownItem: itemValue });
              }}
              variation="secondary"
              dropDownStyle={{ ...dropDownStyle }}
              itemStyle={{ ...itemStyle }}
            />

            <HiddenStateWrapper>
              <Field label="" component={TextBox} title="" type="hidden" id="state" name="state" />
            </HiddenStateWrapper>
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

        <CountryContainer>
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
        </CountryContainer>

        <Field
          id="phoneNumber"
          name="phoneNumber"
          label={addressFormLabels.phoneNumber}
          component={TextBox}
          dataLocator="addnewaddress-phnumber"
          type="tel"
        />

        <SetDefaultShippingWrapper>
          <Field
            id="primary"
            name="primary"
            component={InputCheckbox}
            dataLocator="addnewaddress-city"
            {...disabledProps}
            rightText={addressFormLabels.setDefaultMsg}
          />
        </SetDefaultShippingWrapper>

        <SaveButtonWrapper>
          <Button
            fill="BLUE"
            type="submit"
            color="white"
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
  initialValues: PropTypes.shape({
    state: PropTypes.string,
    country: PropTypes.string,
    addressLine1: PropTypes.string,
  }),
  addressLine1: PropTypes.string,
  countryState: PropTypes.string,
  setModalHeading: PropTypes.func,
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
  handleSubmit: () => {},
  initialValues: {
    state: '',
    country: '',
    addressLine1: '',
  },
  addressLine1: '',
  countryState: '',
  setModalHeading: () => {},
};

const validateMethod = createValidateMethod(
  getStandardConfig([
    'firstName',
    'lastName',
    'addressLine1',
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
  ...validateMethod,
})(AddressForm);

export { AddressForm as AddressFormVanilla };
