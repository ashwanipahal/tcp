import React from 'react';
import { Field, reduxForm, change } from 'redux-form';
import TextBox from '../../../../../common/atoms/TextBox';
import SelectBox from '../../../../../common/atoms/Select';
import InputCheckbox from '../../../../../common/atoms/InputCheckbox';
import Row from '../../../../../common/atoms/Row';
import Col from '../../../../../common/atoms/Col';
import Button from '../../../../../common/atoms/Button';

import {
  required,
  minValue10,
  isSpecialChar,
  number,
  zipcodeUS,
  zipcodeCA,
} from '../../../../../../utils/FormValidation';
import { AutoCompleteComponent } from '../../../../../common/atoms/GoogleAutoSuggest/AutoCompleteComponent';
import {
  countriesOptionsMap,
  CAcountriesStatesTable,
  UScountriesStatesTable,
} from './CountriesAndStates.constants';
// @flow
type Props = {
  handleSubmit: any,
  invalid: any,
  className: any,
  dispatch: Function,
  backToAddressBookClick: any,
};

type State = {
  city: string,
  zip: string,
  country: string,
  state: string,
  street: string,
};
// const AddressValidationForm = ({ handleSubmit, pristine, reset, submitting }: Props): Node => (

export class AddAddressForm extends React.PureComponent<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      city: '',
      zip: '',
      country: 'United States',
      state: '',
    };
  }

  validatezip = (country: string) => {
    return country === 'Canada' ? zipcodeCA : zipcodeUS;
  };

  StateCountryChange = (e: Object) => {
    this.setState({
      country: e.target.value ? e.target.value : '',
    });
  };

  handleChange = (event: Object) => {
    this.setState({ [event.target.id]: event.target.value });
  };

  handlePlaceSelected = (place: Object, inputValue: string) => {
    const address = AutoCompleteComponent.getAddressFromPlace(place, inputValue);
    const { dispatch } = this.props;
    dispatch(change('AddAddressForm', 'city', address.city));
    dispatch(change('AddAddressForm', 'zip', address.zip));
    dispatch(change('AddAddressForm', 'state', address.state));
    dispatch(change('AddAddressForm', 'country', address.country));
    dispatch(change('AddAddressForm', 'address1', address.street));
  };

  render() {
    const { handleSubmit, invalid, className, backToAddressBookClick } = this.props;
    const { city, zip, state, country } = this.state;
    const selectedCountry = country === 'United States' ? 'US' : 'CA';
    return (
      <form className={className} onSubmit={handleSubmit} noValidate>
        <Row fullBleed>
          <Col ignoreGutter={{ small: true }} colSize={{ small: 6, medium: 1, large: 6 }}>
            <Field
              placeholder="First Name"
              name="FirstName"
              type="text"
              component={TextBox}
              label="First-Nam"
              validate={[required, isSpecialChar]}
              maxLength={50}
            />
          </Col>
          <Col colSize={{ small: 6, medium: 1, large: 6 }}>
            <Field
              placeholder="Last Name"
              name="LastName"
              component={TextBox}
              validate={[required, isSpecialChar]}
              maxLength={50}
            />
          </Col>
        </Row>
        <Row fullBleed>
          <Col ignoreGutter={{ small: true }} colSize={{ small: 6, medium: 1, large: 6 }}>
            <Field
              id="addressField"
              placeholder="Address Line 1"
              component={AutoCompleteComponent}
              name="address1"
              validate={[required]}
              onPlaceSelected={this.handlePlaceSelected}
              maxLength={30}
              componentRestrictions={Object.assign({}, { country: [selectedCountry] })}
            />
          </Col>
          <Col colSize={{ small: 6, medium: 1, large: 6 }}>
            <Field
              placeholder="Address Line 2( Optional )"
              name="address2"
              component={TextBox}
              validate={[isSpecialChar]}
              maxLength={30}
            />
          </Col>
        </Row>
        <Row fullBleed>
          <Col ignoreGutter={{ small: true }} colSize={{ small: 6, medium: 1, large: 6 }}>
            <Field
              id="city"
              placeholder="City"
              name="city"
              component={TextBox}
              validate={[required]}
              value={city}
              onChange={this.handleChange}
            />
          </Col>
          <Col colSize={{ small: 3, medium: 1, large: 3 }}>
            <Field
              id="state"
              defaultValue={state}
              placeholder={country === 'Canada' ? 'Province' : 'State'}
              name="state"
              validate={[required]}
              component={SelectBox}
              options={country === 'Canada' ? CAcountriesStatesTable : UScountriesStatesTable}
            />
          </Col>
          <Col colSize={{ small: 3, medium: 1, large: 3 }}>
            <Field
              placeholder={country === 'Canada' ? 'Postal Code' : 'Zip Code'}
              id="zip"
              name="zip"
              value={zip}
              component={TextBox}
              validate={[required, this.validatezip(country)]}
              onChange={this.handleChange}
              maxLength={country === 'Canada' ? 7 : 5}
            />
          </Col>
        </Row>
        <Row fullBleed>
          <Col colSize={{ small: 6, medium: 1, large: 6 }}>
            <Field
              id="country"
              onChange={this.StateCountryChange}
              placeholder="Country"
              name="country"
              validate={[required]}
              value={country}
              component={SelectBox}
              options={countriesOptionsMap}
            />
          </Col>
          <Col colSize={{ small: 6, medium: 1, large: 6 }}>
            <Field
              placeholder="Mobile Number"
              name="phoneNumber"
              id="phoneNumber"
              component={TextBox}
              validate={[required, number, minValue10]}
              maxLength={10}
            />
          </Col>
        </Row>
        <Row fullBleed>
          <Col colSize={{ small: 6, medium: 1, large: 6 }}>
            <Field
              name="primary"
              component={InputCheckbox}
              label="Set as default shipping addres"
              validate={[required]}
            />
          </Col>
        </Row>
        <Row className="button_wrapper">
          <Col className="cancel" colSize={{ small: 6, medium: 1, large: 3 }}>
            <Button onClick={backToAddressBookClick} buttonVariation="fixed-width" type="button">
              Cancel
            </Button>
          </Col>
          <Col className="submit" colSize={{ small: 6, medium: 1, large: 3 }}>
            <Button
              fill="BLUE"
              disabled={invalid}
              type="submit"
              text="BLUE"
              buttonVariation="fixed-width"
            >
              Add Address
            </Button>
          </Col>
        </Row>
      </form>
    );
  }
}

export default reduxForm({
  form: 'AddAddressForm', // a unique identifier for this form
})(AddAddressForm);
