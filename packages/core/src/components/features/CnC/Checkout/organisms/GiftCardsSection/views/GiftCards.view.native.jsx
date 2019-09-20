import React from 'react';
import PropTypes from 'prop-types';
import { getLabelValue } from '@tcp/core/src/utils';

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
import { AddGiftCardForm } from '../../../../../account/Payment/AddGiftCard/views/AddGiftCardForm.native';
import { propTypes, defaultProps } from './GiftCards.view.utils';

class GiftCards extends React.PureComponent {
  renderAddNewGiftButton() {
    const { labels, orderBalanceTotal, appliedGiftCards, showAddGiftCard } = this.props;
    if (orderBalanceTotal > 0 && appliedGiftCards && appliedGiftCards.size < 5) {
      return (
        <GiftCardButtonCal>
          <CustomButton
            fill="DARK"
            type="submit"
            data-locator="add-gift-card"
            text={getLabelValue(labels, 'lbl_giftcard_newGiftCard')}
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
        />
      </AddGiftCardWrapper>
    );
  }

  render() {
    const {
      labels,
      toastMessage,
      handleRemoveGiftCard,
      giftCardErrors,
      appliedGiftCards,
      giftCardList,
      applyExistingGiftCardToOrder,
      orderBalanceTotal,
      enableAddGiftCard,
    } = this.props;

    return (
      <>
        <Container>
          <BodyCopyWithSpacing
            text={getLabelValue(labels, 'lbl_giftcard_title')}
            fontSize="fs26"
            fontWeight="regular"
            fontFamily="primary"
            spacingStyles="margin-bottom-MED"
            color="gray.900"
          />

          <BodyCopyWithSpacing
            text={getLabelValue(labels, 'lbl_giftcard_addUptoMsg')}
            fontSize="fs16"
            fontWeight="regular"
            fontFamily="primary"
            spacingStyles="margin-bottom-MED"
            color="gray.900"
          />

          <BodyCopyWithSpacing
            text={getLabelValue(labels, 'lbl_giftcard_appliedCards')}
            fontSize="fs16"
            fontWeight="extrabold"
            fontFamily="secondary"
            spacingStyles="margin-bottom-MED"
            color="gray.900"
          />

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

          <HeadsUpMessage>
            <BodyCopyWithSpacing
              text={`${getLabelValue(labels, 'lbl_giftcard_headsUpTitle')} `}
              fontSize="fs16"
              fontWeight="semibold"
              fontFamily="secondary"
              spacingStyles="margin-bottom-MED margin-top-MED"
              color="gray.900"
            />
            <BodyCopyWithSpacing
              text={getLabelValue(labels, 'lbl_giftcard_headsUpMsg')}
              fontSize="fs16"
              fontWeight="regular"
              fontFamily="primary"
              spacingStyles="margin-left-SM"
              color="gray.900"
            />
          </HeadsUpMessage>

          <BodyCopyWithSpacing
            text={getLabelValue(labels, 'lbl_giftcard_availableCards')}
            fontSize="fs16"
            fontWeight="extrabold"
            fontFamily="secondary"
            spacingStyles="margin-bottom-MED margin-top-MED"
            color="gray.900"
          />

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
