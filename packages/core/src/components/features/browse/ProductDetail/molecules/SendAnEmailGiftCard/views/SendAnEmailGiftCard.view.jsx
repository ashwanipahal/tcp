import React from 'react';
import PropTypes from 'prop-types';
import withStyles from '../../../../../../common/hoc/withStyles';
import { BodyCopy, Anchor } from '../../../../../../common/atoms';
import styles from '../styles/SendAnEmailGiftCard.style';

const SendAnEmailGiftCard = props => {
  const { className, pdpLabels } = props;
  return (
    <div className={className}>
      <div className="send-email-card-wrapper">
        <BodyCopy fontSize="fs15" fontFamily="secondary">
          {pdpLabels.preferSendingViaEmail}
        </BodyCopy>
        <Anchor underline url={pdpLabels.eGiftCardLink} target="_blank">
          <BodyCopy fontSize="fs15" fontFamily="secondary">
            {pdpLabels.sendAnEmailCard}
          </BodyCopy>
        </Anchor>
      </div>
      <div className="promo-label">
        <BodyCopy fontSize="fs15" fontFamily="secondary">
          {pdpLabels.freeShippingEveryDay}
        </BodyCopy>
      </div>
    </div>
  );
};

SendAnEmailGiftCard.defaultProps = {
  className: '',
  pdpLabels: {},
};

SendAnEmailGiftCard.propTypes = {
  className: PropTypes.string,
  pdpLabels: PropTypes.shape({}),
};

export default withStyles(SendAnEmailGiftCard, styles);
