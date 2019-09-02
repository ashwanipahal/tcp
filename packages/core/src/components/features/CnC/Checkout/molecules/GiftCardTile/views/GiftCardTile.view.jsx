/* eslint-disable max-lines */
import React from 'react';
import PropTypes from 'prop-types';
import withStyles from '@tcp/core/src/components/common/hoc/withStyles';
import styles from '../styles/GiftCardTile.style';
import { Row, Col, BodyCopy, Button } from '../../../../../../common/atoms';

class GiftCardTile extends React.PureComponent {
  static propTypes = {
    className: PropTypes.string,
    isGiftCardApplied: PropTypes.bool,
    cardData: PropTypes.shape({}),
    labels: PropTypes.shape({}),
    applyExistingGiftCardToOrder: PropTypes.func.isRequired,
    handleRemoveGiftCard: PropTypes.func.isRequired,
  };

  static defaultProps = {
    className: '',
    isGiftCardApplied: false,
    cardData: {},
    labels: {},
  };

  renderApplyRemoveBtn() {
    const {
      isGiftCardApplied,
      applyExistingGiftCardToOrder,
      cardData,
      handleRemoveGiftCard,
      labels,
    } = this.props;

    if (isGiftCardApplied) {
      return (
        <Button
          onClick={() => {
            handleRemoveGiftCard(cardData.get('id'));
          }}
          className="gift_remove_button"
          buttonVariation="variable-width"
          type="submit"
          data-locator="gift_apply_button"
          fullWidth="true"
          disabled={false}
        >
          {labels.remove}
        </Button>
      );
    }

    return (
      <Button
        onClick={() => {
          applyExistingGiftCardToOrder(cardData);
        }}
        className="gift_apply_button"
        buttonVariation="variable-width"
        type="submit"
        data-locator="gift_apply_button"
        fullWidth="true"
        disabled={false}
      >
        {labels.apply}
      </Button>
    );
  }

  render() {
    const { className, cardData, isGiftCardApplied, labels } = this.props;

    let cardEndingIn = cardData.accountNo !== undefined ? cardData.accountNo.substr(-4) : '';
    let remainingBalance = '';
    if (isGiftCardApplied) {
      cardEndingIn = cardData.get('endingNumbers');
      remainingBalance = ` | ${labels.remainingBalance} : ${cardData.get('remainingBalance')}`;
    }
    return (
      <div className={className}>
        <div className="gift_card_box elem-mb-XS elem-mt-MED">
          <Row>
            <Col
              colSize={{
                small: 3,
                medium: 5,
                large: 9,
              }}
            >
              <BodyCopy
                fontFamily="secondary"
                fontSize="fs16"
                color="text.secondary"
                className="gift_card_number_detail"
              >
                {`${labels.endingIn} ${cardEndingIn} ${remainingBalance}`}
              </BodyCopy>
            </Col>
            <Col
              colSize={{
                small: 3,
                medium: 3,
                large: 3,
              }}
            >
              {this.renderApplyRemoveBtn()}
            </Col>
          </Row>
        </div>
      </div>
    );
  }
}

export default withStyles(GiftCardTile, styles);
export { GiftCardTile as GiftCardTileVanilla };
