import React from 'react';
import PropTypes from 'prop-types';
import { reduxForm, Field } from 'redux-form';
import Notification from '@tcp/core/src/components/common/molecules/Notification';
import BodyCopy from '@tcp/core/src/components/common/atoms/BodyCopy';
import Row from '@tcp/core/src/components/common/atoms/Row';
import Col from '@tcp/core/src/components/common/atoms/Col';
import Anchor from '@tcp/core/src/components/common/atoms/Anchor/views/Anchor';
import Button from '@tcp/core/src/components/common/atoms/Button';
import TextBox from '@tcp/core/src/components/common/atoms/TextBox';
import SelectBox from '@tcp/core/src/components/common/atoms/Select';
import InputCheckbox from '@tcp/core/src/components/common/atoms/InputCheckbox';
import createValidateMethod from '@tcp/core/src/utils/formValidation/createValidateMethod';
import { isCanada } from '@tcp/core/src/utils';
import getStandardConfig from '@tcp/core/src/utils/formValidation/validatorStandardConfig';
import withStyles from '@tcp/core/src/components/common/hoc/withStyles';
import { getLabelValue } from '@tcp/core/src/utils/utils';
import styles from '../styles/AddEditPersonalInformationForm.style';
import AddEditPersonalInfoConstants from '../../../AddEditPersonalInformation.constants';
import internalEndpoints from '../../../../common/internalEndpoints';
import { formatPhoneNumber } from '../../../../../../../utils/formValidation/phoneNumber';

