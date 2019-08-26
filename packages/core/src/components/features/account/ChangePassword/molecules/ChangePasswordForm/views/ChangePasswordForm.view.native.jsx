import React from 'react';
import { View } from 'react-native';
import PropTypes from 'prop-types';
import { reduxForm, Field } from 'redux-form';
import InputCheckbox from '../../../../../../common/atoms/InputCheckbox';
import BodyCopy from '../../../../../../common/atoms/BodyCopy';
import Anchor from '../../../../../../common/atoms/Anchor/views/Anchor';
import Button from '../../../../../../common/atoms/Button';
import TextBox from '../../../../../../common/atoms/TextBox';
import withStyles from '../../../../../../common/hoc/withStyles';
import PasswordField from '../../../../common/molecule/PasswordField';
import PasswordRequirement from '../../../../ResetPassword/molecules/PasswordRequirement';
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
    return (
      <HideShowField>
        <Field
          name="hide-show-pwd"
          component={InputCheckbox}
          dataLocator="hide-show-pwd"
          disabled={false}
          rightText={isShowText ? 'show' : 'hide'}
          hideCheckboxIcon
          fontSize="fs13"
          onClick={() => this.onShowHidePassword(type)}
        />
      </HideShowField>
    );
  };

  render() {
    const { labels, pristine, errorMessage, handleSubmit, onClose } = this.props;
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
            showSuccessCheck={false}
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
            showSuccessCheck={false}
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
            showSuccessCheck={false}
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
  errorMessage: PropTypes.string.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  className: PropTypes.string,
  onClose: PropTypes.func,
};

ChangePasswordForm.defaultProps = {
  className: '',
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
