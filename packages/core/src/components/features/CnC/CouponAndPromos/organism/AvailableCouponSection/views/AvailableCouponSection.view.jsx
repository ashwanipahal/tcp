import React from 'react';
import PropTypes from 'prop-types';
import withStyles from '@tcp/core/src/components/common/hoc/withStyles';
import Row from '../../../../../../common/atoms/Row';
import Col from '../../../../../../common/atoms/Col';
import styles from '../styles/AvailableCouponSection';

class AvailableCouponSection extends React.PureComponent<Props> {
  coupon = ({ card }) => {
    const { couponDetail } = card;
    return (
      couponDetail && (
        <div>
          <p>{`${couponDetail.id} ${couponDetail.title}`}</p>
        </div>
      )
    );
  };

  render() {
    const { labels, couponList } = this.props;
    return (
      <Row>
        <Col
          colSize={{
            small: 6,
            medium: 8,
            large: 12,
          }}
        >
          {couponList.size > 0 && <div>Data</div>}
          {couponList.map((coupon, index) => {
            return (
              <div>
                {index}
                {coupon && <p>{`${coupon.title}`}</p>}
              </div>
            );
          })}

          {labels.ACC_LBL_LOGIN_EMAIL}
        </Col>
      </Row>
    );
  }
}

AvailableCouponSection.propTypes = {
  labels: PropTypes.shape({}).isRequired,
};

export default withStyles(AvailableCouponSection, styles);
export { AvailableCouponSection as LoginSectionVanilla };
