import React from 'react';
import { View, Text } from 'react-native';
import PropTypes from 'prop-types';
import { Field } from 'redux-form';
import CreditCardNumber from '../../CreditCardNumber';
import TextBox from '../../../../../../common/atoms/TextBox';

export class CreditCardFields extends React.PureComponent<Props> {
  render() {
    const {
      labels,
      cardTypeImgUrl,
      isExpirationRequired,
      isPLCCEnabled,
      cardType,
      expMonthOptionsMap,
      expYearOptionsMap,
      className,
    } = this.props;
    return (
      <View>
        <Text> Test CreditCardFields </Text>
        <Field
          label="CreditCardFields"
          component={TextBox}
          title="CreditCardFields"
          name="recaptchaToken"
          id="recaptchaToken"
          data-locator="gift-card-recaptchcb"
          className="visibility-recaptcha"
        />
      </View>
    );
  }
}

CreditCardFields.propTypes = {
  labels: PropTypes.shape({
    lbl_payment_cardNumber: '',
    lbl_payment_expMonth: '',
    lbl_payment_expYear: '',
  }),
  isExpirationRequired: PropTypes.bool,
  cardTypeImgUrl: PropTypes.string,
  isPLCCEnabled: PropTypes.bool,
  cardType: PropTypes.string,
  expMonthOptionsMap: PropTypes.shape([]).isRequired,
  expYearOptionsMap: PropTypes.shape([]).isRequired,
  className: PropTypes.string,
};

CreditCardFields.defaultProps = {
  labels: {},
  isExpirationRequired: true,
  cardTypeImgUrl: '',
  cardType: '',
  isPLCCEnabled: true,
  className: '',
};

export default CreditCardFields;
