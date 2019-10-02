import React from 'react';
import { Field, reduxForm } from 'redux-form';
import PropTypes from 'prop-types';
import { BodyCopy, Button, Col, Row } from '../../../../../common/atoms';
import { Grid } from '../../../../../common/molecules';
import { getLabelValue } from '../../../../../../utils';
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
import PLCCTimeoutInterimModal from '../Modals/PLCCTmeoutInterimModal';
import { getPageViewGridRowSize, fetchPLCCFormErrors } from '../../utils/utility';
import Notification from '../../../../../common/molecules/Notification';

const handleSubmitFail = errors => {
  const formattedErrors = fetchPLCCFormErrors(errors);
  const errorEl = document.querySelector(errors && `[id="${formattedErrors[0]}"]`.trim());
  if (errorEl && errorEl.focus) {
    errorEl.focus();
  }
};

class PLCCForm extends React.PureComponent {
  static idleUserEvents = [
    'blur',
    'change',
    'click',
    'dblclick',
    'focus',
    'focusin',
    'focusout',
    'hover',
    'keydown',
    'keypress',
    'keyup',
    'mousedown',
    'mouseenter',
    'mouseleave',
    'mousemove',
    'mouseout',
    'mouseover',
    'mouseup',
    'resize',
    'scroll',
    'select',
    'submit',
  ];

  constructor(props) {
    super(props);
    this.state = {
      isIdleModalActive: false,
      isTimedOutModalActive: false,
    };
    this.timeout = null;
  }

  componentDidMount() {
    this.bindIdleVerification();
  }

  componentDidUpdate() {
    this.bindIdleVerification();
  }

  componentWillUnmount() {
    this.unbindIdleVerification();
  }

  /**
   * @fatarrow - bindIdleVerification
   *
   * @description - registers idleuserevents to check user activity on form page.
   */
  bindIdleVerification = () => {
    PLCCForm.idleUserEvents.forEach(event => {
      document.addEventListener(event, this.restartIdleUserTimeout, true);
    });
  };

  /**
   * @fatarrow - unbindIdleVerification
   *
   * @description - releases idleuserevents registered with document.
   */
  unbindIdleVerification = () => {
    PLCCForm.idleUserEvents.forEach(event => {
      document.removeEventListener(event, this.restartIdleUserTimeout, true);
    });
  };

  /**
   * @fatarrow - restartIdleUserTimeout
   *
   * @description - restart timer when user interacts with form.
   */
  restartIdleUserTimeout = () => {
    if (this.timeout) {
      clearTimeout(this.timeout);
    }

    this.timeout = setTimeout(() => {
      this.setState({
        isIdleModalActive: true,
      });
    }, 13 * 60 * 1000);
  };

  /**
   * @fatarrow - onCloseInterimModal
   *
   * @description - resets idleModalActive state to close close interim moda.
   */
  onCloseInterimModal = () => {
    this.setState({ isIdleModalActive: false });
  };

  /**
   * @fatarrow - onCloseInterimModal
   *
   * @description - resets idleModalActive state to close interim modal.
   */
  handleContinueApplication = () => {
    this.setState({
      isIdleModalActive: false,
    });
    this.restartIdleUserTimeout();
  };

  /**
   * @fatarrow - unregisterIdleVerfication
   *
   * @description - unregisters idleUserEvents from document.
   */
  unregisterIdleVerfication = () => {
    this.unbindIdleVerification();
  };

  /**
   * @fatarrow - handleFormReset
   *
   * @description - resets plcc form data entered by user.
   */
  handleFormReset = () => {
    const { reset } = this.props;
    this.setState({ isTimedOutModalActive: true });
    reset();
  };

