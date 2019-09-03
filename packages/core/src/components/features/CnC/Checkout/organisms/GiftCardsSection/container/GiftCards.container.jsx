import React from 'react';
import { connect } from 'react-redux';
import { getCardList } from '../../../../../account/Payment/container/Payment.actions';
import { getGiftCards } from '../../../../../account/Payment/container/Payment.selectors';
import GiftCard from '../views/GiftCards.view';
import GiftCardSelector from './GiftCards.selectors';
import GIFT_CARD_ACTIONS from './GiftCards.action';

export class GiftCardsContainer extends React.PureComponent<Props> {
  componentWillMount() {
    const { getCardListAction } = this.props;
    getCardListAction();
  }

  applyExistingGiftCardToOrder = giftCard => {
    const { itemOrderGrandTotal, handleApplyGiftCard } = this.props;
    const requestData = {
      creditCardId: giftCard.creditCardId,
      billingAddressId: giftCard.billingAddressId,
      orderGrandTotal: itemOrderGrandTotal,
      cardNumber: giftCard.accountNo,
      cardPin: giftCard.cardPin,
      balance: giftCard.balance,
    };

    handleApplyGiftCard(requestData);
  };

  render() {
    const { giftCardList, appliedGiftCards, handleRemoveGiftCard, labels } = this.props;

    let availableGiftCards = [];
    if (giftCardList && appliedGiftCards) {
      const appliedGiftCardsIds = appliedGiftCards.map(item => {
        return parseInt(item.get('onFileCardId'), 10);
      });

      availableGiftCards = giftCardList.filter(availableGiftCard => {
        return appliedGiftCardsIds.indexOf(availableGiftCard.creditCardId) === -1;
      });
    }

    return (
      <GiftCard
        giftCardList={availableGiftCards}
        appliedGiftCards={appliedGiftCards}
        applyExistingGiftCardToOrder={this.applyExistingGiftCardToOrder}
        handleRemoveGiftCard={handleRemoveGiftCard}
        labels={labels}
      />
    );
  }
}

export const mapDispatchToProps = dispatch => {
  return {
    getCardListAction: () => {
      dispatch(getCardList());
    },
    handleApplyGiftCard: giftCardData => {
      dispatch(GIFT_CARD_ACTIONS.applyGiftCard(giftCardData));
    },
    handleRemoveGiftCard: piId => {
      dispatch(GIFT_CARD_ACTIONS.removeGiftCard(piId));
    },
  };
};

const mapStateToProps = state => {
  return {
    giftCardList: getGiftCards(state),
    appliedGiftCards: GiftCardSelector.getAppliedGiftCards(state),
    itemOrderGrandTotal: GiftCardSelector.getGrandTotal(state),
    itemsGiftCardTotal: GiftCardSelector.getGiftCardsTotal(state),
    labels: GiftCardSelector.getGiftSectionLabels(state),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(GiftCardsContainer);
