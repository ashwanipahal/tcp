import React from 'react';
import { change, Field } from 'redux-form';
import {
  BodyCopy,
  Col,
  Heading,
  Row,
  SelectBox,
  TextBox,
} from '@tcp/core/src/components/common/atoms';
import { getAddressFromPlace } from '@tcp/core/src/utils';
import PropTypes from 'prop-types';
import {
  CAcountriesStatesTable,
  UScountriesStatesTable,
} from '../../../../../common/organisms/AddressForm/CountriesAndStates.constants';
import { AutoCompleteComponent } from '../../../../../common/atoms/GoogleAutoSuggest/AutoCompleteComponent';
import { getSiteId } from '../../../../../../utils/utils.web';
import StyeldContactInfoFormWrapper from './styles/ContactInformationFormWrapper.style';
import { getLocator, getLabelValue } from '../../../../../../utils';
import { getPageViewGridColumnSize } from '../../utils/utility';

class ContactInformationFormWrapper extends React.Component {
  static propTypes = {
    dispatch: PropTypes.func.isRequired,
    labels: PropTypes.shape({}).isRequired,
  };

  static autocompleteRestrictions = {
    country: 'US',
  };

  constructor(props) {
    super(props);
    this.siteId = getSiteId();
  }

  /**
   * @fatarrow - handlePlaceSelected
   * @params - @param - place - place picked up from google autocomplete.
   *           @param - inputValue - input value.
   *
   * @description - handles the place selected from address1 field of PLCC appliation form.
   *
   */
  handlePlaceSelected = (place, inputValue) => {
    const { dispatch } = this.props;
    const address = getAddressFromPlace(place, inputValue);
    dispatch(change('PLCCForm', 'city', address.city));
    dispatch(change('PLCCForm', 'noCountryZip', address.zip));
    dispatch(change('PLCCForm', 'statewocountry', address.state));
    dispatch(change('PLCCForm', 'addressLine1', address.street));
  };

