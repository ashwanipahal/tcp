import React from 'react';
import PropTypes from 'prop-types';
import withStyles from '../../../../../../common/hoc/withStyles';
import {
  PageStyle,
  Container,
  GiftCardBody,
  GiftCardButtonCal,
  HeadsUpMessage,
  AddGiftCardWrapper,
} from '../styles/GiftCards.style.native';
import { BodyCopyWithSpacing } from '../../../../../../common/atoms/styledWrapper';
import GiftCardTileView from '../../../molecules/GiftCardTile';
import CustomButton from '../../../../../../common/atoms/Button';
import AddGiftCardForm from '../../../../../../common/organisms/AddGiftCardForm/AddGiftCardForm.native';
import { propTypes, defaultProps } from './GiftCards.view.utils';

class GiftCards extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      orderBalanceTotal: props.orderBalanceTotal,
    };
  }

  static getDerivedStateFromProps(nextProps) {
    const { orderBalanceTotal } = nextProps;
    if (orderBalanceTotal) {
      return { orderBalanceTotal };
    }
    return null;
  }

  renderAddNewGiftButton() {
    const { labels, appliedGiftCards, showAddGiftCard } = this.props;
    const { orderBalanceTotal } = this.state;
    if (orderBalanceTotal > 0 && appliedGiftCards && appliedGiftCards.size < 5) {
      return (
        <GiftCardButtonCal>
          <CustomButton
            fill="DARK"
            type="submit"
            data-locator="add-gift-card"
            text={labels.newGiftCard}
            onPress={() => showAddGiftCard()}
          />
        </GiftCardButtonCal>
      );
    }
    return null;
  }

  renderAddGiftCardError() {
    const { getAddGiftCardError } = this.props;
    if (getAddGiftCardError) {
      return (
        <BodyCopyWithSpacing
          mobileFontFamily={['secondary']}
          fontWeight="semibold"
          fontSize="fs12"
          color="error"
          spacingStyles="margin-bottom-MED"
          text={getAddGiftCardError}
        />
      );
    }
    return null;
  }

  renderAddGiftCard() {
    const {
      hideAddGiftCard,
      onAddGiftCardClick,
      getAddGiftCardError,
      isGuestUser,
      isRecapchaEnabled,
      labels,
      isLoading,
      onClearError,
      formErrorMessage,
    } = this.props;
    return (
      <AddGiftCardWrapper>
        {this.renderAddGiftCardError()}
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
          toggleModal={hideAddGiftCard}
          formErrorMessage={formErrorMessage}
        />
      </AddGiftCardWrapper>
    );
  }

  renderAvailableCardHeading = (giftCardList, labels) => {
    return (
      <>
        {giftCardList && giftCardList.size > 0 && (
          <BodyCopyWithSpacing
            text={labels.availableGiftCards}
            fontSize="fs16"
            fontWeight="extrabold"
            fontFamily="secondary"
            spacingStyles="margin-bottom-MED margin-top-MED"
            color="gray.900"
          />
        )}
      </>
    );
  };

  renderHeadsUpHeading = (labels, appliedGiftCards, giftCardList) => {
    return (
      <>
        {((appliedGiftCards && appliedGiftCards.size > 0) ||
          (giftCardList && giftCardList.size > 0)) && (
          <HeadsUpMessage>
            <BodyCopyWithSpacing
              text={`${labels.giftCardHeadsUpTitle} `}
              fontSize="fs16"
              fontWeight="semibold"
              fontFamily="secondary"
              spacingStyles="margin-bottom-MED margin-top-MED"
              color="gray.900"
            />
            <BodyCopyWithSpacing
              text={labels.giftCardHeadsUpMsg}
              fontSize="fs16"
              fontWeight="regular"
              fontFamily="primary"
              spacingStyles="margin-left-SM"
              color="gray.900"
            />
          </HeadsUpMessage>
        )}
      </>
    );
  };

  render() {
    const {
      labels,
      toastMessage,
      handleRemoveGiftCard,
      giftCardErrors,
      appliedGiftCards,
      giftCardList,
      applyExistingGiftCardToOrder,
      enableAddGiftCard,
    } = this.props;
    const { orderBalanceTotal } = this.state;
    return (
      <>
        <Container>
          <BodyCopyWithSpacing
            text={labels.giftCardTitle}
            fontSize="fs26"
            fontWeight="regular"
            fontFamily="primary"
            spacingStyles="margin-bottom-MED"
            color="gray.900"
          />

          <BodyCopyWithSpacing
            text={labels.giftCardAddUpToMsg}
            fontSize="fs16"
            fontWeight="regular"
            fontFamily="primary"
            spacingStyles="margin-bottom-MED"
            color="gray.900"
          />

          {appliedGiftCards && appliedGiftCards.size > 0 && (
            <BodyCopyWithSpacing
              text={labels.appliedGiftCards}
              fontSize="fs16"
              fontWeight="extrabold"
              fontFamily="secondary"
              spacingStyles="margin-bottom-MED"
              color="gray.900"
            />
          )}

          {appliedGiftCards &&
            appliedGiftCards.size > 0 &&
            appliedGiftCards.map(cardData => {
              return (
                <GiftCardBody>
                  <GiftCardTileView
                    cardData={cardData}
                    handleRemoveGiftCard={handleRemoveGiftCard}
                    labels={labels}
                    isGiftCardApplied
                    giftCardErrors={giftCardErrors}
                    toastMessage={toastMessage}
                  />
                </GiftCardBody>
              );
            })}

          {this.renderHeadsUpHeading(labels, appliedGiftCards, giftCardList)}

          {this.renderAvailableCardHeading(giftCardList, labels)}

          {giftCardList &&
            giftCardList.size > 0 &&
            giftCardList.map(cardData => {
              return (
                <GiftCardBody>
                  <GiftCardTileView
                    cardData={cardData}
                    applyExistingGiftCardToOrder={applyExistingGiftCardToOrder}
                    labels={labels}
                    giftCardErrors={giftCardErrors}
                    orderBalanceTotal={orderBalanceTotal}
                    toastMessage={toastMessage}
                  />
                </GiftCardBody>
              );
            })}
          {!enableAddGiftCard && this.renderAddNewGiftButton()}
          {enableAddGiftCard && this.renderAddGiftCard()}
        </Container>
      </>
    );
  }
}

GiftCards.propTypes = {
  ...propTypes,
  toastMessage: PropTypes.func.isRequired,
};

GiftCards.defaultProps = defaultProps;

export default withStyles(GiftCards, PageStyle);
export { GiftCards as GiftCardsVanilla };
