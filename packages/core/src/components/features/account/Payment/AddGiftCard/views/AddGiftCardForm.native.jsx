import React from 'react';
import { ScrollView, View } from 'react-native';
import { Field, reduxForm } from 'redux-form';
import Recaptcha from '@tcp/core/src/components/common/molecules/recaptcha/recaptcha.native';
import { PropTypes } from 'prop-types';
import { get } from 'lodash';
import TextBox from '../../../../../common/atoms/TextBox';
import CustomButton from '../../../../../common/atoms/Button';
import {
  RecaptchaContainer,
  ErrorWrapper,
  SaveButtonWrapper,
  CancelButtonWrapper,
  MessageWrapper,
  MessageTextWrapper,
} from '../styles/AddGiftCard.style.native';
import createValidateMethod from '../../../../../../utils/formValidation/createValidateMethod';
import getStandardConfig from '../../../../../../utils/formValidation/validatorStandardConfig';
import BodyCopy from '../../../../../common/atoms/BodyCopy';

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
          <MessageWrapper>
            <BodyCopy
              fontFamily="secondary"
              fontSize="fs14"
              color="gray.900"
              text={labels.paymentGC.lbl_payment_giftCardMessageHeading}
            />
            <MessageTextWrapper>
              <BodyCopy
                fontFamily="secondary"
                fontSize="fs12"
                color="black"
                fontWeight="regular"
                text={labels.paymentGC.lbl_payment_giftCardMessageDescription}
              />
            </MessageTextWrapper>
          </MessageWrapper>

          <SaveButtonWrapper>
            <CustomButton
              color="white"
              fill="BLUE"
              text={labels.paymentGC.lbl_payment_addCard}
              buttonVariation="variable-width"
              data-locator="gift-card-addcardbtn"
              onPress={handleSubmit(data => {
                onAddGiftCardClick(data);
              })}
            />
          </SaveButtonWrapper>

          <CancelButtonWrapper>
            <CustomButton
              color="black"
              text={labels.paymentGC.lbl_payment_cancelCard}
              data-locator="gift-card-cancelbtn"
              buttonVariation="variable-width"
              onPress={toggleModal}
            />
          </CancelButtonWrapper>
        </View>
      </ScrollView>
    );
  }
}

AddGiftCardForm.propTypes = {
  handleSubmit: PropTypes.func,
  toggleModal: PropTypes.func,
  onAddGiftCardClick: PropTypes.func,
  labels: PropTypes.shape({
    paymentGC: PropTypes.shape({
      lbl_payment_giftCardNoPlaceholder: PropTypes.string,
      lbl_payment_giftCardPinPlaceholder: PropTypes.string,
      lbl_payment_giftCardMessageHeading: PropTypes.string,
      lbl_payment_giftCardMessageDescription: PropTypes.string,
      lbl_payment_addCard: PropTypes.string,
      lbl_payment_cancelCard: PropTypes.string,
    }),
  }),
  addGiftCardResponse: PropTypes.string,
  change: PropTypes.func,
};

AddGiftCardForm.defaultProps = {
  handleSubmit: () => {},
  toggleModal: () => {},
  onAddGiftCardClick: () => {},
  labels: {
    paymentGC: {
      lbl_payment_giftCardNoPlaceholder: '',
      lbl_payment_giftCardPinPlaceholder: '',
      lbl_payment_giftCardMessageHeading: '',
      lbl_payment_giftCardMessageDescription: '',
      lbl_payment_addCard: '',
      lbl_payment_cancelCard: '',
    },
  },
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
