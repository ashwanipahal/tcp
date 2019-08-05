import React from 'react';
import PropTypes from 'prop-types';
import withStyles from '@tcp/core/src/components/common/hoc/withStyles';
import CouponCard from '@tcp/core/src/components/common/molecules/CouponCard';
import Row from '../../../../../../common/atoms/Row';
import Col from '../../../../../../common/atoms/Col';
import Heading from '../../../../../../common/atoms/Heading';
import styles from '../styles/AvailableCouponSection';

class AvailableCouponSection extends React.PureComponent<Props> {
  render() {
    const { labels, couponList, className } = this.props;
    return (
      <div className={className}>
        <Heading variant="h6" className="couponList__heading" dataLocator="coupon-card-label">
          {labels.AVAILABLE_REWARDS_HEADING}
        </Heading>
        <Row>
          <Col
            colSize={{
              small: 12,
              medium: 12,
              large: 12,
            }}
          >
            {couponList.map(coupon => {
              return <CouponCard key={coupon.id} coupon={coupon} />;
            })}
          </Col>
        </Row>
      </div>
    );
  }
}

AvailableCouponSection.propTypes = {
  labels: PropTypes.shape({}).isRequired,
};

export default withStyles(AvailableCouponSection, styles);
export { AvailableCouponSection as LoginSectionVanilla };
