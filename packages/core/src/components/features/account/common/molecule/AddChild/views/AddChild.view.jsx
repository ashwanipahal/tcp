import React from 'react';
import PropTypes from 'prop-types';
import { getLabelValue } from '@tcp/core/src/utils/utils';
import { Field, reduxForm } from 'redux-form';
import SelectBox from '@tcp/core/src/components/common/atoms/Select';
import withStyles from '@tcp/core/src/components/common/hoc/withStyles';
import InputCheckbox from '@tcp/core/src/components/common/atoms/InputCheckbox';
import Row from '@tcp/core/src/components/common/atoms/Row';
import TextBox from '@tcp/core/src/components/common/atoms/TextBox';
import Button from '@tcp/core/src/components/common/atoms/Button';
import BodyCopy from '@tcp/core/src/components/common/atoms/BodyCopy';
import Anchor from '@tcp/core/src/components/common/atoms/Anchor';
import Col from '@tcp/core/src/components/common/atoms/Col';
import styles from '../styles/AddChild.style';
import createValidateMethod from '../../../../../../../utils/formValidation/createValidateMethod';
import getStandardConfig from '../../../../../../../utils/formValidation/validatorStandardConfig';
import endpoints from '../../../externalEndpoints';

export class AddChildBirthdayForm extends React.PureComponent {
  static propTypes = {
    handleSubmit: PropTypes.func.isRequired,
    className: PropTypes.string,
    addChildBirthdayLabels: PropTypes.shape({}).isRequired,
    birthMonthOptionsMap: PropTypes.shape([]).isRequired,
    birthYearOptionsMap: PropTypes.shape([]).isRequired,
    childOptions: PropTypes.shape([]).isRequired,
    timestamp: PropTypes.instanceOf(Date).isRequired,
    invalid: PropTypes.bool.isRequired,
    closeAddModal: PropTypes.func,
  };

  static defaultProps = {
    className: '',
    closeAddModal: () => {},
  };

  static timestampFormatOptions = {
    timeZoneName: 'short',
  };

