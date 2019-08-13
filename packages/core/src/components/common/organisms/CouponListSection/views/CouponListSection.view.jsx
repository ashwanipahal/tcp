import React from 'react';
import PropTypes from 'prop-types';
import withStyles from '../../../hoc/withStyles';
import CouponCard from '../../../molecules/CouponCard';
import Row from '../../../atoms/Row';
import Col from '../../../atoms/Col';
import BodyCopy from '../../../atoms/BodyCopy';
import Anchor from '../../../atoms/Anchor';

import styles from '../styles/CouponListSection.style';

class CouponListSection extends React.Component<Props> {
  constructor(props) {
    super(props);
    this.state = {
      showMore: false,
    };
  }

  toggleShow = event => {
    event.preventDefault();
    this.setState(prevState => ({
      showMore: !prevState.showMore,
    }));
  };

  helpAnchorClick = event => {
    event.preventDefault();
    const { helpAnchorClick } = this.props;
    helpAnchorClick();
  };

  render() {
    const {
      labels,
      isFetching,
      couponList,
      className,
      heading,
      helpSubHeading,
      couponDetailClick,
      onApply,
      onRemove,
      dataLocator,
      handleErrorCoupon,
    } = this.props;
    const { showMore } = this.state;
    const buttonText =
      showMore === true ? labels.LESS_MORE_BUTTON_TEXT : labels.SHOW_MORE_BUTTON_TEXT;
    const couponListFilter = showMore === true ? couponList : couponList.slice(0, 5);
    return (
      <div className={className}>
        <div className="couponList__title">
          {couponList.size > 0 && (
            <BodyCopy
              className="couponList__heading"
              fontWeight="semibold"
              component="p"
              fontSize="fs16"
              data-locator={dataLocator}
            >
              {`${heading} (${couponList.size})`}
            </BodyCopy>
          )}
          {helpSubHeading && couponList.size > 0 && (
            <div className="couponList__iconContainer">
              <div className="couponList__helpIcon">?</div>
              <Anchor
                fontSizeVariation="small"
                underline
                anchorVariation="primary"
                fontSize="fs10"
                data-locator="couponcard-helpApplyingPlaceCashlink"
                onClick={this.helpAnchorClick}
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
                  isFetching={isFetching}
                  coupon={coupon}
                  couponDetailClick={couponDetailClick}
                  onApply={onApply}
                  onRemove={onRemove}
                  handleErrorCoupon={handleErrorCoupon}
                />
              );
            })}
          </Col>
        </Row>
        <div>
          {couponList.size >= 5 && (
            <Anchor
              fontSizeVariation="small"
              underline
              anchorVariation="primary"
              fontSize="fs10"
              data-locator={showMore === true ? 'cartShowMoreButton' : 'cartShowLessButton'}
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
export { CouponListSection as CouponListSectionVanilla };
