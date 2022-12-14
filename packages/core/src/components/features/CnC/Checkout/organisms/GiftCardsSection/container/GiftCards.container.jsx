import React from 'react';
import { connect } from 'react-redux';
import CheckoutSelectors, {
  isGuest,
  isExpressCheckout,
} from '@tcp/core/src/components/features/CnC/Checkout/container/Checkout.selector';
import { getCardList } from '../../../../../account/Payment/container/Payment.actions';
import {
  getGiftCards,
  checkbalanceValue,
} from '../../../../../account/Payment/container/Payment.selectors';
import GiftCard from '../views/GiftCards.view';
import GiftCardSelector from './GiftCards.selectors';
import GIFT_CARD_ACTIONS from './GiftCards.action';
import {
  setOrderBalanceTotal,
  setShowGiftCardForm,
  setHideGiftCardForm,
  resetAddGiftCard,
} from '../../../container/Checkout.action';
import { resetAddGiftCardSuccess } from '../../../container/Checkout.action.util';
import { toastMessageInfo } from '../../../../../../common/atoms/Toast/container/Toast.actions.native';
import { getFormValidationErrorMessages } from '../../../../../account/Account/container/Account.selectors';
import CHECKOUT_CONSTANTS from '../../../Checkout.constants';

const { getIsPaymentDisabled } = CheckoutSelectors;
export class GiftCardsContainer extends React.PureComponent<Props> {
  /* eslint-disable-next-line */
  UNSAFE_componentWillMount() {
    const { getCardListAction, isGuestUser } = this.props;
    if (!isGuestUser) {
      getCardListAction({ ignoreCache: true });
    }
  }

  componentDidUpdate(prevProps) {
    const {
      handleSetOrderBalanceTotal,
      itemOrderGrandTotal,
      itemsGiftCardTotal,
      addGiftCardResponse,
      hideAddGiftCard,
      getCardListAction,
      resetAddGiftCardAction,
    } = this.props;

    if (prevProps && prevProps.itemsGiftCardTotal !== itemsGiftCardTotal) {
      handleSetOrderBalanceTotal(itemOrderGrandTotal - itemsGiftCardTotal);
    }

    if (addGiftCardResponse === 'success') {
      hideAddGiftCard();
      getCardListAction();
      resetAddGiftCardAction();
    }
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

  submitGiftCardData = data => {
    const { handleSubmit, labels } = this.props;
    handleSubmit({
      giftcardAccountNumber: data.giftCardNumber,
      giftcardPin: data.cardPin,
      billingAddressId: data.billingAddressId,
      recaptchaToken: data.recaptchaToken,
      saveToAccount: data.saveToAccount,
      cardType: CHECKOUT_CONSTANTS.PAYMENT_CARD_TYPE.GC,
      labels,
    });
  };

  onClearError = () => {
    const { clearResetAddGiftCard } = this.props;
    clearResetAddGiftCard();
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
      getAddGiftCardError,
      isRecapchaEnabled,
      isLoading,
      isExpressCheckoutUser,
      isFromReview,
      isPaymentDisabled,
      isGuestUser,
      isFetching,
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
        onAddGiftCardClick={this.submitGiftCardData}
        getAddGiftCardError={getAddGiftCardError}
        isGuestUser={isGuestUser}
        isRecapchaEnabled={isRecapchaEnabled}
        isLoading={isLoading}
        onClearError={this.onClearError}
        isExpressCheckout={isExpressCheckoutUser}
        isFromReview={isFromReview}
        isPaymentDisabled={isPaymentDisabled}
        isFetching={isFetching}
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
    handleSubmit: giftCardData => {
      dispatch(GIFT_CARD_ACTIONS.addGiftCard(giftCardData));
    },
    resetAddGiftCardAction: () => {
      dispatch(resetAddGiftCardSuccess());
    },
    clearResetAddGiftCard: () => {
      dispatch(resetAddGiftCard());
    },
  };
};

const mapStateToProps = state => {
  return {
    giftCardList: getGiftCards(state),
    appliedGiftCards: GiftCardSelector.getAppliedGiftCards(state),
    itemOrderGrandTotal: GiftCardSelector.getGrandTotal(state),
    itemsGiftCardTotal: GiftCardSelector.getGiftCardsTotal(state),
    labels: {
      ...GiftCardSelector.getGiftSectionLabels(state),
      ...GiftCardSelector.getGiftCardSectionLabels(state),
    },
    giftCardErrors: GiftCardSelector.getGiftCardErrors(state),
    enableAddGiftCard: GiftCardSelector.getShowAddGiftCard(state),
    formErrorMessage: getFormValidationErrorMessages(state),
    getAddGiftCardError: GiftCardSelector.getAddGiftCardErrors(state),
    giftCardBalance: checkbalanceValue(state),
    isRecapchaEnabled: GiftCardSelector.getIsRecapchaEnabled(state),
    addGiftCardResponse: GiftCardSelector.getAddGiftCardResponse(state),
    isLoading: GiftCardSelector.getIsLoading(state),
    isExpressCheckoutUser: isExpressCheckout(state),
    isPaymentDisabled: getIsPaymentDisabled(state),
    isGuestUser: isGuest(state),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(GiftCardsContainer);
