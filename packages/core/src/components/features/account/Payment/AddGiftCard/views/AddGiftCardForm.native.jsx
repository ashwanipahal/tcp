import React from 'react';
import { ScrollView, View } from 'react-native';
import { Field, reduxForm } from 'redux-form';
import Recaptcha from '@tcp/core/src/components/common/molecules/recaptcha/recaptcha.native';
import { PropTypes } from 'prop-types';
import { get } from 'lodash';
import TextBox from '../../../../../common/atoms/TextBox';
import CustomButton from '../../../../../common/atoms/Button';
import { RecaptchaContainer, ErrorWrapper } from '../styles/AddGiftCard.style.native';
import RichText from '../../../../../common/atoms/RichText';
import createValidateMethod from '../../../../../../utils/formValidation/createValidateMethod';
import getStandardConfig from '../../../../../../utils/formValidation/validatorStandardConfig';
import BodyCopy from '../../../../../common/atoms/BodyCopy';

const styles = {
  saveButtonStyle: {
    marginTop: 27,
    marginLeft: 45,
    marginRight: 45,
  },

  cancelButtonStyle: {
    marginTop: 19,
    marginLeft: 45,
    marginRight: 45,
    marginBottom: 16,
  },
  webViewStyle: {
    height: 90,
    marginTop: 10,
  },
};

class AddGiftCardForm extends React.PureComponent {
  onMessage = event => {
    const { change } = this.props;
    if (event && event.nativeEvent.data) {
      const value = get(event, 'nativeEvent.data', '');
      change('recaptchaToken', value);
    }
  };

  render() {
    const {
      handleSubmit,
      labels,
      toggleModal,
      onAddGiftCardClick,
      addGiftCardResponse,
    } = this.props;
    return (
      <ScrollView showsVerticalScrollIndicator={false} {...this.props}>
        <View>
          {addGiftCardResponse && (
            <ErrorWrapper>
              <BodyCopy
                mobileFontFamily={['secondary']}
                fontWeight="semibold"
                fontSize="fs12"
                color="error"
                text={addGiftCardResponse}
              />
            </ErrorWrapper>
          )}
          <Field
            label={labels.paymentGC.lbl_payment_giftCardNoPlaceholder}
            name="giftCardNumber"
            type="tel"
            component={TextBox}
            dataLocator="gift-card-cardnaumberfield"
          />

          <Field
            label={labels.paymentGC.lbl_payment_giftCardPinPlaceholder}
            name="cardPin"
            type="tel"
            component={TextBox}
            dataLocator="gift-card-pinnumberfield"
          />

          <View>
            <RecaptchaContainer>
              <Recaptcha onMessage={this.onMessage} />
            </RecaptchaContainer>
            <Field
              label=""
              component={TextBox}
              title=""
              type="hidden"
              name="recaptchaToken"
              id="recaptchaToken"
              data-locator="gift-card-recaptchcb"
              className="visibility-recaptcha"
            />
          </View>
          <View style={styles.webViewStyle}>
            <RichText
              style={styles.webViewStyle}
              source={{
                html:
                  "<body style='background-color:#d8d8d8;padding:10px'><h1>HEADS UP - Don't throw away your gift card!</h1><h2>Adding a gift card is a convienent way to save money in your account on future purchases. However, if you want to use your gift card for an in-store purchase you will need to present the physical card to the cashier.</h2></body>",
              }}
              dataLocator="git-card-messagetext"
            />
          </View>

          <CustomButton
            color="white"
            fill="BLUE"
            text={labels.paymentGC.lbl_payment_addCard}
            buttonVariation="variable-width"
            data-locator="gift-card-addcardbtn"
            customStyle={styles.saveButtonStyle}
            onPress={handleSubmit(data => {
              onAddGiftCardClick(data);
            })}
          />

          <CustomButton
            color="black"
            text={labels.paymentGC.lbl_payment_cancelCard}
            data-locator="gift-card-cancelbtn"
            buttonVariation="variable-width"
            customStyle={styles.cancelButtonStyle}
            onPress={toggleModal}
          />
        </View>
      </ScrollView>
    );
  }
}

AddGiftCardForm.propTypes = {
  handleSubmit: PropTypes.func,
  toggleModal: PropTypes.func,
  onAddGiftCardClick: PropTypes.func,
  labels: PropTypes.shape({}),
  addGiftCardResponse: PropTypes.string,
  change: PropTypes.func,
};

AddGiftCardForm.defaultProps = {
  handleSubmit: () => {},
  toggleModal: () => {},
  onAddGiftCardClick: () => {},
  labels: {},
  addGiftCardResponse: null,
  change: () => {},
};

const validateMethod = createValidateMethod(
  getStandardConfig(['giftCardNumber', 'cardPin', 'recaptchaToken'])
);

export default reduxForm({
  form: 'AddGiftCardMobileForm', // a unique identifier for this form
  ...validateMethod,
  enableReinitialize: true,
})(AddGiftCardForm);

export { AddGiftCardForm as AddGiftCardFormVanilla };
