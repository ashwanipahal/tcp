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
import getStandardConfig from '@tcp/core/src/utils/formValidation/validatorStandardConfig';
import withStyles from '@tcp/core/src/components/common/hoc/withStyles';
import styles from '../styles/AboutYouInformationForm.style';
import AboutYouInformationConstants from '../../../container/AboutYouInformation.constants';
import internalEndpoints from '../../../../common/internalEndpoints';

export const AboutYouInformationForm = ({
  className,
  labels,
  pristine,
  errorMessage,
  handleSubmit,
}) => {
  return (
    <form
      name={AboutYouInformationConstants.ADD_PROFILE_INFORMATION_FORM}
      className={className}
      onSubmit={handleSubmit}
      noValidate
    >
      {errorMessage && (
        <Notification
          className="elem-mt-MED"
          status="error"
          message={labels[`lbl_profile_error_${errorMessage}`]}
        />
      )}
      <Row fullBleed className="elem-mt-XXL">
        <BodyCopy>Hello</BodyCopy>
      </Row>
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
    </form>
  );
};

AboutYouInformationForm.propTypes = {
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
  pristine: PropTypes.bool.isRequired,
  errorMessage: PropTypes.string.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  className: PropTypes.string,
};

AboutYouInformationForm.defaultProps = {
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
  form: AboutYouInformationConstants.ADD_PROFILE_INFORMATION_FORM, // a unique identifier for this form
  enableReinitialize: true,
  ...validateMethod,
})(withStyles(AboutYouInformationForm, styles));
