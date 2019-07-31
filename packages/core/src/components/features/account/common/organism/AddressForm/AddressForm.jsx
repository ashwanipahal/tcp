import React from 'react';
import { Field, reduxForm, change } from 'redux-form';
import TextBox from '../../../../../common/atoms/TextBox';
import SelectBox from '../../../../../common/atoms/Select';
import InputCheckbox from '../../../../../common/atoms/InputCheckbox';
import Row from '../../../../../common/atoms/Row';
import Col from '../../../../../common/atoms/Col';
import Button from '../../../../../common/atoms/Button';
import createValidateMethod from '../../../../../../utils/formValidation/createValidateMethod';
import getStandardConfig from '../../../../../../utils/formValidation/validatorStandardConfig';
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
  isEdit?: boolean,
  isMakeDefaultDisabled?: boolean,
};

type State = {
  country: string,
};
export class AddressForm extends React.PureComponent<Props, State> {
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
      pristine,
      className,
      backToAddressBookClick,
      labels,
      isEdit,
      isMakeDefaultDisabled,
    } = this.props;
    const { country } = this.state;
    return (
      <form className={className} onSubmit={handleSubmit} noValidate>
        <Row fullBleed>
          <Col ignoreGutter={{ small: true }} colSize={{ small: 6, medium: 4, large: 6 }}>
            <Field
              placeholder={labels.addressBook.ACC_LBL_FIRST_NAME}
              name="firstName"
              id="firstName"
              type="text"
              component={TextBox}
              dataLocator="addnewaddress-firstname"
            />
          </Col>
          <Col colSize={{ small: 6, medium: 4, large: 6 }}>
            <Field
              placeholder={labels.addressBook.ACC_LBL_LAST_NAME}
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
              placeholder={labels.addressBook.ACC_LBL_ADDRESS_LINE1}
              component={AutoCompleteComponent}
              name="addressLine1"
              onPlaceSelected={this.handlePlaceSelected}
              componentRestrictions={Object.assign({}, { country: [country] })}
              dataLocator="addnewaddress-addressl1"
            />
          </Col>
          <Col colSize={{ small: 6, medium: 4, large: 6 }}>
            <Field
              placeholder={labels.addressBook.ACC_LBL_ADDRESS_LINE2}
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
              placeholder={labels.addressBook.ACC_LBL_CITY}
              name="city"
              component={TextBox}
              dataLocator="addnewaddress-city"
            />
          </Col>
          <Col colSize={{ small: 3, medium: 2, large: 3 }}>
            <Field
              id="state"
              placeholder={
                country === 'CA'
                  ? labels.addressBook.ACC_LBL_PROVINCE
                  : labels.addressBook.ACC_LBL_STATE
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
                country === 'CA'
                  ? labels.addressBook.ACC_LBL_POSTAL_CODE
                  : labels.addressBook.ACC_LBL_ZIP_CODE
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
              placeholder={labels.addressBook.ACC_LBL_COUNTRY}
              name="country"
              component={SelectBox}
              options={countriesOptionsMap}
              onChange={this.StateCountryChange}
              dataLocator="addnewaddress-country"
            />
          </Col>
          <Col colSize={{ small: 6, medium: 4, large: 6 }}>
            <Field
              placeholder={labels.addressBook.ACC_LBL_PHONE_NUMBER}
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
            >
              {labels.addressBook.ACC_LBL_SET_DEFAULT}
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
              {labels.common.ACC_LBL_CANCEL_CTA_CAPS}
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
              {isEdit
                ? labels.common.ACC_LBL_UPDATE_ADDRESS_CTA
                : labels.addressBook.ACC_LBL_ADD_ADDRESS_CTA}
            </Button>
          </Col>
        </Row>
      </form>
    );
  }
}

AddressForm.defaultProps = {
  isEdit: false,
  isMakeDefaultDisabled: false,
};

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
