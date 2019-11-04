import React from 'react';
import PropTypes from 'prop-types';
import { getLabelValue } from '@tcp/core/src/utils/utils';
import ReactTooltip from '@tcp/core/src/components/common/atoms/ReactToolTip';
import ImageComp from '@tcp/core/src/components/common/atoms/Image';
import IconInfoLogo from '@tcp/core/src/assets/info-icon.png';
import { reduxForm, Field } from 'redux-form';
import Button from '../../../../../../common/atoms/Button';
import PasswordRequirement from '../../PasswordRequirement';
import createValidateMethod from '../../../../../../../utils/formValidation/createValidateMethod';
import getStandardConfig from '../../../../../../../utils/formValidation/validatorStandardConfig';
import {
  PasswordWrapper,
  ConfirmPasswordWrapper,
  ConfirmHideShowField,
  IconContainer,
  ResetPasswordWrapper,
} from '../styles/ResetPasswordForm.style.native';
import InputCheckbox from '../../../../../../common/atoms/InputCheckbox';
import { BodyCopyWithSpacing } from '../../../../../../common/atoms/styledWrapper';
import TextBox from '../../../../../../common/atoms/TextBox';

export const ResetPasswordForm = ({
  labels,
  successMessage,
  handleSubmit,
  resetPasswordErrorMessage,
  showNotification,
  onPwdHideShowClick,
  hideShowPwd,
  onConfirmPwdHideShowClick,
  confirmHideShowPwd,
}) => {
  return (
    <ResetPasswordWrapper>
      {successMessage && (
        <BodyCopyWithSpacing
          fontSize="fs12"
          fontWeight="semibold"
          textAlign="center"
          color="green.500"
          text={labels[`lbl_resetPassword_${successMessage}`]}
          spacingStyles="margin-bottom-XL"
        />
      )}

      {resetPasswordErrorMessage && showNotification && (
        <BodyCopyWithSpacing
          fontSize="fs12"
          fontWeight="semibold"
          textAlign="center"
          color="red.500"
          text={resetPasswordErrorMessage}
          spacingStyles="margin-bottom-XL"
        />
      )}

      <PasswordWrapper>
        <Field
          label={getLabelValue(labels, 'lbl_resetPassword_password')}
          name="password"
          id="password"
          type="text"
          component={TextBox}
          dataLocator="password"
          secureTextEntry={!hideShowPwd}
        />

        <IconContainer>
          <ReactTooltip
            withOverlay={false}
            popover={<PasswordRequirement labels={labels} />}
            height={200}
            width={300}
            textAlign="left"
          >
            <ImageComp source={IconInfoLogo} height={12} width={12} />
          </ReactTooltip>
        </IconContainer>
        <ConfirmHideShowField>
          <Field
            name="hide-show-pwd"
            component={InputCheckbox}
            dataLocator="hide-show-pwd"
            disabled={false}
            rightText={
              hideShowPwd
                ? getLabelValue(labels, 'lbl_changePassword_hide')
                : getLabelValue(labels, 'lbl_changePassword_show')
            }
            onClick={onPwdHideShowClick}
            hideCheckboxIcon
          />
        </ConfirmHideShowField>
      </PasswordWrapper>
      <ConfirmPasswordWrapper>
        <Field
          label={getLabelValue(labels, 'lbl_resetPassword_confirmPassword')}
          name="confirmPassword"
          id="confirmPassword"
          type="text"
          component={TextBox}
          dataLocator="confirmPassword"
          secureTextEntry={!confirmHideShowPwd}
        />
        <ConfirmHideShowField>
          <Field
            name="hide-show-confirm-pwd"
            component={InputCheckbox}
            dataLocator="hide-show-confirm-pwd"
            disabled={false}
            rightText={
              confirmHideShowPwd
                ? getLabelValue(labels, 'lbl_changePassword_hide')
                : getLabelValue(labels, 'lbl_changePassword_show')
            }
            onClick={onConfirmPwdHideShowClick}
            hideCheckboxIcon
          />
        </ConfirmHideShowField>
      </ConfirmPasswordWrapper>

      <Button
        fill="BLUE"
        type="submit"
        buttonVariation="variable-width"
        onPress={handleSubmit}
        text={getLabelValue(labels, 'lbl_resetPassword_resetCta')}
      />
    </ResetPasswordWrapper>
  );
};

ResetPasswordForm.propTypes = {
  labels: PropTypes.shape({}).isRequired,
  successMessage: PropTypes.string.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  resetPasswordErrorMessage: PropTypes.string.isRequired,
  showNotification: PropTypes.bool.isRequired,
  onPwdHideShowClick: PropTypes.func,
  hideShowPwd: PropTypes.bool,
  onConfirmPwdHideShowClick: PropTypes.func,
  confirmHideShowPwd: PropTypes.func,
};

ResetPasswordForm.defaultProps = {
  onPwdHideShowClick: () => {},
  hideShowPwd: false,
  onConfirmPwdHideShowClick: () => {},
  confirmHideShowPwd: false,
};

const validateMethod = createValidateMethod(getStandardConfig(['password', 'confirmPassword']));

export default reduxForm({
  form: 'ResetPasswordNativeForm', // a unique identifier for this form
  enableReinitialize: true,
  ...validateMethod,
})(ResetPasswordForm);
