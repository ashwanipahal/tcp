import React from 'react';
import PropTypes from 'prop-types';
import { View } from 'react-native';
import { Field, change } from 'redux-form';
import TextBox from '../../../atoms/TextBox';
// import SelectBox from '../../../atoms/Select';
import InputCheckbox from '../../../atoms/InputCheckbox';
import getStandardConfig from '../../../../../utils/formValidation/validatorStandardConfig';
import AutoCompleteComponent from '../../../atoms/GoogleAutoSuggest/AutoCompleteComponent';
import {
  countriesOptionsMap,
  CAcountriesStatesTable,
  UScountriesStatesTable,
} from '../../../organisms/AddressForm/CountriesAndStates.constants';
import Anchor from '../../../atoms/Anchor';
import { getSiteId } from '../../../../../utils/utils.web';
import { API_CONFIG } from '../../../../../services/config';

export class AddressFields extends React.PureComponent {
  static propTypes = {
    dispatch: PropTypes.func.isRequired,
    addressFormLabels: PropTypes.shape({}).isRequired,
    isMakeDefaultDisabled: PropTypes.bool,
    formName: PropTypes.string.isRequired,
    showDefaultCheckbox: PropTypes.bool,
    showPhoneNumber: PropTypes.bool,
    formSection: PropTypes.string,
    className: PropTypes.string,
    variation: PropTypes.string,
    checkPOBoxAddress: PropTypes.func,
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
      country: getSiteId() && getSiteId().toUpperCase(),
    };
  }

  StateCountryChange = e => {
    this.setState({
      country: e.target.value ? e.target.value : '',
    });
  };

  handlePlaceSelected = (place, inputValue) => {
    const { dispatch, formName, formSection } = this.props;
    const address = AutoCompleteComponent.getAddressFromPlace(place, inputValue);
    dispatch(change(formName, `${formSection ? 'address.' : ''}city`, address.city));
    dispatch(change(formName, `${formSection ? 'address.' : ''}zipCode`, address.zip));
    dispatch(change(formName, `${formSection ? 'address.' : ''}state`, address.state));
    dispatch(change(formName, `${formSection ? 'address.' : ''}addressLine1`, address.street));
  };

  checkHasPoAddress = () => {
    const { checkPOBoxAddress } = this.props;
    if (checkPOBoxAddress) {
      checkPOBoxAddress();
    }
  };

  renderCountrySelector = () => {
    const { addressFormLabels, formSection } = this.props;
    return (
      <>
        {/* <Field
          id={`${formSection}.country`}
          placeholder={addressFormLabels.country}
          name="country"
          component={SelectBox}
          options={countriesOptionsMap}
          onChange={this.StateCountryChange}
          dataLocator="addnewaddress-country"
          enableSuccessCheck={false}
          disabled
        /> */}
        <Anchor
          fontSizeVariation="small"
          underline
          noLink
          href="#"
          anchorVariation="primary"
          data-locator="shipping internationally"
          target="_self"
          className="change-country-link"
          text={addressFormLabels.shipInternationally}
        />
      </>
    );
  };

  renderStateZipCode = () => {
    const { variation, addressFormLabels, formSection } = this.props;
    const { country } = this.state;
    const isCA = country === API_CONFIG.siteIds.ca.toUpperCase();
    return (
      <>
        {/* <Field
          id={`${formSection}.state`}
          placeholder={isCA ? addressFormLabels.province : addressFormLabels.stateLbl}
          name="state"
          component={SelectBox}
          options={isCA ? CAcountriesStatesTable : UScountriesStatesTable}
          dataLocator="addnewaddress-state"
          className="address-field"
          enableSuccessCheck={false}
        /> */}
        <Field
          placeholder={isCA ? addressFormLabels.postalCode : addressFormLabels.zipCode}
          id={`${formSection}.zipCode`}
          name="zipCode"
          maxLength={isCA ? 6 : 5}
          component={TextBox}
          dataLocator="addnewaddress-zipcode"
          className="address-field"
          enableSuccessCheck={false}
        />
      </>
    );
  };

  renderAddressFields = () => {
    const { variation, addressFormLabels, formSection } = this.props;
    const { country } = this.state;
    return (
      <>
        <Field
          id={`${formSection}.addressLine1`}
          placeholder={addressFormLabels.addressLine1}
          component={AutoCompleteComponent}
          name="addressLine1"
          onPlaceSelected={this.handlePlaceSelected}
          componentRestrictions={Object.assign({}, { country: [country] })}
          dataLocator="addnewaddress-addressl1"
          className="address-field"
          enableSuccessCheck={false}
          onChange={this.checkHasPoAddress}
        />
        <Field
          placeholder={addressFormLabels.addressLine2}
          name="addressLine2"
          id={`${formSection}.addressLine2`}
          component={TextBox}
          dataLocator="addnewaddress-addressl2"
          className="address-field"
          enableSuccessCheck={false}
        />
        <Field
          id={`${formSection}.city`}
          placeholder={addressFormLabels.city}
          name="city"
          component={TextBox}
          dataLocator="addnewaddress-city"
          className="address-field"
          enableSuccessCheck={false}
        />
        {this.renderStateZipCode()}
        {this.renderCountrySelector()}
      </>
    );
  };

  render() {
    const {
      isMakeDefaultDisabled,
      showDefaultCheckbox,
      showPhoneNumber,
      className,
      addressFormLabels,
      variation,
      formSection,
    } = this.props;
    return (
      <View>
        <Field
          placeholder={addressFormLabels.firstName}
          name="firstName"
          id={`${formSection}.firstName`}
          type="text"
          component={TextBox}
          dataLocator="addnewaddress-firstname"
          className="address-field"
          enableSuccessCheck={false}
        />
        <Field
          placeholder={addressFormLabels.lastName}
          name="lastName"
          id={`${formSection}.lastName`}
          component={TextBox}
          dataLocator="addnewaddress-lastname"
          className="address-field"
          enableSuccessCheck={false}
        />
        {this.renderAddressFields()}
        {showDefaultCheckbox && (
          <Field
            name="primary"
            component={InputCheckbox}
            dataLocator="addnewaddress-setdefaddress"
            disabled={isMakeDefaultDisabled}
            className="address-field"
          >
            {addressFormLabels.setDefaultMsg}
          </Field>
        )}
        <Field
          placeholder={addressFormLabels.phoneNumber}
          name="phoneNumber"
          id={`${formSection}.phoneNumber`}
          component={TextBox}
          dataLocator="addnewaddress-phnumber"
          type="tel"
          className="address-field"
          enableSuccessCheck={false}
        />
        <Field
          placeholder="Email (For Order Updates)"
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

AddressFields.defaultProps = {
  isMakeDefaultDisabled: false,
  showDefaultCheckbox: true,
  showPhoneNumber: true,
  formSection: '',
  className: '',
  variation: 'primary',
  checkPOBoxAddress: () => { },
};

export default AddressFields;
