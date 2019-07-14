import React from 'react';
import { Field, reduxForm } from 'redux-form';
import TextBox from '../../../../../common/atoms/TextBox';
import { required } from '../../../../../../utils/FormValidation';
import Row from '../../../../../common/atoms/Row';
import Col from '../../../../../common/atoms/Col';
import RichText from '../../../../../common/atoms/RichText';
import labels from '../container/AddGiftCard.labels';
import Button from '../../../../../common/atoms/Button';

const exactLength = length => value =>
  !(value && value.length === length) ? 'Please enter a valid gift card number' : undefined;

const exactLength19 = exactLength(19);

class AddGiftCardForm extends React.PureComponent<Props, State> {
  handleSubmit = data => {
    const { onAddGiftCardClick } = this.props;
    const { giftCardNumber, pin } = data;
    const requestPayload = {
      cc_brand: 'GC',
      payMethodId: 'GiftCard',
      account_pin: pin,
      pay_account: giftCardNumber,
      recapchaResponse:
        '03AOLTBLQRIFMtJinipk42VHLv1v254N96ahPXPCaD4haQViLagJ9xdGGeAi1LLDla1vf9Du6SHGxiZJb78bj05BXmxQ_TapgFOY-DWYpjZsTVmpWgT4HlJQcZoS3wm20wTygBdougXY1SysFKgaAPJRbnz0xN2t36VNMdtPh8MXEACAkE9upD0TRe7SyR2BU1n3xLFF_hoIgi-sBrMknfVNZ5pR815lPlmt_wax8QV7hVqnecnoMk3Lc57_TpjjgHXhBQvFRu2pQ7o_bc4ecX3dNyi-cvoYRHCEtg9v5sh7IDwhs6npiLydTY78hLPFprvTBEXkQVgMmSEXVU7Eux02YDyS4VfWgg-Q',
    };
    onAddGiftCardClick(requestPayload);
  };

  render() {
    const { handleSubmit } = this.props;
    return (
      <form onSubmit={handleSubmit(this.handleSubmit.bind(this))}>
        <Row fullBleed>
          <Col ignoreGutter={{ small: true }} colSize={{ small: 6, medium: 4, large: 4 }}>
            <Field
              placeholder="Gift Card"
              name="giftCardNumber"
              id="giftCardNumber"
              type="tel"
              component={TextBox}
              validate={[required, exactLength19]}
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

export default reduxForm({
  form: 'AddGiftCardForm', // a unique identifier for this form
})(AddGiftCardForm);
