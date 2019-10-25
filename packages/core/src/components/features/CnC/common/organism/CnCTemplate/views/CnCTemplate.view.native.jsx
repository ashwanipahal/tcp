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
} from '../styles/CnCTemplate.style.native';
import { BodyCopyWithSpacing } from '../../../../../../common/atoms/styledWrapper';
import PersonalizedCoupons from '../../../../Confirmation/organisms/PersonalizedCoupons';

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
  pageCategory,
}) => {
  return (
    <>
      {!isConfirmationPage ? (
        <>
          <CouponAndPromosWrapper>
            <CouponAndPromos isCheckout />
          </CouponAndPromosWrapper>
          <View>
            <OrderLedgerContainer showAccordian={showAccordian} pageCategory={pageCategory} />
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
                dataLocator="reviewBtn"
              />
            </CheckoutButton>
            {footerBody}
            {!!backLinkText && (
              <TouchableOpacity
                accessibilityRole="link"
                onPress={onBackLinkPress}
                dataLocator="returnToLink"
              >
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
          <OrderLedgerContainer
            isConfirmationPage={isConfirmationPage}
            pageCategory={pageCategory}
            showAccordian
          />
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
          <PersonalizedCoupons />
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
  pageCategory: PropTypes.shape({}),
};

CnCCommonTemplate.defaultProps = {
  isConfirmationPage: false,
  pageCategory: {},
};

export default CnCCommonTemplate;
