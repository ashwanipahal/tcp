// @flow
import React from 'react';
import { Field, reduxForm, change } from 'redux-form';
import { BodyCopy } from '../../../../../../../styles/themes/TCP/typotheme';
import TextBox from '../../../../../common/atoms/TextBox';
import SelectBox from '../../../../../common/atoms/Select';
import Row from '../../../../../common/atoms/Row';
import Col from '../../../../../common/atoms/Col';
import Button from '../../../../../common/atoms/Button';

import {
  required,
  maxLength50,
  maxLength30,
  specialChar,
  number,
  zipcodeUS,
  zipcodeCA,
} from '../../../../../common/hoc/formsValidation/FormValidation';
import { LabeledInputGoogleAutoComplete } from '../../../../../common/atoms/AddressAutoSuggest/LabeledInputGoogleAutoComplete';
import {
  countriesOptionsMap,
  CAcountriesStatesTable,
  UScountriesStatesTable,
} from './CountriesAndStates';

type Props = {
  handleSubmit: any,
  pristine: any,
  reset: any,
  submitting?: any,
  className: any,
  dispatch: Function,
};

type State = {
  city: string,
  zip: string,
  country: string,
  state: string,
};
// const AddressValidationForm = ({ handleSubmit, pristine, reset, submitting }: Props): Node => (

class AddressValidationForm extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.handleBlur = this.handleBlur.bind(this);
    this.state = {
      city: '',
      zip: '',
      country: '',
      state: '',
    };
  }

  validatezip = country => {
    return country === 'Canada' ? zipcodeCA : zipcodeUS;
  };

  handleBlur = e => {
    if (e.target.value) {
      e.target.parentElement.classList.add('active');
    } else e.target.parentElement.classList.remove('active');
  };

  StateCountryChange = e => {
    this.setState({
      country: e.target.value ? e.target.value : '',
    });
  };

  handleChange = event => {
    this.setState({ [event.target.id]: event.target.value });
  };

  handlePlaceSelected = (place, inputValue) => {
    const address = LabeledInputGoogleAutoComplete.getAddressFromPlace(place, inputValue);
    const { dispatch } = this.props;
    this.setState({
      city: address.city,
      zip: address.zip,
      state: address.state,
      country: address.country,
    });
    dispatch(change('AddressValidationForm', 'city', address.city));
    dispatch(change('AddressValidationForm', 'zip', address.zip));
    dispatch(change('AddressValidationForm', 'state', address.state));
    dispatch(change('AddressValidationForm', 'country', address.country));
    dispatch(change('AddressValidationForm', 'street', address.street));
  };

  render() {
    const { handleSubmit, pristine, reset, submitting, className } = this.props;
    const { city, zip, state, country } = this.state;
    return (
      <form className={className} onSubmit={handleSubmit}>
        <Row>
          <Col colSize={{ small: 6, medium: 1, large: 6 }}>
            <Field
              placeholder="First Name"
              name="FirstName"
              type="text"
              component={TextBox}
              label="First-Nam"
              validate={[required, maxLength50, specialChar]}
              onBlur={this.handleBlur}
            />
          </Col>
          <Col colSize={{ small: 6, medium: 1, large: 6 }}>
            <Field
              placeholder="Last Name"
              name="LastName"
              component={TextBox}
              validate={[required, maxLength50, specialChar]}
              onBlur={this.handleBlur}
            />
          </Col>
        </Row>
        <br />
        <Row>
          <Col colSize={{ small: 6, medium: 1, large: 6 }}>
            <Field
              id="addressField"
              placeholder="Address Line 1"
              component={LabeledInputGoogleAutoComplete}
              name="address1"
              validate={[required]}
              onPlaceSelected={this.handlePlaceSelected}
              onBlur={this.handleBlur}
            />
          </Col>
          <Col colSize={{ small: 6, medium: 1, large: 6 }}>
            <Field
              placeholder="Address Line 2( Optional )"
              name="address-2"
              component={TextBox}
              validate={[specialChar, maxLength30]}
            />
          </Col>
        </Row>
        <br />
        <Row>
          <Col colSize={{ small: 6, medium: 1, large: 6 }}>
            <Field
              id="city"
              placeholder="City"
              name="city"
              component={TextBox}
              validate={[required]}
              Value={city}
              onBlur={this.handleBlur}
              onChange={this.handleChange}
            />
          </Col>
          <Col colSize={{ small: 3, medium: 1, large: 3 }}>
            <Field
              defaultValue={state}
              placeholder={country === 'Canada' ? 'Province' : 'State'}
              name="state"
              validate={[required]}
              component={SelectBox}
              onBlur={this.handleBlur}
              options={country === 'Canada' ? CAcountriesStatesTable : UScountriesStatesTable}
            />
          </Col>
          <Col colSize={{ small: 3, medium: 1, large: 3 }}>
            <Field
              placeholder={country === 'Canada' ? 'Postal Code' : 'Zip Code'}
              Value={zip}
              id="zip"
              name="zip"
              component={TextBox}
              validate={[required, this.validatezip(country)]}
              onBlur={this.handleBlur}
              onChange={this.handleChange}
              maxLength={country === 'Canada' ? 7 : 5}
            />
          </Col>
        </Row>
        <br />
        <Row>
          <Col colSize={{ small: 6, medium: 1, large: 6 }}>
            <Field
              onChange={this.StateCountryChange}
              placeholder="country"
              name="country"
              validate={[required]}
              onBlur={this.handleBlur}
              defaultValue={country}
              value={country}
              component={SelectBox}
              options={countriesOptionsMap}
            />
          </Col>
          <Col colSize={{ small: 6, medium: 1, large: 6 }}>
            <Field
              placeholder="phone number"
              name="phone-number"
              component={TextBox}
              onBlur={this.handleBlur}
              validate={[required, number]}
            />
          </Col>
        </Row>
        <br />
        <Row>
          <Col colSize={{ small: 6, medium: 1, large: 6 }}>
            <BodyCopy tag="label">
              <Field
                className="checkbox-align"
                name="default-ship"
                id="default-ship"
                component={TextBox}
                type="checkbox"
              />
              <BodyCopy tag="span">Set as default shipping addres</BodyCopy>
            </BodyCopy>
          </Col>
        </Row>
        <br />
        <Row className="button_wrapper">
          <Col className="cancel" colSize={{ small: 6, medium: 1, large: 3 }}>
            <Button
              buttonVariation="fixed-width"
              type="button"
              disabled={pristine || submitting}
              onClick={reset}
            >
              Cancel
            </Button>
          </Col>
          <Col className="submit" colSize={{ small: 6, medium: 1, large: 3 }}>
            <Button ButtonColor="BLUE" type="submit" text="BLUE" buttonVariation="fixed-width">
              Add Address
            </Button>
          </Col>
        </Row>
        <br />
      </form>
    );
  }
}

AddressValidationForm.defaultProps = {
  submitting: true,
};
export default reduxForm({
  form: 'AddressValidationForm', // a unique identifier for this form
})(AddressValidationForm);
