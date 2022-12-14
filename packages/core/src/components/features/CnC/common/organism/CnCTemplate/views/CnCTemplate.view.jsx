import React from 'react';
import PropTypes from 'prop-types';
import Constants from '@tcp/core/src/components/common/molecules/Recommendations/container/Recommendations.constants';
import Recommendations from '@tcp/web/src/components/common/molecules/Recommendations';
import PlaceCashBanner from '@tcp/core/src/components/features/CnC/PlaceCashBanner';
import withStyles from '../../../../../../common/hoc/withStyles';
import Row from '../../../../../../common/atoms/Row';
import Col from '../../../../../../common/atoms/Col';
import OrderLedgerContainer from '../../OrderLedger';
import AirmilesBanner from '../../AirmilesBanner';
import CouponAndPromos from '../../CouponAndPromos';
import BonusPointsDays from '../../../../../../common/organisms/BonusPointsDays';

/** The hard coded values are just to show the confirmation template. these will be removed once the components are are in place */
import styles from '../styles/CnCTemplate.style';
import PersonalizedCoupons from '../../../../Confirmation/organisms/PersonalizedCoupons';
import BAG_CONSTANTS from '../../../../BagPage/BagPage.constants';

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

const getRecommendationSection = isConfirmationPage => {
  return (
    isConfirmationPage && (
      <div className="recommendationsWrapper">
        <Recommendations
          page={Constants.RECOMMENDATIONS_PAGES_MAPPING.CHECKOUT}
          variations="moduleO"
        />
      </div>
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
  isConfirmationPage,
  orderLedgerAfterView,
  pageCategory,
}) => {
  const isSmallLeftSection = showLeftSection;
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
            {
              <>
                {isConfirmationPage ? (
                  <>
                    <OrderLedgerContainer
                      isConfirmationPage={isConfirmationPage}
                      pageCategory="confirmation"
                    />
                    <Row fullBleed>
                      <Col colSize={{ small: 6, medium: 8, large: 12 }}>
                        <PersonalizedCoupons />
                      </Col>
                    </Row>
                  </>
                ) : (
                  <>
                    <OrderLedgerContainer
                      orderLedgerAfterView={getBagActions({ BagActions }) || orderLedgerAfterView}
                      pageCategory={pageCategory}
                    />

                    {getBonusPointsDaysSection({ isGuest, showAccordian })}
                    {pageCategory === BAG_CONSTANTS.BAG_PAGE && <PlaceCashBanner />}
                    <AirmilesBanner />
                    <CouponAndPromos
                      fullPageInfo={!isCheckoutView || orderLedgerAfterView}
                      showAccordian={showAccordian}
                      additionalClassNameModal="coupon-modal-web"
                      idPrefix="desktop"
                    />
                  </>
                )}
              </>
            }
          </Col>
        )}
      </Row>
      {getRecommendationSection(isConfirmationPage)}
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
  isCheckoutView: PropTypes.bool,
  isConfirmationPage: PropTypes.bool,
  pageCategory: PropTypes.string,
};

CnCTemplate.defaultProps = {
  bagActions: false,
  header: false,
  showLeftSection: true,
  showAccordian: true,
  isCheckoutView: false,
  isConfirmationPage: false,
  pageCategory: '',
};

export default withStyles(CnCTemplate, styles);
export { CnCTemplate as CnCTemplateVanilla };
