import React from 'react';
import { Field, reduxForm } from 'redux-form';
import PropTypes from 'prop-types';
import { get } from 'lodash';
import ImageComp from '@tcp/core/src/components/common/atoms/Image';
import BodyCopy from '@tcp/core/src/components/common/atoms/BodyCopy';
import Recaptcha from '@tcp/core/src/components/common/molecules/recaptcha/recaptcha.native';
import {
  PaymentContainer,
  PaymentType,
  PaymentInfoContainer,
  TouchableLink,
  PaymentInfo,
  PaymentDetails,
  RecaptchaContainer,
  RecaptchaWrapper,
  PaymentWrapper,
  CheckBalanceContainer,
} from '../styles/PaymentItem.style.native';
import TextBox from '../../../../../../common/atoms/TextBox';
import CustomButton from '../../../../../../common/atoms/Button';
import createValidateMethod from '../../../../../../../utils/formValidation/createValidateMethod';
import getStandardConfig from '../../../../../../../utils/formValidation/validatorStandardConfig';

class PaymentItem extends React.PureComponent<Props> {
  handleGetGiftCardBalanceClick = (formData, card, onGetBalanceCard) => {
    onGetBalanceCard({ formData, card });
  };

  render() {
    const {
      paymentInfo,
      handleComponentChange,
      isGiftCard,
      change,
      handleSubmit,
      onGetBalanceCard,
      card,
    } = this.props;
    const variation = paymentInfo && paymentInfo.variation && paymentInfo.variation.toLowerCase();
    const onMessage = event => {
      if (event && event.nativeEvent.data) {
        const value = get(event, 'nativeEvent.data', '');
        change('recaptchaToken', value);
      }
    };
    return (
      <PaymentContainer>
        <PaymentWrapper>
          <PaymentType>
            <BodyCopy
              fontFamily="secondary"
              fontSize="fs13"
              fontWeight="regular"
              text={paymentInfo.title}
              color="gray.900"
            />
            {variation === 'add' && (
              <BodyCopy
                fontFamily="secondary"
                fontSize="fs13"
                fontWeight="regular"
                text={paymentInfo.text}
                color="gray.900"
              />
            )}
            {variation === 'edit' && (
              <PaymentInfoContainer>
                <ImageComp source={paymentInfo.icon} width={50} height={30} />
                <PaymentInfo>
                  <BodyCopy
                    style={PaymentDetails}
                    fontFamily="secondary"
                    fontSize="fs12"
                    fontWeight="regular"
                    text={paymentInfo.text}
                    color="gray.900"
                  />
                  <BodyCopy
                    style={PaymentDetails}
                    fontFamily="secondary"
                    fontSize="fs10"
                    fontWeight="regular"
                    text={paymentInfo.subText}
                    color="gray.700"
                  />
                </PaymentInfo>
              </PaymentInfoContainer>
            )}
          </PaymentType>
          <TouchableLink
            onPress={() => handleComponentChange('paymentGiftCardsPageMobile')}
            textDecorationLine="underline"
          >
            <BodyCopy
              fontFamily="secondary"
              fontSize="fs13"
              fontWeight="regular"
              text={paymentInfo.variation}
              color="gray.900"
            />
          </TouchableLink>
        </PaymentWrapper>
        {isGiftCard && variation === 'edit' && (
          <RecaptchaWrapper>
            <RecaptchaContainer>
              <Recaptcha onMessage={onMessage} />
            </RecaptchaContainer>
            <Field
              label=""
              title=""
              component={TextBox}
              type="hidden"
              name="recaptchaToken"
              id="recaptchaToken"
              data-locator="-payment-gift-card-recaptchcb"
              className="visibility-recaptcha"
            />
            {isGiftCard && (
              <CheckBalanceContainer>
                <CustomButton
                  color="white"
                  fill="BLUE"
                  text="Check Balance"
                  buttonVariation="variable-width"
                  width="190px"
                  onPress={handleSubmit(formData =>
                    this.handleGetGiftCardBalanceClick(formData, card, onGetBalanceCard)
                  )}
                />
              </CheckBalanceContainer>
            )}
          </RecaptchaWrapper>
        )}
      </PaymentContainer>
    );
  }
}

PaymentItem.propTypes = {
  paymentInfo: PropTypes.shape({}).isRequired,
};

const validateMethod = createValidateMethod(getStandardConfig(['recaptchaToken']));

export default reduxForm({
  form: 'PaymentItemForm', // a unique identifier for this form
  ...validateMethod,
  enableReinitialize: true,
})(PaymentItem);

export { PaymentItem as PaymentItemVanilla };
