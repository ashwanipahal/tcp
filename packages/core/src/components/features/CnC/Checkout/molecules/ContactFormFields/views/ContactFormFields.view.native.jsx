import React from 'react';
import { View } from 'react-native';
import PropTypes from 'prop-types';
import { Field } from 'redux-form';
import getStandardConfig from '../../../../../../../utils/formValidation/validatorStandardConfig';
import BodyCopy from '../../../../../../common/atoms/BodyCopy';
import TextBox from '../../../../../../common/atoms/TextBox';

class ContactFormFields extends React.Component {
  static ContactValidationConfig = getStandardConfig([
    'firstName',
    'lastName',
    'emailAddress',
    'phoneNumber',
  ]);

  render() {
    const { className, showEmailAddress, showPhoneNumber, labels } = this.props;

    return (
      <View className={className}>
        <View className="fieldFirstName">
          <Field
            placeholder={labels.firstName}
            name="firstName"
            id="firstName"
            component={TextBox}
            dataLocator="pickup-first-name"
            enableSuccessCheck={false}
          />
          <BodyCopy
            fontFamily="secondary"
            fontSize="fs12"
            fontWeight="regular"
            text={labels.govIdText}
          />
        </View>
        <View className="fieldLastName">
          <Field
            placeholder={labels.lastName}
            name="lastName"
            id="lastName"
            component={TextBox}
            dataLocator="pickup-last-name"
            enableSuccessCheck={false}
          />
        </View>

        {showEmailAddress && (
          <View className="fieldEmail">
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
          </View>
        )}
        {showPhoneNumber && (
          <View className="fieldNumber">
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
          </View>
        )}
      </View>
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

export default ContactFormFields;
