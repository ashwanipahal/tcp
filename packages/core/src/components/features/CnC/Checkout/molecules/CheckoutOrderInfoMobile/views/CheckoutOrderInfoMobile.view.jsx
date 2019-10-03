import React from 'react';
import PropTypes from 'prop-types';
import withStyles from '../../../../../../common/hoc/withStyles';
import OrderLedgerContainer from '../../../../common/organism/OrderLedger';
import AirmilesBanner from '../../../../common/organism/AirmilesBanner';
import CouponAndPromos from '../../../../common/organism/CouponAndPromos';
import BonusPointsDays from '../../../../../../common/organisms/BonusPointsDays';
import Row from '../../../../../../common/atoms/Row';
import Col from '../../../../../../common/atoms/Col';
import style from '../styles/CheckoutOrderInfoMobile.style';

/** The hard coded values are just to show the template of confirmation page. these will be removed once the components are are in place */
class CheckoutOrderInfo extends React.PureComponent {
  render() {
    const { className, isGuest, showAccordian, isConfirmationPage } = this.props;
    return (
      <div className={className}>
        {isConfirmationPage ? (
          <>
            <OrderLedgerContainer isConfirmationPage={isConfirmationPage} />
            <Row fullBleed className="placeholder ">
              <Col colSize={{ small: 6, medium: 8, large: 12 }}>
                <div>LOYALTY BANNER</div>
              </Col>
            </Row>
            <Row fullBleed className="placeholder">
              <Col colSize={{ small: 6, medium: 8, large: 12 }}>
                <div>COUPONS</div>
              </Col>
            </Row>
            <Row fullBleed className="placeholder ">
              <Col colSize={{ small: 6, medium: 8, large: 12 }}>
                <div>COUPONS</div>
              </Col>
            </Row>
          </>
        ) : (
          <>
            <CouponAndPromos
              showAccordian={showAccordian}
              additionalClassNameModal="coupon-modal-mob"
            />
            <OrderLedgerContainer showAccordian={showAccordian} />
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
          </>
        )}
      </div>
    );
  }
}

CheckoutOrderInfo.propTypes = {
  className: PropTypes.string.isRequired,
  isGuest: PropTypes.bool.isRequired,
  showAccordian: PropTypes.bool.isRequired,
  isConfirmationPage: PropTypes.bool,
};

CheckoutOrderInfo.defaultProps = {
  isConfirmationPage: false,
};

export default withStyles(CheckoutOrderInfo, style);
export { CheckoutOrderInfo as CheckoutOrderInfoVanilla };
