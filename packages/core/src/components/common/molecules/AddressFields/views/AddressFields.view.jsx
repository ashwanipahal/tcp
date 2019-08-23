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
import { getSiteId } from '../../../../../utils/utils.web';
import { API_CONFIG } from '../../../../../services/config';

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
    checkPOBoxAddress: PropTypes.func,
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
      country: getSiteId() && getSiteId().toUpperCase(),
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

  checkHasPoAddress = () => {
    const { checkPOBoxAddress } = this.props;
    if (checkPOBoxAddress) {
      checkPOBoxAddress();
    }
  };

  renderCountrySelector = () => {
    const { addressFormLabels, formSection } = this.props;
    return (
      <>
        <Col
          colSize={{ small: 6, medium: 4, large: 3 }}
          ignoreGutter={{ small: true }}
          className="country-selector"
        >
          <Field
            id={`${formSection}.country`}
            placeholder={addressFormLabels.country}
            name="country"
            component={SelectBox}
            options={countriesOptionsMap}
            onChange={this.StateCountryChange}
            dataLocator="addnewaddress-country"
            enableSuccessCheck={false}
            disabled
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
    const { variation, addressFormLabels, formSection } = this.props;
    const { country } = this.state;
    const isCA = country === API_CONFIG.siteIds.ca.toUpperCase();
    return (
      <>
        <Col colSize={{ small: 3, medium: variation === 'primary' ? 2 : 4, large: 3 }}>
          <Field
            id={`${formSection}.state`}
            placeholder={isCA ? addressFormLabels.province : addressFormLabels.stateLbl}
            name="state"
            component={SelectBox}
            options={isCA ? CAcountriesStatesTable : UScountriesStatesTable}
            dataLocator="addnewaddress-state"
            className="address-field"
            enableSuccessCheck={false}
          />
        </Col>
        <Col
          colSize={{ small: 3, medium: variation === 'primary' ? 2 : 4, large: 3 }}
          className={variation === 'secondary' ? 'zip-code' : ''}
        >
          <Field
            placeholder={isCA ? addressFormLabels.postalCode : addressFormLabels.zipCode}
            id={`${formSection}.zipCode`}
            name="zipCode"
            maxLength={isCA ? 6 : 5}
            component={TextBox}
            dataLocator="addnewaddress-zipcode"
            className="address-field"
            enableSuccessCheck={false}
          />
        </Col>
      </>
    );
  };

  renderAddressFields = () => {
    const { variation, addressFormLabels, formSection } = this.props;
    const { country } = this.state;
    return (
      <>
        <Row fullBleed>
          <Col
            ignoreGutter={{ small: true }}
            colSize={{ small: 6, medium: variation === 'secondary' ? 8 : 4, large: 6 }}
          >
            <Field
              id={`${formSection}.addressLine1`}
              placeholder={addressFormLabels.addressLine1}
              component={AutoCompleteComponent}
              name="addressLine1"
              onPlaceSelected={this.handlePlaceSelected}
              componentRestrictions={Object.assign({}, { country: [country] })}
              dataLocator="addnewaddress-addressl1"
              className="address-field"
              enableSuccessCheck={false}
              onChange={this.checkHasPoAddress}
            />
          </Col>
          <Col colSize={{ small: 6, medium: variation === 'secondary' ? 8 : 4, large: 6 }}>
            <Field
              placeholder={addressFormLabels.addressLine2}
              name="addressLine2"
              id={`${formSection}.addressLine2`}
              component={TextBox}
              dataLocator="addnewaddress-addressl2"
              className="address-field"
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
              id={`${formSection}.city`}
              placeholder={addressFormLabels.city}
              name="city"
              component={TextBox}
              dataLocator="addnewaddress-city"
              className="address-field"
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
      formSection,
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
              id={`${formSection}.firstName`}
              type="text"
              component={TextBox}
              dataLocator="addnewaddress-firstname"
              className="address-field"
              enableSuccessCheck={false}
            />
          </Col>
          <Col colSize={{ small: 6, medium: variation === 'secondary' ? 8 : 4, large: 6 }}>
            <Field
              placeholder={addressFormLabels.lastName}
              name="lastName"
              id={`${formSection}.lastName`}
              component={TextBox}
              dataLocator="addnewaddress-lastname"
              className="address-field"
              enableSuccessCheck={false}
            />
          </Col>
        </Row>
        {this.renderAddressFields()}
        {variation === 'primary' ? (
          <Row fullBleed>
            <Col colSize={{ small: 6, medium: 4, large: 6 }} ignoreGutter={{ small: true }}>
              <Field
                id={`${formSection}.country`}
                placeholder={addressFormLabels.country}
                name="country"
                component={SelectBox}
                options={countriesOptionsMap}
                onChange={this.StateCountryChange}
                dataLocator="addnewaddress-country"
                className="address-field"
                enableSuccessCheck={false}
              />
            </Col>
            {showPhoneNumber && (
              <Col colSize={{ small: 6, medium: 4, large: 6 }}>
                <Field
                  placeholder={addressFormLabels.phoneNumber}
                  name="phoneNumber"
                  id={`${formSection}.phoneNumber`}
                  component={TextBox}
                  dataLocator="addnewaddress-phnumber"
                  type="tel"
                  className="address-field"
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
                className="address-field"
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
                id={`${formSection}.phoneNumber`}
                component={TextBox}
                dataLocator="addnewaddress-phnumber"
                type="tel"
                className="address-field"
                enableSuccessCheck={false}
              />
            </Col>
            <Col colSize={{ small: 6, medium: 8, large: 6 }}>
              <Field
                placeholder="Email (For Order Updates)"
                name="emailAddress"
                id={`${formSection}.emailAddress`}
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
  checkPOBoxAddress: () => {},
};

export default withStyles(AddressFields, styles);
