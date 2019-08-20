import React from 'react';
import PropTypes from 'prop-types';
import { reduxForm, Field } from 'redux-form';
import Notification from '@tcp/core/src/components/common/molecules/Notification';
import BodyCopy from '../../../../../../common/atoms/BodyCopy';
import Row from '../../../../../../common/atoms/Row';
import Col from '../../../../../../common/atoms/Col';
import Anchor from '../../../../../../common/atoms/Anchor/views/Anchor';
import Button from '../../../../../../common/atoms/Button';
import withStyles from '../../../../../../common/hoc/withStyles';
import PasswordField from '../../../../common/molecule/PasswordField';
import PasswordRequirement from '../../PasswordRequirement';
import createValidateMethod from '../../../../../../../utils/formValidation/createValidateMethod';
import getStandardConfig from '../../../../../../../utils/formValidation/validatorStandardConfig';
import styles from '../styles/ChangePasswordForm.style';

export const ChangePasswordForm = ({
  className,
  labels,
  pristine,
  successMessage,
  errorMessage,
  handleSubmit,
}) => {
  return (
    <form name="ChangePasswordForm" noValidate onSubmit={handleSubmit} className={className}>
      {successMessage && (
        <Notification
          status="success"
          colSize={{ large: 12, medium: 8, small: 6 }}
          message={labels[`lbl_changePassword_${successMessage}`]}
        />
      )}
      {errorMessage && (
        <Notification
          status="error"
          colSize={{ large: 12, medium: 8, small: 6 }}
          message={labels[`lbl_changePassword_${errorMessage}`]}
        />
      )}
      <Field
        id="oldPassword"
        placeholder={labels.lbl_changePassword_current_password}
        name="oldPassword"
        component={PasswordField}
        dataLocator="currentPasswordtxtfield"
        errorDataLocator="changePassword-passworderror"
        showSuccessCheck={false}
        enableSuccessCheck={false}
        className="elem-mb-SM"
      />
      <Field
        id="password"
        placeholder={labels.lbl_changePassword_new_password}
        name="password"
        component={PasswordField}
        dataLocator="newPasswordtxtfield"
        errorDataLocator="changePassword-passworderror"
        showSuccessCheck={false}
        enableSuccessCheck={false}
        className="elem-mb-SM"
        tooltipContent={<PasswordRequirement labels={labels} />}
      />
      <Field
        id="confirmPassword"
        placeholder={labels.lbl_changePassword_confirm_password}
        name="confirmPassword"
        component={PasswordField}
        dataLocator="confirmPasswordtxtfield"
        errorDataLocator="changePassword-passworderror"
        showSuccessCheck={false}
        enableSuccessCheck={false}
        className="elem-mb-SM"
      />
      <BodyCopy component="div" textAlign="center" className="elem-mb-LRG">
        <Row>
          <Col
            colSize={{
              large: 3,
              medium: 6,
              small: 6,
            }}
            offsetLeft={{
              large: 2,
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
                {labels.lbl_changePassword_cancelCta}
              </Button>
            </Anchor>
          </Col>
          <Col
            colSize={{
              large: 3,
              medium: 6,
              small: 6,
            }}
          >
            <Button
              fill="BLUE"
              type="submit"
              buttonVariation="fixed-width"
              dataLocator="SaveBtn"
              fullWidth
              className="elem-mb-XS"
              disabled={pristine}
            >
              {labels.lbl_changePassword_saveCta}
            </Button>
          </Col>
        </Row>
      </BodyCopy>
    </form>
  );
};

ChangePasswordForm.propTypes = {
  labels: PropTypes.shape({}).isRequired,
  pristine: PropTypes.bool.isRequired,
  successMessage: PropTypes.string.isRequired,
  errorMessage: PropTypes.string.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  className: PropTypes.string,
};

ChangePasswordForm.defaultProps = {
  className: '',
};

const validateMethod = createValidateMethod(
  getStandardConfig(['oldPassword', 'password', 'confirmPassword'])
);

export default reduxForm({
  form: 'ChangePasswordForm', // a unique identifier for this form
  enableReinitialize: true,
  ...validateMethod,
})(withStyles(ChangePasswordForm, styles));
