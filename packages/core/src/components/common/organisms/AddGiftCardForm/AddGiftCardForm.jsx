import React from 'react';
import { Field, reduxForm } from 'redux-form';
import { getLabelValue } from '@tcp/core/src/utils/utils';
import TextBox from '../../atoms/TextBox';
import Row from '../../atoms/Row';
import Col from '../../atoms/Col';
import BodyCopy from '../../atoms/BodyCopy';
import Button from '../../atoms/Button';
import createValidateMethod from '../../../../utils/formValidation/createValidateMethod';
import getStandardConfig from '../../../../utils/formValidation/validatorStandardConfig';
import Recaptcha from '../../molecules/recaptcha/recaptcha';
import Router from 'next/router'; //eslint-disable-line
import InputCheckbox from '../../atoms/InputCheckbox';

// @flow

type Props = {
  onAddGiftCardClick: Function,
  labels: {
    lbl_payment_cancelCard: string,
    lbl_payment_giftCardMessage: string,
    lbl_payment_addCard: string,
    lbl_payment_saveToAccount: string,
  },
  handleSubmit: Function,
  change: Function,
  goBackToPayment: Function,
  isRow: Boolean,
  saveToAccountEnabled: Boolean,
  isRecapchaEnabled: Boolean,
  isLoading: Boolean,
  addGiftCardError: string,
  untouch: Function,
  onClearError: Function,
};

class AddGiftCardForm extends React.PureComponent<Props> {
  componentDidUpdate(prevProps) {
    const { addGiftCardError } = this.props;
    if (addGiftCardError !== prevProps.addGiftCardError) {
      this.resetReCaptcha();
    }
  }

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

  resetReCaptcha = () => {
    if (this.recaptcha) {
      this.recaptcha.reset();
    }
    this.handleRecaptchaExpired();
    const { untouch } = this.props;
    untouch('recaptchaToken');
  };

  onCancelClick = () => {
    const { goBackToPayment } = this.props;
    return goBackToPayment();
  };

  attachReCaptchaRef = ref => {
    this.recaptcha = ref;
  };

  renderReCaptcha = () => {
    const { isRecapchaEnabled } = this.props;
    return (
      isRecapchaEnabled && (
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
                ref={this.attachReCaptchaRef}
              />
            </Col>
          </Row>
          <div>
            <Field
              component={TextBox}
              type="hidden"
              name="recaptchaToken"
              className="card__hidden"
              onChange={this.handleChange}
            />
          </div>
        </div>
      )
    );
  };

  renderSaveToAccount = labels => {
    const { saveToAccountEnabled, isRow } = this.props;
    return (
      !saveToAccountEnabled &&
      isRow && (
        <Row fullBleed className="elem-mb-XL elem-mt-MED savetoaccount">
          <Field
            dataLocator="gift-card-checkbox-field"
            name="saveToAccount"
            component={InputCheckbox}
            className="save-to-account"
            onChange={this.handleChange}
          >
            <BodyCopy
              dataLocator="gift-card-sav-to-account-heading-lbl"
              fontSize="fs16"
              fontFamily="secondary"
              fontWeight="regular"
            >
              {getLabelValue(labels, 'lbl_payment_saveToAccount')}
            </BodyCopy>
          </Field>
        </Row>
      )
    );
  };

  getColSize = isRow => {
    return isRow ? { small: 3, medium: 3, large: 3 } : { small: 4, medium: 3, large: 2 };
  };

  renderButtons = (isRow, labels, isLoading) => {
    return (
      <>
        <Col
          ignoreGutter={{ small: true }}
          colSize={this.getColSize(isRow)}
          className="card__btn"
          offsetLeft={!isRow ? { small: 1, medium: 1, large: 1 } : null}
          offsetRight={!isRow ? { small: 1, medium: 1, large: 0 } : null}
        >
          <Button
            buttonVariation="fixed-width"
            type="button"
            data-locator="gift-card-cancelbtn"
            onClick={this.onCancelClick}
          >
            {getLabelValue(labels, 'lbl_payment_cancelCard')}
          </Button>
        </Col>
        <Col
          ignoreGutter={{ small: true }}
          colSize={this.getColSize(isRow)}
          className="card__btn--medium"
          offsetLeft={!isRow ? { small: 1, medium: 0, large: 0 } : null}
          offsetRight={{ small: 1, medium: 0, large: 0 }}
        >
          <Button
            buttonVariation="fixed-width"
            fill="BLUE"
            type="submit"
            data-locator="gift-card-addcardbtn"
            disabled={isLoading}
          >
            {getLabelValue(labels, 'lbl_payment_addCard')}
          </Button>
        </Col>
      </>
    );
  };

  handleChange = () => {
    const { onClearError, addGiftCardError } = this.props;
    if (addGiftCardError) {
      onClearError();
    }
  };

  render() {
    const { handleSubmit, labels, isLoading, isRow } = this.props;
    return (
      <form onSubmit={handleSubmit(this.handleSubmit.bind(this))}>
        <Row fullBleed className="elem-mb-MED">
          <Col
            ignoreGutter={{ small: true }}
            colSize={{ small: 6, medium: isRow ? 10 : 4, large: isRow ? 6 : 4 }}
          >
            <Field
              placeholder={getLabelValue(labels, 'lbl_payment_giftCardNoPlaceholder')}
              name="giftCardNumber"
              type="tel"
              component={TextBox}
              maxLength={50}
              dataLocator="gift-card-cardnumberfield"
              className="giftCardNumber"
              onChange={this.handleChange}
              id="giftCardNumber"
            />
          </Col>
          {!isRow && (
            <Col ignoreGutter={{ small: true }} colSize={{ small: 6, medium: 2, large: 3 }}>
              <Field
                placeholder={getLabelValue(labels, 'lbl_payment_giftCardPinPlaceholder')}
                name="cardPin"
                type="tel"
                component={TextBox}
                dataLocator="gift-card-pinnumberfield"
                onChange={this.handleChange}
                id="cardPin"
              />
            </Col>
          )}
        </Row>
        {isRow && (
          <Row fullBleed className="elem-mb-XL">
            <Col ignoreGutter={{ small: true }} colSize={{ small: 6, medium: 10, large: 6 }}>
              <Field
                placeholder={getLabelValue(labels, 'lbl_payment_giftCardPinPlaceholder')}
                name="cardPin"
                type="tel"
                component={TextBox}
                dataLocator="gift-card-pinnumberfield"
                className="cardPin"
                onChange={this.handleChange}
                id="cardPin"
              />
            </Col>
          </Row>
        )}

        {this.renderReCaptcha()}

        {this.renderSaveToAccount(labels)}

        <Row fullBleed className="card__row">
          {!isRow && (
            <Col ignoreGutter={{ small: true }} colSize={{ small: 6, medium: 8, large: 7 }}>
              <div className="card__msgWrapper">
                <BodyCopy
                  tag="p"
                  fontWeight="bold"
                  className="card__msg--bold elem-mb-XS"
                  dataLocator="git-card-headertext"
                >
                  {getLabelValue(labels, 'lbl_payment_giftCardMessageHeading')}
                </BodyCopy>
                <BodyCopy tag="p" className="card__msg" dataLocator="git-card-messagetext">
                  {getLabelValue(labels, 'lbl_payment_giftCardMessageDescription')}
                </BodyCopy>
              </div>
            </Col>
          )}

          {this.renderButtons(isRow, labels, isLoading)}
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
