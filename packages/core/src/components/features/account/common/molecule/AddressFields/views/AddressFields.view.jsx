import React from 'react';
import { Field, change } from 'redux-form';
import TextBox from '../../../../../../common/atoms/TextBox';
import SelectBox from '../../../../../../common/atoms/Select';
import InputCheckbox from '../../../../../../common/atoms/InputCheckbox';
import Row from '../../../../../../common/atoms/Row';
import Col from '../../../../../../common/atoms/Col';
import getStandardConfig from '../../../../../../../utils/formValidation/validatorStandardConfig';
import { AutoCompleteComponent } from '../../../../../../common/atoms/GoogleAutoSuggest/AutoCompleteComponent';
import {
  countriesOptionsMap,
  CAcountriesStatesTable,
  UScountriesStatesTable,
} from '../../../organism/AddressForm/CountriesAndStates.constants';

// @flow
type Props = {
  dispatch: any,
  labels: object,
  isMakeDefaultDisabled?: boolean,
  formName: string,
  showDefaultCheckbox?: boolean,
  showPhoneNumber?: boolean,
  formSection?: string,
};

type State = {
  country: string,
};

export class AddressFields extends React.PureComponent<Props, State> {
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
  ]);

  constructor(props: Props) {
    super(props);
    this.state = {
      country: 'US',
    };
  }

  StateCountryChange = (e: Object) => {
    this.setState({
      country: e.target.value ? e.target.value : '',
    });
  };

  handlePlaceSelected = (place: Object, inputValue: string) => {
    const { dispatch, formName, formSection } = this.props;
    const address = AutoCompleteComponent.getAddressFromPlace(place, inputValue);
    dispatch(change(formName, `${formSection ? 'address.' : ''}city`, address.city));
    dispatch(change(formName, `${formSection ? 'address.' : ''}zipCode`, address.zip));
    dispatch(change(formName, `${formSection ? 'address.' : ''}state`, address.state));
    dispatch(change(formName, `${formSection ? 'address.' : ''}addressLine1`, address.street));
  };

  render() {
    const { labels, isMakeDefaultDisabled, showDefaultCheckbox, showPhoneNumber } = this.props;
    const { country } = this.state;
    return (
      <React.Fragment>
        <Row fullBleed>
          <Col ignoreGutter={{ small: true }} colSize={{ small: 6, medium: 4, large: 6 }}>
            <Field
              placeholder={labels.acc_lbl_first_name}
              name="firstName"
              id="firstName"
              type="text"
              component={TextBox}
              dataLocator="addnewaddress-firstname"
            />
          </Col>
          <Col colSize={{ small: 6, medium: 4, large: 6 }}>
            <Field
              placeholder={labels.acc_lbl_last_name}
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
              placeholder={labels.acc_lbl_address_line1}
              component={AutoCompleteComponent}
              name="addressLine1"
              onPlaceSelected={this.handlePlaceSelected}
              componentRestrictions={Object.assign({}, { country: [country] })}
              dataLocator="addnewaddress-addressl1"
            />
          </Col>
          <Col colSize={{ small: 6, medium: 4, large: 6 }}>
            <Field
              placeholder={labels.acc_lbl_address_line2}
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
              placeholder={labels.acc_lbl_city}
              name="city"
              component={TextBox}
              dataLocator="addnewaddress-city"
            />
          </Col>
          <Col colSize={{ small: 3, medium: 2, large: 3 }}>
            <Field
              id="state"
              placeholder={country === 'CA' ? labels.acc_lbl_province : labels.acc_lbl_state}
              name="state"
              component={SelectBox}
              options={country === 'CA' ? CAcountriesStatesTable : UScountriesStatesTable}
              dataLocator="addnewaddress-state"
            />
          </Col>
          <Col colSize={{ small: 3, medium: 2, large: 3 }}>
            <Field
              placeholder={country === 'CA' ? labels.acc_lbl_postal_code : labels.acc_lbl_zip_code}
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
              placeholder={labels.acc_lbl_country}
              name="country"
              component={SelectBox}
              options={countriesOptionsMap}
              onChange={this.StateCountryChange}
              dataLocator="addnewaddress-country"
            />
          </Col>
          {showPhoneNumber && (
            <Col colSize={{ small: 6, medium: 4, large: 6 }}>
              <Field
                placeholder={labels.acc_lbl_phone_number}
                name="phoneNumber"
                id="phoneNumber"
                component={TextBox}
                dataLocator="addnewaddress-phnumber"
                type="tel"
              />
            </Col>
          )}
        </Row>
        {showDefaultCheckbox && (
          <Row fullBleed className="elem-mb-XL">
            <Col colSize={{ small: 4, medium: 4, large: 6 }} offsetLeft={{ small: 1 }}>
              <Field
                name="primary"
                component={InputCheckbox}
                dataLocator="addnewaddress-setdefaddress"
                disabled={isMakeDefaultDisabled}
              >
                {labels.acc_lbl_set_default}
              </Field>
            </Col>
          </Row>
        )}
      </React.Fragment>
    );
  }
}

AddressFields.defaultProps = {
  isMakeDefaultDisabled: false,
  showDefaultCheckbox: true,
  showPhoneNumber: true,
  formSection: '',
};

export default AddressFields;
