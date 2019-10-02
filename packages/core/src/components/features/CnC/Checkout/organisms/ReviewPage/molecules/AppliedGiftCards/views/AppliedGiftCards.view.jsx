import React from 'react';
import PropTypes from 'prop-types';
import withStyles from '@tcp/core/src/components/common/hoc/withStyles';
import { BodyCopy } from '@tcp/core/src/components/common/atoms';
import styles from '../styles/AppliedGiftCards.style';

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
  <BodyCopy component="p" className="headsup-container">
    <BodyCopy
      component="span"
      fontSize="fs16"
      color="gray[900]"
      fontFamily="secondary"
      fontWeight="extrabold"
    >
      {labels.lbl_review_giftCardHeadsup}
    </BodyCopy>
    <BodyCopy component="span" fontSize="fs16" color="gray[900]" fontFamily="secondary">
      {` ${labels.lbl_review_giftCardMessage}`}
    </BodyCopy>
  </BodyCopy>
);

/**
 * @function AppliedGiftCards
 * @param {Object} props
 * @description Applied Gift cards Functional component
 * @returns {JSX}
 */
export const AppliedGiftCards = ({ className, appliedGiftCards, labels }) => {
  const isGiftCardAdded = appliedGiftCards && appliedGiftCards.size > 0;
  return (
    <BodyCopy component="div" className={`${className} applied-gift-cards`}>
      {isGiftCardAdded
        ? appliedGiftCards.map(giftCard => {
            const { id, endingNumbers, remainingBalance } = getGiftCard(giftCard);
            return (
              <BodyCopy
                component="div"
                fontSize="fs16"
                fontFamily="secondary"
                color="gray[700]"
                className="applied-gift-card"
                key={id}
              >
                {renderGiftCard(labels, endingNumbers, remainingBalance)}
              </BodyCopy>
            );
          })
        : labels.lbl_review_appliedGiftCardsNone}
      {isGiftCardAdded && renderGiftCardMessage(labels)}
    </BodyCopy>
  );
};

AppliedGiftCards.propTypes = {
  appliedGiftCards: PropTypes.shape({}).isRequired,
  className: PropTypes.string.isRequired,
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

export default withStyles(AppliedGiftCards, styles);
