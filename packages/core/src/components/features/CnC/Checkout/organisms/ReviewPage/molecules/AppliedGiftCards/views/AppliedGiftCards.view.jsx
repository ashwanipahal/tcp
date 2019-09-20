import React from 'react';
import PropTypes from 'prop-types';
import withStyles from '@tcp/core/src/components/common/hoc/withStyles';
import { BodyCopy } from '@tcp/core/src/components/common/atoms';
import { getLabelValue } from '@tcp/core/src/utils';
import styles from '../styles/AppliedGiftCards.style';

const getGiftCard = giftCard => ({
  id: giftCard.get('id'),
  endingNumbers: giftCard.get('endingNumbers'),
  remainingBalance: giftCard.get('remainingBalance'),
});

const renderGiftCard = (labels, endingNumbers, remainingBalance) =>
  `${getLabelValue(
    labels,
    'lbl_review_appliedGiftCardEndingIn'
  )} ${endingNumbers} | ${getLabelValue(
    labels,
    'lbl_review_appliedGiftCardRemainingBal'
  )}: $${remainingBalance.toFixed(2)}`;

const renderGiftCardMessage = labels => (
  <BodyCopy component="p" className="headsup-container">
    <BodyCopy
      component="span"
      fontSize="fs16"
      color="gray[900]"
      fontFamily="secondary"
      fontWeight="extrabold"
    >
      {getLabelValue(labels, 'lbl_review_giftCardHeadsup')}
    </BodyCopy>
    <BodyCopy component="span" fontSize="fs16" color="gray[900]" fontFamily="secondary">
      {` ${getLabelValue(labels, 'lbl_review_giftCardMessage')}`}
    </BodyCopy>
  </BodyCopy>
);

const AppliedGiftCards = ({ className, appliedGiftCards, labels }) => {
  return (
    <BodyCopy component="div" className={`${className} applied-gift-cards`}>
      {appliedGiftCards && appliedGiftCards.size > 0
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
        : getLabelValue(labels, 'lbl_review_appliedGiftCardsNone')}
      {renderGiftCardMessage(labels)}
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
