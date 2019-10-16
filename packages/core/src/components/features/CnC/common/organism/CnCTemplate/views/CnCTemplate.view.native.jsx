import React from 'react';
import { View, TouchableOpacity } from 'react-native';
import PropTypes from 'prop-types';
import BodyCopy from '@tcp/core/src/components/common/atoms/BodyCopy';
import OrderLedgerContainer from '../../OrderLedger';
import CouponAndPromos from '../../CouponAndPromos';
import BonusPointsDays from '../../../../../../common/organisms/BonusPointsDays';
import {
  ButtonWrapper,
  CheckoutButton,
  BackLinkText,
  BackIcon,
  BackLinkWrapperWrapper,
  BonusPointsWrapper,
  CouponAndPromosWrapper,
  BannerWrapper,
  CouponsWrapper,
} from '../styles/CnCTemplate.style.native';
import { BodyCopyWithSpacing } from '../../../../../../common/atoms/styledWrapper';

/** The hard coded values are just to show the confirmation template. these will be removed once the components are are in place */

const CnCCommonTemplate = ({
  btnText,
  onPress,
  backLinkText,
  onBackLinkPress,
  footerBody,
  isGuest,
  showAccordian,
  isConfirmationPage,
}) => {
  return (
    <>
      {!isConfirmationPage ? (
        <>
          <CouponAndPromosWrapper>
            <CouponAndPromos isCheckout />
          </CouponAndPromosWrapper>
          <View>
            <OrderLedgerContainer showAccordian={showAccordian} />
          </View>
          {!isGuest && (
            <BonusPointsWrapper>
              <BonusPointsDays />
            </BonusPointsWrapper>
          )}
          <ButtonWrapper>
            <CheckoutButton onPress={onPress}>
              <BodyCopy
                color="white"
                fontWeight="extrabold"
                fontFamily="secondary"
                fontSize="fs13"
                text={btnText}
              />
            </CheckoutButton>
            {footerBody}
            {!!backLinkText && (
              <TouchableOpacity accessibilityRole="link" onPress={onBackLinkPress}>
                <BackLinkWrapperWrapper>
                  <BackIcon />
                  <BackLinkText>{backLinkText}</BackLinkText>
                </BackLinkWrapperWrapper>
              </TouchableOpacity>
            )}
          </ButtonWrapper>
        </>
      ) : (
        <View>
          <OrderLedgerContainer isConfirmationPage={isConfirmationPage} />
          <BannerWrapper>
            <BodyCopyWithSpacing
              textAlign="center"
              fontSize="fs16"
              mobileFontFamily="secondary"
              spacingStyles="margin-top-LRG margin-bottom-LRG"
              text="LOYALTY BANNER"
            />
          </BannerWrapper>
          {isGuest && (
            <BannerWrapper>
              <BodyCopyWithSpacing
                textAlign="center"
                fontSize="fs16"
                mobileFontFamily="secondary"
                spacingStyles="margin-top-LRG margin-bottom-LRG"
                text="ACCOUNT FORM"
              />
            </BannerWrapper>
          )}
          <CouponsWrapper>
            <BodyCopyWithSpacing
              textAlign="center"
              fontSize="fs16"
              mobileFontFamily="secondary"
              spacingStyles="margin-top-LRG margin-bottom-LRG"
              text="COUPONS"
            />
          </CouponsWrapper>
          <CouponsWrapper>
            <BodyCopyWithSpacing
              textAlign="center"
              fontSize="fs16"
              mobileFontFamily="secondary"
              spacingStyles="margin-top-LRG margin-bottom-LRG"
              text="COUPONS"
            />
          </CouponsWrapper>
        </View>
      )}
    </>
  );
};
CnCCommonTemplate.propTypes = {
  navigation: PropTypes.shape({}).isRequired,
  footerBody: PropTypes.shape({}).isRequired,
  btnText: PropTypes.string.isRequired,
  onPress: PropTypes.func.isRequired,
  backLinkText: PropTypes.string.isRequired,
  onBackLinkPress: PropTypes.func.isRequired,
  isGuest: PropTypes.func.isRequired,
  showAccordian: PropTypes.bool.isRequired,
  isConfirmationPage: PropTypes.bool,
};

CnCCommonTemplate.defaultProps = {
  isConfirmationPage: false,
};

export default CnCCommonTemplate;
