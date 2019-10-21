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

class ContactFormFields extends React.Component {
  static ContactValidationConfig = getStandardConfig([
    'firstName',
    'lastName',
    'emailAddress',
    'phoneNumber',
  ]);

  render() {
    const { className, showEmailAddress, showPhoneNumber, labels, isExpressCheckout } = this.props;
    const colSizeLarge = isExpressCheckout ? 12 : 6;
    return (
      <div className={className}>
        <Row fullBleed>
          <Col
            className="pickupField fieldFirstName"
            colSize={{ small: 6, medium: 8, large: colSizeLarge }}
          >
            <Field
              placeholder={labels.firstName}
              name="firstName"
              id="firstName"
              component={TextBox}
              dataLocator="pickup-first-name"
              enableSuccessCheck={false}
            />
            <BodyCopy fontSize="fs12" fontFamily="secondary" fontWeight="regular">
              {labels.govIdText}
            </BodyCopy>
          </Col>
          <Col
            className="pickupField fieldLastName"
            colSize={{ small: 6, medium: 8, large: colSizeLarge }}
          >
            <Field
              placeholder={labels.lastName}
              name="lastName"
              id="lastName"
              component={TextBox}
              dataLocator="pickup-last-name"
              enableSuccessCheck={false}
            />
          </Col>

          {showEmailAddress && (
            <Col
              className="pickupField fieldEmail"
              colSize={{ small: 6, medium: 8, large: colSizeLarge }}
            >
              <Field
                id="emailAddress"
                placeholder={labels.email}
                name="emailAddress"
                component={TextBox}
                dataLocator="pickup-email"
                errorDataLocator="pickup-email-error"
                showSuccessCheck={false}
                enableSuccessCheck={false}
              />
            </Col>
          )}
          {showPhoneNumber && (
            <Col
              className="pickupField fieldNumber"
              colSize={{ small: 6, medium: 8, large: colSizeLarge }}
            >
              <Field
                placeholder={labels.mobile}
                name="phoneNumber"
                id="phoneNumber"
                type="tel"
                component={TextBox}
                maxLength={50}
                dataLocator="pickup-phone-number"
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
  isExpressCheckout: PropTypes.bool,
};

ContactFormFields.defaultProps = {
  className: '',
  showEmailAddress: false,
  showPhoneNumber: false,
  isExpressCheckout: false,
};

export default withStyles(ContactFormFields, styles);
export { ContactFormFields as ContactFormFieldsVanilla };
