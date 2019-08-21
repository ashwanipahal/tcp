import React from 'react';
import PropTypes from 'prop-types';
import withStyles from '@tcp/core/src/components/common/hoc/withStyles';
import { Field, change } from 'redux-form';
import TextBox from '../../../atoms/TextBox';
import SelectBox from '../../../atoms/Select';
import InputCheckbox from '../../../atoms/InputCheckbox';
import Row from '../../../atoms/Row';
import Col from '../../../atoms/Col';
import getStandardConfig from '../../../../../utils/formValidation/validatorStandardConfig';
import { AutoCompleteComponent } from '../../../atoms/GoogleAutoSuggest/AutoCompleteComponent';
import {
  countriesOptionsMap,
  CAcountriesStatesTable,
  UScountriesStatesTable,
} from '../../../organisms/AddressForm/CountriesAndStates.constants';
import styles from '../styles/AddressFields.style';
import Anchor from '../../../atoms/Anchor';

export class AddressFields extends React.PureComponent {
  static propTypes = {
    dispatch: PropTypes.func.isRequired,
    addressFormLabels: PropTypes.shape({}).isRequired,
    isMakeDefaultDisabled: PropTypes.bool,
    formName: PropTypes.string.isRequired,
    showDefaultCheckbox: PropTypes.bool,
    showPhoneNumber: PropTypes.bool,
    formSection: PropTypes.string,
    className: PropTypes.string,
    variation: PropTypes.string,
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
    'emailAddress',
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

  renderCountrySelector = () => {
    const { addressFormLabels } = this.props;
    return (
      <>
        <Col
          colSize={{ small: 6, medium: 4, large: 3 }}
          ignoreGutter={{ small: true }}
          className="country-selector"
        >
          <Field
            id="country"
            placeholder={addressFormLabels.country}
            name="country"
            component={SelectBox}
            options={countriesOptionsMap}
            onChange={this.StateCountryChange}
            dataLocator="addnewaddress-country"
            enableSuccessCheck={false}
          />
          <Anchor
            fontSizeVariation="small"
            underline
            noLink
            href="#"
            anchorVariation="primary"
            data-locator="shipping internationally"
            target="_self"
            className="change-country-link"
          >
            {addressFormLabels.shipInternationally}
          </Anchor>
        </Col>
      </>
    );
  };

  renderStateZipCode = () => {
    const { variation, addressFormLabels } = this.props;
    const { country } = this.state;
    return (
      <>
        <Col colSize={{ small: 3, medium: variation === 'primary' ? 2 : 4, large: 3 }}>
          <Field
            id="state"
            placeholder={country === 'CA' ? addressFormLabels.province : addressFormLabels.stateLbl}
            name="state"
            component={SelectBox}
            options={country === 'CA' ? CAcountriesStatesTable : UScountriesStatesTable}
            dataLocator="addnewaddress-state"
            className="field "
            enableSuccessCheck={false}
          />
        </Col>
        <Col
          colSize={{ small: 3, medium: variation === 'primary' ? 2 : 4, large: 3 }}
          className={variation === 'secondary' ? 'zip-code' : ''}
        >
          <Field
            placeholder={
              country === 'CA' ? addressFormLabels.postalCode : addressFormLabels.zipCode
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
      </>
    );
  };

  renderAddressFields = () => {
    const { variation, addressFormLabels } = this.props;
    const { country } = this.state;
    return (
      <>
        <Row fullBleed>
          <Col
            ignoreGutter={{ small: true }}
            colSize={{ small: 6, medium: variation === 'secondary' ? 8 : 4, large: 6 }}
          >
            <Field
              id="addressLine1"
              placeholder={addressFormLabels.addressLine1}
              component={AutoCompleteComponent}
              name="addressLine1"
              onPlaceSelected={this.handlePlaceSelected}
              componentRestrictions={Object.assign({}, { country: [country] })}
              dataLocator="addnewaddress-addressl1"
              className="field"
              enableSuccessCheck={false}
            />
          </Col>
          <Col colSize={{ small: 6, medium: variation === 'secondary' ? 8 : 4, large: 6 }}>
            <Field
              placeholder={addressFormLabels.addressLine2}
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
          <Col
            ignoreGutter={{ small: true }}
            colSize={{ small: 6, medium: 4, large: variation === 'primary' ? 6 : 3 }}
          >
            <Field
              id="city"
              placeholder={addressFormLabels.city}
              name="city"
              component={TextBox}
              dataLocator="addnewaddress-city"
              className="field"
              enableSuccessCheck={false}
            />
          </Col>
          {this.renderStateZipCode()}
          {variation === 'secondary' && this.renderCountrySelector()}
        </Row>
      </>
    );
  };

  render() {
    const {
      isMakeDefaultDisabled,
      showDefaultCheckbox,
      showPhoneNumber,
      className,
      addressFormLabels,
      variation,
    } = this.props;
    return (
      <div className={className}>
        <Row fullBleed>
          <Col
            ignoreGutter={{ small: true }}
            colSize={{ small: 6, medium: variation === 'secondary' ? 8 : 4, large: 6 }}
          >
            <Field
              placeholder={addressFormLabels.firstName}
              name="firstName"
              id="firstName"
              type="text"
              component={TextBox}
              dataLocator="addnewaddress-firstname"
              className="field"
              enableSuccessCheck={false}
            />
          </Col>
          <Col colSize={{ small: 6, medium: variation === 'secondary' ? 8 : 4, large: 6 }}>
            <Field
              placeholder={addressFormLabels.lastName}
              name="lastName"
              id="lastName"
              component={TextBox}
              dataLocator="addnewaddress-lastname"
              className="field"
              enableSuccessCheck={false}
            />
          </Col>
        </Row>
        {this.renderAddressFields()}
        {variation === 'primary' ? (
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
                className="field "
                enableSuccessCheck={false}
              />
            </Col>
            {showPhoneNumber && (
              <Col colSize={{ small: 6, medium: 4, large: 6 }}>
                <Field
                  placeholder={addressFormLabels.phoneNumber}
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
        ) : null}
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
                {addressFormLabels.setDefaultMsg}
              </Field>
            </Col>
          </Row>
        )}
        {variation === 'secondary' ? (
          <Row fullBleed>
            <Col colSize={{ small: 6, medium: 8, large: 6 }}>
              <Field
                placeholder={addressFormLabels.phoneNumber}
                name="phoneNumber"
                id="phoneNumber"
                component={TextBox}
                dataLocator="addnewaddress-phnumber"
                type="tel"
                className="field"
                enableSuccessCheck={false}
              />
            </Col>
            <Col colSize={{ small: 6, medium: 8, large: 6 }}>
              <Field
                placeholder="Email (For Order Updates)"
                name="emailAddress"
                id="emailAddress"
                component={TextBox}
                dataLocator="email-address-field"
                enableSuccessCheck={false}
              />
            </Col>
          </Row>
        ) : null}
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
  variation: 'primary',
};

export default withStyles(AddressFields, styles);
