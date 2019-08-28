import React from 'react';
import { View } from 'react-native';
import PropTypes from 'prop-types';
import { Field } from 'redux-form';
import withStyles from '../../../../../../common/hoc/withStyles';
import { Style, GovernmentId } from '../styles/ContactFormFields.style.native';
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
    const { showEmailAddress, showPhoneNumber, labels } = this.props;

    return (
      <View>
        <View className="fieldFirstName">
          <Field
            label={labels.firstName}
            name="firstName"
            id="firstName"
            type="text"
            component={TextBox}
            dataLocator="pickup-first-name"
          />
          <GovernmentId>
            <BodyCopy fontFamily="secondary" fontSize="fs12" text={labels.govIdText} />
          </GovernmentId>
        </View>
        <View className="fieldLastName">
          <Field
            label={labels.lastName}
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
              label={labels.email}
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
              label={labels.mobile}
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
  showEmailAddress: PropTypes.bool,
  showPhoneNumber: PropTypes.bool,
  labels: PropTypes.shape({}).isRequired,
};

ContactFormFields.defaultProps = {
  showEmailAddress: false,
  showPhoneNumber: false,
};

export default withStyles(ContactFormFields, Style);
export { ContactFormFields as ContactFormFieldsVanilla };
