import React from 'react';
import PropTypes from 'prop-types';
import withStyles from '@tcp/core/src/components/common/hoc/withStyles';
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
} from '../../../../../../common/organisms/AddressForm/CountriesAndStates.constants';
import styles from '../styles/AddressFields.style';

export class AddressFields extends React.PureComponent {
  static propTypes = {
    dispatch: PropTypes.func.isRequired,
    labels: PropTypes.shape({}).isRequired,
    isMakeDefaultDisabled: PropTypes.bool,
    formName: PropTypes.string.isRequired,
    showDefaultCheckbox: PropTypes.bool,
    showPhoneNumber: PropTypes.bool,
    formSection: PropTypes.string,
    className: PropTypes.string,
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
  ]);

  constructor(props) {
    super(props);
    this.state = {
      country: 'US',
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

  render() {
    const {
      labels,
      isMakeDefaultDisabled,
      showDefaultCheckbox,
      showPhoneNumber,
      className,
    } = this.props;
    const { country } = this.state;
    return (
      <div className={className}>
        <Row fullBleed>
          <Col ignoreGutter={{ small: true }} colSize={{ small: 6, medium: 4, large: 6 }}>
            <Field
              placeholder={labels.addressBook.ACC_LBL_FIRST_NAME}
              name="firstName"
              id="firstName"
              type="text"
              component={TextBox}
              dataLocator="addnewaddress-firstname"
              className="field"
              enableSuccessCheck={false}
            />
          </Col>
          <Col colSize={{ small: 6, medium: 4, large: 6 }}>
            <Field
              placeholder={labels.addressBook.ACC_LBL_LAST_NAME}
              name="lastName"
              id="lastName"
              component={TextBox}
              dataLocator="addnewaddress-lastname"
              className="field"
              enableSuccessCheck={false}
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
              className="field"
              enableSuccessCheck={false}
            />
          </Col>
          <Col colSize={{ small: 6, medium: 4, large: 6 }}>
            <Field
              placeholder={labels.addressBook.ACC_LBL_ADDRESS_LINE2}
              name="addressLine2"
              id="addressLine2"
              component={TextBox}
              dataLocator="addnewaddress-addressl2"
              className="field"
              enableSuccessCheck={false}
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
              className="field"
              enableSuccessCheck={false}
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
              className="field"
              enableSuccessCheck={false}
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
              className="field"
              enableSuccessCheck={false}
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
              className="field"
              enableSuccessCheck={false}
            />
          </Col>
          {showPhoneNumber && (
            <Col colSize={{ small: 6, medium: 4, large: 6 }}>
              <Field
                placeholder={labels.addressBook.ACC_LBL_PHONE_NUMBER}
                name="phoneNumber"
                id="phoneNumber"
                component={TextBox}
                dataLocator="addnewaddress-phnumber"
                type="tel"
                className="field"
                enableSuccessCheck={false}
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
                className="field"
              >
                {labels.addressBook.ACC_LBL_SET_DEFAULT}
              </Field>
            </Col>
          </Row>
        )}
      </div>
    );
  }
}

AddressFields.defaultProps = {
  isMakeDefaultDisabled: false,
  showDefaultCheckbox: true,
  showPhoneNumber: true,
  formSection: '',
  className: '',
};

export default withStyles(AddressFields, styles);
