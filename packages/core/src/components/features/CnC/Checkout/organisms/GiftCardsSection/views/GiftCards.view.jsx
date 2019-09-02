/* eslint-disable max-lines */
import React from 'react';
import PropTypes from 'prop-types';
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
      {isGiftCardApplied ? labels.appliedCardsTitle : labels.availableGiftCards}
    </BodyCopy>
  );
};
export const GiftCards = ({
  giftCardList,
  appliedGiftCards,
  applyExistingGiftCardToOrder,
  handleRemoveGiftCard,
  labels,
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
            {labels.giftCardTitle}
          </BodyCopy>
          <BodyCopy
            fontFamily="secondary"
            fontSize="fs16"
            fontWeight="regular"
            data-locator="gift-cards"
            className="elem-mb-XS elem-mt-MED"
          >
            {labels.addUpToMsg}
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
              />
            ))}

          <BodyCopy
            fontFamily="secondary"
            fontSize="fs16"
            fontWeight="regular"
            data-locator="gift-cards"
            className="elem-mb-XS elem-mt-MED"
          >
            {`${labels.headsUp} ${labels.headsUpMsg}`}
          </BodyCopy>

          {GiftCardSectionHeading(labels)}
          {giftCardList &&
            giftCardList.size > 0 &&
            giftCardList.map(cardData => (
              <GiftCardTile
                cardData={cardData}
                applyExistingGiftCardToOrder={applyExistingGiftCardToOrder}
                labels={labels}
              />
            ))}
        </Col>
      </Row>
      <Row className="elem-mt-LRG elem-mb-LRG">
        <Col
          colSize={{
            small: 4,
            medium: 2,
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
            {labels.newGiftCard}
          </Button>
        </Col>
      </Row>
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
};

GiftCards.defaultProps = {
  className: '',
  giftCardList: {},
  appliedGiftCards: {},
  labels: {},
};

export default withStyles(GiftCards, styles);
export { GiftCards as GiftCardsVanilla };
