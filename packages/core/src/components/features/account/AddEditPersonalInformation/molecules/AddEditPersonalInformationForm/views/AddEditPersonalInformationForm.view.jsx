import React from 'react';
import PropTypes from 'prop-types';
import { reduxForm, Field } from 'redux-form';
import Notification from '@tcp/core/src/components/common/molecules/Notification';
import BodyCopy from '../../../../../../common/atoms/BodyCopy';
import Row from '../../../../../../common/atoms/Row';
import Col from '../../../../../../common/atoms/Col';
import Anchor from '../../../../../../common/atoms/Anchor/views/Anchor';
import Button from '../../../../../../common/atoms/Button';
import TextBox from '../../../../../../common/atoms/TextBox';
import SelectBox from '../../../../../../common/atoms/Select';
import InputCheckbox from '../../../../../../common/atoms/InputCheckbox';
import withStyles from '../../../../../../common/hoc/withStyles';
import createValidateMethod from '../../../../../../../utils/formValidation/createValidateMethod';
import getStandardConfig from '../../../../../../../utils/formValidation/validatorStandardConfig';
import styles from '../styles/AddEditPersonalInformationForm.style';
import { isCanada } from '../../../../../../../utils';

export const AddEditPersonalInformationForm = ({
  className,
  labels,
  pristine,
  errorMessage,
  handleSubmit,
  birthMonthOptionsMap,
  birthYearOptionsMap,
  isEmployee
}) => {
  return (
    <form
      name="AddEditPersonalInformationForm"
      className={className}
      onSubmit={handleSubmit}
      noValidate
    >
      {errorMessage && (
        <Notification
          className="elem-mt-MED"
          status="error"
          colSize={{ large: 12, medium: 8, small: 6 }}
          message={labels[`lbl_profile_pofile_info_${errorMessage}`]}
        />
      )}
      <Row fullBleed className="elem-mt-XXL">
        <Col ignoreGutter={{ small: true }} colSize={{ small: 6, medium: 4, large: 6 }}>
          <Field
            placeholder={labels.lbl_profile_personal_info_firstName}
            name="firstName"
            id="firstName"
            type="text"
            component={TextBox}
            dataLocator="addnewaddress-firstname"
          />
        </Col>
        <Col colSize={{ small: 6, medium: 4, large: 6 }}>
          <Field
            placeholder={labels.lbl_profile_personal_info_lastName}
            name="lastName"
            id="lastName"
            component={TextBox}
            dataLocator="addnewaddress-lastname"
          />
        </Col>
      </Row>
      <Row fullBleed className="elem-mt-MED">
        <Col colSize={{ small: 6, medium: 4, large: 6 }} ignoreGutter={{ small: true }}>
          <Field
            placeholder={labels.lbl_profile_personal_info_email}
            name="Email"
            id="Email"
            component={TextBox}
            dataLocator="addnewaddress-email"
          />
          <BodyCopy fontSize="fs12">{labels.lbl_profile_email_used_login}</BodyCopy>
        </Col>
        <Col colSize={{ small: 6, medium: 4, large: 6 }}>
          <Field
            placeholder={labels.lbl_profile_personal_info_phoneNumber}
            name="phoneNumber"
            id="phoneNumber"
            component={TextBox}
            dataLocator="addnewaddress-phnumber"
            type="tel"
          />
        </Col>
      </Row>
      <Row fullBleed className="elem-mt-XL">
        <Col colSize={{ small: 6, medium: 8, large: 12 }}>
          <BodyCopy component="div" fontWeight="extrabold" fontSize="fs12">{labels.lbl_profile_personal_info_birthday}</BodyCopy>
        </Col>
      </Row>
      <Row fullBleed className="elem-mt-MED">
        <Col colSize={{ small: 3, medium: 2, large: 3 }}>
          <Field
            placeholder={labels.lbl_profile_personal_info_month}
            name="userBirthMonth"
            id="userBirthMonth"
            component={SelectBox}
            dataLocator="payment-expmonthdd"
            options={birthMonthOptionsMap}
            className="field"
            enableSuccessCheck={false}
          />
          <BodyCopy component="div" fontSize="fs12">{labels.lbl_profile_celebration_birthday}</BodyCopy>
        </Col>
        <Col colSize={{ small: 3, medium: 2, large: 3 }}>
          <Field
            placeholder={labels.lbl_profile_personal_info_year}
            name="userBirthYear"
            id="userBirthYear"
            component={SelectBox}
            dataLocator="payment-expyeardd"
            options={birthYearOptionsMap}
            className="field"
            enableSuccessCheck={false}
          />
        </Col>
        <Col colSize={{ small: 6, medium: 4, large: 6 }}>
          {isCanada() && (
            <>
              <Field
                placeholder={labels.lbl_profile_personal_air_miles}
                name="airMilesAccountNumber"
                id="airMilesAccountNumber"
                component={TextBox}
                dataLocator="airMilesAccountNumber"
              />
              <BodyCopy fontSize="fs12" component="div">{labels.lbl_profile_collector_number}</BodyCopy>
            </>
          )}
        </Col>
      </Row>

      <Row fullBleed className="elem-mt-LRG">
        <Col
          colSize={{ small: 4, medium: 4, large: 6 }}
          offsetLeft={{ small: 1 }}
          className="dropdown-text"
        >
          <Field
            name="isEmployee"
            component={InputCheckbox}
            dataLocator="addnewaddress-setdefaddress"
            // disabled={isMakeDefaultDisabled}
            className="AddPersonalInfo-isEmployee"
          >
            {labels.lbl_profile_personal_info_tcp_employee}
          </Field>
        </Col>
      </Row>
      {isEmployee && (
      <Row fullBleed className="elem-mt-XL">
        <Col ignoreGutter={{ small: true }} colSize={{ small: 6, medium: 4, large: 6 }}>
          <Field
            placeholder={labels.lbl_profile_personal_info_associate_id}
            name="associateId"
            id="associateId"
            type="text"
            component={TextBox}
            dataLocator="addnewaddress-associateId"
          />
        </Col>
      </Row>
      )}
      <BodyCopy component="div" textAlign="center" className="elem-mb-LRG elem-mt-XXL">
        <Row>
          <Col
            className="AddEditPersonalInformationForm_cancel"
            colSize={{
              large: 3,
              medium: 2,
              small: 6,
            }}
            offsetLeft={{
              large: 3,
              medium: 1,
            }}
          >
            <Anchor to="/account?id=profile" asPath="/account/profile">
              <Button
                type="button"
                buttonVariation="fixed-width"
                dataLocator="cancelBtn"
                fullWidth
                className="elem-mb-XS"
              >
                {labels.lbl_profile_personal_info_cancelCta}
              </Button>
            </Anchor>
          </Col>
          <Col
            className="AddEditPersonalInformationForm_update"
            colSize={{
              large: 3,
              medium: 2,
              small: 6,
            }}
          >
            <Button
              fill="BLUE"
              type="submit"
              buttonVariation="fixed-width"
              dataLocator="UpdateBtn"
              fullWidth
              className="elem-mb-XS"
              disabled={pristine}
            >
              {labels.lbl_profile_personal_info_updateCta}
            </Button>
          </Col>
        </Row>
      </BodyCopy>
    </form>
  );
};

