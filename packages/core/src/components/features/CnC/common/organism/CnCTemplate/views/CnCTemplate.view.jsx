import React from 'react';
import PropTypes from 'prop-types';
import withStyles from '../../../../../../common/hoc/withStyles';
import Row from '../../../../../../common/atoms/Row';
import Col from '../../../../../../common/atoms/Col';
import OrderLedgerContainer from '../../OrderLedger';
import AirmilesBanner from '../../AirmilesBanner';
import CouponAndPromos from '../../CouponAndPromos';
import BonusPointsDays from '../../../../../../common/organisms/BonusPointsDays';

import styles from '../styles/CnCTemplate.style';

const CnCTemplate = ({
  leftSection: LeftSection,
  bagActions: BagActions,
  showLeftSection,
  className,
  header: Header,
  isGuest,
  showAccordian,
  isNonEmptySFL,
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
          className="left-sec"
        >
          <LeftSection />
        </Col>
        {showLeftSection && (
          <Col colSize={{ small: 6, medium: 3, large: 4 }} className="right-sec">
            <OrderLedgerContainer />
            {BagActions && <BagActions />}
            {!isGuest && (
              <div
                className={`${
                  showAccordian ? 'bonusPointsDaysWrapperAccordian' : 'bonusPointsDaysWrapper'
                } elem-mb-MED`}
              >
                <BonusPointsDays showAccordian={showAccordian} enableApplyCta />
              </div>
            )}
            <AirmilesBanner />
            <CouponAndPromos showAccordian={showAccordian} />
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
  leftSection: PropTypes.node.isRequired,
  showLeftSection: PropTypes.bool,
  isGuest: PropTypes.bool.isRequired,
  showAccordian: PropTypes.bool,
  isNonEmptySFL: PropTypes.bool,
};

CnCTemplate.defaultProps = {
  bagActions: false,
  header: false,
  showLeftSection: true,
  showAccordian: true,
  isNonEmptySFL: true,
};

export default withStyles(CnCTemplate, styles);
export { CnCTemplate as CnCTemplateVanilla };
