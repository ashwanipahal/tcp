import React from 'react';
import PropTypes from 'prop-types';
import BodyCopy from '@tcp/core/src/components/common/atoms/BodyCopy';
import { getIconCard } from '@tcp/core/src/utils/index.native';
import { cardIconMapping } from '@tcp/core/src/components/features/account/common/molecule/CardTile/views/CardTile.utils';
import PaymentItem from '../../../molecule/Payment';
import CustomButton from '../../../../../../common/atoms/Button';
import {
  UnderlineStyle,
  PaymentTileContainer,
  ButtonWrapperStyle,
} from '../styles/PaymentTile.style.native';

export class PaymentTile extends React.PureComponent<Props> {
  static propTypes = {
    cardList: PropTypes.arrayOf({}),
    labels: PropTypes.shape({}),
    handleComponentChange: PropTypes.func.isRequired,
  };

  static defaultProps = {
    cardList: [],
    labels: {},
  };

  getCreditCardView = (card, isAddVariation) => {
    const { labels, handleComponentChange } = this.props;
    const cardTileProps = {
      title: labels.lbl_overview_default_creditCard,
      text: !isAddVariation
        ? `${labels.lbl_overview_card_ending} ${card.accountNo.slice(-4)}`
        : labels.lbl_overview_add_creditCard,
      subText: !isAddVariation
        ? `${labels.lbl_overview_expires} ${card.expMonth.trim()}/${card.expYear}`
        : '',
      variation: !isAddVariation
        ? labels.lbl_overview_addressBookEdit
        : labels.lbl_overview_addressBookAdd,
      icon: !isAddVariation ? getIconCard(cardIconMapping[card.ccBrand]) : '',
    };
    return (
      <PaymentItem
        paymentInfo={cardTileProps}
        handleComponentChange={handleComponentChange}
        isGiftCard={false}
      />
    );
  };

  getGiftCardView = (card, isAddVariation) => {
    const { labels, handleComponentChange, onGetBalanceCard } = this.props;
    const cardTileProps = {
      title: labels.lbl_overview_giftCard,
      text: !isAddVariation
        ? `${labels.lbl_overview_card_ending} ${card.accountNo.slice(-4)}`
        : labels.lbl_overview_add_giftCard,
      subText: !isAddVariation ? `${labels.lbl_overview_remaining_balance}:` : '',
      variation: !isAddVariation
        ? labels.lbl_overview_addressBookEdit
        : labels.lbl_overview_addressBookAdd,
      icon: !isAddVariation ? getIconCard(cardIconMapping.GC) : '',
    };
    return (
      <PaymentItem
        paymentInfo={cardTileProps}
        handleComponentChange={handleComponentChange}
        isGiftCard
        card={card}
        onGetBalanceCard={onGetBalanceCard}
      />
    );
  };

  getGiftCard = cardList => {
    const cards =
      cardList && cardList.size > 0 && cardList.filter(card => card.ccType === 'GiftCard');
    return cards && cards.size && cards.get(cards.size - 1);
  };

  getCreditCardList = cardList =>
    cardList &&
    cardList.size > 0 &&
    cardList.filter(
      card => card.ccType !== 'GiftCard' && card.ccType !== 'VENMO' && card.defaultInd
    );

  render() {
    const { cardList, labels, handleComponentChange } = this.props;
    const creditCardList = this.getCreditCardList(cardList);
    const giftCard = this.getGiftCard(cardList);

    return (
      <PaymentTileContainer>
        <BodyCopy
          fontFamily="secondary"
          fontSize="fs16"
          text={labels.lbl_overview_paymentHeading}
          color="black"
        />
        <UnderlineStyle />
        {creditCardList && creditCardList.size > 0
          ? creditCardList.map(card => this.getCreditCardView(card, false))
          : this.getCreditCardView(null, true)}
        <UnderlineStyle />

        {giftCard ? this.getGiftCardView(giftCard, false) : this.getGiftCardView(null, true)}

        <ButtonWrapperStyle>
          <CustomButton
            text={labels.lbl_overview_view_payments}
            buttonVariation="variable-width"
            fill="BLUE"
            color="white"
            onPress={() => handleComponentChange('paymentGiftCardsPageMobile')}
          />
        </ButtonWrapperStyle>
      </PaymentTileContainer>
    );
  }
}

export default PaymentTile;
