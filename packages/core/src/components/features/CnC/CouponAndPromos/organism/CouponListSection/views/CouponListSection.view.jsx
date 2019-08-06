import React from 'react';
import PropTypes from 'prop-types';
import withStyles from '@tcp/core/src/components/common/hoc/withStyles';
import CouponCard from '@tcp/core/src/components/common/molecules/CouponCard';
import Row from '../../../../../../common/atoms/Row';
import Col from '../../../../../../common/atoms/Col';
import BodyCopy from '../../../../../../common/atoms/BodyCopy';
import Anchor from '../../../../../../common/atoms/Anchor';

import styles from '../styles/CouponListSection.style';

class CouponListSection extends React.Component<Props> {
  constructor(props) {
    super(props);
    this.state = {
      showMore: false,
    };
  }

  toggleShow = event => {
    this.setState(prevState => ({
      showMore: !prevState.showMore,
    }));
    event.preventDefault();
  };

  render() {
    const {
      labels,
      couponList,
      className,
      heading,
      helpSubHeading,
      couponDetailClick,
    } = this.props;
    const { showMore } = this.state;
    const buttonText =
      showMore === true ? labels.LESS_MORE_BUTTON_TEXT : labels.SHOW_MORE_BUTTON_TEXT;
    const couponListFilter = showMore === true ? couponList : couponList.slice(0, 5);
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
              small: 12,
              medium: 12,
              large: 12,
            }}
          >
            {couponListFilter.map(coupon => {
              return (
                <CouponCard
                  key={coupon.id}
                  labels={labels}
                  coupon={coupon}
                  couponDetailClick={couponDetailClick}
                />
              );
            })}
          </Col>
        </Row>
        <div>
          {couponList.size > 5 && (
            <Anchor
              fontSizeVariation="small"
              underline
              anchorVariation="primary"
              fontSize="fs10"
              data-locator="couponcard-help-applying"
              to="/#"
              onClick={this.toggleShow}
            >
              {buttonText}
            </Anchor>
          )}
        </div>
      </div>
    );
  }
}

CouponListSection.propTypes = {
  labels: PropTypes.shape({}).isRequired,
};

export default withStyles(CouponListSection, styles);
export { CouponListSection as LoginSectionVanilla };
