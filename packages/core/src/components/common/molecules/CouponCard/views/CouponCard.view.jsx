import React from 'react';
import PropTypes from 'prop-types';
import withStyles from '../../../hoc/withStyles';
import BodyCopy from '../../../atoms/BodyCopy';
import styles from '../styles/CouponCard.style';
import Anchor from '../../../atoms/Anchor';
import Button from '../../../atoms/Button';
import { COUPON_REDEMPTION_TYPE } from '../../../../../services/abstractors/CnC/CartItemTile';

class CouponCard extends React.Component<Props> {
  ErrorHandle = () => {
    const { coupon } = this.props;
    if (coupon.error !== '') {
      return (
        <div className="couponCard__container_error">
          <BodyCopy component="p" fontSize="fs10" className="couponCard__container_error_text">
            {coupon.error}
          </BodyCopy>
        </div>
      );
    }
    return null;
  };

  isExpiring = () => {
    const { coupon } = this.props;
    const currentDate = new Date();
    const couponExpireUpdatedDate = new Date();
    const expireDate = new Date(coupon.expirationDateTimeStamp);
    const numberOfDaysToAdd = 7;
    couponExpireUpdatedDate.setDate(couponExpireUpdatedDate.getDate() + numberOfDaysToAdd);
    let couponExpiring = false;
    if (currentDate > expireDate) {
      couponExpiring = false;
    } else if (couponExpireUpdatedDate >= expireDate) {
      couponExpiring = true;
    }
    return couponExpiring;
  };

  RenderCardHeader = (type, headingClass) => {
    const { labels } = this.props;
    return (
      <div className="couponCard__header">
        <div className={headingClass}>
          <BodyCopy className="couponCard__header_text" component="p" fontSize="fs12">
            {type}
          </BodyCopy>
        </div>

        {this.isExpiring() && (
          <BodyCopy className="couponCard__header_expired" component="p" fontSize="fs12">
            {labels.EXPIRING_SOON}
          </BodyCopy>
        )}
      </div>
    );
  };

  RenderApplyButton = () => {
    const { coupon, onApply } = this.props;
    return (
      <Button
        onClick={() => {
          onApply(coupon);
        }}
        className="coupon__button_black"
        buttonVariation="variable-width"
        type="submit"
        data-locator="gift-card-checkbalance-btn"
        fullWidth="true"
      >
        {coupon.labelStatus}
      </Button>
    );
  };

  RenderRemoveButton = () => {
    const { coupon, onRemove } = this.props;
    return (
      <Button
        onClick={() => {
          onRemove(coupon);
        }}
        className="coupon__button_white"
        buttonVariation="variable-width"
        type="submit"
        data-locator="gift-card-checkbalance-btn"
        fullWidth="true"
      >
        {coupon.labelStatus}
      </Button>
    );
  };

  RenderValidText = coupon => {
    return (
      <BodyCopy component="p" fontSize="fs10" fontFamily="secondary">
        {`Valid ${coupon.effectiveDate} - ${coupon.expirationDate}`}
      </BodyCopy>
    );
  };

  RenderUseByText = coupon => {
    return (
      <BodyCopy component="p" fontSize="fs10" fontFamily="secondary">
        {`Use by ${coupon.expirationDate}`}
      </BodyCopy>
    );
  };

  handleDefaultLinkClick = event => {
    event.preventDefault();
    const { coupon, couponDetailClick } = this.props;
    couponDetailClick(coupon);
  };

  render() {
    const { labels, coupon, className } = this.props;
    return (
      <div className={className}>
        <div className="couponCard__container">
          {this.ErrorHandle()}
          <div className="couponCard__container_main">
            {coupon.promotionType === COUPON_REDEMPTION_TYPE.PUBLIC &&
              this.RenderCardHeader(labels.SAVINGS_TEXT, 'couponCard__header_saving')}
            {coupon.promotionType === COUPON_REDEMPTION_TYPE.PC &&
              this.RenderCardHeader(labels.PLACE_CASH_TEXT, 'couponCard__header_public')}
            {coupon.promotionType === COUPON_REDEMPTION_TYPE.PLACECASH &&
              this.RenderCardHeader(labels.PLACE_CASH_TEXT, 'couponCard__header_public')}
            {coupon.promotionType === COUPON_REDEMPTION_TYPE.LOYALTY &&
              this.RenderCardHeader(labels.PLACE_CASH_TEXT, 'couponCard__header_saving')}
            {coupon.promotionType === COUPON_REDEMPTION_TYPE.REWARDS &&
              this.RenderCardHeader(labels.REWARDS_TEXT, 'couponCard__header_rewards')}

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
                    {coupon.promotionType === COUPON_REDEMPTION_TYPE.PUBLIC &&
                      this.RenderValidText(coupon)}
                    {coupon.promotionType === COUPON_REDEMPTION_TYPE.REWARDS &&
                      this.RenderUseByText(coupon)}
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
