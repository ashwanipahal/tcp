/* eslint-disable max-lines */
import React from 'react';
import PropTypes from 'prop-types';
import { getLabelValue } from '@tcp/core/src/utils';
import withStyles from '@tcp/core/src/components/common/hoc/withStyles';
import styles from '../styles/GiftCards.style';
import { Row, Col, BodyCopy, Button } from '../../../../../../common/atoms';
import Grid from '../../../../../../common/molecules/Grid';
import GiftCardTile from '../../../molecules/GiftCardTile';

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

const renderAddNewGiftButton = (labels, orderBalanceTotal, appliedGiftCards) => {
  if (orderBalanceTotal > 0 && appliedGiftCards && appliedGiftCards.size < 5) {
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
            onClick={() => {}}
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
            fontSize="fs24"
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
            {`${getLabelValue(labels, 'lbl_giftcard_headsUpTitle')} ${getLabelValue(
              labels,
              'lbl_giftcard_headsUpMsg'
            )}`}
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
      {renderAddNewGiftButton(labels, orderBalanceTotal, appliedGiftCards)}
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
};

GiftCards.defaultProps = {
  className: '',
  giftCardList: {},
  appliedGiftCards: {},
  labels: {},
  giftCardErrors: {},
  orderBalanceTotal: 0,
};

export default withStyles(GiftCards, styles);
export { GiftCards as GiftCardsVanilla };
