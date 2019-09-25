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
    const { className, isGuest, showAccordian } = this.props;
    return (
      <div className={className}>
        <CouponAndPromos
          showAccordian={showAccordian}
          additionalClassNameModal="coupon-modal-mob"
        />
        <OrderLedgerContainer />
        {!isGuest && (
          <div
            className={`${
              showAccordian ? 'bonusPointsDaysWrapperAccordian' : 'bonusPointsDaysWrapper'
            } elem-mb-MED`}
          >
            <BonusPointsDays
              showAccordian={showAccordian}
              enableApplyCta
              additionalClassNameModal="bonus-modal-mob"
            />
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
  showAccordian: PropTypes.bool.isRequired,
};

export default withStyles(CheckoutOrderInfo, style);
export { CheckoutOrderInfo as CheckoutOrderInfoVanilla };
