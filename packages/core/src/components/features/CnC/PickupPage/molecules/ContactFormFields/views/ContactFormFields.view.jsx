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
    const { className, showEmailAddress, showPhoneNumber } = this.props;

    return (
      <div className={className}>
        <Row fullBleed>
          <Col className="fieldFirstName" colSize={{ small: 6, medium: 8, large: 6 }}>
            <Field
              placeholder="First Name"
              name="firstName"
              id="firstName"
              component={TextBox}
              dataLocator="first-name-field"
              enableSuccessCheck={false}
            />
            <BodyCopy fontSize="fs12" fontFamily="secondary" fontWeight="regular">
              A government issued ID is required to pickup the order.
            </BodyCopy>
          </Col>
          <Col className="fieldLastName" colSize={{ small: 6, medium: 8, large: 6 }}>
            <Field
              placeholder="Last Name"
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
                placeholder="Email Address"
                name="emailAddress"
                component={TextBox}
                dataLocator="login-emailfield"
                errorDataLocator="login-emailerror"
                showSuccessCheck={false}
                enableSuccessCheck={false}
                className="elem-mb-SM"
              />
            </Col>
          )}
          {showPhoneNumber && (
            <Col className="fieldNumber" colSize={{ small: 6, medium: 8, large: 6 }}>
              <Field
                placeholder="Phone Number"
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
};

ContactFormFields.defaultProps = {
  className: '',
  showEmailAddress: false,
  showPhoneNumber: false,
};

export default withStyles(ContactFormFields, styles);

export { ContactFormFields as ContactFormFieldsVanilla };
