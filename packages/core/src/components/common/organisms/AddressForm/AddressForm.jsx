import React from 'react';
import PropTypes from 'prop-types';
import { Field, reduxForm, change } from 'redux-form';
import TextBox from '../../atoms/TextBox';
import SelectBox from '../../atoms/Select';
import InputCheckbox from '../../atoms/InputCheckbox';
import Row from '../../atoms/Row';
import Col from '../../atoms/Col';
import Button from '../../atoms/Button';
import createValidateMethod from '../../../../utils/formValidation/createValidateMethod';
import getStandardConfig from '../../../../utils/formValidation/validatorStandardConfig';
import { AutoCompleteComponent } from '../../atoms/GoogleAutoSuggest/AutoCompleteComponent';
import {
  countriesOptionsMap,
  CAcountriesStatesTable,
  UScountriesStatesTable,
} from './CountriesAndStates.constants';

export class AddressForm extends React.PureComponent {
  static propTypes = {
    handleSubmit: PropTypes.func.isRequired,
    invalid: PropTypes.bool.isRequired,
    className: PropTypes.string,
    backToAddressBookClick: PropTypes.func.isRequired,
    dispatch: PropTypes.func.isRequired,
    addressFormLabels: PropTypes.shape({}).isRequired,
    isEdit: PropTypes.bool,
    isMakeDefaultDisabled: PropTypes.bool.isRequired,
    initialValues: PropTypes.shape({
      country: PropTypes.string,
    }),
  };

  static defaultProps = {
    isEdit: false,
    initialValues: {},
    className: '',
  };

  constructor(props) {
    super(props);
    this.state = {
      country: props.initialValues.country || 'US',
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

  render() {
    const {
      handleSubmit,
      invalid,
      className,
      backToAddressBookClick,
      addressFormLabels,
      isEdit,
      isMakeDefaultDisabled,
    } = this.props;
    const { country } = this.state;
    return (
      <form className={className} onSubmit={handleSubmit} noValidate>
        <Row fullBleed>
          <Col ignoreGutter={{ small: true }} colSize={{ small: 6, medium: 4, large: 6 }}>
            <Field
              placeholder={addressFormLabels.firstName}
              name="firstName"
              id="firstName"
              type="text"
              component={TextBox}
              dataLocator="addnewaddress-firstname"
            />
          </Col>
          <Col colSize={{ small: 6, medium: 4, large: 6 }}>
            <Field
              placeholder={addressFormLabels.lastName}
              name="lastName"
              id="lastName"
              component={TextBox}
              dataLocator="addnewaddress-lastname"
            />
          </Col>
        </Row>
        <Row fullBleed>
          <Col ignoreGutter={{ small: true }} colSize={{ small: 6, medium: 4, large: 6 }}>
            <Field
              id="addressLine1"
              placeholder={addressFormLabels.addressLine1}
              component={AutoCompleteComponent}
              name="addressLine1"
              onPlaceSelected={this.handlePlaceSelected}
              componentRestrictions={Object.assign({}, { country: [country] })}
              dataLocator="addnewaddress-addressl1"
            />
          </Col>
          <Col colSize={{ small: 6, medium: 4, large: 6 }}>
            <Field
              placeholder={addressFormLabels.addressLine2}
              name="addressLine2"
              id="addressLine2"
              component={TextBox}
              dataLocator="addnewaddress-addressl2"
            />
          </Col>
        </Row>
        <Row fullBleed>
          <Col ignoreGutter={{ small: true }} colSize={{ small: 6, medium: 4, large: 6 }}>
            <Field
              id="city"
              placeholder={addressFormLabels.city}
              name="city"
              component={TextBox}
              dataLocator="addnewaddress-city"
            />
          </Col>
          <Col colSize={{ small: 3, medium: 2, large: 3 }}>
            <Field
              id="state"
              placeholder={
                country === 'CA' ? addressFormLabels.province : addressFormLabels.stateLbl
              }
              name="state"
              component={SelectBox}
              options={country === 'CA' ? CAcountriesStatesTable : UScountriesStatesTable}
              dataLocator="addnewaddress-state"
            />
          </Col>
          <Col colSize={{ small: 3, medium: 2, large: 3 }}>
            <Field
              placeholder={
                country === 'CA' ? addressFormLabels.postalCode : addressFormLabels.zipCode
              }
              id="zipCode"
              name="zipCode"
              maxLength={country === 'CA' ? 6 : 5}
              component={TextBox}
              dataLocator="addnewaddress-zipcode"
            />
          </Col>
        </Row>
        <Row fullBleed>
          <Col colSize={{ small: 6, medium: 4, large: 6 }} ignoreGutter={{ small: true }}>
            <Field
              id="country"
              placeholder={addressFormLabels.country}
              name="country"
              component={SelectBox}
              options={countriesOptionsMap}
              onChange={this.StateCountryChange}
              dataLocator="addnewaddress-country"
            />
          </Col>
          <Col colSize={{ small: 6, medium: 4, large: 6 }}>
            <Field
              placeholder={addressFormLabels.phoneNumber}
              name="phoneNumber"
              id="phoneNumber"
              component={TextBox}
              dataLocator="addnewaddress-phnumber"
              type="tel"
            />
          </Col>
        </Row>
        <Row fullBleed className="elem-mb-XL">
          <Col colSize={{ small: 4, medium: 4, large: 6 }} offsetLeft={{ small: 1 }}>
            <Field
              name="primary"
              component={InputCheckbox}
              dataLocator="addnewaddress-setdefaddress"
              disabled={isMakeDefaultDisabled}
              className="AddAddressForm__makeDefault"
            >
              {addressFormLabels.setDefaultMsg}
            </Field>
          </Col>
        </Row>
        <Row fullBleed className="AddAddressForm__ctaContainer">
          <Col
            className="AddAddressForm__cancel"
            colSize={{ small: 4, medium: 3, large: 3 }}
            offsetLeft={{ small: 1, medium: 1, large: 6 }}
          >
            <Button
              onClick={backToAddressBookClick}
              buttonVariation="fixed-width"
              type="button"
              data-locator="addnewaddress-cancel"
            >
              {addressFormLabels.cancel}
            </Button>
          </Col>
          <Col
            className="AddAddressForm__submit"
            colSize={{ small: 4, medium: 3, large: 3 }}
            offsetLeft={{ small: 1 }}
          >
            <Button
              fill="BLUE"
              disabled={invalid}
              type="submit"
              buttonVariation="fixed-width"
              data-locator="addnewaddress-addaddress"
            >
              {isEdit ? addressFormLabels.update : addressFormLabels.addAddress}
            </Button>
          </Col>
        </Row>
      </form>
    );
  }
}

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