  render() {
    const { labels, isPLCCModalFlow } = this.props;
    return (
      <StyeldContactInfoFormWrapper>
        <Heading
          fontFamily="secondary"
          fontSize="fs16"
          fontWeight="semiBold"
          className="contactFormTitle"
          tabIndex="0"
        >
          {getLabelValue(labels, 'lbl_PLCCForm_contactInfoHeader')}
        </Heading>
        <Row fullBleed>
          <Col
            className="contact_information_form columnWrapper"
            key="contact_information_form"
            colSize={{ large: getPageViewGridColumnSize(isPLCCModalFlow), medium: 4, small: 6 }}
          >
            <Row fullBleed>
              <Col
                className="contact_information_form"
                key={`contact_information_form_${getLabelValue(labels, 'lbl_PLCCForm_firstName')}`}
                colSize={{ large: 10, medium: 6, small: 4 }}
              >
                <Field
                  component={TextBox}
                  title={getLabelValue(labels, 'lbl_PLCCForm_firstName')}
                  placeholder={getLabelValue(labels, 'lbl_PLCCForm_firstName')}
                  name="firstName"
                  maxLength="15"
                  id="firstName"
                  data-locator={getLocator('plcc_first_name')}
                />
              </Col>
              <Col
                className="contact_information_form"
                key={`contact_information_form_${getLabelValue(
                  labels,
                  'lbl_PLCCForm_middleNameInitial'
                )}`}
                colSize={{ large: 2, medium: 2, small: 2 }}
              >
                <Field
                  component={TextBox}
                  title={getLabelValue(labels, 'lbl_PLCCForm_middleNameInitial')}
                  placeholder={getLabelValue(labels, 'lbl_PLCCForm_middleNameInitial')}
                  name="middleNameInitial"
                  maxLength="15"
                  id="middleNameInitial"
                  data-locator={getLocator('plcc_middle_name')}
                />
              </Col>
            </Row>
          </Col>
          <Col
            className="contact_information_form columnWrapper"
            key={`contact_information_form_${getLabelValue(labels, 'lbl_PLCCForm_lastName')}`}
            colSize={{ large: getPageViewGridColumnSize(isPLCCModalFlow), medium: 4, small: 6 }}
          >
            <Field
              component={TextBox}
              title={getLabelValue(labels, 'lbl_PLCCForm_lastName')}
              placeholder={getLabelValue(labels, 'lbl_PLCCForm_lastName')}
              name="lastName"
              maxLength="15"
              id="lastName"
              data-locator={getLocator('plcc_last_name')}
            />
          </Col>
        </Row>
        <Row fullBleed>
          <Col
            className="contact_information_form columnWrapper"
            key="contact_information_form"
            colSize={{ large: getPageViewGridColumnSize(isPLCCModalFlow), medium: 4, small: 6 }}
          >
            <Field
              id="addressLine1"
              placeholder={getLabelValue(labels, 'lbl_PLCCForm_addressLine1')}
              component={AutoCompleteComponent}
              name="addressLine1"
              onPlaceSelected={this.handlePlaceSelected}
              componentRestrictions={Object.assign({}, { country: [this.siteId] })}
              dataLocator={getLocator('plcc_address_1')}
              className="field"
              maxLength="30"
            />
          </Col>
          <Col
            className="contact_information_form columnWrapper"
            colSize={{ small: 6, medium: 4, large: getPageViewGridColumnSize(isPLCCModalFlow) }}
          >
            <Field
              placeholder={getLabelValue(labels, 'lbl_PLCCForm_addressLine2')}
              name="addressLine2"
              id="addressLine2"
              component={TextBox}
              dataLocator={getLocator('plcc_address_2')}
              className="field"
            />
          </Col>
        </Row>

        <Row fullBleed className="fieldWrapper">
          <Col
            className="contact_information_form columnWrapper"
            key="container_city"
            colSize={{ large: getPageViewGridColumnSize(isPLCCModalFlow), medium: 4, small: 6 }}
          >
            <Field
              id="city"
              placeholder={getLabelValue(labels, 'lbl_PLCCForm_city')}
              name="city"
              component={TextBox}
              dataLocator={getLocator('plcc_city')}
              className="field"
            />
          </Col>
          <Col
            colSize={{ small: 6, medium: 4, large: getPageViewGridColumnSize(isPLCCModalFlow) }}
            className="columnWrapper"
          >
            <Row fullBleed>
              <Col
                className="contact_information_form"
                key="container_state"
                colSize={{ large: 6, medium: 4, small: 3 }}
              >
                <BodyCopy
                  component="span"
                  fontSize="fs12"
                  fontFamily="secondary"
                  fontWeight="extrabold"
                  className="free_dropdown_label columnWrapper"
                >
                  {getLabelValue(labels, 'lbl_PLCCForm_state')}
                </BodyCopy>
                <Field
                  id="state"
                  name="statewocountry"
                  component={SelectBox}
                  placeholder={getLabelValue(labels, 'lbl_PLCCForm_statePlaceholder')}
                  options={this.siteId === 'us' ? UScountriesStatesTable : CAcountriesStatesTable}
                  dataLocator={getLocator('plcc_state')}
                  className="field stateField"
                />
              </Col>
              <Col
                className="contact_information_form"
                key="container_zip"
                colSize={{ large: 6, medium: 4, small: 3 }}
              >
                <Field
                  placeholder={getLabelValue(labels, 'lbl_PLCCForm_zipCode')}
                  id="zipCode"
                  name="noCountryZip"
                  maxLength={5}
                  component={TextBox}
                  dataLocator={getLocator('plcc_zip_code')}
                  className="field"
                />
              </Col>
            </Row>
          </Col>
        </Row>
        <Row fullBleed>
          <Col
            className="contact_information_form columnWrapper"
            key="container_phone"
            colSize={{ large: getPageViewGridColumnSize(isPLCCModalFlow), medium: 4, small: 6 }}
          >
            <Field
              placeholder={getLabelValue(labels, 'lbl_PLCCForm_mobilePhoneNumber')}
              name="phoneNumberWithAlt"
              id="phoneNumber"
              component={TextBox}
              dataLocator={getLocator('plc_mobile_no')}
              type="tel"
              className="field"
            />
          </Col>
          <Col
            className="contact_information_form columnWrapper"
            colSize={{ small: 6, medium: 4, large: getPageViewGridColumnSize(isPLCCModalFlow) }}
          >
            <Field
              placeholder={getLabelValue(labels, 'lbl_PLCCForm_alternatePhone')}
              name="altPhoneNumber"
              id="alternatePhone"
              component={TextBox}
              dataLocator={getLocator('plcc_alt_mobile_no')}
              className="field"
            />
          </Col>
        </Row>
        <Row fullBleed>
          <Col
            className="prescreen_code_link_container contact_information_form columnWrapper"
            key="Prescreen_code_link"
            data-locator="Prescreen_code_link"
            colSize={{ large: getPageViewGridColumnSize(isPLCCModalFlow), medium: 4, small: 6 }}
          >
            <Field
              placeholder={getLabelValue(labels, 'lbl_PLCCForm_email')}
              name="emailAddress"
              id="emailAddress"
              component={TextBox}
              dataLocator={getLocator('plcc_email')}
              className="field"
            />
          </Col>
        </Row>
        <BodyCopy
          className="columnWrapper plcc_min_phone"
          fontSize="fs10"
          fontFamily="secondary"
          id="plcc_min_phone"
        >
          {getLabelValue(labels, 'lbl_PLCCForm_minPhone')}
        </BodyCopy>
      </StyeldContactInfoFormWrapper>
    );
  }
}

ContactInformationFormWrapper.propTypes = {
  labels: PropTypes.shape({}).isRequired,
  isPLCCModalFlow: PropTypes.func.isRequired,
};

export default ContactInformationFormWrapper;
