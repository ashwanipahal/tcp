import React from 'react';
import { View } from 'react-native';
import PropTypes from 'prop-types';
import { reduxForm, Field } from 'redux-form';
import InputCheckbox from '@tcp/core/src/components/common/atoms/InputCheckbox';
import Button from '@tcp/core/src/components/common/atoms/Button';
import TextBox from '@tcp/core/src/components/common/atoms/TextBox';
import createValidateMethod from '../../../../../../../utils/formValidation/createValidateMethod';
import getStandardConfig from '../../../../../../../utils/formValidation/validatorStandardConfig';
import Constants from '../../../container/CurrentPassword.utils';
import {
  HideShowField,
  CurrentPasswordWrapper,
  NewPasswordWrapper,
  ConfirmPasswordWrapper,
  CancelWrapper,
} from '../styles/ChangePasswordForm.style.native';

export class ChangePasswordForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      Password: {
        Current: true,
        New: true,
        Confirm: true,
      },
    };
  }

  onShowHidePassword = type => {
    const { Password } = this.state;
    const updatedPassord = Password;
    updatedPassord[type] = !Password[type];
    this.setState({ Password: updatedPassord });
  };

  getHideShowView = (type, isShowText) => {
    const { labels } = this.props;
    return (
      <HideShowField>
        <Field
          name="hide-show-pwd"
          component={InputCheckbox}
          dataLocator="hide-show-pwd"
          disabled={false}
          rightText={isShowText ? labels.lbl_changePassword_show : labels.lbl_changePassword_hide}
          hideCheckboxIcon
          fontSize="fs13"
          onClick={() => this.onShowHidePassword(type)}
        />
      </HideShowField>
    );
  };

  render() {
    const { labels, pristine, handleSubmit, onClose } = this.props;
    const { Password } = this.state;
    return (
      <View>
        <CurrentPasswordWrapper>
          <Field
            id="currentPassword"
            label={labels.lbl_changePassword_current_password}
            name="currentPassword"
            component={TextBox}
            dataLocator="currentPasswordtxtfield"
            enableSuccessCheck={false}
            secureTextEntry={Password.Current}
          />
          {this.getHideShowView(Constants.Current, Password.Current)}
        </CurrentPasswordWrapper>
        <NewPasswordWrapper>
          <Field
            id="password"
            label={labels.lbl_changePassword_new_password}
            name="password"
            component={TextBox}
            dataLocator="newPasswordtxtfield"
            showSuccessCheck
            successText={labels.lbl_changePassword_input_success}
            enableSuccessCheck={false}
            secureTextEntry={Password.New}
          />
          {this.getHideShowView(Constants.New, Password.New)}
        </NewPasswordWrapper>

        <ConfirmPasswordWrapper>
          <Field
            id="confirmPassword"
            label={labels.lbl_changePassword_confirm_password}
            name="confirmPassword"
            component={TextBox}
            dataLocator="confirmPasswordtxtfield"
            showSuccessCheck
            successText={labels.lbl_changePassword_input_success}
            enableSuccessCheck={false}
            secureTextEntry={Password.Confirm}
          />
          {this.getHideShowView(Constants.Confirm, Password.Confirm)}
        </ConfirmPasswordWrapper>
        <Button
          fill="BLUE"
          color="white"
          buttonVariation="variable-width"
          text={labels.lbl_changePassword_saveCta}
          disabled={pristine}
          onPress={handleSubmit}
        />
        <CancelWrapper>
          <Button
            fill="WHITE"
            buttonVariation="variable-width"
            text={labels.lbl_changePassword_cancelCta}
            onPress={onClose}
          />
        </CancelWrapper>
      </View>
    );
  }
}

ChangePasswordForm.propTypes = {
  labels: PropTypes.shape({
    lbl_changePassword_current_password: PropTypes.string,
    lbl_changePassword_new_password: PropTypes.string,
    lbl_changePassword_confirm_password: PropTypes.string,
    lbl_changePassword_cancelCta: PropTypes.string,
    lbl_changePassword_saveCta: PropTypes.string,
  }),
  pristine: PropTypes.bool.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  onClose: PropTypes.func,
};

ChangePasswordForm.defaultProps = {
  labels: {
    lbl_changePassword_current_password: '',
    lbl_changePassword_new_password: '',
    lbl_changePassword_confirm_password: '',
    lbl_changePassword_cancelCta: '',
    lbl_changePassword_saveCta: '',
  },
  onClose: () => {},
};

const validateMethod = createValidateMethod(
  getStandardConfig(['currentPassword', 'password', 'confirmPassword'])
);

export default reduxForm({
  form: 'ChangePasswordForm', // a unique identifier for this form
  enableReinitialize: true,
  ...validateMethod,
})(ChangePasswordForm);
