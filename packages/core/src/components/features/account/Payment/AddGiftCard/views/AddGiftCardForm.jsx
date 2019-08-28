import React from 'react';
import { Field, reduxForm } from 'redux-form';
import TextBox from '../../../../../common/atoms/TextBox';
import Row from '../../../../../common/atoms/Row';
import Col from '../../../../../common/atoms/Col';
import BodyCopy from '../../../../../common/atoms/BodyCopy';
import Button from '../../../../../common/atoms/Button';
import createValidateMethod from '../../../../../../utils/formValidation/createValidateMethod';
import getStandardConfig from '../../../../../../utils/formValidation/validatorStandardConfig';
import Recaptcha from '../../../../../common/molecules/recaptcha/recaptcha';
import Router from 'next/router'; //eslint-disable-line

// @flow

type Props = {
  onAddGiftCardClick: Function,
  labels: {
    lbl_payment_cancelCard: string,
    lbl_payment_giftCardMessage: string,
    lbl_payment_addCard: string,
  },
  handleSubmit: Function,
  change: Function,
  goBackToPayment: Function,
};

class AddGiftCardForm extends React.PureComponent<Props> {
  handleSubmit = (data: { giftCardNumber: string, cardPin: string, recaptchaToken: string }) => {
    const { onAddGiftCardClick } = this.props;
    onAddGiftCardClick(data);
  };

  handleRecaptchaVerify = (token: string) => {
    const { change } = this.props;
    change('recaptchaToken', token);
  };

  handleRecaptchaExpired = () => {
    const { change } = this.props;
    change('recaptchaToken', '');
  };

  onCancelClick = () => {
    const { goBackToPayment } = this.props;
    return goBackToPayment();
  };

  render() {
    const { handleSubmit, labels } = this.props;
    return (
      <form onSubmit={handleSubmit(this.handleSubmit.bind(this))}>
        <Row fullBleed>
          <Col ignoreGutter={{ small: true }} colSize={{ small: 6, medium: 4, large: 4 }}>
            <Field
              placeholder={labels.paymentGC.lbl_payment_giftCardNoPlaceholder}
              name="giftCardNumber"
              type="tel"
              component={TextBox}
              maxLength={50}
              dataLocator="gift-card-cardnumberfield"
            />
          </Col>
          <Col ignoreGutter={{ small: true }} colSize={{ small: 6, medium: 2, large: 3 }}>
            <Field
              placeholder={labels.paymentGC.lbl_payment_giftCardPinPlaceholder}
              name="cardPin"
              type="tel"
              component={TextBox}
              dataLocator="gift-card-pinnumberfield"
            />
          </Col>
        </Row>
        <div>
          <Row fullBleed>
            <Col ignoreGutter={{ small: true }} colSize={{ small: 4, medium: 2, large: 2 }}>
              <Recaptcha
                theme="light"
                type="image"
                size="normal"
                tabindex="0"
                className="card__recaptcha"
                verifyCallback={this.handleRecaptchaVerify}
                expiredCallback={this.handleRecaptchaExpired}
                dataLocator="gift-card-addcardrecaptchacheckbox"
              />
            </Col>
          </Row>
          <div>
            <Field
              component={TextBox}
              type="hidden"
              name="recaptchaToken"
              className="card__hidden"
            />
          </div>
        </div>

        <Row fullBleed className="card__row">
          <Col ignoreGutter={{ small: true }} colSize={{ small: 6, medium: 8, large: 7 }}>
            <div className="card__msgWrapper">
              <BodyCopy
                tag="p"
                fontWeight="bold"
                className="card__msg--bold elem-mb-XS"
                dataLocator="git-card-headertext"
              >
                {labels.paymentGC.lbl_payment_giftCardMessageHeading}
              </BodyCopy>
              <BodyCopy tag="p" className="card__msg" dataLocator="git-card-messagetext">
                {labels.paymentGC.lbl_payment_giftCardMessageDescription}
              </BodyCopy>
            </div>
          </Col>

          <Col
            ignoreGutter={{ small: true }}
            colSize={{ small: 4, medium: 3, large: 2 }}
            className="card__btn"
            offsetLeft={{ small: 1, medium: 1, large: 1 }}
            offsetRight={{ small: 1, medium: 1, large: 0 }}
          >
            <Button
              buttonVariation="fixed-width"
              type="button"
              data-locator="gift-card-cancelbtn"
              onClick={this.onCancelClick}
            >
              {labels.paymentGC.lbl_payment_cancelCard}
            </Button>
          </Col>

          <Col
            ignoreGutter={{ small: true }}
            colSize={{ small: 4, medium: 3, large: 2 }}
            className="card__btn--medium"
            offsetLeft={{ small: 1, medium: 0, large: 0 }}
            offsetRight={{ small: 1, medium: 0, large: 0 }}
          >
            <Button
              buttonVariation="fixed-width"
              fill="BLUE"
              type="submit"
              data-locator="gift-card-addcardbtn"
            >
              {labels.paymentGC.lbl_payment_addCard}
            </Button>
          </Col>
        </Row>
      </form>
    );
  }
}

const validateMethod = createValidateMethod(
  getStandardConfig(['giftCardNumber', 'cardPin', 'recaptchaToken'])
);

export default reduxForm({
  form: 'AddGiftCardForm', // a unique identifier for this form
  ...validateMethod,
  enableReinitialize: true,
})(AddGiftCardForm);

export { AddGiftCardForm as AddGiftCardFormVanilla };
