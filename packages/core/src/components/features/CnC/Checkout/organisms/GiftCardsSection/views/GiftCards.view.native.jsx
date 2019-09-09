import React from 'react';
import PropTypes from 'prop-types';
import { getLabelValue } from '@tcp/core/src/utils';

import withStyles from '../../../../../../common/hoc/withStyles';
import {
  PageStyle,
  Container,
  GiftCardBody,
  GiftCardButtonCal,
} from '../styles/GiftCards.style.native';
import { BodyCopyWithSpacing } from '../../../../../../common/atoms/styledWrapper';
import GiftCardTileView from '../../../molecules/GiftCardTile';
import CustomButton from '../../../../../../common/atoms/Button';

class GiftCards extends React.PureComponent {
  renderAddNewGiftButton() {
    const { labels, orderBalanceTotal, appliedGiftCards } = this.props;
    if (orderBalanceTotal > 0 && appliedGiftCards && appliedGiftCards.size < 5) {
      return (
        <GiftCardButtonCal>
          <CustomButton
            fill="DARK"
            type="submit"
            data-locator="add-gift-card"
            text={getLabelValue(labels, 'lbl_giftcard_newGiftCard')}
            onPress={() => {}}
          />
        </GiftCardButtonCal>
      );
    }
    return null;
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
            fontWeight="regular"
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

          <BodyCopyWithSpacing
            text={`${getLabelValue(labels, 'lbl_giftcard_headsUpTitle')} ${getLabelValue(
              labels,
              'lbl_giftcard_headsUpMsg'
            )}`}
            fontSize="fs16"
            fontWeight="regular"
            fontFamily="primary"
            spacingStyles="margin-bottom-MED margin-top-MED"
            color="gray.900"
          />

          <BodyCopyWithSpacing
            text={getLabelValue(labels, 'lbl_giftcard_availableCards')}
            fontSize="fs16"
            fontWeight="regular"
            fontFamily="secondary"
            spacingStyles="margin-bottom-MED"
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
          {this.renderAddNewGiftButton()}
        </Container>
      </>
    );
  }
}

GiftCards.propTypes = {
  labels: PropTypes.shape({}),
  appliedGiftCards: PropTypes.shape({}),
  giftCardList: PropTypes.shape({}),
  giftCardErrors: PropTypes.shape({}),
  handleRemoveGiftCard: PropTypes.func.isRequired,
  orderBalanceTotal: PropTypes.number,
  applyExistingGiftCardToOrder: PropTypes.func.isRequired,
  toastMessage: PropTypes.func.isRequired,
};

GiftCards.defaultProps = {
  labels: {},
  giftCardList: {},
  appliedGiftCards: {},
  giftCardErrors: {},
  orderBalanceTotal: 0,
};

export default withStyles(GiftCards, PageStyle);
export { GiftCards as GiftCardsVanilla };