export const AddEditPersonalInformationForm = ({
  className,
  labels,
  pristine,
  errorMessage,
  handleSubmit,
  birthMonthOptionsMap,
  birthYearOptionsMap,
  isEmployee,
  personalInfoErrorMessage,
}) => {
  return (
    <form
      name={AddEditPersonalInfoConstants.ADD_PROFILE_INFORMATION_FORM}
      className={className}
      onSubmit={handleSubmit}
      noValidate
    >
      {errorMessage && personalInfoErrorMessage && (
        <Notification
          className="elem-mt-MED"
          status="error"
          message={`${personalInfoErrorMessage}`}
        />
      )}
      <Row fullBleed className="elem-mt-XXL">
        <Col ignoreGutter={{ small: true }} colSize={{ small: 6, medium: 4, large: 6 }}>
          <Field
            placeholder={getLabelValue(labels, 'lbl_profile_personal_info_firstName')}
            name="firstName"
            id="firstName"
            type="text"
            component={TextBox}
            dataLocator="editPersonalInfo-firstname"
          />
        </Col>
        <Col colSize={{ small: 6, medium: 4, large: 6 }} className="addEditPersonallastName">
          <Field
            placeholder={getLabelValue(labels, 'lbl_profile_personal_info_lastName')}
            name="lastName"
            id="lastName"
            component={TextBox}
            dataLocator="editPersonalInfo-lastname"
          />
        </Col>
      </Row>
      <Row fullBleed className="elem-mt-MED">
        <Col colSize={{ small: 6, medium: 4, large: 6 }} ignoreGutter={{ small: true }}>
          <Field
            placeholder={getLabelValue(labels, 'lbl_profile_personal_info_email')}
            name="Email"
            id="Email"
            type="email"
            component={TextBox}
            dataLocator="editPersonalInfo-email"
          />
          <BodyCopy fontFamily="secondary" fontSize="fs12">
            {getLabelValue(labels, 'lbl_profile_email_used_login')}
          </BodyCopy>
        </Col>
        <Col colSize={{ small: 6, medium: 4, large: 6 }} className="addEditPersonalPhoneNumber">
          <Field
            placeholder={getLabelValue(labels, 'lbl_profile_personal_info_phoneNumber')}
            name="phoneNumber"
            id="phoneNumber"
            component={TextBox}
            dataLocator="editPersonalInfo-phnumber"
            type="tel"
            normalize={formatPhoneNumber}
          />
        </Col>
      </Row>
      <Row fullBleed className="elem-mt-XL addEditPersonalBirthday">
        <Col colSize={{ small: 6, medium: 8, large: 12 }}>
          <BodyCopy component="div" fontWeight="extrabold" fontSize="fs12">
            {getLabelValue(labels, 'lbl_profile_personal_info_birthday')}
          </BodyCopy>
        </Col>
      </Row>
      <Row fullBleed className="elem-mt-MED">
        <Col colSize={{ small: 6, medium: 4, large: 6 }}>
          <Row fullBleed>
            <Col colSize={{ small: 3, medium: 4, large: 6 }}>
              <Field
                placeholder={getLabelValue(labels, 'lbl_profile_personal_info_month')}
                name="userBirthMonth"
                id="userBirthMonth"
                component={SelectBox}
                dataLocator="editPersonalInfo-userBirthMonth"
                options={birthMonthOptionsMap}
                className="field"
                enableSuccessCheck={false}
              />
            </Col>
            <Col colSize={{ small: 3, medium: 4, large: 6 }}>
              <Field
                placeholder={getLabelValue(labels, 'lbl_profile_personal_info_year')}
                name="userBirthYear"
                id="userBirthYear"
                component={SelectBox}
                dataLocator="editPersonalInfo-userBirthYear"
                options={birthYearOptionsMap}
                className="field"
                enableSuccessCheck={false}
              />
            </Col>
          </Row>
          <BodyCopy className="elem-mt-XS" fontFamily="secondary" fontSize="fs12">
            {getLabelValue(labels, 'lbl_profile_celebration_birthday')}
          </BodyCopy>
        </Col>
        <Col colSize={{ small: 6, medium: 4, large: 6 }}>
          {isCanada() && (
            <>
              <Field
                placeholder={getLabelValue(labels, 'lbl_profile_personal_air_miles')}
                name="airMilesAccountNumber"
                id="airMilesAccountNumber"
                component={TextBox}
                dataLocator="editPersonalInfo-airMiles"
              />
              <BodyCopy fontSize="fs12" component="div">
                {getLabelValue(labels, 'lbl_profile_collector_number')}
              </BodyCopy>
            </>
          )}
        </Col>
      </Row>
      <Row fullBleed className="elem-mt-LRG">
        <Col colSize={{ small: 6, medium: 4, large: 6 }} className="dropdown-text">
          <Field
            name="isEmployee"
            component={InputCheckbox}
            dataLocator="editPersonalInfo-isEmployee"
            className="AddPersonalInfo-isEmployee"
          >
            {getLabelValue(labels, 'lbl_profile_personal_info_tcp_employee')}
          </Field>
        </Col>
      </Row>
      {isEmployee && (
        <Row fullBleed className="elem-mt-XL">
          <Col ignoreGutter={{ small: true }} colSize={{ small: 6, medium: 4, large: 6 }}>
            <Field
              placeholder={getLabelValue(labels, 'lbl_profile_personal_info_associate_id')}
              name="associateId"
              id="associateId"
              type="text"
              component={TextBox}
              dataLocator="editPersonalInfo-associateId"
            />
          </Col>
        </Row>
      )}
      <Row className="elem-mb-LRG elem-mt-XXL">
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
          <Anchor
            to={internalEndpoints.profilePage.link}
            asPath={internalEndpoints.profilePage.path}
          >
            <Button
              type="button"
              buttonVariation="fixed-width"
              dataLocator="cancelBtn"
              fullWidth
              className="elem-mb-XS"
            >
              {getLabelValue(labels, 'lbl_profile_personal_info_cancelCta')}
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
            {getLabelValue(labels, 'lbl_profile_personal_info_updateCta')}
          </Button>
        </Col>
      </Row>
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
  personalInfoErrorMessage: PropTypes.string,
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
  personalInfoErrorMessage: '',
};

const validateMethod = createValidateMethod(
  getStandardConfig([
    'firstName',
    'lastName',
    'phoneNumber',
    'associateId',
    'airMilesAccountNumber',
    'Email',
    'userBirthMonth',
    'userBirthYear',
  ])
);

export default reduxForm({
  form: AddEditPersonalInfoConstants.ADD_PROFILE_INFORMATION_FORM, // a unique identifier for this form
  enableReinitialize: true,
  ...validateMethod,
})(withStyles(AddEditPersonalInformationForm, styles));
