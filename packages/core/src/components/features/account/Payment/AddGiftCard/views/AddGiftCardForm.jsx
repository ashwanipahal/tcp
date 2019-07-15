import React from 'react';
import { Field, reduxForm } from 'redux-form';
import TextBox from '../../../../../common/atoms/TextBox';
import Row from '../../../../../common/atoms/Row';
import Col from '../../../../../common/atoms/Col';
import RichText from '../../../../../common/atoms/RichText';
import Button from '../../../../../common/atoms/Button';
import createValidateMethod from '../../../../../../utils/formValidation/createValidateMethod';
import getStandardConfig from '../../../../../../utils/formValidation/validatorStandardConfig';

class AddGiftCardForm extends React.PureComponent<Props, State> {
  handleSubmit = data => {
    const { onAddGiftCardClick } = this.props;
    const { giftCardNumber, cardPin } = data;
    const requestPayload = {
      cc_brand: 'GC',
      payMethodId: 'GiftCard',
      account_pin: cardPin,
      pay_account: giftCardNumber,
      recapchaResponse:
        '03AOLTBLSLq4GhhbIqhhXs146f-rApMcK66mtP0fl7rbsRBBtCl6beJbNrpuxKLwBmEe3OhK06l2GX0WRjj98Nmb3rslVOmq6_hvYvo2MGiiDSnkxo74_ukltum6Qav0nHTNJyGu2hjrp2mfSh40b0MWWo1hv2eXTzB2fsuKVD460FqX-S4r6QmGKgnevsJEpDXfqOIbd06TWA1LjPpz7bOTpgscdXH2xATxz90kRXYlwWtUDpkpTNk60WtLYneRQcdK-fcqqK8EyTgWIZRXb3SRsIle12QmI90P0wDOiwgkGviOD7hXRj0_2ft4xzbtNDNda7OZRykZUQAODQPkDlQj8JnZpsK9RZvA',
    };
    onAddGiftCardClick(requestPayload);
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
