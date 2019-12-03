import React from 'react';
import PropTypes from 'prop-types';
import { getLabelValue } from '@tcp/core/src/utils';
import CustomButton from '../../../../../../common/atoms/Button';

import {
  GiftBox,
  GiftCardRow,
  GiftCardCal,
  GiftBoxText,
} from '../styles/GiftCardTile.style.native';
import { BodyCopyWithSpacing } from '../../../../../../common/atoms/styledWrapper';

export default class GiftCardTile extends React.PureComponent {
  static propTypes = {
    isGiftCardApplied: PropTypes.bool,
    cardData: PropTypes.shape({}),
    labels: PropTypes.shape({}),
    applyExistingGiftCardToOrder: PropTypes.func.isRequired,
    handleRemoveGiftCard: PropTypes.func.isRequired,
    giftCardErrors: PropTypes.shape({}),
    orderBalanceTotal: PropTypes.number,
    isFromReview: PropTypes.bool,
    isExpressCheckout: PropTypes.bool,
  };

  static defaultProps = {
    isGiftCardApplied: false,
    cardData: {},
    labels: {},
    giftCardErrors: {},
    orderBalanceTotal: 0,
    isFromReview: false,
    isExpressCheckout: false,
  };

  showRemoveCtas = () => {
    const { isFromReview, isExpressCheckout } = this.props;
    return !isFromReview || isExpressCheckout;
  };

  renderApplyRemoveBtn() {
    const {
      isGiftCardApplied,
      applyExistingGiftCardToOrder,
      cardData,
      handleRemoveGiftCard,
      labels,
      orderBalanceTotal,
    } = this.props;

    if (isGiftCardApplied) {
      return (
        <CustomButton
          type="submit"
          data-locator=""
          text={getLabelValue(labels, 'lbl_giftcard_removeBtn')}
          onPress={() => {
            handleRemoveGiftCard(cardData.get('id'));
          }}
        />
      );
    }

    return (
      <CustomButton
        fill="DARK"
        type="submit"
        data-locator=""
        text={getLabelValue(labels, 'lbl_giftcard_applyBtn')}
        disableButton={!orderBalanceTotal}
        onPress={() => {
          applyExistingGiftCardToOrder(cardData);
        }}
      />
    );
  }

  render() {
    const { cardData, isGiftCardApplied, labels } = this.props;

    let cardEndingIn =
      typeof cardData.accountNo !== 'undefined' ? cardData.accountNo.substr(-4) : '';
    let remainingBalance = '';
    if (isGiftCardApplied) {
      cardEndingIn = cardData.get('endingNumbers');
      remainingBalance = ` | ${getLabelValue(labels, 'lbl_giftcard_remainingBal')}: $${cardData
        .get('remainingBalance')
        .toFixed(2)}`;
    }
    const showCtas = this.showRemoveCtas();
    return (
      <>
        <GiftBox>
          <GiftCardRow>
            <GiftCardCal flex={2}>
              <GiftBoxText>
                <BodyCopyWithSpacing
                  text={`${getLabelValue(
                    labels,
                    'lbl_giftcard_endingIn'
                  )} ${cardEndingIn} ${remainingBalance}`}
                  fontSize="fs16"
                  fontWeight="regular"
                  fontFamily="secondary"
                  spacingStyles="margin-bottom-MED"
                />
              </GiftBoxText>
            </GiftCardCal>
            {showCtas && <GiftCardCal flex={1}>{this.renderApplyRemoveBtn()}</GiftCardCal>}
          </GiftCardRow>
        </GiftBox>
      </>
    );
  }
}
