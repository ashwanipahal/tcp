import React from 'react';
import PropTypes from 'prop-types';
import { BodyCopy } from '@tcp/core/src/components/common/atoms';
import { Container, GiftCardItem, GiftCardMessage } from '../styles/AppliedGiftCards.style.native';

/**
 * @function getGiftCard
 * @param {Map} giftCard
 * @description Converts gift card from immutable to normal object.
 */
const getGiftCard = giftCard => ({
  id: giftCard.get('id'),
  endingNumbers: giftCard.get('endingNumbers'),
  remainingBalance: giftCard.get('remainingBalance'),
});

/**
 * @function renderGiftCard
 * @param {Object} labels
 * @param {String} endingNumbers
 * @param {Number} remainingBalance
 * @description This method renders the applied gift card row.
 * @returns {String}
 */
const renderGiftCard = (labels, endingNumbers, remainingBalance) =>
  `${labels.lbl_review_appliedGiftCardEndingIn} ${endingNumbers} | ${
    labels.lbl_review_appliedGiftCardRemainingBal
  }: $${remainingBalance.toFixed(2)}`;

/**
 * @function renderGiftCardMessage
 * @param {Object} labels
 * @description This method renders Gift card heads up message
 * @returns {JSX}
 */
const renderGiftCardMessage = labels => (
  <GiftCardMessage>
    <BodyCopy
      fontSize="fs16"
      color="gray.900"
      mobileFontFamily="secondary"
      fontWeight="extrabold"
      text={labels.lbl_review_giftCardHeadsup}
    />
    <BodyCopy
      fontSize="fs16"
      color="gray.900"
      mobileFontFamily="secondary"
      text={` ${labels.lbl_review_giftCardMessage}`}
    />
  </GiftCardMessage>
);

/**
 * @function AppliedGiftCards
 * @param {Object} props
 * @description Applied Gift cards Functional component
 * @returns {JSX}
 */
export const AppliedGiftCards = ({ appliedGiftCards, labels }) => {
  const isGiftCardAdded = appliedGiftCards && appliedGiftCards.size > 0;
  return (
    <Container>
      {isGiftCardAdded ? (
        appliedGiftCards.map(giftCard => {
          const { id, endingNumbers, remainingBalance } = getGiftCard(giftCard);
          return (
            <GiftCardItem>
              <BodyCopy
                fontSize="fs16"
                mobileFontFamily="secondary"
                color="gray.700"
                key={id}
                text={renderGiftCard(labels, endingNumbers, remainingBalance)}
              />
            </GiftCardItem>
          );
        })
      ) : (
        <BodyCopy
          fontSize="fs16"
          mobileFontFamily="secondary"
          color="gray.900"
          text={labels.lbl_review_appliedGiftCardsNone}
        />
      )}
      {isGiftCardAdded && renderGiftCardMessage(labels)}
    </Container>
  );
};

AppliedGiftCards.propTypes = {
  appliedGiftCards: PropTypes.shape({}).isRequired,
  labels: PropTypes.shape({
    lbl_review_appliedGiftCardEndingIn: PropTypes.string,
    lbl_review_appliedGiftCardRemainingBal: PropTypes.string,
    lbl_review_appliedGiftCardsNone: PropTypes.string,
    lbl_review_giftCardHeadsup: PropTypes.string,
    lbl_review_giftCardMessage: PropTypes.string,
  }),
};

AppliedGiftCards.defaultProps = {
  labels: {
    lbl_review_appliedGiftCardEndingIn: '',
    lbl_review_appliedGiftCardRemainingBal: '',
    lbl_review_appliedGiftCardsNone: '',
    lbl_review_giftCardHeadsup: '',
    lbl_review_giftCardMessage: '',
  },
};

export default AppliedGiftCards;
