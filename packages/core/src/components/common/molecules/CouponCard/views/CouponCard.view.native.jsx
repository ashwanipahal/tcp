import React from 'react';
import PropTypes from 'prop-types';
import createThemeColorPalette from '@tcp/core/styles/themes/createThemeColorPalette';
import withStyles from '../../../hoc/withStyles';
import BodyCopy from '../../../atoms/BodyCopy';

import {
  WrapperStyle,
  ViewConatiner,
  Container,
  CardSavingHeader,
  CardRewardHeader,
  CardPublicCashHeader,
  HeaderBox,
  CouponTitle,
  CouponExpired,
  CouponBody,
  CouponRow,
  CouponCal,
  CouponDesc,
  CouponDuration,
  CouponAnchor,
} from '../styles/CouponCard.style.native';
import Anchor from '../../../atoms/Anchor';
import CustomButton from '../../../atoms/Button';
import ErrorMessage from '../../../../features/CnC/common/molecules/ErrorMessage';

import { COUPON_REDEMPTION_TYPE } from '../../../../../services/abstractors/CnC/CartItemTile';

const colorPallete = createThemeColorPalette();

export class CouponCard extends React.Component<Props> {
  RenderCardSavingHeader = (type, dataLocator) => {
    const { labels, coupon } = this.props;
    return (
      <CardSavingHeader>
        <HeaderBox>
          <CouponTitle>
            <BodyCopy
              data-locator={dataLocator}
              fontSize="fs12"
              fontFamily="secondary"
              fontWeight="semibold"
              text={type}
              color="white"
            />
          </CouponTitle>
        </HeaderBox>
        {coupon.isExpiring && (
          <CouponExpired>
            <BodyCopy
              data-locator={dataLocator}
              fontSize="fs12"
              fontFamily="secondary"
              fontWeight="semibold"
              text={labels.EXPIRING_SOON}
              color="white"
            />
          </CouponExpired>
        )}
      </CardSavingHeader>
    );
  };

  RenderCardRewardHeader = (type, dataLocator) => {
    const { labels, coupon } = this.props;
    return (
      <CardRewardHeader>
        <HeaderBox>
          <CouponTitle>
            <BodyCopy
              data-locator={dataLocator}
              fontSize="fs12"
              fontFamily="secondary"
              fontWeight="semibold"
              text={type}
              color="white"
            />
          </CouponTitle>
        </HeaderBox>
        {coupon.isExpiring && (
          <CouponExpired>
            <BodyCopy
              data-locator={dataLocator}
              fontSize="fs12"
              fontFamily="secondary"
              fontWeight="semibold"
              text={labels.EXPIRING_SOON}
              color="white"
            />
          </CouponExpired>
        )}
      </CardRewardHeader>
    );
  };

  RenderCardPublicHeader = (type, dataLocator) => {
    const { labels, coupon } = this.props;
    return (
      <CardPublicCashHeader>
        <HeaderBox>
          <CouponTitle>
            <BodyCopy
              data-locator={dataLocator}
              fontSize="fs12"
              fontFamily="secondary"
              fontWeight="semibold"
              text={type}
              color="white"
            />
          </CouponTitle>
        </HeaderBox>
        {coupon.isExpiring && (
          <CouponExpired>
            <BodyCopy
              data-locator={dataLocator}
              fontSize="fs12"
              fontFamily="secondary"
              fontWeight="semibold"
              text={labels.EXPIRING_SOON}
              color="white"
            />
          </CouponExpired>
        )}
      </CardPublicCashHeader>
    );
  };

  RenderValidText = coupon => {
    return (
      <CouponDuration>
        <BodyCopy
          data-locator={`coupon_${coupon.status}_cartValidValidity`}
          text={`Valid ${coupon.effectiveDate} - ${coupon.expirationDate}`}
        />
      </CouponDuration>
    );
  };

  RenderUseByText = coupon => {
    return (
      <CouponDuration>
        <BodyCopy
          data-locator={`coupon_${coupon.status}_cartUseByValidity`}
          text={`Use by ${coupon.expirationDate}`}
        />
      </CouponDuration>
    );
  };

  RenderApplyButton = () => {
    const { coupon, onApply, isFetching } = this.props;
    return (
      <CustomButton
        fill="BLACK"
        color={colorPallete.white}
        type="submit"
        buttonVariation="variable-width"
        data-locator=""
        text={coupon.labelStatus}
        disableButton={isFetching}
        onPress={() => {
          if (!isFetching) {
            onApply(coupon);
          }
        }}
      />
    );
  };

  RenderRemoveButton = () => {
    const { coupon, onRemove, isFetching } = this.props;
    return (
      <CustomButton
        fill="WHITE"
        type="submit"
        buttonVariation="variable-width"
        data-locator=""
        text={coupon.labelStatus}
        disableButton={isFetching}
        onPress={() => {
          onRemove(coupon);
        }}
      />
    );
  };

  handleDefaultLinkClick = event => {
    event.preventDefault();
    const { coupon, couponDetailClick } = this.props;
    couponDetailClick(coupon);
  };

  render() {
    const { labels, coupon, handleErrorCoupon } = this.props;
    if (coupon.error) {
      handleErrorCoupon(coupon);
    }
    return (
      <ViewConatiner>
        <ErrorMessage error={coupon.error} />
        <WrapperStyle>
          <Container>
            {coupon.offerType === COUPON_REDEMPTION_TYPE.SAVING &&
              this.RenderCardSavingHeader(
                labels.SAVINGS_TEXT,
                `${coupon.status}_PublicValidityLbl`
              )}
            {coupon.offerType === COUPON_REDEMPTION_TYPE.REWARDS &&
              this.RenderCardRewardHeader(
                labels.REWARDS_TEXT,
                `${coupon.status}_RewardValidityLbl`
              )}
            {coupon.offerType === COUPON_REDEMPTION_TYPE.PLACECASH &&
              this.RenderCardPublicHeader(
                labels.REWARDS_TEXT,
                `${coupon.status}_PlaceCashValidityLbl`
              )}
            <CouponBody>
              <CouponRow>
                <CouponCal>
                  <CouponDesc>{`${coupon.title}`}</CouponDesc>
                  <ViewConatiner>
                    {coupon.offerType === COUPON_REDEMPTION_TYPE.SAVING &&
                      this.RenderUseByText(coupon)}
                    {coupon.offerType === COUPON_REDEMPTION_TYPE.REWARDS &&
                      this.RenderUseByText(coupon)}
                    {coupon.offerType === COUPON_REDEMPTION_TYPE.PLACECASH &&
                      this.RenderValidText(coupon)}
                  </ViewConatiner>
                  <CouponAnchor>
                    <Anchor
                      fontSizeVariation="small"
                      fontFamily="secondary"
                      underline
                      anchorVariation="primary"
                      onPress={this.handleDefaultLinkClick}
                      noLink
                      to="/#"
                      data-locator=""
                      text={labels.DETAILS_BUTTON_TEXT}
                    />
                  </CouponAnchor>
                </CouponCal>
                <CouponCal>
                  {coupon.status === 'available' && this.RenderApplyButton()}
                  {coupon.status === 'applied' && this.RenderRemoveButton()}
                </CouponCal>
              </CouponRow>
            </CouponBody>
          </Container>
        </WrapperStyle>
      </ViewConatiner>
    );
  }
}

CouponCard.propTypes = {
  coupon: PropTypes.shape({}).isRequired,
};

export default withStyles(CouponCard);
export { CouponCard as CouponCardVanilla };
