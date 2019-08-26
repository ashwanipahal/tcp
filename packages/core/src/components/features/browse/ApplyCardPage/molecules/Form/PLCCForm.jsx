import React from 'react';
import { Field, reduxForm } from 'redux-form';
import { BodyCopy, Button, Col, Row } from '@tcp/core/src/components/common/atoms';
import { Grid } from '@tcp/core/src/components/common/molecules';
import createValidateMethod from '@tcp/core/src/utils/formValidation/createValidateMethod';
import PropTypes from 'prop-types';
import InputCheckBox from '../../../../../common/atoms/InputCheckbox';
import getStandardConfig from '../../../../../../utils/formValidation/validatorStandardConfig';
import {
  AccountInformations,
  ContactInformation,
  ContactInformationFormWrapper,
  CreditCardPageHeader,
  ElectronicConsent,
  PLCCAgreements,
  PersonalInformationFormWrapper,
  PrescreenCode,
  ReviewCreditCardInformation,
} from '../index';
import { backToHome } from '../../utils/DateOfBirthHelper';

export const PLCCForm = ({ dispatch, disclaimersData, handleSubmit, labels }) => {
  return (
    <BodyCopy component="div">
      <form onSubmit={handleSubmit}>
        <Grid>
          <CreditCardPageHeader labels={labels} />
          <Row fullBleed className="rewards_card_rules">
            <ReviewCreditCardInformation
              creditCardHeader={disclaimersData && disclaimersData.credit_card_header}
            />
          </Row>
          <Row fullBleed>
            <Col
              className="prescreen_code_link_container"
              key="Prescreen_code_link"
              data-locator="Prescreen_code_link"
              colSize={{ large: 12, medium: 8, small: 6 }}
            >
              <PrescreenCode labels={labels} />
            </Col>
          </Row>
          <ContactInformationFormWrapper labels={labels} dispatch={dispatch} />
          <Row fullBleed>
            <Col
              className="contact_information_container"
              key="container_contact_info"
              colSize={{ large: 12, medium: 8, small: 6 }}
            >
              <ContactInformation
                contactInfo={disclaimersData && disclaimersData.contact_information_disclaimer}
              />
            </Col>
          </Row>
          <PersonalInformationFormWrapper labels={labels} />
          <Row fullBleed>
            <Col
              className="account_information_container"
              key="container_account_info"
              colSize={{ large: 12, medium: 8, small: 6 }}
            >
              <AccountInformations
                classifiedDisclaimer={
                  disclaimersData && disclaimersData.account_classified_disclaimer
                }
              />
            </Col>
          </Row>
          <Row fullBleed>
            <Col
              className="electronic_consent_container"
              key="container_electronic_consent"
              colSize={{ large: 12, medium: 8, small: 6 }}
            >
              <ElectronicConsent
                electronicConsent={disclaimersData && disclaimersData.electronic_consent}
              />
            </Col>
          </Row>
          <Row fullBleed>
            <Col
              className="plcc_agreements_container"
              key="container_plcc_agreement"
              colSize={{ large: 12, medium: 8, small: 6 }}
            >
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
                dataLocator="plcc_T&C_checkbox"
                className="iAgree_terms_conditions"
                disabled={false}
              >
                {labels.plcc_form_checkbox_text}
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
                >
                  {labels.plcc_form_nothanks}
                </BodyCopy>
              </Col>
            </Row>
          </BodyCopy>
        </Grid>
      </form>
    </BodyCopy>
  );
};

PLCCForm.propTypes = {
  disclaimersData: PropTypes.shape({}).isRequired,
  dispatch: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  labels: PropTypes.shape({}).isRequired,
};

const validateMethod = createValidateMethod(
  getStandardConfig([
    'firstName',
    'lastName',
    'phoneNumber',
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
  ])
);

export default reduxForm({
  form: 'PLCCForm',
  ...validateMethod,
  enableReinitialize: true,
  destroyOnUnmount: true,
})(PLCCForm);
