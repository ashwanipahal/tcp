/* eslint-disable max-lines */
import React from 'react';
import PropTypes from 'prop-types';
import { getLabelValue } from '@tcp/core/src/utils';
import withStyles from '@tcp/core/src/components/common/hoc/withStyles';
import styles from '../styles/GiftCards.style';
import { Row, Col, BodyCopy, Button } from '../../../../../../common/atoms';
import Grid from '../../../../../../common/molecules/Grid';
import GiftCardTile from '../../../molecules/GiftCardTile';
import AddGiftCardForm from '../../../../../account/Payment/AddGiftCard/views/AddGiftCardForm';

const GiftCardSectionHeading = (labels, isGiftCardApplied = false) => {
  return (
    <BodyCopy
      fontFamily="secondary"
      fontSize="fs16"
      fontWeight="extrabold"
      data-locator="gift-cards"
      className="elem-mb-XS elem-mt-XXL"
    >
      {getLabelValue(
        labels,
        isGiftCardApplied ? 'lbl_giftcard_appliedCards' : 'lbl_giftcard_availableCards'
      )}
    </BodyCopy>
  );
};
const renderAddGiftCard = hideAddGiftCard => {
  const paymentGC1 = {
    lbl_payment_giftCardNoPlaceholder: 'Gift Card #',
    lbl_common_backLink: 'Back',
    lbl_payment_cancelCard: 'Cancel',
    lbl_payment_addCard: 'Apply',
    lbl_payment_giftCardPinPlaceholder: 'Pin #',
  };
  const labels = { paymentGC: paymentGC1 };
  return (
    <BodyCopy tag="div" className="gift-addgiftcard-container">
      <AddGiftCardForm labels={labels} goBackToPayment={hideAddGiftCard} />
    </BodyCopy>
  );
};
const renderAddNewGiftButton = (labels, orderBalanceTotal, appliedGiftCards, showAddGiftCard) => {
  const ok = true;
  if ((orderBalanceTotal > 0 && appliedGiftCards && appliedGiftCards.size < 5) || ok) {
    return (
      <Row className="elem-mt-LRG elem-mb-LRG">
        <Col
          colSize={{
            small: 4,
            medium: 4,
            large: 3,
          }}
        >
          <Button
            onClick={() => showAddGiftCard()}
            className="new_gift_card_button"
            buttonVariation="variable-width"
            type="submit"
            data-locator="gift_apply_button"
            fullWidth="true"
            disabled={false}
          >
            {getLabelValue(labels, 'lbl_giftcard_newGiftCard')}
          </Button>
        </Col>
      </Row>
    );
  }
  return null;
};
export const GiftCards = ({
  giftCardList,
  appliedGiftCards,
  applyExistingGiftCardToOrder,
  handleRemoveGiftCard,
  labels,
  giftCardErrors,
  orderBalanceTotal,
  className,
  showAddGiftCard,
  enableAddGiftCard,
  hideAddGiftCard,
}) => {
  return (
    <Grid className={className}>
      <Row className="gift-section-container elem-mb-LRG">
        <Col
          colSize={{
            small: 6,
            medium: 8,
            large: 8,
          }}
        >
          <BodyCopy
            fontFamily="primary"
            fontSize="fs26"
            fontWeight="regular"
            data-locator="gift-cards"
            className="elem-mb-XS elem-mt-XXL"
          >
            {getLabelValue(labels, 'lbl_giftcard_title')}
          </BodyCopy>
          <BodyCopy
            fontFamily="secondary"
            fontSize="fs16"
            fontWeight="regular"
            data-locator="gift-cards"
            className="elem-mb-XS elem-mt-MED"
          >
            {getLabelValue(labels, 'lbl_giftcard_addUptoMsg')}
          </BodyCopy>
          {GiftCardSectionHeading(labels, true)}

          {appliedGiftCards &&
            appliedGiftCards.size > 0 &&
            appliedGiftCards.map(cardData => (
              <GiftCardTile
                cardData={cardData}
                handleRemoveGiftCard={handleRemoveGiftCard}
                labels={labels}
                isGiftCardApplied
                giftCardErrors={giftCardErrors}
              />
            ))}

          <BodyCopy
            fontFamily="secondary"
            fontSize="fs16"
            fontWeight="regular"
            data-locator="gift-cards"
            className="elem-mb-XS elem-mt-MED"
          >
            <span className="headsUpMsgBoldTitle">
              {getLabelValue(labels, 'lbl_giftcard_headsUpTitle')}
            </span>
            {`${getLabelValue(labels, 'lbl_giftcard_headsUpMsg')}`}
          </BodyCopy>

          {GiftCardSectionHeading(labels)}
          {giftCardList &&
            giftCardList.size > 0 &&
            giftCardList.map(cardData => (
              <GiftCardTile
                cardData={cardData}
                applyExistingGiftCardToOrder={applyExistingGiftCardToOrder}
                labels={labels}
                giftCardErrors={giftCardErrors}
                orderBalanceTotal={orderBalanceTotal}
              />
            ))}
        </Col>
      </Row>
      {!enableAddGiftCard &&
        renderAddNewGiftButton(labels, orderBalanceTotal, appliedGiftCards, showAddGiftCard)}
      {enableAddGiftCard && renderAddGiftCard(hideAddGiftCard)}
    </Grid>
  );
};

GiftCards.propTypes = {
  className: PropTypes.string,
  giftCardList: PropTypes.shape({}),
  appliedGiftCards: PropTypes.shape({}),
  applyExistingGiftCardToOrder: PropTypes.func.isRequired,
  handleRemoveGiftCard: PropTypes.func.isRequired,
  labels: PropTypes.shape({}),
  giftCardErrors: PropTypes.shape({}),
  orderBalanceTotal: PropTypes.number,
  showAddGiftCard: PropTypes.func.isRequired,
  enableAddGiftCard: PropTypes.bool,
  hideAddGiftCard: PropTypes.func.isRequired,
};

GiftCards.defaultProps = {
  className: '',
  giftCardList: {},
  appliedGiftCards: {},
  labels: {},
  giftCardErrors: {},
  orderBalanceTotal: 0,
  enableAddGiftCard: false,
};

export default withStyles(GiftCards, styles);
export { GiftCards as GiftCardsVanilla };
