import React from 'react';
import { Text, View } from 'react-native';
import PropTypes from 'prop-types';
import createThemeColorPalette from '@tcp/core/styles/themes/createThemeColorPalette';
import withStyles from '../../../hoc/withStyles';
import BodyCopy from '../../../atoms/BodyCopy';
import {
  WrapperStyle,
  Container,
  CardSavingHeader,
  CardRewardHeader,
  CardPublicCashHeader,
  HeaderBox,
  CouponTitle,
  CouponExpired,
  CouponText,
  CouponBody,
  CouponRow,
  CouponCal,
  CouponDesc,
  CouponDuration,
  CouponAnchor,
  ButtonWrapperStyle,
} from '../styles/CouponCard.style.native';
import Anchor from '../../../atoms/Anchor';
import CustomButton from '../../../atoms/Button';
import ErrorMessage from '../../../../features/CnC/common/molecules/ErrorMessage';

import { COUPON_REDEMPTION_TYPE } from '../../../../../services/abstractors/CnC/CartItemTile';

const colorPallete = createThemeColorPalette();
const styles = {
  ApplyButtonStyle: {
    fontSize: 10,
    color: 'rgb(112,12,12)',
  },
};

export class CouponCard extends React.Component<Props> {
  RenderCardSavingHeader = (type, dataLocator) => {
    const { labels, coupon } = this.props;
    return (
      <CardSavingHeader>
        <HeaderBox>
          <CouponTitle>
            <CouponText data-locator={dataLocator}>{type}</CouponText>
          </CouponTitle>
        </HeaderBox>
        <CouponExpired>
          {coupon.isExpiring && (
            <CouponText center data-locator="">
              {labels.EXPIRING_SOON}
            </CouponText>
          )}
        </CouponExpired>
      </CardSavingHeader>
    );
  };

  RenderCardRewardHeader = (type, dataLocator) => {
    const { labels, coupon } = this.props;
    return (
      <CardRewardHeader>
        <HeaderBox>
          <CouponTitle>
            <CouponText data-locator={dataLocator}>{type}</CouponText>
          </CouponTitle>
        </HeaderBox>
        <CouponExpired>
          {coupon.isExpiring && (
            <CouponText center data-locator="">
              {labels.EXPIRING_SOON}
            </CouponText>
          )}
        </CouponExpired>
      </CardRewardHeader>
    );
  };

  RenderCardPublicHeader = (type, dataLocator) => {
    const { labels, coupon } = this.props;
    return (
      <CardPublicCashHeader>
        <HeaderBox>
          <CouponTitle>
            <CouponText data-locator={dataLocator}>{type}</CouponText>
            <CouponDuration>
              <CouponText data-locator={dataLocator}>{type}</CouponText>
            </CouponDuration>
          </CouponTitle>
        </HeaderBox>
        <CouponExpired>
          {coupon.isExpiring && (
            <CouponText center data-locator="">
              {labels.EXPIRING_SOON}
            </CouponText>
          )}
        </CouponExpired>
      </CardPublicCashHeader>
    );
  };

  RenderValidText = coupon => {
    return (
      <CouponDuration data-locator={`coupon_${coupon.status}_cartValidValidity`}>
        {`Valid ${coupon.effectiveDate} - ${coupon.expirationDate}`}
      </CouponDuration>
    );
  };

  RenderUseByText = coupon => {
    return (
      <CouponDuration data-locator={`coupon_${coupon.status}_cartUseByValidity`}>
        {`Use by ${coupon.expirationDate}`}
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
        disabled={isFetching}
        customStyle={styles.ApplyButtonStyle}
        onPress={() => {
          onApply(coupon);
        }}
      />
    );
  };

  RenderRemoveButton = () => {
    const { coupon, onApply, isFetching } = this.props;
    return (
      <CustomButton
        fill="WHITE"
        type="submit"
        buttonVariation="variable-width"
        data-locator=""
        text={coupon.labelStatus}
        disabled={isFetching}
        customStyle={styles.ApplyButtonStyle}
        onPress={() => {
          onApply(coupon);
        }}
      />
    );
  };

  render() {
    const { labels, coupon, className, handleErrorCoupon } = this.props;
    return (
      <WrapperStyle>
        {/* ErrorMessage */}
        <Container>
          {coupon.offerType === COUPON_REDEMPTION_TYPE.SAVING &&
            this.RenderCardSavingHeader(labels.SAVINGS_TEXT, `${coupon.status}_PublicValidityLbl`)}
          {coupon.offerType === COUPON_REDEMPTION_TYPE.REWARDS &&
            this.RenderCardRewardHeader(labels.REWARDS_TEXT, `${coupon.status}_RewardValidityLbl`)}
          {coupon.offerType === COUPON_REDEMPTION_TYPE.PLACECASH &&
            this.RenderCardPublicHeader(
              labels.REWARDS_TEXT,
              `${coupon.status}_PlaceCashValidityLbl`
            )}
          <CouponBody>
            <CouponRow>
              <CouponCal>
                <CouponDesc>{`${coupon.title}`}</CouponDesc>
                <View>
                  {coupon.offerType === COUPON_REDEMPTION_TYPE.SAVING &&
                    this.RenderUseByText(coupon)}
                  {coupon.offerType === COUPON_REDEMPTION_TYPE.REWARDS &&
                    this.RenderUseByText(coupon)}
                  {coupon.offerType === COUPON_REDEMPTION_TYPE.PLACECASH &&
                    this.RenderValidText(coupon)}
                </View>
                <CouponAnchor>
                  <Anchor
                    fontSizeVariation="small"
                    underline
                    anchorVariation="primary"
                    handleLinkClick={this.handleDefaultLinkClick}
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
    );
  }
}

export default withStyles(CouponCard);
export { CouponCard as CouponCardVanilla };
