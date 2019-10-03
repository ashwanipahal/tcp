import React from 'react';
import PropTypes from 'prop-types';
import { getLabelValue } from '@tcp/core/src/utils/utils';
import withStyles from '../../../hoc/withStyles';
import BodyCopy from '../../../atoms/BodyCopy';
import styles from '../styles/CouponCard.style';
import Anchor from '../../../atoms/Anchor';
import Button from '../../../atoms/Button';
import ErrorMessage from '../../../../features/CnC/common/molecules/ErrorMessage';

import { COUPON_REDEMPTION_TYPE } from '../../../../../services/abstractors/CnC/CartItemTile';

class CouponCard extends React.Component<Props> {
  componentDidUpdate(prevProps) {
    const { coupon, handleErrorCoupon } = this.props;
    if (!prevProps.coupon.error && coupon.error) {
      handleErrorCoupon(coupon);
    }
  }

  RenderCardHeader = (type, headingClass, dataLocator) => {
    const { labels, coupon, isCarouselView, commonLabels } = this.props;
    return (
      <div className="couponCard__header">
        <div className={headingClass}>
          <BodyCopy
            data-locator={dataLocator}
            className="couponCard__header_text"
            component="p"
            fontSize="fs12"
            fontFamily="secondary"
          >
            {type}
          </BodyCopy>
        </div>
        {coupon.isExpiring && (!isCarouselView || (isCarouselView && coupon.status !== 'applied')) && (
          <BodyCopy
            data-locator={`coupon_${coupon.status}_header_expired`}
            className="couponCard__header_expired"
            component="p"
            fontSize="fs12"
            fontFamily="secondary"
          >
            {labels.EXPIRING_SOON}
          </BodyCopy>
        )}
        {isCarouselView && coupon.status === 'applied' && (
          <BodyCopy
            data-locator="coupon_header_applied"
            className="couponCard__header_expired"
            component="p"
            fontSize="fs12"
            fontFamily="secondary"
          >
            {getLabelValue(commonLabels, 'lbl_my_rewards_applied', 'placeRewards')}
          </BodyCopy>
        )}
      </div>
    );
  };

  RenderApplyButton = () => {
    const { coupon, onApply, isFetching } = this.props;
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
        disabled={isFetching}
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
        className="couponCard__text_style"
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
        className="couponCard__text_style"
        data-locator={`coupon_${coupon.status}_cartUseByValidity`}
        component="p"
        fontSize="fs10"
        fontFamily="secondary"
      >
        {`Use by ${coupon.expirationDate}`}
      </BodyCopy>
    );
  };

  RenderButtons = coupon => {
    const { isCarouselView } = this.props;
    return (
      <div className={!isCarouselView ? 'couponCard__col' : ''}>
        {coupon.status === 'available' && this.RenderApplyButton()}
        {coupon.status === 'applied' && this.RenderRemoveButton()}
      </div>
    );
  };

  handleDefaultLinkClick = event => {
    event.preventDefault();
    const { coupon, couponDetailClick } = this.props;
    couponDetailClick(coupon);
  };

  render() {
    const { labels, coupon, className, isCarouselView } = this.props;
    const containerOveride = isCarouselView ? 'couponCard_slick' : '';
    return (
      <div className={className}>
        <div className={`couponCard__container ${containerOveride}`}>
          {!isCarouselView && <ErrorMessage error={coupon.error} />}
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
                      lineHeight="lh115"
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
                    dataLocator={`coupon_${coupon.status}_cartDetailsLink`}
                    fontSizeVariation="small"
                    underline
                    anchorVariation="primary"
                    fontSize="fs10"
                    to="/#"
                    onClick={this.handleDefaultLinkClick}
                    className="cartDetailsLink"
                  >
                    {labels.DETAILS_BUTTON_TEXT}
                  </Anchor>
                </div>
                {this.RenderButtons(coupon)}
              </div>
            </div>
          </div>
          {isCarouselView && <ErrorMessage className="transparent-box" error={coupon.error} />}
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
