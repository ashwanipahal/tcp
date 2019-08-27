import React from 'react';
import { ScrollView, View } from 'react-native';
import { Field, reduxForm } from 'redux-form';
import RecaptchaModal from '@tcp/core/src/components/common/molecules/recaptcha/recaptchaModal.native';
import { PropTypes } from 'prop-types';
import { get } from 'lodash';
import TextBox from '../../../../../common/atoms/TextBox';
import CustomButton from '../../../../../common/atoms/Button';
import {
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
  constructor(props) {
    super(props);
    this.state = {
      setRecaptchaModalMountedState: false,
      tokenInfomation: '',
    };
  }

  setRecaptchaModalMountState = () => {
    const { setRecaptchaModalMountedState } = this.state;
    this.setState({
      setRecaptchaModalMountedState: !setRecaptchaModalMountedState,
    });
  };

  onMessage = event => {
    const { handleSubmit, onAddGiftCardClick } = this.props;
    if (event && event.nativeEvent.data) {
      const value = get(event, 'nativeEvent.data', '');
      this.setState({ tokenInfomation: value });
      handleSubmit(data => {
        const { cardPin, giftCardNumber } = data;
        const addGifteData = {
          cardPin,
          giftCardNumber,
          recaptchaToken: value,
        };
        onAddGiftCardClick(addGifteData);
      })();
      this.setRecaptchaModalMountState();
    }
  };

  onClose = () => {
    this.setRecaptchaModalMountState();
  };

  handleAddGiftCardClick = e => {
    const { tokenInfomation } = this.state;
    const { handleSubmit, invalid } = this.props;
    e.preventDefault();
    if (!tokenInfomation && !invalid) {
      this.setRecaptchaModalMountState();
    } else {
      this.setState({ tokenInfomation: '' });
      handleSubmit();
    }
  };

  render() {
    const { labels, toggleModal, addGiftCardResponse } = this.props;
    const { setRecaptchaModalMountedState } = this.state;
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
            <React.Fragment>
              {setRecaptchaModalMountedState && (
                <RecaptchaModal
                  onMessage={this.onMessage}
                  setRecaptchaModalMountedState={setRecaptchaModalMountedState}
                  toggleRecaptchaModal={this.setRecaptchaModalMountState}
                  onClose={this.onClose}
                />
              )}
            </React.Fragment>
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
              onPress={this.handleAddGiftCardClick}
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
  invalid: PropTypes.func.isRequired,
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
