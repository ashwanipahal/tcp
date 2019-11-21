import React from 'react';
import { Field, reduxForm, change } from 'redux-form';
import { getAddressFromPlace } from '@tcp/core/src/utils';
import { GooglePlacesInput } from '@tcp/core/src/components/common/atoms/GoogleAutoSuggest/AutoCompleteComponent';
import { PropTypes } from 'prop-types';
import TextBox from '../../atoms/TextBox';
import Select from '../../atoms/Select';
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
  StateZipCodeContainer,
  SetDefaultShippingWrapper,
  AddAddressWrapper,
  InputFieldHalf,
} from './AddressForm.native.style';
import { API_CONFIG } from '../../../../services/config';
import { formatPhoneNumber } from '../../../../utils/formValidation/phoneNumber';

class AddressForm extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      country: props.initialValues.country || 'US',
    };
  }

  handlePlaceSelected = (place, inputValue) => {
    const { dispatch } = this.props;
    const address = getAddressFromPlace(place, inputValue);
    dispatch(change('AddressForm', 'city', address.city));
    dispatch(change('AddressForm', 'zipCode', address.zip));
    dispatch(change('AddressForm', 'state', address.state));
    dispatch(change('AddressForm', 'addressLine1', address.street));
  };

  render() {
    const {
      addressFormLabels,
      isEdit,
      isMakeDefaultDisabled,
      onCancel,
      handleSubmit,
      addressLine1,
      initialValues,
      setModalHeading,
    } = this.props;
    const { country } = this.state;
    const isCA = country === API_CONFIG.siteIds.ca.toUpperCase();
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
              id="state"
              name="state"
              component={Select}
              heading={isCA ? addressFormLabels.province : addressFormLabels.stateLbl}
              options={isCA ? CAcountriesStatesTable : UScountriesStatesTable}
            />
          </InputFieldHalf>
          <InputFieldHalf>
            <Field
              id="zipCode"
              name="zipCode"
              label={isCA ? addressFormLabels.postalCode : addressFormLabels.zipCode}
              maxLength={isCA ? 6 : 5}
              component={TextBox}
            />
          </InputFieldHalf>
        </StateZipCodeContainer>
        <Field
          id="country"
          name="country"
          component={Select}
          heading={addressFormLabels.country}
          options={countriesOptionsMap}
          onValueChange={itemValue => {
            this.setState({ country: itemValue });
          }}
        />
        <Field
          id="phoneNumber"
          name="phoneNumber"
          label={addressFormLabels.phoneNumber}
          component={TextBox}
          dataLocator="addnewaddress-phnumber"
          type="tel"
          normalize={formatPhoneNumber}
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
            text={isEdit ? addressFormLabels.update : addressFormLabels.addAddress}
          />
        </SaveButtonWrapper>

        <CancelButtonWrapper>
          <Button fill="WHITE" onPress={onCancel} text={addressFormLabels.cancel} />
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
