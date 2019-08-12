import React from 'react';
import { View } from 'react-native';
import { Field, reduxForm } from 'redux-form';
import Recaptcha from '@tcp/core/src/components/common/molecules/recaptcha/recaptcha.native';
import { get } from 'lodash';
import TextBox from '../../../../../common/atoms/TextBox';
import { RecaptchaContainer, CardRow } from '../styles/AddGiftCard.style.native';
import RichText from '../../../../../common/atoms/RichText';

class AddGiftCardForm extends React.PureComponent<Props> {
  onMessage = event => {
    const { change } = this.props;
    if (event && event.nativeEvent.data) {
      const value = get(event, 'nativeEvent.data', '');
      change('recaptchaToken', value);
    }
  };

  render() {
    const { labels } = this.props;
    return (
      <View>
        <Field
          label={labels.paymentGC.lbl_payment_giftCardNoPlaceholder}
          name="giftCardNumber"
          type="tel"
          component={TextBox}
          dataLocator="gift-card-cardnumberfield"
        />
        <Field
          label={labels.paymentGC.lbl_payment_giftCardPinPlaceholder}
          name="cardPin"
          type="tel"
          component={TextBox}
          dataLocator="gift-card-pinnumberfield"
        />
        <RecaptchaContainer>
          <Recaptcha onMessage={this.onMessage} />
        </RecaptchaContainer>
        <CardRow>
          <RichText
            richTextHtml={labels.paymentGC.lbl_payment_giftCardMessage}
            dataLocator="git-card-messagetext"
          />
        </CardRow>
      </View>
    );
  }
}

export default reduxForm({
  form: 'AddGiftCardMobileForm', // a unique identifier for this form
  enableReinitialize: true,
})(AddGiftCardForm);

export { AddGiftCardForm as AddGiftCardFormVanilla };
