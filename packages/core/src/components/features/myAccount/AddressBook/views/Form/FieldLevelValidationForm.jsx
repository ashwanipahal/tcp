// @flow
import React from 'react';
import { Field, reduxForm, FormSection } from 'redux-form';
import TextBox from '../../../../../common/atoms/TextBox';
import Row from '../../../../../common/atoms/Row';
import Col from '../../../../../common/atoms/Col';
import Button from '../../../../../common/atoms/Button';
import { required, maxLength15 } from '../../../../../common/hoc/formsValidation/FormValidation';
import { LabeledInputGoogleAutoComplete } from '../../../../../common/atoms/AddressAutoSuggest/LabeledInputGoogleAutoComplete';
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
    this.addressSet = false;
    this.state = {
      city: '',
      zip: '',
    };
  }
  handleBlur(event) {
    debugger;
    this.setState({
      isFocused: false,
    });

    // notify our listeners that this component is blured
    if (this.props.input && this.props.input.onBlur) this.props.input.onBlur(event);
  }

  // handles focus events of the input element of this component
  handleFocus(event) {
    this.setState({
      isFocused: true,
    });

    // notify our listeners that this component is blured
    // if (this.props.input && this.props.input.onFocus) this.props.input.onFocus(event);
  }

  // handles change events of the input element of this component
  handleChange(event) {
    if (this.addressSet === true) {
      this.addressSet = false;
    } else {
      this.setState({ [event.target.id]: event.target.value });
    }

    // notify our listeners that this component is blured
    // if (this.props.input && this.props.input.onChange) this.props.input.onChange(event);
  }
  mapValuesToStateProps(values) {
    let statesOptionsMap = values.country
      ? this.props.countriesStatesTable[values.country] || EMPTY_MAP
      : EMPTY_MAP;

    return {
      optionsMap: statesOptionsMap,
      title: values.country === 'US' ? 'State' : 'Province',
      //      disabled: !statesOptionsMap,
      // reset state if country changed.
      // null indicates to validation that the user should select a state
      // '' indicates to validation that there are no states associated with this country
      //  _newValue: statesOptionsMap ? null : ''
    };
  }

  handlePlaceSelected(place, inputValue) {
    let address = LabeledInputGoogleAutoComplete.getAddressFromPlace(place, inputValue);
    this.addressSet = true;
    this.setState({
      city: address.city,
      zip: address.zip,
      street: address.street,
    }); // obtain a new address object based on the given place
    // let country = this.props.countriesOptionsMap.find((country) =>
    //   country.id.toUpperCase() === address.country.toUpperCase() ||
    //   country.displayName.toUpperCase() === address.country.toUpperCase()
    // );
    // if (!country) {
    //   return;             // service returned an address in another country -> ignore
    // }
    // dispatch actions to the redux store to change the values of the relevant form fields
  }

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
              validate={[required, maxLength15]}
            />
            {/* <Field floatingLabel="float" label="Username" ype="text" placeholder="First Name" component={TextBox} validate={[ required, maxLength15 ]} /> */}
          </Col>
          <Col colSize={{ small: 1, medium: 1, large: 6 }}>
            <Field
              placeholder="Last Name"
              name="Last-Name"
              component={TextBox}
              validate={[required, maxLength15]}
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
              Value={this.state.street}
              onBlur={this.handleBlur}
              onFocus={this.handleFocus}
            />
          </Col>
          <Col colSize={{ small: 1, medium: 1, large: 6 }}>
            <Field
              placeholder="Address Line 2( Optional )"
              name="address-2"
              component={TextBox}
              validate={[required]}
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
              validate={[required]}
              Value={this.state.city}
              onBlur={this.handleBlur}
              onFocus={this.handleFocus}
              onChange={this.handleChange}
            />
          </Col>
          <Col colSize={{ small: 1, medium: 1, large: 3 }}>
            <select>
              <option value="" disabled>
                dfdfdf fdfs fdsfs
              </option>
            </select>
          </Col>
          <Col colSize={{ small: 1, medium: 1, large: 3 }}>
            <Field
              placeholder="Zip"
              id="Zip"
              name="zip"
              component={TextBox}
              validate={[required]}
              Value={this.state.zip}
              onBlur={this.handleBlur}
              onFocus={this.handleFocus}
              onChange={this.handleChange}
            />
          </Col>
        </Row>
        <br />
        <Row>
          <Col colSize={{ small: 1, medium: 1, large: 6 }}>
            <select>
              <option value="">dfdfdf fdfs fdsfs</option>
            </select>
          </Col>
          <Col colSize={{ small: 1, medium: 1, large: 6 }}>
            <Field
              placeholder="phone number"
              name="phone-number"
              component={TextBox}
              validate={[required]}
            />
          </Col>
        </Row>
        <br />
        <Row>
          <Col colSize={{ small: 1, medium: 1, large: 12 }}>
            <Field name="employed" id="employed" component={TextBox} type="checkbox" />
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
