import React from 'react';
import PropTypes from 'prop-types';
import withStyles from '../../../../../../common/hoc/withStyles';
import OrderLedgerContainer from '../../../../common/organism/OrderLedger';
import AirmilesBanner from '../../../../common/organism/AirmilesBanner';
import CouponAndPromos from '../../../../common/organism/CouponAndPromos';
import BonusPointsDays from '../../../../../../common/organisms/BonusPointsDays';

import style from '../styles/CheckoutOrderInfoMobile.style';

class CheckoutOrderInfo extends React.PureComponent {
  render() {
    const { className, isGuest } = this.props;
    return (
      <div className={className}>
        <CouponAndPromos />
        <OrderLedgerContainer />
        {!isGuest && (
          <div className="bonusPointsDaysWrapper">
            <BonusPointsDays showAccordian={false} enableApplyCta />
          </div>
        )}
        <AirmilesBanner />
      </div>
    );
  }
}

CheckoutOrderInfo.propTypes = {
  className: PropTypes.string.isRequired,
  isGuest: PropTypes.bool.isRequired,
};

export default withStyles(CheckoutOrderInfo, style);
export { CheckoutOrderInfo as CheckoutOrderInfoVanilla };
