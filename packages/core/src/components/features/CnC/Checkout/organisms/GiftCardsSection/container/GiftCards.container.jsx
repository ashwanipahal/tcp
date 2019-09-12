import React from 'react';
import { connect } from 'react-redux';
import { getCardList } from '../../../../../account/Payment/container/Payment.actions';
import { getGiftCards } from '../../../../../account/Payment/container/Payment.selectors';
import GiftCard from '../views/GiftCards.view';
import GiftCardSelector from './GiftCards.selectors';
import GIFT_CARD_ACTIONS from './GiftCards.action';
import {
  setOrderBalanceTotal,
  setShowGiftCardForm,
  setHideGiftCardForm,
} from '../../../container/Checkout.action';
import { toastMessageInfo } from '../../../../../../common/atoms/Toast/container/Toast.actions.native';

export class GiftCardsContainer extends React.PureComponent<Props> {
  componentWillMount() {
    const { getCardListAction } = this.props;
    getCardListAction();
  }

  componentDidUpdate() {
    const { handleSetOrderBalanceTotal, itemOrderGrandTotal, itemsGiftCardTotal } = this.props;
    handleSetOrderBalanceTotal(itemOrderGrandTotal - itemsGiftCardTotal);
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
    const {
      giftCardList,
      appliedGiftCards,
      handleRemoveGiftCard,
      labels,
      giftCardErrors,
      itemOrderGrandTotal,
      itemsGiftCardTotal,
      toastMessage,
      showAddGiftCard,
      enableAddGiftCard,
      hideAddGiftCard,
    } = this.props;

    let availableGiftCards = [];
    if (giftCardList && appliedGiftCards) {
      const appliedGiftCardsIds = appliedGiftCards.map(item => {
        return parseInt(item.get('onFileCardId'), 10);
      });

      availableGiftCards = giftCardList.filter(availableGiftCard => {
        return appliedGiftCardsIds.indexOf(availableGiftCard.creditCardId) === -1;
      });
    }

    const orderBalanceTotal = itemOrderGrandTotal - itemsGiftCardTotal;

    return (
      <GiftCard
        giftCardList={availableGiftCards}
        appliedGiftCards={appliedGiftCards}
        applyExistingGiftCardToOrder={this.applyExistingGiftCardToOrder}
        handleRemoveGiftCard={handleRemoveGiftCard}
        labels={labels}
        giftCardErrors={giftCardErrors}
        orderBalanceTotal={orderBalanceTotal}
        toastMessage={toastMessage}
        showAddGiftCard={showAddGiftCard}
        enableAddGiftCard={enableAddGiftCard}
        hideAddGiftCard={hideAddGiftCard}
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
    handleRemoveGiftCard: payload => {
      dispatch(GIFT_CARD_ACTIONS.removeGiftCard(payload));
    },
    handleSetOrderBalanceTotal: payload => {
      dispatch(setOrderBalanceTotal(payload));
    },
    toastMessage: palyoad => {
      dispatch(toastMessageInfo(palyoad));
    },
    showAddGiftCard: () => {
      dispatch(setShowGiftCardForm());
    },
    hideAddGiftCard: () => {
      dispatch(setHideGiftCardForm());
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
    giftCardErrors: GiftCardSelector.getGiftCardErrors(state),
    enableAddGiftCard: GiftCardSelector.getShowAddGiftCard(state),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(GiftCardsContainer);
