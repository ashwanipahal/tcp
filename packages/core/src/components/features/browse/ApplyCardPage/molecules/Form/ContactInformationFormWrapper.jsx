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
import PropTypes from 'prop-types';
import {
  CAcountriesStatesTable,
  UScountriesStatesTable,
} from '../../../../../common/organisms/AddressForm/CountriesAndStates.constants';
import { AutoCompleteComponent } from '../../../../../common/atoms/GoogleAutoSuggest/AutoCompleteComponent';
import { getSiteId } from '../../../../../../utils/utils.web';
import StyeldContactInfoFormWrapper from './styles/ContactInformationFormWrapper.style';
import { getLocator } from '../../../../../../utils';

class ContactInformationFormWrapper extends React.Component {
  static propTypes = {
    dispatch: PropTypes.func.isRequired,
    labels: PropTypes.shape({}).isRequired,
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
    const address = AutoCompleteComponent.getAddressFromPlace(place, inputValue);
    dispatch(change('PLCCForm', 'city', address.city));
    dispatch(change('PLCCForm', 'zipCode', address.zip));
    dispatch(change('PLCCForm', 'state', address.state));
    dispatch(change('PLCCForm', 'addressLine1', address.street));
  };

  render() {
    const { labels } = this.props;
    return (
      <StyeldContactInfoFormWrapper>
        <Heading
          fontFamily="secondary"
          fontSize="fs16"
          variant="h2"
          color="black"
          fontWeight="semibold"
          className="title"
          tabIndex="0"
        >
          {labels.plcc_form_contact_info_header}
        </Heading>
        <Row fullBleed>
          <Col
            className="contact_information_form columnWrapper"
            key="contact_information_form"
            colSize={{ large: 6, medium: 4, small: 6 }}
          >
            <Row fullBleed>
              <Col
                className="contact_information_form"
                key={`contact_information_form_${labels.plcc_form_firstName}`}
                colSize={{ large: 10, medium: 6, small: 4 }}
              >
                <Field
                  component={TextBox}
                  title={labels.plcc_form_firstName}
                  placeholder={labels.plcc_form_firstName}
                  name="firstName"
                  maxLength="15"
                  id="firstName"
                  data-locator={getLocator('plcc_first_name')}
                />
              </Col>
              <Col
                className="contact_information_form"
                key={`contact_information_form_${labels.plcc_form_middleNameinitial}`}
                colSize={{ large: 2, medium: 2, small: 2 }}
              >
                <Field
                  component={TextBox}
                  title={labels.plcc_form_middleNameinitial}
                  placeholder={labels.plcc_form_middleNameinitial}
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
            key={`contact_information_form_${labels.plcc_form_lastName}`}
            colSize={{ large: 6, medium: 4, small: 6 }}
          >
            <Field
              component={TextBox}
              title={labels.plcc_form_lastName}
              placeholder={labels.plcc_form_lastName}
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
            colSize={{ large: 6, medium: 4, small: 6 }}
          >
            <Field
              id="addressLine1"
              placeholder={labels.plcc_form_addressLine1}
              component={AutoCompleteComponent}
              name="addressLine1"
              onPlaceSelected={this.handlePlaceSelected}
              componentRestrictions={Object.assign({}, { country: [this.siteId] })}
              dataLocator={getLocator('plcc_address_1')}
              className="field"
            />
          </Col>
          <Col
            className="contact_information_form columnWrapper"
            colSize={{ small: 6, medium: 4, large: 6 }}
          >
            <Field
              placeholder={labels.plcc_form_addressLine2}
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
            colSize={{ large: 6, medium: 4, small: 6 }}
          >
            <Field
              id="city"
              placeholder={labels.plcc_form_city}
              name="city"
              component={TextBox}
              dataLocator={getLocator('plcc_city')}
              className="field"
            />
          </Col>
          <Col colSize={{ small: 6, medium: 4, large: 6 }} className="columnWrapper">
            <BodyCopy
              component="span"
              fontSize="fs12"
              fontFamily="secondary"
              fontWeight="extrabold"
              className="free_dropdown_label"
            >
              {labels.plcc_form_state}
            </BodyCopy>
            <Row fullBleed>
              <Col
                className="contact_information_form"
                key="container_state"
                colSize={{ large: 6, medium: 4, small: 3 }}
              >
                <Field
                  id="state"
                  name="statewocountry"
                  component={SelectBox}
                  placeholder={labels.plcc_form_state_placeholder}
                  options={this.siteId === 'us' ? UScountriesStatesTable : CAcountriesStatesTable}
                  dataLocator={getLocator('plcc_state')}
                  className="field"
                />
              </Col>
              <Col
                className="contact_information_form"
                key="container_zip"
                colSize={{ large: 6, medium: 4, small: 3 }}
              >
                <Field
                  placeholder={labels.plcc_form_zipcode}
                  id="zipCode"
                  name="noCountryZip"
                  maxLength={6}
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
            colSize={{ large: 6, medium: 4, small: 6 }}
          >
            <Field
              placeholder={labels.plcc_form_mobile_phone_number}
              name="phoneNumber"
              id="phoneNumber"
              component={TextBox}
              dataLocator={getLocator('plc_mobile_no')}
              type="tel"
              className="field"
            />
          </Col>
          <Col
            className="contact_information_form columnWrapper"
            colSize={{ small: 6, medium: 4, large: 6 }}
          >
            <Field
              placeholder={labels.plcc_form_email}
              name="emailAddress"
              id="emailAddress"
              component={TextBox}
              dataLocator={getLocator('plcc_email')}
              className="field"
            />
          </Col>
        </Row>
        <Row fullBleed>
          <Col
            className="prescreen_code_link_container contact_information_form columnWrapper"
            key="Prescreen_code_link"
            data-locator="Prescreen_code_link"
            colSize={{ large: 6, medium: 4, small: 6 }}
          >
            <Field
              placeholder={labels.plcc_form_alternate_phone}
              name="alternatePhone"
              id="alternatePhone"
              component={TextBox}
              dataLocator={getLocator('plcc_alt_mobile_no')}
              className="field"
            />
          </Col>
        </Row>
        <BodyCopy
          className="columnWrapper plcc_min_phone"
          tabIndex="0"
          fontSize="fs10"
          fontFamily="secondary"
          id="plcc_min_phone"
        >
          {labels.plcc_form_min_phone}
        </BodyCopy>
      </StyeldContactInfoFormWrapper>
    );
  }
}

ContactInformationFormWrapper.propTypes = {
  labels: PropTypes.shape({}).isRequired,
};

export default ContactInformationFormWrapper;
