import React from 'react';
import { getLabelValue } from '@tcp/core/src/utils';
import withStyles from '@tcp/core/src/components/common/hoc/withStyles';
import styles from '../styles/GiftCards.style';
import { Row, Col, BodyCopy, Button } from '../../../../../../common/atoms';
import Grid from '../../../../../../common/molecules/Grid';
import GiftCardTile from '../../../molecules/GiftCardTile';
import AddGiftCardForm from '../../../../../../common/organisms/AddGiftCardForm/AddGiftCardForm';

import ErrorMessage from '../../../../../../common/hoc/ErrorMessage';

import { propTypes, defaultProps, renderAddGiftCardProps } from './GiftCards.view.utils';

const GiftCardSectionHeading = (labels, isGiftCardApplied = false) => {
  return (
    <BodyCopy
      fontFamily="secondary"
      fontSize="fs16"
      fontWeight="extrabold"
      data-locator="gift-cards"
      className="elem-mt-MED"
    >
      {getLabelValue(
        labels,
        isGiftCardApplied ? 'lbl_giftcard_appliedCards' : 'lbl_giftcard_availableCards'
      )}
    </BodyCopy>
  );
};

const renderAddGiftCardError = getAddGiftCardError => {
  if (getAddGiftCardError) {
    return (
      <Row fullBleed>
        <Col ignoreGutter={{ small: true }} colSize={{ small: 6, medium: 10, large: 6 }}>
          <ErrorMessage
            isShowingMessage
            errorId="addNew"
            error={getAddGiftCardError}
            withoutErrorDataAttribute
          />
        </Col>
      </Row>
    );
  }
  return null;
};

const renderAddGiftCard = ({
  hideAddGiftCard,
  onAddGiftCardClick,
  getAddGiftCardError,
  isGuestUser,
  isRecapchaEnabled,
  labels,
  isLoading,
  onClearError,
}) => {
  return (
    <Row className="gift-card-container elem-mb-LRG">
      <Col
        colSize={{
          small: 6,
          medium: 8,
          large: 12,
        }}
      >
        <BodyCopy component="div" className="gift-addgiftcard-container">
          {renderAddGiftCardError(getAddGiftCardError)}
          <AddGiftCardForm
            labels={labels}
            goBackToPayment={hideAddGiftCard}
            onAddGiftCardClick={onAddGiftCardClick}
            saveToAccountEnabled={!isGuestUser}
            isRecapchaEnabled={isRecapchaEnabled}
            addGiftCardError={getAddGiftCardError}
            isRow
            isLoading={isLoading}
            onClearError={onClearError}
          />
        </BodyCopy>
      </Col>
    </Row>
  );
};
const renderAddNewGiftButton = (labels, orderBalanceTotal, appliedGiftCards, showAddGiftCard) => {
  if (orderBalanceTotal > 0 && appliedGiftCards && appliedGiftCards.size < 5) {
    return (
      <Row fullBleed className="elem-mt-LRG elem-mb-LRG">
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
  onAddGiftCardClick,
  getAddGiftCardError,
  isGuestUser,
  isRecapchaEnabled,
  isLoading,
  onClearError,
}) => {
  return (
    <Grid className={className}>
      <Row fullBleed className="gift-section-container elem-mb-LRG">
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
            className="elem-mt-XXL"
          >
            {getLabelValue(labels, 'lbl_giftcard_title')}
          </BodyCopy>
          <BodyCopy
            fontFamily="secondary"
            fontSize="fs16"
            fontWeight="regular"
            data-locator="gift-cards"
            className="elem-mt-LRG"
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
            className="elem-mt-LRG"
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
      {enableAddGiftCard &&
        renderAddGiftCard({
          hideAddGiftCard,
          onAddGiftCardClick,
          getAddGiftCardError,
          isGuestUser,
          isRecapchaEnabled,
          labels,
          isLoading,
          onClearError,
        })}
    </Grid>
  );
};

renderAddGiftCard.propTypes = renderAddGiftCardProps;

GiftCards.propTypes = propTypes;

GiftCards.defaultProps = defaultProps;

export default withStyles(GiftCards, styles);
export { GiftCards as GiftCardsVanilla };
