import React from 'react';
import PropTypes from 'prop-types';
import withStyles from '../../../../../../common/hoc/withStyles';
import OrderLedgerContainer from '../../../../common/organism/OrderLedger';
import AirmilesBanner from '../../../../common/organism/AirmilesBanner';
import CouponAndPromos from '../../../../common/organism/CouponAndPromos';
import BonusPointsDays from '../../../../../../common/organisms/BonusPointsDays';
import { BodyCopy, Row, Col } from '../../../../../../common/atoms';
import style from '../styles/CheckoutOrderInfoMobile.style';
import CardImage from '../../../../../../common/molecules/CardImage';
import { constants as VenmoConstants } from '../../../../../../common/atoms/VenmoPaymentButton/container/VenmoPaymentButton.util';

/** The hard coded values are just to show the template of confirmation page. these will be removed once the components are are in place */
class CheckoutOrderInfo extends React.PureComponent {
  render() {
    const {
      className,
      isGuest,
      showAccordian,
      isConfirmationPage,
      isVenmoPaymentInProgress,
      venmoPayment,
      labels,
    } = this.props;
    return (
      <div className={className}>
        {isConfirmationPage ? (
          <>
            <OrderLedgerContainer />
            {isVenmoPaymentInProgress && venmoPayment && (
              <section className="venmo-payment-method-wrapper">
                <BodyCopy
                  color="gray.900"
                  fontFamily="secondary"
                  fontSize="fs14"
                  textAlign="left"
                  className="venmo-paid-text"
                >
                  {labels.paidWithVenmo}
                </BodyCopy>
                <CardImage card={venmoPayment} cardNumber={venmoPayment.userName} />
              </section>
            )}
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
  isVenmoPaymentInProgress: PropTypes.bool,
  venmoPayment: PropTypes.shape({
    userName: PropTypes.string,
    ccBrand: PropTypes.string,
    ccType: PropTypes.string,
  }),
  labels: PropTypes.shape({
    paidWithVenmo: PropTypes.string,
  }),
};

CheckoutOrderInfo.defaultProps = {
  isConfirmationPage: false,
  isVenmoPaymentInProgress: false,
  venmoPayment: {
    userName: '',
    ccBrand: VenmoConstants.VENMO,
    ccType: VenmoConstants.VENMO,
  },
  labels: PropTypes.shape({
    paidWithVenmo: '',
  }),
};

export default withStyles(CheckoutOrderInfo, style);
export { CheckoutOrderInfo as CheckoutOrderInfoVanilla };
