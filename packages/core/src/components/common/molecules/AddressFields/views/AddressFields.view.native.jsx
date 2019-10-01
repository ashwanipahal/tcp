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
} from '../styles/AddressFields.style.native';
import { HiddenStateWrapper } from '../../../organisms/AddressForm/AddressForm.native.style';
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
    loadShipmentMethods: PropTypes.func.isRequired,
    disableCountry: PropTypes.bool,
    showUserName: PropTypes.bool,
    showPhoneNumber: PropTypes.bool,
    showEmailAddress: PropTypes.bool,
    initialValues: PropTypes.shape({}),
    isGuest: PropTypes.bool,
    state: PropTypes.string,
  };

  static defaultProps = {
    formSection: '',
    disableCountry: false,
    showUserName: true,
    showPhoneNumber: true,
    showEmailAddress: true,
    initialValues: {},
    isGuest: true,
    state: '',
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

    const selectArray = [
      {
        id: ``,
        fullName: '',
        displayName: 'Select',
      },
    ];
    const { state } = props;
    this.CAcountriesStates = [...selectArray, ...CAcountriesStatesTable];
    this.UScountriesStates = [...selectArray, ...UScountriesStatesTable];
    const {
      siteIds: { us },
    } = API_CONFIG;
    this.state = {
      country: us.toUpperCase(),
      dropDownItem:
        this.getInitialState(props.initialValues) || state || this.UScountriesStates[0].displayName,
    };

    this.locationRef = null;
  }

  componentDidMount() {
    const { country } = this.state;
    const { dispatch, formName, formSection } = this.props;
    dispatch(change(formName, `${formSection}.country`, country));
  }

  handlePlaceSelected = (place, inputValue) => {
    const { dispatch, formName, formSection } = this.props;
    const address = getAddressFromPlace(place, inputValue);
    dispatch(change(formName, `${formSection}.city`, address.city));
    dispatch(change(formName, `${formSection}.zipCode`, address.zip));
    dispatch(change(formName, `${formSection}.state`, address.state));
    dispatch(change(formName, `${formSection}.addressLine1`, address.street));
    this.setState({ dropDownItem: address.state });
  };

  getInitialAddressLine1 = initialValues => {
    return (initialValues && initialValues.address && initialValues.address.addressLine1) || '';
  };

  getInitialState = initialValues => {
    return (initialValues && initialValues.address && initialValues.address.state) || '';
  };

  changeShipmentMethods = (e, value) => {
    const { loadShipmentMethods, formName } = this.props;
    if (loadShipmentMethods) {
      loadShipmentMethods({ state: value, formName });
    }
  };

  render() {
    const {
      addressFormLabels,
      formSection,
      dispatch,
      formName,
      disableCountry,
      showUserName,
      showPhoneNumber,
      showEmailAddress,
      initialValues,
      isGuest,
    } = this.props;
    const { dropDownItem, country } = this.state;
    const isCA = country === API_CONFIG.siteIds.ca.toUpperCase();
    return (
      <View>
        {showUserName && (
          <>
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
          </>
        )}
        <Field
          headerTitle={addressFormLabels.addressLine1}
          component={GooglePlacesInput}
          onValueChange={(data, inputValue) => {
            this.handlePlaceSelected(data, inputValue);
          }}
          initialValue={this.getInitialAddressLine1(initialValues)}
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
            <HiddenStateWrapper>
              <Field label="" component={TextBox} title="" type="hidden" id="state" name="state" />
            </HiddenStateWrapper>
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
              keyboardType="numeric"
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
          disabled={disableCountry}
        />
        {showPhoneNumber && (
          <InputFieldPhoneNumber>
            <Field
              id="phoneNumber"
              name="phoneNumber"
              label={addressFormLabels.phoneNumber}
              component={TextBox}
              dataLocator="addnewaddress-phnumber"
              type="tel"
              keyboardType="numeric"
            />
          </InputFieldPhoneNumber>
        )}
        {showEmailAddress && isGuest && (
          <Field
            label="Email (For Order Updates)"
            name="emailAddress"
            id={`${formSection}.emailAddress`}
            component={TextBox}
            dataLocator="email-address-field"
            enableSuccessCheck={false}
          />
        )}
      </View>
    );
  }
}

export default AddressFields;
