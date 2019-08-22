import React from 'react';
import PropTypes from 'prop-types';
import { Field } from 'redux-form';
import getStandardConfig from '../../../../../../../utils/formValidation/validatorStandardConfig';
import withStyles from '../../../../../../common/hoc/withStyles';
import styles from '../styles/ContactFormFields.style';
import BodyCopy from '../../../../../../common/atoms/BodyCopy';
import TextBox from '../../../../../../common/atoms/TextBox';
import Row from '../../../../../../common/atoms/Row';
import Col from '../../../../../../common/atoms/Col';

class ContactFormFields extends React.PureComponent {
  static ContactValidationConfig = getStandardConfig([
    'firstName',
    'lastName',
    'emailAddress',
    'phoneNumber',
  ]);

  render() {
    const { className, showEmailAddress, showPhoneNumber, labels } = this.props;

    return (
      <div className={className}>
        <Row fullBleed>
          <Col className="fieldFirstName" colSize={{ small: 6, medium: 8, large: 6 }}>
            <Field
              placeholder={labels.firstName}
              name="firstName"
              id="firstName"
              component={TextBox}
              dataLocator="first-name-field"
              enableSuccessCheck={false}
            />
            <BodyCopy fontSize="fs12" fontFamily="secondary" fontWeight="regular">
              {labels.govIdText}
            </BodyCopy>
          </Col>
          <Col className="fieldLastName" colSize={{ small: 6, medium: 8, large: 6 }}>
            <Field
              placeholder={labels.lastName}
              name="lastName"
              id="lastName"
              component={TextBox}
              dataLocator="last name-field"
              enableSuccessCheck={false}
            />
          </Col>

          {showEmailAddress && (
            <Col className="fieldEmail" colSize={{ small: 6, medium: 8, large: 6 }}>
              <Field
                id="emailAddress"
                placeholder={labels.email}
                name="emailAddress"
                component={TextBox}
                dataLocator="login-emailfield"
                errorDataLocator="login-emailerror"
                showSuccessCheck={false}
                enableSuccessCheck={false}
              />
            </Col>
          )}
          {showPhoneNumber && (
            <Col className="fieldNumber" colSize={{ small: 6, medium: 8, large: 6 }}>
              <Field
                placeholder={labels.mobile}
                name="phoneNumber"
                id="phoneNumber"
                type="tel"
                component={TextBox}
                maxLength={50}
                dataLocator="phone-number-field"
                enableSuccessCheck={false}
              />
            </Col>
          )}
        </Row>
      </div>
    );
  }
}

ContactFormFields.propTypes = {
  className: PropTypes.string,
  showEmailAddress: PropTypes.bool,
  showPhoneNumber: PropTypes.bool,
  labels: PropTypes.shape({}).isRequired,
};

ContactFormFields.defaultProps = {
  className: '',
  showEmailAddress: false,
  showPhoneNumber: false,
};

export default withStyles(ContactFormFields, styles);
export { ContactFormFields as ContactFormFieldsVanilla };
