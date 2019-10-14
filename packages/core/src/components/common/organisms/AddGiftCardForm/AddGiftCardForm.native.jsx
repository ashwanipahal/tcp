import React from 'react';
import { ScrollView, View } from 'react-native';
import { Field, reduxForm } from 'redux-form';
import RecaptchaModal from '@tcp/core/src/components/common/molecules/recaptcha/recaptchaModal.native';
import { PropTypes } from 'prop-types';
import { get } from 'lodash';
import { getLabelValue } from '@tcp/core/src/utils/utils';
import TextBox from '../../atoms/TextBox';
import CustomButton from '../../atoms/Button';
import {
  ErrorWrapper,
  SaveButtonWrapper,
  CancelButtonWrapper,
  MessageWrapper,
  MessageTextWrapper,
} from '../../../features/account/Payment/AddGiftCard/styles/AddGiftCard.style.native';
import createValidateMethod from '../../../../utils/formValidation/createValidateMethod';
import getStandardConfig from '../../../../utils/formValidation/validatorStandardConfig';
import BodyCopy from '../../atoms/BodyCopy';
import InputCheckbox from '../../atoms/InputCheckbox';
import {
  SaveToAccountWrapper,
  FooterButtonsWrapper,
  SaveToAccountTextWrapper,
} from './AddGiftCardForm.style.native';

class AddGiftCardForm extends React.PureComponent {
  // eslint-disable-next-line
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
    const { change, handleSubmit, onAddGiftCardClick } = this.props;
    if (event && event.nativeEvent.data) {
      let value = get(event, 'nativeEvent.data', '');
      if (['cancel', 'error', 'expired'].includes(value)) {
        value = '';
      }
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
      change('recaptchaToken', value);
    }
  };

  handleChange = () => {
    const { onClearError, addGiftCardError, isRow } = this.props;
    if (addGiftCardError && isRow) {
      onClearError();
    }
  };

  onClose = () => {
    this.setRecaptchaModalMountState();
  };

  handleAddGiftCardClick = e => {
    const { tokenInfomation } = this.state;
    const { handleSubmit, onAddGiftCardClick, invalid } = this.props;
    e.preventDefault();
    if (!tokenInfomation && !invalid) {
      this.setRecaptchaModalMountState();
    } else {
      handleSubmit(data => {
        const { cardPin, giftCardNumber } = data;
        const addGifteData = {
          cardPin,
          giftCardNumber,
          recaptchaToken: tokenInfomation,
        };
        onAddGiftCardClick(addGifteData);
      })();
      this.setState({ tokenInfomation: '' });
    }
  };

  renderSaveToAccount() {
    const { labels } = this.props;
    return (
      <SaveToAccountWrapper>
        <Field
          name="saveToAccount"
          component={InputCheckbox}
          dataLocator="saveToAccount"
          disabled={false}
        />
        <SaveToAccountTextWrapper>
          <BodyCopy
            mobileFontFamily="secondary"
            fontSize="fs14"
            fontWeight="regular"
            text={getLabelValue(labels, 'lbl_payment_saveToAccount')}
          />
        </SaveToAccountTextWrapper>
      </SaveToAccountWrapper>
    );
  }

  render() {
    const { labels, toggleModal, addGiftCardResponse, isRow } = this.props;
    const { setRecaptchaModalMountedState } = this.state;
    return (
      <ScrollView
        showsVerticalScrollIndicator={false}
        {...this.props}
        keyboardShouldPersistTaps="handled"
      >
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
            label={getLabelValue(labels, 'lbl_payment_giftCardNoPlaceholder')}
            name="giftCardNumber"
            type="tel"
            keyboardType="numeric"
            component={TextBox}
            dataLocator="gift-card-cardnaumberfield"
            onChange={this.handleChange}
          />

          <Field
            label={getLabelValue(labels, 'lbl_payment_giftCardPinPlaceholder')}
            name="cardPin"
            type="tel"
            component={TextBox}
            dataLocator="gift-card-pinnumberfield"
            onChange={this.handleChange}
            keyboardType="numeric"
          />

          <View>
            {setRecaptchaModalMountedState && (
              <RecaptchaModal
                onMessage={this.onMessage}
                setRecaptchaModalMountedState={setRecaptchaModalMountedState}
                toggleRecaptchaModal={this.setRecaptchaModalMountState}
                onClose={this.onClose}
              />
            )}

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
          {!isRow && (
            <MessageWrapper>
              <BodyCopy
                fontFamily="secondary"
                fontSize="fs14"
                color="gray.900"
                text={getLabelValue(labels, 'lbl_payment_giftCardMessageHeading')}
              />
              <MessageTextWrapper>
                <BodyCopy
                  fontFamily="secondary"
                  fontSize="fs12"
                  color="black"
                  fontWeight="regular"
                  text={getLabelValue(labels, 'lbl_payment_giftCardMessageDescription')}
                />
              </MessageTextWrapper>
            </MessageWrapper>
          )}

          {isRow && this.renderSaveToAccount()}
          {isRow && (
            <FooterButtonsWrapper>
              <CustomButton
                color="black"
                text={getLabelValue(labels, 'lbl_payment_cancelCard')}
                data-locator="gift-card-cancelbtn"
                onPress={toggleModal}
                width="150px"
              />
              <CustomButton
                color="white"
                fill="BLUE"
                text={getLabelValue(labels, 'lbl_payment_addCard')}
                data-locator="gift-card-addcardbtn"
                width="164px"
                onPress={this.handleAddGiftCardClick}
              />
            </FooterButtonsWrapper>
          )}

          {!isRow && (
            <>
              <SaveButtonWrapper>
                <CustomButton
                  color="white"
                  fill="BLUE"
                  text={getLabelValue(labels, 'lbl_payment_addCard')}
                  data-locator="gift-card-addcardbtn"
                  onPress={this.handleAddGiftCardClick}
                />
              </SaveButtonWrapper>

              <CancelButtonWrapper>
                <CustomButton
                  color="black"
                  text={getLabelValue(labels, 'lbl_payment_cancelCard')}
                  data-locator="gift-card-cancelbtn"
                  onPress={toggleModal}
                />
              </CancelButtonWrapper>
            </>
          )}
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
  addGiftCardError: PropTypes.string,
  onClearError: PropTypes.func,
  isRow: PropTypes.bool,
  isRecapchaEnabled: PropTypes.bool,
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
  addGiftCardError: null,
  onClearError: () => {},
  isRow: false,
  isRecapchaEnabled: true,
};

const validateMethod = createValidateMethod(getStandardConfig(['giftCardNumber', 'cardPin']));

export default reduxForm({
  form: 'AddGiftCardMobileForm', // a unique identifier for this form
  ...validateMethod,
  enableReinitialize: true,
})(AddGiftCardForm);

export { AddGiftCardForm as AddGiftCardFormVanilla };
