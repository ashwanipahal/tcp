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
  labels: object,
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
    const { handleSubmit, pristine, className, backToAddressBookClick, labels } = this.props;
    const { country } = this.state;
    return (
      <form className={className} onSubmit={handleSubmit} noValidate>
        <Row fullBleed>
          <Col ignoreGutter={{ small: true }} colSize={{ small: 6, medium: 4, large: 6 }}>
            <Field
              placeholder={labels.acc_lbl_first_name}
              name="firstName"
              id="firstName"
              type="text"
              component={TextBox}
              validate={[required, isSpecialChar]}
              maxLength={50}
              dataLocator="addnewaddress-firstname"
            />
          </Col>
          <Col colSize={{ small: 6, medium: 4, large: 6 }}>
            <Field
              placeholder={labels.acc_lbl_last_name}
              name="lastName"
              id="lastName"
              component={TextBox}
              validate={[required, isSpecialChar]}
              maxLength={50}
              dataLocator="addnewaddress-lastname"
            />
          </Col>
        </Row>
        <Row fullBleed>
          <Col ignoreGutter={{ small: true }} colSize={{ small: 6, medium: 4, large: 6 }}>
            <Field
              id="address1"
              placeholder={labels.acc_lbl_address_line1}
              component={AutoCompleteComponent}
              name="address1"
              validate={[required]}
              onPlaceSelected={this.handlePlaceSelected}
              maxLength={30}
              componentRestrictions={Object.assign({}, { country: [country] })}
              dataLocator="addnewaddress-addressl1"
            />
          </Col>
          <Col colSize={{ small: 6, medium: 4, large: 6 }}>
            <Field
              placeholder={labels.acc_lbl_address_line2}
              name="address2"
              id="address2"
              component={TextBox}
              validate={[isSpecialChar]}
              maxLength={30}
              dataLocator="addnewaddress-addressl2"
            />
          </Col>
        </Row>
        <Row fullBleed>
          <Col ignoreGutter={{ small: true }} colSize={{ small: 6, medium: 4, large: 6 }}>
            <Field
              id="city"
              placeholder={labels.acc_lbl_city}
              name="city"
              component={TextBox}
              validate={[required]}
              dataLocator="addnewaddress-city"
            />
          </Col>
          <Col colSize={{ small: 3, medium: 2, large: 3 }}>
            <Field
              id="state"
              placeholder={country === 'CA' ? labels.acc_lbl_province : labels.acc_lbl_state}
              name="state"
              validate={[required]}
              component={SelectBox}
              options={country === 'CA' ? CAcountriesStatesTable : UScountriesStatesTable}
              dataLocator="addnewaddress-state"
            />
          </Col>
          <Col colSize={{ small: 3, medium: 2, large: 3 }}>
            <Field
              placeholder={country === 'CA' ? labels.acc_lbl_postal_code : labels.acc_lbl_zip_code}
              id="zip"
              name="zip"
              component={TextBox}
              validate={[required, this.validatezip(country)]}
              maxLength={country === 'CA' ? 6 : 5}
              dataLocator="addnewaddress-zipcode"
            />
          </Col>
        </Row>
        <Row fullBleed>
          <Col colSize={{ small: 6, medium: 4, large: 6 }} ignoreGutter={{ small: true }}>
            <Field
              id="country"
              placeholder={labels.acc_lbl_country}
              name="country"
              validate={[required]}
              component={SelectBox}
              options={countriesOptionsMap}
              onChange={this.StateCountryChange}
              dataLocator="addnewaddress-country"
            />
          </Col>
          <Col colSize={{ small: 6, medium: 4, large: 6 }}>
            <Field
              placeholder={labels.acc_lbl_phone_number}
              name="phoneNumber"
              id="phoneNumber"
              component={TextBox}
              validate={[required, number, minValue10]}
              maxLength={10}
              dataLocator="addnewaddress-phnumber"
            />
          </Col>
        </Row>
        <Row fullBleed>
          <Col colSize={{ small: 4, medium: 4, large: 6 }} offsetLeft={{ small: 1 }}>
            <Field
              name="primary"
              component={InputCheckbox}
              dataLocator="addnewaddress-setdefaddress"
            >
              {labels.acc_lbl_set_default}
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
              {labels.acc_lbl_cancel_cta}
            </Button>
          </Col>
          <Col
            className="AddAddressForm__submit"
            colSize={{ small: 4, medium: 3, large: 3 }}
            offsetLeft={{ small: 1 }}
          >
            <Button
              fill="BLUE"
              disabled={pristine}
              type="submit"
              buttonVariation="fixed-width"
              data-locator="addnewaddress-addaddress"
            >
              {labels.acc_lbl_add_address_cta}
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
    address2: '',
  },
})(AddAddressForm);
