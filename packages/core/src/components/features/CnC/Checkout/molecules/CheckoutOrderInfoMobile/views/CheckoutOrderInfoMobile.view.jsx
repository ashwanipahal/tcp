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
import PersonalizedCoupons from '../../../../Confirmation/organisms/PersonalizedCoupons';

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
      fullPageInfo,
    } = this.props;
    return (
      <div className={className}>
        {isConfirmationPage ? (
          <>
            <OrderLedgerContainer isConfirmationPage={isConfirmationPage} />
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
            <Row fullBleed>
              <Col colSize={{ small: 6, medium: 8, large: 12 }}>
                <PersonalizedCoupons />
              </Col>
            </Row>
          </>
        ) : (
          <>
            <CouponAndPromos
              showAccordian={showAccordian}
              additionalClassNameModal="coupon-modal-mob"
              idPrefix="mobile"
              fullPageInfo={fullPageInfo}
            />
            <OrderLedgerContainer showAccordian={showAccordian} />
            {!isGuest && (
              <BonusPointsDays
                showAccordian={showAccordian}
                enableApplyCta
                additionalClassNameModal="bonus-modal-mob"
              />
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
  fullPageInfo: PropTypes.bool,
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
  fullPageInfo: false,
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
