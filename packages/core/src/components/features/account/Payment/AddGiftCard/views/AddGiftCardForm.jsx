import React from 'react';
import { Field, reduxForm } from 'redux-form';
import TextBox from '../../../../../common/atoms/TextBox';
import Row from '../../../../../common/atoms/Row';
import Col from '../../../../../common/atoms/Col';
import RichText from '../../../../../common/atoms/RichText';
import Button from '../../../../../common/atoms/Button';
import createValidateMethod from '../../../../../../utils/formValidation/createValidateMethod';
import getStandardConfig from '../../../../../../utils/formValidation/validatorStandardConfig';
import Recaptcha from '../../../../../common/molecules/recaptcha/recaptcha';

// @flow

type State = {
  isTokenDirty: boolean,
};

type Props = {
  onAddGiftCardClick: Function,
  labels: {
    ACC_LBL_CANCEL_CARD: string,
    ACC_LBL_GIFT_CARD_MESSAGE: string,
    ACC_LBL_ADD_CARD: string,
  },
  handleSubmit: Function,
  change: Function,
};

class AddGiftCardForm extends React.PureComponent<Props, State> {
  constructor(props: Props) {
    super(props);
    this.recaptcha = null;
    this.state = {
      isTokenDirty: false,
    };
  }

  handleSubmit = (data: { giftCardNumber: string, cardPin: string, recaptchaToken: string }) => {
    const { isTokenDirty } = this.state;
    const { change } = this.props;
    if (isTokenDirty) {
      change('recaptchaToken', '');
      this.setState({
        isTokenDirty: false,
      });
      return;
    }

    const { onAddGiftCardClick } = this.props;
    const { giftCardNumber, cardPin, recaptchaToken } = data;
    const requestPayload = {
      cc_brand: 'GC',
      payMethodId: 'GiftCard',
      account_pin: cardPin,
      pay_account: giftCardNumber,
      recapchaResponse: recaptchaToken,
    };

    onAddGiftCardClick(requestPayload);
  };

  handleRecaptchaVerify = (token: string) => {
    const { change } = this.props;
    change('recaptchaToken', token);

    this.setState({
      isTokenDirty: false,
    });
  };

  handleRecaptchaExpired = () => {
    const { change } = this.props;
    change('recaptchaToken', '');
  };

  attachReCaptchaRef = (ref: any) => {
    this.recaptcha = ref;
  };

  render() {
    const { handleSubmit, labels } = this.props;
    return (
      <form onSubmit={handleSubmit(this.handleSubmit.bind(this))}>
        <Row fullBleed>
          <Col ignoreGutter={{ small: true }} colSize={{ small: 6, medium: 4, large: 4 }}>
            <Field
              placeholder="Gift Card"
              name="giftCardNumber"
              type="tel"
              component={TextBox}
              maxLength={50}
              dataLocator="gift-card-cardnumberfield"
            />
          </Col>
          <Col ignoreGutter={{ small: true }} colSize={{ small: 6, medium: 2, large: 3 }}>
            <Field
              placeholder="Pin"
              name="cardPin"
              type="tel"
              component={TextBox}
              dataLocator="gift-card-pinnumberfield"
            />
          </Col>
        </Row>

        <Row fullBleed>
          <Col ignoreGutter={{ small: true }} colSize={{ small: 4, medium: 2, large: 2 }}>
            <Recaptcha
              ref={this.attachReCaptchaRef}
              className="giftcards-recaptcha"
              theme="light"
              type="image"
              size="normal"
              tabindex="0"
              verifyCallback={this.handleRecaptchaVerify}
              expiredCallback={this.handleRecaptchaExpired}
            />
          </Col>
          <Col ignoreGutter={{ small: true }} colSize={{ small: 4, medium: 2, large: 2 }}>
            <Field component={TextBox} title="" type="hidden" name="recaptchaToken" />
          </Col>
        </Row>

        <Row fullBleed className="add-gift-card__row">
          <Col ignoreGutter={{ small: true }} colSize={{ small: 6, medium: 8, large: 5 }}>
            <div className="add-gift-card__row__message__container">
              <RichText richTextHtml={labels.ACC_LBL_GIFT_CARD_MESSAGE} />
            </div>
          </Col>

          <Col
            ignoreGutter={{ small: true }}
            colSize={{ small: 4, medium: 3, large: 2 }}
            className="add-gift-card__first-button-container"
            offsetLeft={{ small: 1, medium: 1, large: 1 }}
            offsetRight={{ small: 1, medium: 0, large: 0 }}
          >
            <Button buttonVariation="fixed-width" type="button" data-locator="gift-card-cancelbtn">
              {labels.ACC_LBL_CANCEL_CARD}
            </Button>
          </Col>

          <Col
            ignoreGutter={{ small: true }}
            colSize={{ small: 4, medium: 3, large: 2 }}
            className="add-gift-card__second-button-container"
            offsetLeft={{ small: 1, medium: 0, large: 0 }}
            offsetRight={{ small: 1, medium: 0, large: 0 }}
          >
            <Button
              buttonVariation="fixed-width"
              fill="BLUE"
              type="submit"
              data-locator="gift-card-addcardbtn"
            >
              {labels.ACC_LBL_ADD_CARD}
            </Button>
          </Col>
        </Row>
      </form>
    );
  }
}

const validateMethod = createValidateMethod(getStandardConfig(['giftCardNumber', 'cardPin']));

export default reduxForm({
  form: 'AddGiftCardForm', // a unique identifier for this form
  ...validateMethod,
  enableReinitialize: true,
})(AddGiftCardForm);

export { AddGiftCardForm as AddGiftCardFormVanilla };
