import React from 'react';
import PropTypes from 'prop-types';
import { Field, change } from 'redux-form';
import { View } from 'react-native';
import getStandardConfig from '../../../../../utils/formValidation/validatorStandardConfig';
import TextBox from '../../../atoms/TextBox';
import InputCheckbox from '../../../atoms/InputCheckbox';
import Anchor from '../../../atoms/Anchor';
import BodyCopy from '../../../atoms/BodyCopy';
import {
  PhoneWrapper,
  PhoneFieldWrapper,
  StyledText,
  StyledCheckbox,
  StyledMsgWrapper,
  SMSFormFieldsWrapper,
} from '../styles/SMSFormFields.style.native';

class SMSFormFields extends React.PureComponent {
  static smsFormFieldsConfig = getStandardConfig(['phoneNumber']);

  handleChange = () => {
    const { dispatch, addressPhoneNo, formName, formSection } = this.props;
    /* istanbul ignore else */
    if (dispatch) {
      dispatch(change(formName, `${formSection}.phoneNumber`, addressPhoneNo));
    }
  };

  render() {
    const { isOrderUpdateChecked, labels, formSection } = this.props;
    return (
      <SMSFormFieldsWrapper>
        <StyledCheckbox>
          <Field
            name="sendOrderUpdate"
            component={InputCheckbox}
            dataLocator="hide-show-checkbox"
            enableSuccessCheck={false}
            onChange={() => this.handleChange()}
          />
          <BodyCopy
            dataLocator="pickup-email-signUp-heading-lbl"
            fontSize="fs14"
            mobileFontFamily="secondary"
            fontWeight="regular"
            text={labels.orderUpdates}
          />
        </StyledCheckbox>
        {isOrderUpdateChecked && (
          <View>
            <PhoneWrapper>
              <StyledText> +1 </StyledText>
              <PhoneFieldWrapper>
                <Field
                  label="Phone Number"
                  name="phoneNumber"
                  id={`${formSection}.phoneNumber`}
                  type="tel"
                  component={TextBox}
                  maxLength={50}
                  dataLocator="phone-number-field"
                  enableSuccessCheck={false}
                  className="phone-field"
                  marginBottom={false}
                />
              </PhoneFieldWrapper>
            </PhoneWrapper>
            <StyledMsgWrapper>
              <BodyCopy
                fontSize="fs10"
                fontFamily="primary"
                fontWeight="regular"
                text={labels.smsSignupText}
              />
              <Anchor
                noUnderline
                anchorVariation="primary"
                fontSizeVariation="small"
                noLink
                href="#"
                target="_blank"
                text={labels.privacyPolicy}
              />
            </StyledMsgWrapper>
          </View>
        )}
      </SMSFormFieldsWrapper>
    );
  }
}

SMSFormFields.propTypes = {
  isOrderUpdateChecked: PropTypes.bool,
  labels: PropTypes.shape({}).isRequired,
  dispatch: PropTypes.func,
  addressPhoneNo: PropTypes.number,
  formName: PropTypes.string,
  formSection: PropTypes.string,
};

SMSFormFields.defaultProps = {
  isOrderUpdateChecked: false,
  dispatch: () => {},
  addressPhoneNo: null,
  formName: '',
  formSection: '',
};

export default SMSFormFields;
