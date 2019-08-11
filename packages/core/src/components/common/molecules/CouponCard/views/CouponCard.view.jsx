import React from 'react';
import PropTypes from 'prop-types';
import withStyles from '../../../hoc/withStyles';
import BodyCopy from '../../../atoms/BodyCopy';
import styles from '../styles/CouponCard.style';
import Anchor from '../../../atoms/Anchor';
import Button from '../../../atoms/Button';
import ErrorMessage from '../../../../features/CnC/common/molecules/ErrorMessage';

import { COUPON_REDEMPTION_TYPE } from '../../../../../services/abstractors/CnC/CartItemTile';

class CouponCard extends React.Component<Props> {
  RenderCardHeader = (type, headingClass, dataLocator) => {
    const { labels, coupon } = this.props;
    return (
      <div className="couponCard__header">
        <div className={headingClass}>
          <BodyCopy
            data-locator={dataLocator}
            className="couponCard__header_text"
            component="p"
            fontSize="fs12"
          >
            {type}
          </BodyCopy>
        </div>
        {coupon.isExpiring && (
          <BodyCopy
            data-locator={`coupon_${coupon.status}_header_expired`}
            className="couponCard__header_expired"
            component="p"
            fontSize="fs12"
          >
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
        data-locator={`coupon_${coupon.status}_apply_cartCta`}
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
        data-locator={`coupon_${coupon.status}_remove_cartCta`}
        fullWidth="true"
      >
        {coupon.labelStatus}
      </Button>
    );
  };

  RenderValidText = coupon => {
    return (
      <BodyCopy
        component="p"
        fontSize="fs10"
        data-locator={`coupon_${coupon.status}_cartValidValidity`}
        fontFamily="secondary"
      >
        {`Valid ${coupon.effectiveDate} - ${coupon.expirationDate}`}
      </BodyCopy>
    );
  };

  RenderUseByText = coupon => {
    return (
      <BodyCopy
        data-locator={`coupon_${coupon.status}_cartUseByValidity`}
        component="p"
        fontSize="fs10"
        fontFamily="secondary"
      >
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
          <ErrorMessage error={coupon.error} />
          <div className="couponCard__container_main">
            {coupon.offerType === COUPON_REDEMPTION_TYPE.SAVING &&
              this.RenderCardHeader(
                labels.SAVINGS_TEXT,
                'couponCard__header_saving',
                `${coupon.status}_PublicValidityLbl`
              )}
            {coupon.offerType === COUPON_REDEMPTION_TYPE.REWARDS &&
              this.RenderCardHeader(
                labels.REWARDS_TEXT,
                'couponCard__header_rewards',
                `${coupon.status}_rewardValidityLbl`
              )}
            {coupon.offerType === COUPON_REDEMPTION_TYPE.PLACECASH &&
              this.RenderCardHeader(
                labels.PLACE_CASH_TEXT,
                'couponCard__header_pc',
                `${coupon.status}_PlaceCashValidityLbl`
              )}
            <div className="couponCard__body">
              <div className="couponCard__row">
                <div className="couponCard__col">
                  <BodyCopy component="div" color="text.primary">
                    <BodyCopy
                      component="p"
                      fontSize="fs12"
                      fontWeight="black"
                      fontFamily="secondary"
                      data-locator={`coupon_${coupon.status}_couponNameLbl`}
                    >
                      {`${coupon.title}`}
                    </BodyCopy>
                    {coupon.offerType === COUPON_REDEMPTION_TYPE.SAVING &&
                      this.RenderUseByText(coupon)}
                    {coupon.offerType === COUPON_REDEMPTION_TYPE.REWARDS &&
                      this.RenderUseByText(coupon)}
                    {coupon.offerType === COUPON_REDEMPTION_TYPE.PLACECASH &&
                      this.RenderValidText(coupon)}
                  </BodyCopy>
                  <Anchor
                    data-locator={`coupon_${coupon.status}_cartDetailsLink`}
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
