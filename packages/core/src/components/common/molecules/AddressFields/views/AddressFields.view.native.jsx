import React from 'react';
import PropTypes from 'prop-types';
import { View } from 'react-native';
import { getAddressFromPlace } from '@tcp/core/src/utils';
import { Field, change } from 'redux-form';
import { GooglePlacesInput } from '@tcp/core/src/components/common/atoms/GoogleAutoSuggest/AutoCompleteComponent';
import TextBox from '../../../atoms/TextBox';
import DropDown from '../../../atoms/DropDown/views/DropDown.native';
import getStandardConfig from '../../../../../utils/formValidation/validatorStandardConfig';
import {
  dropDownStyle,
  itemStyle,
  InputFieldPhoneNumber,
  InputFieldHalf,
  StateZipCodeContainer,
  Separator,
  GooglePlaceInputWrapper,
  AddressSecondWrapper,
} from '../styles/AddressFields.style.native';
import {
  countriesOptionsMap,
  CAcountriesStatesTable,
  UScountriesStatesTable,
} from '../../../organisms/AddressForm/CountriesAndStates.constants';
import { API_CONFIG } from '../../../../../services/config';

export class AddressFields extends React.PureComponent {
  static propTypes = {
    dispatch: PropTypes.func.isRequired,
    addressFormLabels: PropTypes.shape({}).isRequired,
    formName: PropTypes.string.isRequired,
    formSection: PropTypes.string,
    checkPOBoxAddress: PropTypes.func,
    loadShipmentMethods: PropTypes.func.isRequired,
  };

  static defaultProps = {
    formSection: '',
    checkPOBoxAddress: () => {},
  };

  static addressValidationConfig = getStandardConfig([
    'firstName',
    'lastName',
    'addressLine1',
    'addressLine2',
    'city',
    'state',
    'zipCode',
    'country',
    'phoneNumber',
    'emailAddress',
  ]);

  constructor(props) {
    super(props);
    this.state = {
      country: API_CONFIG.siteIds.us.toUpperCase(),
      dropDownItem: UScountriesStatesTable[0].displayName,
    };
  }

  handlePlaceSelected = (place, inputValue) => {
    const { dispatch, formName, formSection } = this.props;
    const address = getAddressFromPlace(place, inputValue);
    dispatch(change(formName, `${formSection ? 'address.' : ''}city`, address.city));
    dispatch(change(formName, `${formSection ? 'address.' : ''}zipCode`, address.zip));
    dispatch(change(formName, `${formSection ? 'address.' : ''}state`, address.state));
    dispatch(change(formName, `${formSection ? 'address.' : ''}addressLine1`, address.street));
    this.setState({ dropDownItem: address.state });
  };

  checkHasPoAddress = () => {
    const { checkPOBoxAddress } = this.props;
    if (checkPOBoxAddress) {
      checkPOBoxAddress();
    }
  };

  changeShipmentMethods = () => {
    const { loadShipmentMethods } = this.props;
    if (loadShipmentMethods) {
      loadShipmentMethods();
    }
  };

  render() {
    const { addressFormLabels, formSection, dispatch, formName } = this.props;
    const { dropDownItem, country } = this.state;
    const isCA = country === API_CONFIG.siteIds.ca.toUpperCase();
    return (
      <View>
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
              dispatch(change(formName, `${formSection}.addressLine1`, data));
              this.handlePlaceSelected(data, inputValue);
              this.checkHasPoAddress();
            }}
            dataLocator="addnewaddress-addressl1"
            componentRestrictions={{ ...{ country: [country] } }}
          />
        </GooglePlaceInputWrapper>
        <AddressSecondWrapper>
          <Field
            id="addressLine2"
            name="addressLine2"
            label={addressFormLabels.addressLine2}
            component={TextBox}
            dataLocator="addnewaddress-addressl2"
            onValueChange={this.checkHasPoAddress}
          />
        </AddressSecondWrapper>
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
              heading={isCA ? addressFormLabels.province : addressFormLabels.stateLbl}
              dataLocator="addnewaddress-city"
              selectedValue={dropDownItem}
              data={isCA ? CAcountriesStatesTable : UScountriesStatesTable}
              onValueChange={itemValue => {
                dispatch(change(formName, `${formSection}.state`, itemValue));
                this.setState({ dropDownItem: itemValue });
                this.changeShipmentMethods();
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
              label={isCA ? addressFormLabels.postalCode : addressFormLabels.zipCode}
              maxLength={isCA ? 6 : 5}
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
            dispatch(change(formName, `${formSection}.country`, itemValue));
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
        <Field
          label="Email (For Order Updates)"
          name="emailAddress"
          id={`${formSection}.emailAddress`}
          component={TextBox}
          dataLocator="email-address-field"
          enableSuccessCheck={false}
        />
      </View>
    );
  }
}

export default AddressFields;