  render() {
    const {
      dispatch,
      plccData,
      handleSubmit,
      labels,
      isPLCCModalFlow,
      bagItems,
      applicationStatus,
    } = this.props;
    const { isIdleModalActive, isTimedOutModalActive } = this.state;
    return (
      <StyledPLCCFormWrapper isPLCCModalFlow={isPLCCModalFlow}>
        <form onSubmit={handleSubmit}>
          <Grid>
            <CreditCardPageHeader labels={labels} isPLCCModalFlow={isPLCCModalFlow} />
            <Row fullBleed>
              <ReviewCreditCardInformation
                isPLCCModalFlow={isPLCCModalFlow}
                creditCardHeader={plccData && plccData.credit_card_header}
              />
            </Row>
            <Row fullBleed>
              <Col
                key="Prescreen_code_link"
                data-locator="Prescreen_code_link"
                colSize={{ large: getPageViewGridRowSize(isPLCCModalFlow), medium: 8, small: 6 }}
              >
                <PrescreenCode labels={labels} />
              </Col>
            </Row>
            <ContactInformationFormWrapper
              labels={labels}
              dispatch={dispatch}
              isPLCCModalFlow={isPLCCModalFlow}
            />
            <Row fullBleed>
              <Col
                key="container_contact_info"
                colSize={{ large: getPageViewGridRowSize(isPLCCModalFlow), medium: 8, small: 6 }}
              >
                <ContactInformation
                  contactInfo={plccData && plccData.contact_information_disclaimer}
                />
              </Col>
            </Row>
            <PersonalInformationFormWrapper labels={labels} isPLCCModalFlow={isPLCCModalFlow} />
            <Row fullBleed className="classifiedInfo">
              <Col
                key="container_account_info"
                colSize={{ large: getPageViewGridRowSize(isPLCCModalFlow), medium: 8, small: 6 }}
              >
                <AccountInformations
                  classifiedDisclaimer={plccData && plccData.account_classified_disclaimer}
                />
              </Col>
            </Row>
            <Row fullBleed>
              <Col
                key="container_electronic_consent"
                colSize={{ large: getPageViewGridRowSize(isPLCCModalFlow), medium: 8, small: 6 }}
              >
                <ElectronicConsent electronicConsent={plccData && plccData.electronic_consent} />
              </Col>
            </Row>
            <Row fullBleed>
              <Col
                key="container_plcc_agreement"
                colSize={{ large: getPageViewGridRowSize(isPLCCModalFlow), medium: 8, small: 6 }}
              >
                <PLCCAgreements labels={labels} />
              </Col>
            </Row>

            <Row fullBleed>
              <Col
                className="plcc_iAgree_container"
                key="container_checkbox"
                colSize={{ large: getPageViewGridRowSize(isPLCCModalFlow), medium: 8, small: 6 }}
              >
                <Field
                  name="iAgree"
                  component={InputCheckBox}
                  fontSize="fs16"
                  id="iAgree"
                  dataLocator="plcc_T&C_checkbox"
                  className="iAgree_terms_conditions"
                  disabled={false}
                >
                  <BodyCopy
                    className="iAgreeCheck"
                    fontSize="fs12"
                    fontFamily="secondary"
                    fontWeight="regular"
                  >
                    {getLabelValue(labels, 'lbl_PLCCForm_iAgreeCheckboxText')}
                  </BodyCopy>
                </Field>
              </Col>
            </Row>
            <Row fullBleed>
              <Col
                key="container_plcc_agreement"
                colSize={{ large: getPageViewGridRowSize(isPLCCModalFlow), medium: 8, small: 6 }}
              >
                {applicationStatus && <Notification status="error" message={applicationStatus} />}
              </Col>
            </Row>
            {/* {applicationStatus && <ErrorMessage error={applicationStatus} />} */}
            <BodyCopy
              className="underprogress_application"
              fontSize="fs16"
              fontFamily="secondary"
              fontWeight="regular"
            >
              <Row fullBleed>
                <Col
                  ignoreGutter={{ small: true, medium: true }}
                  colSize={{ large: getPageViewGridRowSize(isPLCCModalFlow), medium: 8, small: 6 }}
                  className="submit_button_plcc_form_container"
                >
                  <Button
                    buttonVariation="fixed-width"
                    fill="BLUE"
                    type="submit"
                    className="submit_button_plcc_form"
                    data-locator="plcc_submit_btn"
                  >
                    {getLabelValue(labels, 'lbl_PLCCForm_submitButton')}
                  </Button>
                </Col>
              </Row>
              <Row fullBleed>
                <Col
                  ignoreGutter={{ small: true }}
                  colSize={{ large: getPageViewGridRowSize(isPLCCModalFlow), medium: 8, small: 6 }}
                  className="no_thanks_link"
                >
                  <BodyCopy
                    fontFamily="secondary"
                    component="div"
                    onClick={backToHome}
                    textAlign="center"
                    tabIndex="0"
                  >
                    {getLabelValue(labels, 'lbl_PLCCForm_noThanks')}
                  </BodyCopy>
                </Col>
              </Row>
            </BodyCopy>
          </Grid>
        </form>
        {isIdleModalActive ? (
          <PLCCTimeoutInterimModal
            isModalOpen={isIdleModalActive}
            handleContinueApplication={this.handleContinueApplication}
            labels={labels}
            closeModal={this.onCloseInterimModal}
            isPLCCModalFlow={isPLCCModalFlow}
            unregisterIdleVerfication={this.unregisterIdleVerfication}
            bagItems={bagItems}
            time={120}
            isTimedOutModalActive={isTimedOutModalActive}
            handleFormReset={this.handleFormReset}
          />
        ) : null}
      </StyledPLCCFormWrapper>
    );
  }
}

PLCCForm.propTypes = {
  plccData: PropTypes.shape({
    credit_card_header: PropTypes.string.isRequired,
    contact_information_disclaimer: PropTypes.string.isRequired,
    account_classified_disclaimer: PropTypes.string.isRequired,
    electronic_consent: PropTypes.string.isRequired,
    plcc_form_checkbox_text: PropTypes.string.isRequired,
    plcc_form_submit_button: PropTypes.string.isRequired,
    plcc_form_nothanks: PropTypes.string.isRequired,
  }).isRequired,
  dispatch: PropTypes.func.isRequired,
  isPLCCModalFlow: PropTypes.bool.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  reset: PropTypes.func.isRequired,
  bagItems: PropTypes.bool.isRequired,
  applicationStatus: PropTypes.string.isRequired,
  labels: PropTypes.shape({
    plcc_form_checkbox_text: PropTypes.string.isRequired,
    plcc_form_submit_button: PropTypes.string.isRequired,
    plcc_form_nothanks: PropTypes.string.isRequired,
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
  onSubmitFail: errors => handleSubmitFail(errors),
})(PLCCForm);
