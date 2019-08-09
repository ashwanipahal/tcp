import React from 'react';
import BodyCopy from '@tcp/core/src/components/common/atoms/BodyCopy';
import { getIconCard } from '@tcp/core/src/utils/index.native';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {
  getCardList,
  checkBalance,
} from '@tcp/core/src/components/features/account/Payment/container/Payment.actions';

import { getCardListState } from '@tcp/core/src/components/features/account/Payment/container/Payment.selectors';

import PaymentItem from '../../../molecule/Payment';
import CustomButton from '../../../../../../common/atoms/Button';
import {
  UnderlineStyle,
  PaymentTileContainer,
  ButtonWrapperStyle,
} from '../styles/PaymentOverviewTile.style.native';

// @flow

const cardIconMapping = {
  DISC: 'disc-small',
  MC: 'mc-small',
  Amex: 'amex-small',
  Visa: 'visa-small',
  GC: 'gift-card-small',
  'PLACE CARD': 'place-card-small',
  VENMO: 'venmo-blue-acceptance-mark',
};

export class PaymentOverviewTile extends React.PureComponent<Props> {
  static propTypes = {
    getCardListAction: PropTypes.func,
    cardList: PropTypes.shape({}),
    labels: PropTypes.shape({}),
  };

  static defaultProps = {
    getCardListAction: () => {},
    cardList: null,
    labels: {},
  };

  componentDidMount() {
    const { getCardListAction } = this.props;
    getCardListAction();
  }

  componentWillUnmount() {
    const { clearPaymentNotification } = this.props;
    clearPaymentNotification();
  }

  getCreditCardView = card => {
    const { labels } = this.props;

    const cardTileProps = {
      title: 'Credit Card',
      text: `ending in ${card.accountNo.slice(-4)}`,
      subText: `expires ${card.expMonth.trim()}/${card.expYear}`,
      labels,
      variation: 'edit',
      icon: getIconCard(cardIconMapping.Visa),
    };
    return <PaymentItem paymentInfo={cardTileProps} />;
  };

  getGiftCardView = card => {
    const { labels } = this.props;
    const cardTileProps = {
      title: 'Gift Card',
      text: `ending in ${card.accountNo.slice(-4)}`,
      subText: `Remaining balance`,
      labels,
      variation: 'edit',
      icon: getIconCard(cardIconMapping.GC),
    };
    return <PaymentItem paymentInfo={cardTileProps} />;
  };

  render() {
    const { cardList } = this.props;
    const title = 'Payments & Gift Cards';
    const buttonCTA = 'VIEW PAYMENT AND GIFT CARDS';
    const creditCardList =
      cardList &&
      cardList.size > 0 &&
      cardList.filter(card => card.ccType !== 'GiftCard' && card.ccType !== 'VENMO');

    const giftCardList =
      cardList && cardList.size > 0 && cardList.filter(card => card.ccType === 'GiftCard');

    return (
      <PaymentTileContainer>
        <BodyCopy fontFamily="secondary" fontSize="fs16" text={title} color="black" />
        <UnderlineStyle />
        {creditCardList &&
          creditCardList.size > 0 &&
          creditCardList.map(card => this.getCreditCardView(card))}
        <UnderlineStyle />

        {giftCardList &&
          giftCardList.size > 0 &&
          giftCardList.map(card => this.getGiftCardView(card))}

        <ButtonWrapperStyle>
          <CustomButton
            text={buttonCTA}
            buttonVariation="variable-width"
            fill="BLUE"
            color="white"
          />
        </ButtonWrapperStyle>
      </PaymentTileContainer>
    );
  }
}

export const mapDispatchToProps = (dispatch: ({}) => void) => {
  return {
    getCardListAction: () => {
      dispatch(getCardList());
    },
    onGetBalanceCard: payload => {
      dispatch(checkBalance(payload));
    },
  };
};

const mapStateToProps = state => {
  return {
    cardList: getCardListState(state),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PaymentOverviewTile);
