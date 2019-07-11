import React from 'react';
import { Field, reduxForm } from 'redux-form';
import TextBox from '../../../../../common/atoms/TextBox';
import { required } from '../../../../../../utils/FormValidation';
import Row from '../../../../../common/atoms/Row';
import Col from '../../../../../common/atoms/Col';
import RichText from '../../../../../common/atoms/RichText';
import labels from '../container/AddGiftCard.labels';
import Button from '../../../../../common/atoms/Button';

class AddGiftCardForm extends React.PureComponent<Props, State> {
  handleSubmit = () => {};

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <Row fullBleed>
          <Col ignoreGutter={{ small: true }} colSize={{ small: 6, medium: 4, large: 4 }}>
            <Field
              placeholder="Gift Card"
              name="giftCard"
              id="giftCardNumber"
              type="tel"
              component={TextBox}
              validate={[required]}
              maxLength={50}
              dataLocator="gift-card-cardnumberfield"
            />
          </Col>
          <Col ignoreGutter={{ small: true }} colSize={{ small: 6, medium: 2, large: 3 }}>
            <Field
              placeholder="Pin"
              name="pin"
              id="giftCardPin"
              type="tel"
              component={TextBox}
              validate={[required]}
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
          <Col ignoreGutter={{ small: true }} colSize={{ small: 1, medium: 1, large: 1 }} />

          <Col
            ignoreGutter={{ small: true }}
            colSize={{ small: 4, medium: 3, large: 2 }}
            className="add-gift-card__first-button-container"
          >
            <Button buttonVariation="fixed-width" type="button" data-locator="gift-card-cancelbtn">
              {labels.ACC_LBL_CANCEL_CARD}
            </Button>
          </Col>

          <Col
            ignoreGutter={{ small: true }}
            colSize={{ small: 4, medium: 3, large: 2 }}
            className="add-gift-card__second-button-container"
          >
            <Button
              buttonVariation="fixed-width"
              fill="BLUE"
              type="button"
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

export default reduxForm({
  form: 'AddGiftCardForm', // a unique identifier for this form
})(AddGiftCardForm);
