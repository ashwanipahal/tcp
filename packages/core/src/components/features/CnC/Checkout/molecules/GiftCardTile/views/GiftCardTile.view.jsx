/* eslint-disable max-lines */
import React from 'react';
import PropTypes from 'prop-types';
import { getLabelValue } from '@tcp/core/src/utils';
import withStyles from '@tcp/core/src/components/common/hoc/withStyles';
import styles from '../styles/GiftCardTile.style';
import { Row, Col, BodyCopy, Button } from '../../../../../../common/atoms';
import ErrorMessage from '../../../../common/molecules/ErrorMessage';

class GiftCardTile extends React.PureComponent {
  static propTypes = {
    className: PropTypes.string,
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
    className: '',
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
    return !isFromReview || (isFromReview && isExpressCheckout);
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
        <Button
          onClick={() => {
            handleRemoveGiftCard(cardData.get('id'));
          }}
          className="gift_remove_button gift-action-btn"
          buttonVariation="variable-width"
          type="submit"
          data-locator="gift_apply_button"
          fullWidth="true"
          disabled={false}
        >
          {getLabelValue(labels, 'lbl_giftcard_removeBtn')}
        </Button>
      );
    }

    return (
      <Button
        onClick={() => {
          applyExistingGiftCardToOrder(cardData);
        }}
        className="gift_apply_button gift-action-btn"
        buttonVariation="variable-width"
        type="submit"
        data-locator="gift_apply_button"
        fullWidth="true"
        disabled={!orderBalanceTotal}
      >
        {getLabelValue(labels, 'lbl_giftcard_applyBtn')}
      </Button>
    );
  }

  renderGiftCardError() {
    const { giftCardErrors, cardData } = this.props;
    if (giftCardErrors && giftCardErrors[cardData.creditCardId]) {
      return (
        <Row>
          <Col
            colSize={{
              small: 3,
              medium: 5,
              large: 9,
            }}
          >
            <ErrorMessage className="error_box" error={giftCardErrors[cardData.creditCardId]} />
          </Col>
        </Row>
      );
    }
    return null;
  }

  render() {
    const {
      className,
      cardData,
      isGiftCardApplied,
      labels,
      isFromReview,
      isExpressCheckout,
    } = this.props;

    let cardEndingIn = cardData.accountNo !== undefined ? cardData.accountNo.substr(-4) : '';
    let remainingBalance = '';
    if (isGiftCardApplied && cardData && cardData.size > 0) {
      const remainingBalanceValue = cardData.get('remainingBalance');
      cardEndingIn = `${cardData.get('endingNumbers')} | `;
      remainingBalance = `${getLabelValue(labels, 'lbl_giftcard_remainingBal')}: $${
        typeof remainingBalanceValue !== 'undefined' ? remainingBalanceValue.toFixed(2) : 0
      }`;
    }
    const showCtas = this.showRemoveCtas();
    return (
      <div className={className}>
        <div className="gift_card_box elem-mt-SM">
          {this.renderGiftCardError()}

          <Row className="gift-card-row">
            <Col
              colSize={{
                small: 4,
                medium: 4,
                large: isFromReview && isExpressCheckout ? 6 : 8,
              }}
              className="gift-tile-msg-container"
            >
              <BodyCopy
                fontFamily="secondary"
                fontSize="fs16"
                color="text.secondary"
                className={`gift_card_number_detail ${
                  !isGiftCardApplied ? 'available_giftCards_text' : ''
                }`}
              >
                {`${getLabelValue(labels, 'lbl_giftcard_endingIn')} ${cardEndingIn}`}
                <span className="remainingBalanceText">{remainingBalance}</span>
              </BodyCopy>
            </Col>
            {showCtas && (
              <Col
                colSize={{
                  small: 2,
                  medium: 4,
                  large: 4,
                }}
                className="gift-action-container"
              >
                {this.renderApplyRemoveBtn()}
              </Col>
            )}
          </Row>
        </div>
      </div>
    );
  }
}

export default withStyles(GiftCardTile, styles);
export { GiftCardTile as GiftCardTileVanilla };
