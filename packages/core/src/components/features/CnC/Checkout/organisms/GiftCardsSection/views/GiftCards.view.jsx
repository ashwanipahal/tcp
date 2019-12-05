import React from 'react';
import withStyles from '@tcp/core/src/components/common/hoc/withStyles';
import styles from '../styles/GiftCards.style';
import { Row, Col, BodyCopy, Button } from '../../../../../../common/atoms';
import Grid from '../../../../../../common/molecules/Grid';
import GiftCardTile from '../../../molecules/GiftCardTile';
import AddGiftCardForm from '../../../../../../common/organisms/AddGiftCardForm/AddGiftCardForm';
import GiftCardSkeleton from '../skeleton/GiftCardSkeleton.view';
import ErrorMessage from '../../../../common/molecules/ErrorMessage';

import {
  propTypes,
  defaultProps,
  renderAddGiftCardProps,
  renderGiftCardTileProps,
  renderAppliedGiftCardsProps,
  GiftCardSectionHeading,
} from './GiftCards.view.utils';

const getHeading = (labels, isGiftCardApplied) => {
  return (
    <BodyCopy
      fontFamily="secondary"
      fontSize="fs16"
      fontWeight="extrabold"
      data-locator="gift-cards"
      className="elem-mt-MED"
    >
      {`${isGiftCardApplied ? labels.appliedGiftCards : labels.availableGiftCards}`}
    </BodyCopy>
  );
};

