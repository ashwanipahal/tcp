import React from 'react';
import { Field, reduxForm } from 'redux-form';
import PropTypes from 'prop-types';
import { BodyCopy, Button, Col, Row } from '../../../../../common/atoms';
import { Grid } from '../../../../../common/molecules';
import createValidateMethod from '../../../../../../utils/formValidation/createValidateMethod';
import InputCheckBox from '../../../../../common/atoms/InputCheckbox';
import getStandardConfig from '../../../../../../utils/formValidation/validatorStandardConfig';
import {
  AccountInformations,
  ContactInformation,
  ContactInformationFormWrapper,
  CreditCardPageHeader,
  ElectronicConsent,
  PrescreenCode,
  PLCCAgreements,
  PersonalInformationFormWrapper,
  ReviewCreditCardInformation,
} from '../index';
import { backToHome } from '../../utils/DateOfBirthHelper';
import StyledPLCCFormWrapper from './styles/PLCCForm.style';

const PLCCForm = ({ dispatch, plccData, handleSubmit, labels }) => {
  return (
    <StyledPLCCFormWrapper>
      <form onSubmit={handleSubmit}>
        <Grid>
          <CreditCardPageHeader labels={labels} />
          <Row fullBleed>
            <ReviewCreditCardInformation
              creditCardHeader={plccData && plccData.credit_card_header}
            />
          </Row>
          <Row fullBleed>
            <Col
              key="Prescreen_code_link"
              data-locator="Prescreen_code_link"
              colSize={{ large: 12, medium: 8, small: 6 }}
            >
              <PrescreenCode labels={labels} />
            </Col>
          </Row>
          <ContactInformationFormWrapper labels={labels} dispatch={dispatch} />
          <Row fullBleed>
            <Col key="container_contact_info" colSize={{ large: 12, medium: 8, small: 6 }}>
              <ContactInformation
                contactInfo={plccData && plccData.contact_information_disclaimer}
              />
            </Col>
          </Row>
          <PersonalInformationFormWrapper labels={labels} />
          <Row fullBleed>
            <Col key="container_account_info" colSize={{ large: 12, medium: 8, small: 6 }}>
              <AccountInformations
                classifiedDisclaimer={plccData && plccData.account_classified_disclaimer}
              />
            </Col>
          </Row>
          <Row fullBleed>
            <Col key="container_electronic_consent" colSize={{ large: 12, medium: 8, small: 6 }}>
              <ElectronicConsent electronicConsent={plccData && plccData.electronic_consent} />
            </Col>
          </Row>
          <Row fullBleed>
            <Col key="container_plcc_agreement" colSize={{ large: 12, medium: 8, small: 6 }}>
              <PLCCAgreements labels={labels} />
            </Col>
          </Row>

          <Row fullBleed>
            <Col
              className="plcc_iAgree_container"
              key="container_checkbox"
              colSize={{ large: 12, medium: 8, small: 6 }}
            >
              <Field
                name="iAgree"
                component={InputCheckBox}
                fontSize="fs16"
                dataLocator="plcc_T&C_checkbox"
                className="iAgree_terms_conditions"
                disabled={false}
              >
                <BodyCopy
                  className="underprogress_application"
                  fontSize="fs16"
                  fontFamily="secondary"
                  fontWeight="regular"
                >
                  {labels && labels.plcc_form_checkbox_text}
                </BodyCopy>
              </Field>
            </Col>
          </Row>
          <BodyCopy
            className="underprogress_application"
            fontSize="fs16"
            fontFamily="secondary"
            fontWeight="regular"
          >
            <Row fullBleed className="submit_plcc_form">
              <Col
                ignoreGutter={{ small: true }}
                colSize={{ large: 4, medium: 4, small: 6 }}
                className="submit_button_plcc_form_container"
              >
                <Button
                  buttonVariation="fixed-width"
                  fill="BLUE"
                  type="submit"
                  className="submit_button_plcc_form"
                  data-locator="plcc_submit_btn"
                >
                  {labels.plcc_form_submit_button}
                </Button>
              </Col>
            </Row>
            <Row className="no_thanks_link_wrapper">
              <Col
                ignoreGutter={{ small: true }}
                colSize={{ large: 4, medium: 8, small: 6 }}
                className="no_thanks_link"
                aria-label="no_thanks_link"
                data-locator="plcc_no_thanks"
              >
                <BodyCopy
                  fontFamily="secondary"
                  component="div"
                  onClick={backToHome}
                  textAlign="center"
                  tabIndex="0"
                >
                  {labels.plcc_form_nothanks}
                </BodyCopy>
              </Col>
            </Row>
          </BodyCopy>
        </Grid>
      </form>
    </StyledPLCCFormWrapper>
  );
};

PLCCForm.propTypes = {
  plccData: PropTypes.shape({
    credit_card_header: PropTypes.string,
    contact_information_disclaimer: PropTypes.string,
    account_classified_disclaimer: PropTypes.string,
    electronic_consent: PropTypes.string,
    plcc_form_checkbox_text: PropTypes.string,
    plcc_form_submit_button: PropTypes.string,
    plcc_form_nothanks: PropTypes.string,
  }).isRequired,
  dispatch: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  labels: PropTypes.shape({
    plcc_form_checkbox_text: PropTypes.string,
    plcc_form_submit_button: PropTypes.string,
    plcc_form_nothanks: PropTypes.string,
  }).isRequired,
};

const validateMethod = createValidateMethod(
  getStandardConfig([
    'firstName',
    'lastName',
    'addressLine1',
    'addressLine2',
    'city',
    'statewocountry',
    'date',
    'month',
    'year',
    'ssNumber',
    'preScreenCode',
    'noCountryZip',
    'emailAddress',
    'confirmEmailAddress',
    'password',
    'confirmPassword',
    'iAgree',
    'phoneNumberWithAlt',
    'altPhoneNumber',
  ])
);

export default reduxForm({
  form: 'PLCCForm',
  ...validateMethod,
  enableReinitialize: true,
  destroyOnUnmount: true,
})(PLCCForm);
