import React from 'react';
import { FormSection, Field } from 'redux-form';
import PropTypes from 'prop-types';
import BodyCopy from '../../../../../../common/atoms/BodyCopy';
import RichText from '../../../../../../common/atoms/RichText';
import InputCheckbox from '../../../../../../common/atoms/InputCheckbox';
import withStyles from '../../../../../../common/hoc/withStyles';

import styles from '../styles/EmailSignUpCheckBox.view.style';

class EmailSignUpCheckBox extends React.PureComponent {
  render() {
    const {
      labels: {
        emailSignUpHeader,
        emailSignUpSubHeader,
        childrenPlaceCheckoutTxt,
        gymboreePlaceCheckoutTxt,
        emailSignUpDisclaimer,
      },
      className,
      fieldName,
      emailSignUpFlags: { emailSignUpTCP, emailSignUpGYM } = {},
    } = this.props;
    return (
      <FormSection name="emailSignUp">
        <div className={className}>
          <BodyCopy
            dataLocator="email-signUp-heading"
            fontSize="fs16"
            fontFamily="secondary"
            fontWeight="bold"
          >
            {emailSignUpHeader}
          </BodyCopy>
          <BodyCopy
            dataLocator="email-signUp-subHeading"
            fontSize="fs14"
            fontFamily="secondary"
            className="email-signUp-subHeading"
            fontWeight="regular"
          >
            {emailSignUpSubHeader}
          </BodyCopy>
          <div className="email-checkbox-container">
            <div className="email-checkbox-list">
              <Field
                dataLocator="signUp-checkbox-field"
                name={fieldName}
                component={InputCheckbox}
                checked={emailSignUpTCP}
                className="email-signup-tcp"
              >
                <BodyCopy
                  dataLocator="pickup-email-signUp-heading-lbl"
                  fontSize="fs16"
                  fontFamily="secondary"
                  fontWeight="regular"
                >
                  {childrenPlaceCheckoutTxt}
                </BodyCopy>
              </Field>
              <Field
                dataLocator="signUp-checkbox-field"
                name={`${fieldName}GYM`}
                checked={emailSignUpGYM}
                component={InputCheckbox}
                className="email-signup-gym"
              >
                <BodyCopy
                  dataLocator="pickup-email-signUp-heading-lbl"
                  fontSize="fs16"
                  fontFamily="secondary"
                  fontWeight="regular"
                >
                  {gymboreePlaceCheckoutTxt}
                </BodyCopy>
              </Field>
            </div>
            <div className="email-signup-text">
              <RichText
                fontSize="fs10"
                fontFamily="secondary"
                fontWeight="regular"
                className="email-signup-disclaimer_txt"
                richTextHtml={emailSignUpDisclaimer}
              />
            </div>
          </div>
        </div>
      </FormSection>
    );
  }
}

EmailSignUpCheckBox.propTypes = {
  labels: PropTypes.shape({}).isRequired,
  emailSignUpFlags: PropTypes.shape({}).isRequired,
  className: PropTypes.string.isRequired,
  fieldName: PropTypes.string.isRequired,
};

export default withStyles(EmailSignUpCheckBox, styles);
export { EmailSignUpCheckBox as EmailSignUpCheckBoxVanilla };
