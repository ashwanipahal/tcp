import React from 'react';
import BodyCopy from '@tcp/core/src/components/common/atoms/BodyCopy';
import { getIconCard } from '@tcp/core/src/utils/index.native';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {
  getCardList,
  checkBalance,
} from '@tcp/core/src/components/features/account/Payment/container/Payment.actions';
import { cardIconMapping } from '@tcp/core/src/components/features/account/common/molecule/CardTile/views/CardTile.utils';
import { getCardListState } from '@tcp/core/src/components/features/account/Payment/container/Payment.selectors';

import AddressItem from '../../../molecule/AddressItem';
import CustomButton from '../../../../../../common/atoms/Button';
import {
  UnderlineStyle,
  PaymentTileContainer,
  ButtonWrapperStyle,
} from '../styles/AddressOverviewTile.style.native';

export class AddressOverviewTile extends React.PureComponent<Props> {
  static propTypes = {
    getCardListAction: PropTypes.func,
    cardList: PropTypes.arrayOf({}),
    labels: PropTypes.shape({}),
    handleComponentChange: PropTypes.func.isRequired,
  };

  static defaultProps = {
    getCardListAction: () => {},
    cardList: [],
    labels: {},
  };

  componentDidMount() {
    const { getCardListAction } = this.props;
    getCardListAction();
  }

  getCreditCardView = (card, isAddVariation) => {
    const { labels, handleComponentChange } = this.props;
    const cardTileProps = {
      title: labels.lbl_overview_defaultShipingAddress,
      text: !isAddVariation
        ? `${labels.lbl_overview_card_ending} ${card.accountNo.slice(-4)}`
        : labels.lbl_overview_addressNotAdded,
      subText: !isAddVariation
        ? `${labels.lbl_overview_expires} ${card.expMonth.trim()}/${card.expYear}`
        : '',
      variation: !isAddVariation
        ? labels.lbl_overview_addressBookEdit
        : labels.lbl_overview_addressBookAdd,
      icon: !isAddVariation ? getIconCard(cardIconMapping[card.ccBrand]) : '',
    };
    return (
      <AddressItem paymentInfo={cardTileProps} handleComponentChange={handleComponentChange} />
    );
  };

  getGiftCardView = (card, isAddVariation) => {
    const { labels, handleComponentChange } = this.props;
    const cardTileProps = {
      title: labels.lbl_overview_defaultBillingAddress,
      text: !isAddVariation
        ? `${labels.lbl_overview_card_ending} ${card.accountNo.slice(-4)}`
        : labels.lbl_overview_addressNotAdded,
      subText: !isAddVariation ? `${labels.lbl_overview_remaining_balance}:` : '',
      variation: !isAddVariation
        ? labels.lbl_overview_addressBookEdit
        : labels.lbl_overview_addressBookAdd,
      icon: !isAddVariation ? getIconCard(cardIconMapping.GC) : '',
    };
    return (
      <AddressItem paymentInfo={cardTileProps} handleComponentChange={handleComponentChange} />
    );
  };

  getGiftCardList = cardList =>
    cardList && cardList.size > 0 && cardList.filter(card => card.ccType === 'GiftCard');

  getCreditCardList = cardList =>
    cardList &&
    cardList.size > 0 &&
    cardList.filter(card => card.ccType !== 'GiftCard' && card.ccType !== 'VENMO');

  render() {
    const { cardList, labels, handleComponentChange } = this.props;
    const creditCardList = this.getCreditCardList(cardList);
    const giftCardList = this.getGiftCardList(cardList);

    return (
      <PaymentTileContainer>
        <BodyCopy
          fontFamily="secondary"
          fontSize="fs16"
          text={labels.lbl_overview_addressBookHeading}
          color="black"
        />
        <UnderlineStyle />
        {creditCardList && creditCardList.size > 0
          ? creditCardList.map(card => this.getCreditCardView(card, false))
          : this.getCreditCardView(null, true)}
        <UnderlineStyle />

        {giftCardList && giftCardList.size > 0
          ? giftCardList.map(card => this.getGiftCardView(card, false))
          : this.getGiftCardView(null, true)}

        <ButtonWrapperStyle>
          <CustomButton
            text={labels.lbl_overview_addressBookCTA}
            buttonVariation="variable-width"
            fill="BLUE"
            color="white"
            onPress={() => handleComponentChange('addressBookMobile')}
          />
        </ButtonWrapperStyle>
      </PaymentTileContainer>
    );
  }
}

export const mapDispatchToProps = dispatch => {
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
)(AddressOverviewTile);
