import React from 'react';
import PropTypes from 'prop-types';
import withStyles from '@tcp/core/src/components/common/hoc/withStyles';
import BodyCopy from '../../../atoms/BodyCopy';
import styles from '../styles/CouponCard.style';
import Anchor from '../../../atoms/Anchor';
import Button from '../../../atoms/Button';

class CouponCard extends React.Component<Props> {
  ErrorHandle = () => {
    const { coupon } = this.props;
    if (coupon.error !== '') {
      return (
        <div className="couponCard__container_error">
          <BodyCopy component="p" fontSize="fs10" color="text.primary">
            {coupon.error}
          </BodyCopy>
        </div>
      );
    }
    return null;
  };

  RenderCardHeader = () => {
    const { coupon } = this.props;
    const headingClass =
      coupon.status === 'available' ? 'couponCard__header' : 'couponCard__header_two';
    return (
      <BodyCopy className={headingClass} component="p" fontSize="fs12">
        Heading
      </BodyCopy>
    );
  };

  RenderApplyButton = () => {
    const { labels } = this.props;
    return (
      <Button
        onClick={() => {}}
        className="coupon__button_black"
        buttonVariation="variable-width"
        type="submit"
        data-locator="gift-card-checkbalance-btn"
        fullWidth="true"
      >
        {labels.APPLY_BUTTON_TEXT}
      </Button>
    );
  };

  RenderRemoveButton = () => {
    const { labels } = this.props;
    return (
      <Button
        onClick={() => {}}
        className="coupon__button_white"
        buttonVariation="variable-width"
        type="submit"
        data-locator="gift-card-checkbalance-btn"
        fullWidth="true"
      >
        {labels.REMOVE_BUTTON_TEXT}
      </Button>
    );
  };

  handleDefaultLinkClick = event => {
    const { coupon, couponDetailClick } = this.props;
    couponDetailClick(coupon);
    event.preventDefault();
  };

  render() {
    const { labels, coupon, className } = this.props;
    return (
      <div className={className}>
        <div className="couponCard__container">
          {this.ErrorHandle()}
          <div className="couponCard__container_main">
            {this.RenderCardHeader()}
            <div className="couponCard__body">
              <div className="couponCard__row">
                <div className="couponCard__col">
                  <BodyCopy component="div" color="text.primary">
                    <BodyCopy
                      component="p"
                      fontSize="fs12"
                      fontWeight="black"
                      fontFamily="secondary"
                    >
                      {`${coupon.title}`}
                    </BodyCopy>
                    <BodyCopy component="p" fontSize="fs10" fontFamily="secondary">
                      {`Valid ${coupon.effectiveDate} - ${coupon.expirationDate}`}
                    </BodyCopy>
                  </BodyCopy>
                  <Anchor
                    data-locator="couponcard-makedefault"
                    fontSizeVariation="small"
                    underline
                    anchorVariation="primary"
                    fontSize="fs10"
                    to="/#"
                    onClick={this.handleDefaultLinkClick}
                  >
                    {labels.DETAILS_BUTTON_TEXT}
                  </Anchor>
                </div>
                <div className="couponCard__col">
                  {coupon.status === 'available' && this.RenderApplyButton()}
                  {coupon.status === 'applied' && this.RenderRemoveButton()}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

CouponCard.propTypes = {
  coupon: PropTypes.shape({}).isRequired,
};

export default withStyles(CouponCard, styles);
export { CouponCard as CouponCardVanilla };