const renderAddGiftCardError = getAddGiftCardError => {
  if (getAddGiftCardError) {
    return (
      <Row fullBleed>
        <Col ignoreGutter={{ small: true }} colSize={{ small: 6, medium: 10, large: 6 }}>
          <ErrorMessage error={getAddGiftCardError} fontSize="fs12" fontWeight="extrabold" />
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
  isFromReview,
  isExpressCheckout,
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
            isFromReview={isFromReview}
            isExpressCheckout={isExpressCheckout}
          />
        </BodyCopy>
      </Col>
    </Row>
  );
};
const renderAddNewGiftButton = (
  labels,
  orderBalanceTotal,
  appliedGiftCards,
  showAddGiftCard,
  isFromReview,
  isExpressCheckout
) => {
  if (orderBalanceTotal > 0 && appliedGiftCards && appliedGiftCards.size < 5) {
    return (
      <Row fullBleed className="elem-mt-LRG elem-mb-LRG">
        <Col
          colSize={{
            small: 4,
            medium: 4,
            large: isFromReview && isExpressCheckout ? 6 : 3,
          }}
        >
          <Button
            onClick={() => showAddGiftCard()}
            className="new_gift_card_button"
            buttonVariation="variable-width"
            data-locator="gift_apply_button"
            fullWidth="true"
            disabled={false}
          >
            {labels.newGiftCard}
          </Button>
        </Col>
      </Row>
    );
  }
  return null;
};

const renderHeadsUpHeading = (labels, appliedGiftCards, giftCardList) => {
  return (
    <>
      {((appliedGiftCards && appliedGiftCards.size > 0) ||
        (giftCardList && giftCardList.size > 0)) && (
        <BodyCopy
          fontFamily="secondary"
          fontSize="fs16"
          fontWeight="regular"
          data-locator="gift-cards"
          className="elem-mt-LRG"
        >
          <span className="headsUpMsgBoldTitle">{labels.giftCardHeadsUpTitle}</span>
          {`${labels.giftCardHeadsUpMsg}`}
        </BodyCopy>
      )}
    </>
  );
};

const renderGiftCardTile = ({
  cardData,
  isGiftCardApplied,
  handleRemoveGiftCard,
  labels,
  giftCardErrors,
  isExpressCheckout,
  isFromReview,
  applyExistingGiftCardToOrder,
  orderBalanceTotal,
  isPaymentDisabled,
  giftCardList,
}) => {
  return (
    <GiftCardTile
      cardData={cardData}
      handleRemoveGiftCard={handleRemoveGiftCard}
      labels={labels}
      isGiftCardApplied={isGiftCardApplied}
      giftCardErrors={giftCardErrors}
      isExpressCheckout={isExpressCheckout}
      isFromReview={isFromReview}
      orderBalanceTotal={orderBalanceTotal}
      applyExistingGiftCardToOrder={applyExistingGiftCardToOrder}
      isPaymentDisabled={isPaymentDisabled}
      giftCardList={giftCardList}
    />
  );
};

const renderAppliedGiftCards = ({
  appliedGiftCards,
  handleRemoveGiftCard,
  labels,
  giftCardErrors,
  isExpressCheckout,
  isFromReview,
  isPaymentDisabled,
}) => {
  return (
    <>
      {isFromReview && appliedGiftCards && appliedGiftCards.size === 0 && (
        <BodyCopy
          fontFamily="secondary"
          fontSize="fs16"
          fontWeight="regular"
          data-locator="gift-cards-none"
        >
          {`${labels.noGiftCards}`}
        </BodyCopy>
      )}
      {appliedGiftCards &&
        appliedGiftCards.size > 0 &&
        appliedGiftCards.map(cardData =>
          renderGiftCardTile({
            cardData,
            handleRemoveGiftCard,
            labels,
            giftCardErrors,
            isExpressCheckout,
            isFromReview,
            isGiftCardApplied: true,
            isPaymentDisabled,
          })
        )}
    </>
  );
};

const renderGiftCardsList = ({
  giftCardList,
  applyExistingGiftCardToOrder,
  labels,
  giftCardErrors,
  orderBalanceTotal,
  isExpressCheckout,
  isFromReview,
  isPaymentDisabled,
}) => {
  return (
    (!isFromReview || isExpressCheckout) &&
    giftCardList &&
    giftCardList.size > 0 &&
    giftCardList.map(cardData =>
      renderGiftCardTile({
        applyExistingGiftCardToOrder,
        cardData,
        labels,
        giftCardErrors,
        orderBalanceTotal,
        isExpressCheckout,
        isFromReview,
        isPaymentDisabled,
      })
    )
  );
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
  isExpressCheckout,
  isFromReview,
  isPaymentDisabled,
  isFetching,
}) => {
  return (
    <Grid className={className}>
      <Row fullBleed className="gift-section-container elem-mb-LRG">
        <Col
          colSize={{
            small: 6,
            medium: 8,
            large: isFromReview ? 12 : 8,
          }}
        >
          {!isFromReview && (
            <>
              <BodyCopy
                fontFamily="primary"
                fontSize="fs26"
                fontWeight="regular"
                data-locator="gift-cards"
                className="elem-mt-XXL"
              >
                {labels.giftCardTitle}
              </BodyCopy>
              <BodyCopy
                fontFamily="secondary"
                fontSize="fs16"
                fontWeight="regular"
                data-locator="gift-cards"
                className="elem-mt-LRG"
              >
                {labels.giftCardAddUpToMsg}
              </BodyCopy>
            </>
          )}
          {GiftCardSectionHeading(
            appliedGiftCards,
            labels,
            isFromReview,
            isExpressCheckout,
            getHeading,
            true
          )}
          {renderAppliedGiftCards({
            appliedGiftCards,
            handleRemoveGiftCard,
            labels,
            giftCardErrors,
            isExpressCheckout,
            isFromReview,
            isPaymentDisabled,
          })}
          {renderHeadsUpHeading(labels, appliedGiftCards, giftCardList)}
          {GiftCardSectionHeading(
            giftCardList,
            labels,
            isFromReview,
            isExpressCheckout,
            getHeading
          )}
          {!isFetching ? (
            renderGiftCardsList({
              giftCardList,
              applyExistingGiftCardToOrder,
              labels,
              giftCardErrors,
              orderBalanceTotal,
              isExpressCheckout,
              isFromReview,
              isPaymentDisabled,
            })
          ) : (
            <>
              <GiftCardSkeleton />
              <GiftCardSkeleton />
            </>
          )}
        </Col>
      </Row>
      {!enableAddGiftCard &&
        (!isFromReview || (isFromReview && isExpressCheckout)) &&
        renderAddNewGiftButton(
          labels,
          orderBalanceTotal,
          appliedGiftCards,
          showAddGiftCard,
          isFromReview,
          isExpressCheckout
        )}
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
          isFromReview,
        })}
    </Grid>
  );
};

renderAddGiftCard.propTypes = renderAddGiftCardProps;

GiftCards.propTypes = propTypes;

GiftCards.defaultProps = defaultProps;

renderGiftCardTile.propTypes = renderGiftCardTileProps.propTypes;
renderGiftCardTile.defaultProps = renderGiftCardTileProps.defaultProps;
renderAppliedGiftCards.propTypes = renderAppliedGiftCardsProps.propTypes;
renderAppliedGiftCards.defaultProps = renderAppliedGiftCardsProps.defaultProps;

export default withStyles(GiftCards, styles);
export { GiftCards as GiftCardsVanilla };
