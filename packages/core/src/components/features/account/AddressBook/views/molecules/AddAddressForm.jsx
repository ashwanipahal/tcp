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
  pristine: any,
  className: any,
  backToAddressBookClick: any,
  dispatch: any,
};

type State = {
  country: string,
};
export class AddAddressForm extends React.PureComponent<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      country: 'US',
    };
  }

  validatezip = (country: string) => {
    return country === 'CA' ? zipcodeCA : zipcodeUS;
  };

  StateCountryChange = (e: Object) => {
    this.setState({
      country: e.target.value ? e.target.value : '',
    });
  };

  handlePlaceSelected = (place: Object, inputValue: string) => {
    const { dispatch } = this.props;
    const address = AutoCompleteComponent.getAddressFromPlace(place, inputValue);
    dispatch(change('AddAddressForm', 'city', address.city));
    dispatch(change('AddAddressForm', 'zip', address.zip));
    dispatch(change('AddAddressForm', 'state', address.state));
    dispatch(change('AddAddressForm', 'address1', address.street));
  };

  render() {
    const { handleSubmit, pristine, className, backToAddressBookClick } = this.props;
    const { country } = this.state;
    return (
      <form className={className} onSubmit={handleSubmit} noValidate>
        <Row fullBleed>
          <Col ignoreGutter={{ small: true }} colSize={{ small: 6, medium: 1, large: 6 }}>
            <Field
              placeholder="First Name"
              name="firstName"
              id="firstName"
              type="text"
              component={TextBox}
              validate={[required, isSpecialChar]}
              maxLength={50}
            />
          </Col>
          <Col colSize={{ small: 6, medium: 1, large: 6 }}>
            <Field
              placeholder="Last Name"
              name="lastName"
              id="lastName"
              component={TextBox}
              validate={[required, isSpecialChar]}
              maxLength={50}
            />
          </Col>
        </Row>
        <Row fullBleed>
          <Col ignoreGutter={{ small: true }} colSize={{ small: 6, medium: 1, large: 6 }}>
            <Field
              id="address1"
              placeholder="Address Line 1"
              component={AutoCompleteComponent}
              name="address1"
              validate={[required]}
              onPlaceSelected={this.handlePlaceSelected}
              maxLength={30}
              componentRestrictions={Object.assign({}, { country: [country] })}
            />
          </Col>
          <Col colSize={{ small: 6, medium: 1, large: 6 }}>
            <Field
              placeholder="Address Line 2( Optional )"
              name="address2"
              id="address2"
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
            />
          </Col>
          <Col colSize={{ small: 3, medium: 1, large: 3 }}>
            <Field
              id="state"
              placeholder={country === 'CA' ? 'Province' : 'State'}
              name="state"
              validate={[required]}
              component={SelectBox}
              options={country === 'CA' ? CAcountriesStatesTable : UScountriesStatesTable}
            />
          </Col>
          <Col colSize={{ small: 3, medium: 1, large: 3 }}>
            <Field
              placeholder={country === 'CA' ? 'Postal Code' : 'Zip Code'}
              id="zip"
              name="zip"
              component={TextBox}
              validate={[required, this.validatezip(country)]}
              maxLength={country === 'CA' ? 6 : 5}
            />
          </Col>
        </Row>
        <Row fullBleed>
          <Col colSize={{ small: 6, medium: 1, large: 6 }}>
            <Field
              id="country"
              placeholder="Country"
              name="country"
              validate={[required]}
              component={SelectBox}
              options={countriesOptionsMap}
              onChange={this.StateCountryChange}
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
              label="Set as default shipping address"
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
            <Button fill="BLUE" disabled={pristine} type="submit" buttonVariation="fixed-width">
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
  initialValues: {
    country: 'US',
  },
})(AddAddressForm);
