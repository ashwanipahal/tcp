import React from 'react';
import PropTypes from 'prop-types';
import { Field, reduxForm } from 'redux-form';
import SelectBox from '@tcp/core/src/components/common/atoms/Select';
import withStyles from '@tcp/core/src/components/common/hoc/withStyles';
import InputCheckbox from '@tcp/core/src/components/common/atoms/InputCheckbox';
import Row from '../../../../../../common/atoms/Row';
import TextBox from '../../../../../../common/atoms/TextBox';
import Button from '../../../../../../common/atoms/Button';
import BodyCopy from '../../../../../../common/atoms/BodyCopy';
import Anchor from '../../../../../../common/atoms/Anchor';
import styles from '../styles/AddChild.style';
import Col from '../../../../../../common/atoms/Col';
import createValidateMethod from '../../../../../../../utils/formValidation/createValidateMethod';
import getStandardConfig from '../../../../../../../utils/formValidation/validatorStandardConfig';

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
        <Row fullBleed className="addChildBirthday__heading">
          <Col colSize={{ small: 6, medium: 4, large: 5 }}>
            <Row fullBleed className="elem-mb-LRG">
              <Col colSize={{ small: 6, medium: 8, large: 12 }}>
                <BodyCopy
                  fontFamily="secondary"
                  fontSize="fs16"
                  fontWeight="black"
                  color="gray.900"
                  data-locator="childInfoLbl"
                >
                  {addChildBirthdayLabels.lbl_add_child_child_information}
                </BodyCopy>
              </Col>
            </Row>
            <Row fullBleed className="elem-mb-LRG">
              <Col colSize={{ small: 6, medium: 8, large: 12 }}>
                <Field
                  placeholder={addChildBirthdayLabels.lbl_add_child_child_name}
                  name="childName"
                  id="childName"
                  type="text"
                  component={TextBox}
                  data-locator="childNameField"
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
                  {addChildBirthdayLabels.lbl_add_child_birthday_heading}
                </BodyCopy>
              </Col>
              <Row fullBleed>
                <Col colSize={{ small: 3, medium: 4, large: 6 }}>
                  <Field
                    placeholder={addChildBirthdayLabels.lbl_add_child_birthday_month}
                    name="birthMonth"
                    id="birthMonth"
                    component={SelectBox}
                    options={birthMonthOptionsMap}
                    data-locator="childBirthdayMonthDD"
                  />
                </Col>
                <Col colSize={{ small: 3, medium: 4, large: 6 }}>
                  <Field
                    placeholder={addChildBirthdayLabels.lbl_add_child_birthday_year}
                    name="birthYear"
                    id="birthYear"
                    component={SelectBox}
                    options={birthYearOptionsMap}
                    data-locator="childBirthdayYearDD"
                  />
                </Col>
              </Row>
              <Col colSize={{ small: 6, medium: 8, large: 12 }} className="elem-mt-LRG">
                <BodyCopy
                  fontFamily="secondary"
                  fontSize="fs10"
                  fontWeight="black"
                  color="gray.900"
                  data-locator="childGenderLbl"
                >
                  {addChildBirthdayLabels.lbl_add_child_gender_heading}
                </BodyCopy>
              </Col>
              <Col colSize={{ small: 3, medium: 4, large: 6 }}>
                <Field
                  placeholder={addChildBirthdayLabels.lbl_add_child_choose_gender}
                  name="gender"
                  id="gender"
                  component={SelectBox}
                  options={childOptions}
                  data-locator="childGenderDD"
                  enableSuccessCheck
                />
              </Col>
            </Row>
          </Col>

          <Col
            colSize={{ small: 6, medium: 4, large: 5 }}
            offsetRight={{ small: 0, medium: 0, large: 1 }}
            offsetLeft={{ small: 0, medium: 0, large: 1 }}
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
                  {addChildBirthdayLabels.lbl_add_child_parent_digital_signature}
                </BodyCopy>
              </Col>
            </Row>
            <Row fullBleed className="elem-mb-LRG">
              <Col colSize={{ small: 3, medium: 8, large: 12 }}>
                <Field
                  placeholder={addChildBirthdayLabels.lbl_add_child_first_name}
                  name="firstName"
                  id="firstName"
                  type="text"
                  component={TextBox}
                  data-locator="firstNameField"
                />
              </Col>
              <Col
                colSize={{ small: 3, medium: 8, large: 12 }}
                className="addChildBirthday__lastName"
              >
                <Field
                  placeholder={addChildBirthdayLabels.lbl_add_child_last_name}
                  name="lastName"
                  id="lastName"
                  type="text"
                  component={TextBox}
                  data-locator="lastNameField"
                />
              </Col>
              <Col
                colSize={{ small: 6, medium: 8, large: 12 }}
                className="addChildBirthday__timestamp"
              >
                <BodyCopy fontFamily="secondary" fontSize="fs14" data-locator="timeStampLbl">
                  {`${addChildBirthdayLabels.lbl_add_child_timestamp} ${timestamp.toLocaleString(
                    'en-US',
                    AddChildBirthdayForm.timestampFormatOptions
                  )}`}
                </BodyCopy>
              </Col>

              <Col colSize={{ small: 6, medium: 8, large: 12 }} fullBleed className="elem-mt-LRG">
                <Field
                  name="agreeTermAndConditions"
                  id="agreeTermAndConditions"
                  component={InputCheckbox}
                  data-locator="tnccb"
                >
                  <BodyCopy
                    component="span"
                    fontSize="fs14"
                    fontFamily="secondary"
                    fontWeight="semibold"
                  >
                    {`${addChildBirthdayLabels.lbl_add_child_terms_agreement}
                    ${addChildBirthdayLabels.lbl_add_child_terms_agreement_second}`}
                  </BodyCopy>
                </Field>
              </Col>

              <Col
                colSize={{ small: 6, medium: 8, large: 12 }}
                fullBleed
                className="addChildBirthday_privacy"
              >
                <BodyCopy
                  component="span"
                  fontSize="fs14"
                  fontFamily="secondary"
                  fontWeight="semibold"
                >
                  <Anchor
                    underline
                    noLink
                    to="https://www.childrensplace.com/us/help-center/#policies"
                    data-locator="privacyLnk"
                  >
                    {addChildBirthdayLabels.lbl_add_child_privacy}
                  </Anchor>
                  <Anchor
                    underline
                    noLink
                    to="https://www.childrensplace.com/us/help-center/#faq"
                    data-locator="faqLnk"
                  >
                    {addChildBirthdayLabels.lbl_add_child_faq}
                  </Anchor>
                </BodyCopy>
              </Col>
            </Row>
          </Col>

          <Row fullBleed className="elem-mt-XXXL">
            <Col
              colSize={{ small: 6, medium: 3, large: 4 }}
              offsetLeft={{ small: 0, medium: 1, large: 2 }}
              className="addChildBirthday__cancel"
            >
              <Button
                buttonVariation="fixed-width"
                fill="WHITE"
                onClick={closeAddModal}
                data-locator="cancelChildFormBtn"
              >
                {addChildBirthdayLabels.lbl_add_child_cancel}
              </Button>
            </Col>
            <Col
              colSize={{ small: 6, medium: 3, large: 4 }}
              offsetRight={{ small: 0, medium: 1, large: 2 }}
              className="addChildBirthday__submit"
            >
              <Button
                buttonVariation="fixed-width"
                disabled={invalid}
                type="submit"
                fill="BLUE"
                data-locator="SaveChildFormBtn"
              >
                {addChildBirthdayLabels.lbl_add_child_save}
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
    'agreeTermAndConditions',
    'childName',
    'firstName',
    'lastName',
    { birthMonth: 'userBirthMonth' },
    { birthYear: 'userBirthYear' },
    'gender',
  ])
);

export default reduxForm({
  form: 'AddChildBirthdayForm', // a unique identifier for this form
  enableReinitialize: true,
  ...validateMethod,
})(withStyles(AddChildBirthdayForm, styles));

export { AddChildBirthdayForm as AddChildBirthdayFormVanilla };
