import React from 'react';
import PropTypes from 'prop-types';
import withStyles from '../../../../../../common/hoc/withStyles';
import Row from '../../../../../../common/atoms/Row';
import Col from '../../../../../../common/atoms/Col';
import OrderLedgerContainer from '../../OrderLedger';
import AirmilesBanner from '../../AirmilesBanner';
import CouponAndPromos from '../../CouponAndPromos';
import BonusPointsDays from '../../../../../../common/organisms/BonusPointsDays';
import LoyaltyBanner from '../../../../LoyaltyBanner';

/** The hard coded values are just to show the confirmation template. these will be removed once the components are are in place */
import styles from '../styles/CnCTemplate.style';
import PersonalizedCoupons from '../../../../Confirmation/organisms/PersonalizedCoupons';

const getBagActions = ({ BagActions }) => {
  return BagActions && <BagActions />;
};

const getBonusPointsDaysSection = ({ isGuest, showAccordian }) => {
  return (
    !isGuest && (
      <BonusPointsDays
        showAccordian={showAccordian}
        enableApplyCta
        additionalClassNameModal="bonus-modal-web"
      />
    )
  );
};

const CnCTemplate = ({
  leftSection: LeftSection,
  bagActions: BagActions,
  showLeftSection,
  className,
  header: Header,
  isGuest,
  isCheckoutView,
  showAccordian,
  isNonEmptySFL,
  isConfirmationPage,
  isNotLoaded,
  orderLedgerAfterView,
}) => {
  const isSmallLeftSection = isNonEmptySFL || showLeftSection;
  return (
    <section className={className}>
      {Header && <Header />}
      <Row>
        <Col
          colSize={{
            small: 6,
            medium: isSmallLeftSection ? 5 : 8,
            large: isSmallLeftSection ? 8 : 12,
          }}
          className="left-sec "
        >
          <LeftSection />
        </Col>
        {showLeftSection && (
          <Col
            colSize={{ small: 6, medium: 3, large: 4 }}
            className={`right-sec ${isCheckoutView ? 'hide-mobile' : ''}`}
          >
            {!!isNotLoaded && (
              <>
                {isConfirmationPage ? (
                  <>
                    <OrderLedgerContainer isConfirmationPage={isConfirmationPage} />
                    <Row fullBleed>
                      <Col colSize={{ small: 6, medium: 8, large: 12 }}>
                        <PersonalizedCoupons />
                      </Col>
                    </Row>
                  </>
                ) : (
                  <>
                    <OrderLedgerContainer orderLedgerAfterView={orderLedgerAfterView} />
                    {getBagActions({ BagActions })}
                    <LoyaltyBanner />
                    {getBonusPointsDaysSection({ isGuest, showAccordian })}
                    <AirmilesBanner />
                    <CouponAndPromos
                      fullPageInfo={!isConfirmationPage || orderLedgerAfterView}
                      showAccordian={showAccordian}
                      additionalClassNameModal="coupon-modal-web"
                    />
                  </>
                )}
              </>
            )}
          </Col>
        )}
      </Row>
    </section>
  );
};

CnCTemplate.propTypes = {
  className: PropTypes.string.isRequired,
  labels: PropTypes.shape({}).isRequired,
  bagActions: PropTypes.oneOfType([PropTypes.bool, PropTypes.node]),
  header: PropTypes.oneOfType([PropTypes.bool, PropTypes.node]),
  orderLedgerAfterView: PropTypes.shape({}).isRequired,
  leftSection: PropTypes.node.isRequired,
  showLeftSection: PropTypes.bool,
  isGuest: PropTypes.bool.isRequired,
  showAccordian: PropTypes.bool,
  isNonEmptySFL: PropTypes.bool,
  isCheckoutView: PropTypes.bool,
  isConfirmationPage: PropTypes.bool,
  isNotLoaded: PropTypes.bool,
};

CnCTemplate.defaultProps = {
  bagActions: false,
  header: false,
  showLeftSection: true,
  showAccordian: true,
  isNonEmptySFL: true,
  isCheckoutView: false,
  isConfirmationPage: false,
  isNotLoaded: true,
};

export default withStyles(CnCTemplate, styles);
export { CnCTemplate as CnCTemplateVanilla };