  render() {
    const {
      handleSubmit,
      className,
      addChildBirthdayLabels,
      birthMonthOptionsMap,
      birthYearOptionsMap,
      childOptions,
      timestamp,
      invalid,
      closeAddModal,
    } = this.props;
    return (
      <form className={className} onSubmit={handleSubmit}>
        <div className="addChildBirthdayTip hide-on-mobile" />
        <Row fullBleed className="formHeading">
          <Col
            colSize={{ small: 6, medium: 4, large: 5 }}
            className="childInfo"
            ignoreGutter={{ medium: true }}
          >
            <Row fullBleed className="elem-mb-LRG">
              <Col colSize={{ small: 6, medium: 8, large: 12 }}>
                <BodyCopy
                  fontFamily="secondary"
                  fontSize="fs16"
                  fontWeight="black"
                  color="gray.900"
                  dataLocator="childInfoLbl"
                >
                  {getLabelValue(addChildBirthdayLabels, 'lbl_add_child_child_information')}
                </BodyCopy>
              </Col>
            </Row>
            <Row fullBleed className="elem-mb-LRG">
              <Col colSize={{ small: 6, medium: 8, large: 12 }}>
                <Field
                  placeholder={getLabelValue(addChildBirthdayLabels, 'lbl_add_child_child_name')}
                  name="childName"
                  id="childName"
                  type="text"
                  component={TextBox}
                  dataLocator="childNameField"
                />
              </Col>
              <Col colSize={{ small: 6, medium: 8, large: 12 }} className="elem-mt-LRG">
                <BodyCopy
                  fontFamily="secondary"
                  fontSize="fs10"
                  fontWeight="black"
                  color="gray.900"
                  data-locator="childBirthdayLbl"
                >
                  {getLabelValue(addChildBirthdayLabels, 'lbl_add_child_birthday_heading')}
                </BodyCopy>
              </Col>
              <Row fullBleed>
                <Col colSize={{ small: 3, medium: 4, large: 6 }}>
                  <Field
                    placeholder={getLabelValue(
                      addChildBirthdayLabels,
                      'lbl_add_child_birthday_month'
                    )}
                    name="userBirthMonth"
                    id="userBirthMonth"
                    component={SelectBox}
                    options={birthMonthOptionsMap}
                    dataLocator="childBirthdayMonthDD"
                  />
                </Col>
                <Col colSize={{ small: 3, medium: 4, large: 6 }}>
                  <Field
                    placeholder={getLabelValue(
                      addChildBirthdayLabels,
                      'lbl_add_child_birthday_year'
                    )}
                    name="userBirthYear"
                    id="userBirthYear"
                    component={SelectBox}
                    options={birthYearOptionsMap}
                    dataLocator="childBirthdayYearDD"
                  />
                </Col>
              </Row>
              <Col colSize={{ small: 6, medium: 8, large: 12 }} className="elem-mt-LRG">
                <BodyCopy
                  fontFamily="secondary"
                  fontSize="fs10"
                  fontWeight="black"
                  color="gray.900"
                  dataLocator="childGenderLbl"
                >
                  {getLabelValue(addChildBirthdayLabels, 'add_child_gender_heading')}
                </BodyCopy>
              </Col>
              <Col colSize={{ small: 3, medium: 4, large: 6 }}>
                <Field
                  placeholder={getLabelValue(addChildBirthdayLabels, 'lbl_add_child_choose_gender')}
                  name="gender"
                  id="gender"
                  component={SelectBox}
                  options={childOptions}
                  dataLocator="childGenderDD"
                  enableSuccessCheck
                />
              </Col>
            </Row>
          </Col>

          <Col
            colSize={{ small: 6, medium: 4, large: 5 }}
            offsetRight={{ small: 0, medium: 0, large: 1 }}
            offsetLeft={{ small: 0, medium: 0, large: 1 }}
            className="parentInfo"
          >
            <Row fullBleed className="elem-mb-LRG">
              <Col colSize={{ small: 6, medium: 8, large: 12 }}>
                <BodyCopy
                  fontFamily="secondary"
                  fontSize="fs16"
                  fontWeight="black"
                  color="gray.900"
                  data-locator="parentDigitalSignatureLbl"
                >
                  {getLabelValue(addChildBirthdayLabels, 'lbl_add_child_parent_digital_signature')}
                </BodyCopy>
              </Col>
            </Row>
            <Row fullBleed className="elem-mb-LRG">
              <Col colSize={{ small: 3, medium: 8, large: 12 }}>
                <Field
                  placeholder={getLabelValue(addChildBirthdayLabels, 'lbl_add_child_first_name')}
                  name="firstName"
                  id="firstName"
                  type="text"
                  component={TextBox}
                  dataLocator="firstNameField"
                />
              </Col>
              <Col
                colSize={{ small: 3, medium: 8, large: 12 }}
                className="lastName"
                ignoreGutter={{ small: true, medium: true }}
              >
                <Field
                  placeholder={getLabelValue(addChildBirthdayLabels, 'lbl_add_child_last_name')}
                  name="lastName"
                  id="lastName"
                  type="text"
                  component={TextBox}
                  dataLocator="lastNameField"
                />
              </Col>
              <Col colSize={{ small: 6, medium: 8, large: 12 }} className="timestamp">
                <BodyCopy fontFamily="secondary" fontSize="fs14" data-locator="timeStampLbl">
                  {`${getLabelValue(
                    addChildBirthdayLabels,
                    'lbl_add_child_timestamp'
                  )} ${timestamp.toLocaleString(
                    'en-US',
                    AddChildBirthdayForm.timestampFormatOptions
                  )}`}
                </BodyCopy>
              </Col>

              <Col colSize={{ small: 6, medium: 8, large: 12 }} fullBleed className="elem-mt-XL">
                <Field
                  name="acceptAddChildAgreement"
                  id="acceptAddChildAgreement"
                  component={InputCheckbox}
                  dataLocator="tnccb"
                >
                  <BodyCopy
                    component="span"
                    fontSize="fs14"
                    fontFamily="secondary"
                    fontWeight="semibold"
                  >
                    {`${getLabelValue(addChildBirthdayLabels, 'lbl_add_child_terms_agreement')}
                    ${getLabelValue(
                      addChildBirthdayLabels,
                      'lbl_add_child_terms_agreement_second'
                    )}`}
                  </BodyCopy>
                </Field>
              </Col>

              <Col colSize={{ small: 6, medium: 8, large: 12 }} fullBleed className="elem-mt-SM">
                <BodyCopy
                  component="span"
                  fontSize="fs14"
                  fontFamily="secondary"
                  fontWeight="semibold"
                  className="elem-ml-XXL"
                >
                  <Anchor underline noLink to={endpoints.policiesPage} data-locator="privacyLnk">
                    {getLabelValue(addChildBirthdayLabels, 'lbl_add_child_privacy')}
                  </Anchor>
                  <Anchor underline noLink to={endpoints.faqPage} data-locator="faqLnk">
                    {getLabelValue(addChildBirthdayLabels, 'lbl_add_child_faq')}
                  </Anchor>
                </BodyCopy>
              </Col>
            </Row>
          </Col>

          <Row fullBleed className="buttons">
            <Col
              colSize={{ small: 6, medium: 3, large: 4 }}
              offsetRight={{ small: 0, medium: 1, large: 2 }}
              className="submitBtn"
            >
              <Button
                buttonVariation="fixed-width"
                disabled={invalid}
                type="submit"
                fill="BLUE"
                dataLocator="SaveChildFormBtn"
              >
                {getLabelValue(addChildBirthdayLabels, 'lbl_add_child_save')}
              </Button>
            </Col>
            <Col
              colSize={{ small: 6, medium: 3, large: 4 }}
              offsetLeft={{ small: 0, medium: 1, large: 2 }}
              className="cancelBtn"
            >
              <Button
                buttonVariation="fixed-width"
                fill="WHITE"
                onClick={closeAddModal}
                dataLocator="cancelChildFormBtn"
              >
                {getLabelValue(addChildBirthdayLabels, 'lbl_add_child_cancel')}
              </Button>
            </Col>
          </Row>
        </Row>
      </form>
    );
  }
}

const validateMethod = createValidateMethod(
  getStandardConfig([
    'acceptAddChildAgreement',
    'childName',
    'firstName',
    'lastName',
    'userBirthMonth',
    'userBirthYear',
    'gender',
  ])
);

export default reduxForm({
  form: 'AddChildBirthdayForm', // a unique identifier for this form
  enableReinitialize: true,
  ...validateMethod,
})(withStyles(AddChildBirthdayForm, styles));

export { AddChildBirthdayForm as AddChildBirthdayFormVanilla };
