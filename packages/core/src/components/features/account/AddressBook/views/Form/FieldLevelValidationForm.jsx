// @flow
import React from 'react';
import { Field, reduxForm, FormSection, submit, Form } from 'redux-form';
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
} from '../../../../../common/hoc/formsValidation/FormValidation';
import { LabeledInputGoogleAutoComplete } from '../../../../../common/atoms/AddressAutoSuggest/LabeledInputGoogleAutoComplete';
import {
  countriesOptionsMap,
  CAcountriesStatesTable,
  UScountriesStatesTable,
} from './CountriesAndStates';

const EMPTY_MAP = [];
type Props = {
  handleSubmit: any,
  pristine: any,
  reset: any,
  submitting?: any,
};

type State = {
  city: string,
  zip: string,
};
// const AddressValidationForm = ({ handleSubmit, pristine, reset, submitting }: Props): Node => (

class AddressValidationForm extends React.PureComponent<Props, State> {
  // const { handleSubmit, pristine, reset, submitting } = props;
  constructor(props: Props) {
    super(props);
    this.handlePlaceSelected = this.handlePlaceSelected.bind(this);
    this.handleBlur = this.handleBlur.bind(this);
    this.handleFocus = this.handleFocus.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.addressSet = false;
    this.state = {
      city: '',
      zip: '',
      country: '',
      state: '',
    };
  }
  handleBlur = e => {
    e.target.value
      ? e.target.parentElement.classList.add('active')
      : e.target.parentElement.classList.remove('active');

    // notify our listeners that this component is blured
    // if (this.props.input && this.props.input.onBlur) this.props.input.onBlur(event);
  };

  StateCountryChange = e => {
    this.setState({
      country: e.target.value ? e.target.value : '',
    });
    console.log(e.target.value);
  };
  // handles focus events of the input element of this component
  handleFocus(event) {
    this.setState({
      isFocused: true,
    });

    // notify our listeners that this component is blured
  }

  // handles change events of the input element of this component
  handleChange(event) {
    if (this.addressSet === true) {
      this.addressSet = false;
    } else {
      this.setState({ [event.target.id]: event.target.value });
    }

    // notify our listeners that this component is blured
  }
  mapValuesToStateProps(values) {
    let statesOptionsMap = values.country
      ? this.props.countriesStatesTable[values.country] || EMPTY_MAP
      : EMPTY_MAP;

    return {
      optionsMap: statesOptionsMap,
      title: values.country === 'US' ? 'State' : 'Province',

      // reset state if country changed.
      // null indicates to validation that the user should select a state
      // '' indicates to validation that there are no states associated with this country
    };
  }

  handlePlaceSelected(place, inputValue) {
    debugger;
    let address = LabeledInputGoogleAutoComplete.getAddressFromPlace(place, inputValue);
    this.addressSet = true;
    this.setState({
      city: address.city,
      zip: address.zip,
      state: address.state,
      country: address.country,
    });
  }

  handleSubmit = e => {
    debugger;
    e.preventDefault();
    console.log(e);
    // const { onSubmit } = this.props;
    // const { email, password } = this.state;
    // onSubmit({
    //   storeId: '10151',
    //   logonId1: email,
    //   logonPassword1: password,
    //   rememberCheck: true,
    //   rememberMe: true,
    //   requesttype: 'ajax',
    //   reLogonURL: 'TCPAjaxLogonErrorView',
    //   URL: 'TCPAjaxLogonSuccessView',
    //   registryAccessPreference: 'Public',
    //   calculationUsageId: -1,
    //   createIfEmpty: 1,
    //   deleteIfEmpty: '*',
    //   fromOrderId: '*',
    //   toOrderId: '.',
    //   updatePrices: 0,
    //   xCreditCardId: '',
    //   userId: '-1002',
    // });
  };

  render() {
    const { handleSubmit, pristine, reset, submitting } = this.props;
    return (
      <form onSubmit={handleSubmit}>
        <Row>
          <Col colSize={{ small: 1, medium: 1, large: 6 }}>
            <Field
              placeholder="First Name"
              name="First-Name"
              type="text"
              component={TextBox}
              label="First-Nam"
              validate={[required, maxLength50, specialChar]}
              onBlur={this.handleBlur}
              onFocus={this.handleFocus}
            />
          </Col>
          <Col colSize={{ small: 1, medium: 1, large: 6 }}>
            <Field
              placeholder="Last Name"
              name="Last-Name"
              component={TextBox}
              validate={[required, maxLength50, specialChar]}
              onBlur={this.handleBlur}
            />
          </Col>
        </Row>
        <br />
        <Row>
          <Col colSize={{ small: 1, medium: 1, large: 6 }}>
            <Field
              id="addressField"
              placeholder="Address Line 1"
              component={LabeledInputGoogleAutoComplete}
              name="address-1"
              validate={[required]}
              onPlaceSelected={this.handlePlaceSelected}
              onBlur={this.handleBlur}
              onFocus={this.handleFocus}
            />
          </Col>
          <Col colSize={{ small: 1, medium: 1, large: 6 }}>
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
          <Col colSize={{ small: 1, medium: 1, large: 6 }}>
            <Field
              id="city"
              placeholder="City"
              name="city"
              component={TextBox}
              validate={[required, specialChar]}
              Value={this.state.city}
              onBlur={this.handleBlur}
              onFocus={this.handleFocus}
              onChange={this.handleChange}
            />
          </Col>
          <Col colSize={{ small: 1, medium: 1, large: 3 }}>
            <Field
              defaultValue={this.state.state}
              placeholder={this.state.country === 'Canada' ? 'Province' : 'State'}
              name="state"
              validate={[required]}
              value={this.state.state}
              component={SelectBox}
              onBlur={this.handleBlur}
              options={
                this.state.country === 'Canada' ? CAcountriesStatesTable : UScountriesStatesTable
              }
            />
          </Col>
          <Col colSize={{ small: 1, medium: 1, large: 3 }}>
            <Field
              placeholder={this.state.country === 'Canada' ? 'Postal Code' : 'Zip Code'}
              id="Zip"
              name="zip"
              component={TextBox}
              validate={[required, number]}
              onBlur={this.handleBlur}
              Value={this.state.zip}
            />
          </Col>
        </Row>
        <br />
        <Row>
          <Col colSize={{ small: 1, medium: 1, large: 6 }}>
            <Field
              onChange={this.StateCountryChange}
              placeholder="country"
              name="country"
              validate={[required]}
              onBlur={this.handleBlur}
              defaultValue={this.state.country}
              value={this.state.country}
              component={SelectBox}
              options={countriesOptionsMap}
            />
          </Col>
          <Col colSize={{ small: 1, medium: 1, large: 6 }}>
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
          <Col colSize={{ small: 1, medium: 1, large: 12 }}>
            <Field name="default-ship" id="default-ship" component={TextBox} type="checkbox" />
            Set as default shipping addres
          </Col>
        </Row>
        <br />
        <Row>
          <Col colSize={{ small: 1, medium: 1, large: 3 }}>
            <Button
              buttonVariation="fixed-width"
              type="button"
              disabled={pristine || submitting}
              onClick={reset}
            >
              Cancel
            </Button>
          </Col>
          <Col colSize={{ small: 1, medium: 1, large: 3 }}>
            <Button type="submit" text="BLUE" buttonVariation="fixed-width">
              Add Address
            </Button>
          </Col>
        </Row>
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
