import React from 'react';
import PropTypes from 'prop-types';
import withStyles from '@tcp/core/src/components/common/hoc/withStyles';
import CouponCard from '@tcp/core/src/components/common/molecules/CouponCard';
import Row from '../../../../../../common/atoms/Row';
import Col from '../../../../../../common/atoms/Col';
import BodyCopy from '../../../../../../common/atoms/BodyCopy';
import Anchor from '../../../../../../common/atoms/Anchor';

import styles from '../styles/CouponListSection.style';

class CouponListSection extends React.PureComponent<Props> {
  render() {
    const { labels, couponList, className, heading, helpSubHeading } = this.props;
    return (
      <div className={className}>
        <div className="couponList__title">
          <BodyCopy
            className="couponList__heading"
            fontWeight="semibold"
            component="p"
            fontSize="fs16"
          >
            {`${heading} (${couponList.size})`}
          </BodyCopy>
          {helpSubHeading && (
            <div className="couponList__iconContainer">
              <div className="couponList__helpIcon">?</div>
              <Anchor
                fontSizeVariation="small"
                underline
                anchorVariation="primary"
                noLink
                to=""
                fontSize="fs10"
                data-locator="couponcard-help-applying"
              >
                {labels.HELP_APPLYING}
              </Anchor>
            </div>
          )}
        </div>
        <Row fullBleed>
          <Col
            colSize={{
              small: 6,
              medium: 3,
              large: 4,
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

CouponListSection.propTypes = {
  labels: PropTypes.shape({}).isRequired,
};

export default withStyles(CouponListSection, styles);
export { CouponListSection as LoginSectionVanilla };