AddEditPersonalInformationForm.propTypes = {
  labels: PropTypes.shape({
    lbl_profile_personal_info_firstName: PropTypes.string,
    lbl_profile_personal_info_lastName: PropTypes.string,
    lbl_profile_personal_info_email: PropTypes.string,
    lbl_profile_personal_info_phoneNumber: PropTypes.string,
    lbl_profile_personal_info_month: PropTypes.string,
    lbl_profile_personal_info_year: PropTypes.string,
    lbl_profile_personal_air_miles: PropTypes.string,
    lbl_profile_collector_number: PropTypes.string,
    lbl_profile_personal_info_tcp_employee: PropTypes.string,
    lbl_profile_personal_info_associate_id: PropTypes.string,
    lbl_profile_personal_info_cancelCta: PropTypes.string,
    lbl_profile_personal_info_updateCta: PropTypes.string,
  }),
  birthMonthOptionsMap: PropTypes.shape([]).isRequired,
  birthYearOptionsMap: PropTypes.shape([]).isRequired,
  pristine: PropTypes.bool.isRequired,
  errorMessage: PropTypes.string.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  className: PropTypes.string,
  isEmployee: PropTypes.string.isRequired,
};

AddEditPersonalInformationForm.defaultProps = {
  className: '',
  labels: {
    lbl_profile_personal_info_firstName: '',
    lbl_profile_personal_info_lastName: '',
    lbl_profile_personal_info_email: '',
    lbl_profile_personal_info_phoneNumber: '',
    lbl_profile_personal_info_month: '',
    lbl_profile_personal_info_year: '',
    lbl_profile_personal_air_miles: '',
    lbl_profile_collector_number: '',
    lbl_profile_personal_info_tcp_employee: '',
    lbl_profile_personal_info_associate_id: '',
    lbl_profile_personal_info_cancelCta: '',
    lbl_profile_personal_info_updateCta: '',
  },
};

const validateMethod = createValidateMethod(
  getStandardConfig([
    'firstName',
    'lastName',
    'phoneNumber',
    'associateId',
    'airMilesAccountNumber',
    'Email',
    { userBirthMonth: 'userDateOfBirth' },
  ])
);

export default reduxForm({
  form: 'AddEditPersonalInformationForm', // a unique identifier for this form
  enableReinitialize: true,
  ...validateMethod,
})(withStyles(AddEditPersonalInformationForm, styles));
