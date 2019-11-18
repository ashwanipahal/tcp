import React from 'react';
import { FormSection, Field } from 'redux-form';
import PropTypes from 'prop-types';
import BodyCopy from '../../../../../../common/atoms/BodyCopy';
import InputCheckbox from '../../../../../../common/atoms/InputCheckbox';
import { getLabelValue } from '../../../../../../../utils';
import withStyles from '../../../../../../common/hoc/withStyles';

import styles from '../styles/EmailSignUpCheckBox.view.style';

class EmailSignUpCheckBox extends React.PureComponent {
  render() {
    const { labels, className, fieldName } = this.props;
    return (
      <FormSection name="emailSignUp">
        <div className={className}>
          <BodyCopy
            dataLocator="email-signUp-heading"
            fontSize="fs16"
            fontFamily="secondary"
            fontWeight="bold"
          >
            {'SIGN UP FOR EMAILS*'}
          </BodyCopy>
          <BodyCopy
            dataLocator="email-signUp-subHeading"
            fontSize="fs14"
            fontFamily="secondary"
            className="email-signUp-subHeading"
            fontWeight="regular"
          >
            {'Stay updated on special promos & new arrivals.'}
          </BodyCopy>
          <div className="email-checkbox-container">
            <div className="email-checkbox-list">
              <Field
                dataLocator="signUp-checkbox-field"
                name={fieldName}
                component={InputCheckbox}
                className="email-signup-tcp"
              >
                <BodyCopy
                  dataLocator="pickup-email-signUp-heading-lbl"
                  fontSize="fs16"
                  fontFamily="secondary"
                  fontWeight="regular"
                >
                  {'The Children’s Place'}
                </BodyCopy>
              </Field>
              <Field
                dataLocator="signUp-checkbox-field"
                name={`${fieldName}-gym`}
                component={InputCheckbox}
                className="email-signup-gym"
              >
                <BodyCopy
                  dataLocator="pickup-email-signUp-heading-lbl"
                  fontSize="fs16"
                  fontFamily="secondary"
                  fontWeight="regular"
                >
                  {'Gymboree'}
                </BodyCopy>
              </Field>
            </div>
            <div className="email-signup-text">
              <BodyCopy
                fontSize="fs10"
                fontFamily="secondary"
                fontWeight="regular"
                className="email-signup-disclaimer_txt"
              >
                {getLabelValue(labels, 'lbl_pickup_emailSignupSubSubHeading', 'pickup', 'checkout')}
              </BodyCopy>
            </div>
          </div>
        </div>
      </FormSection>
    );
  }
}

EmailSignUpCheckBox.propTypes = {
  labels: PropTypes.shape({}).isRequired,
  className: PropTypes.string.isRequired,
  fieldName: PropTypes.string.isRequired,
};

export default withStyles(EmailSignUpCheckBox, styles);
export { EmailSignUpCheckBox as EmailSignUpCheckBoxVanilla };
