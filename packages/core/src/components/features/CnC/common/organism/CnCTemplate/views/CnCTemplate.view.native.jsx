import React from 'react';
import { View, TouchableOpacity } from 'react-native';
import PropTypes from 'prop-types';
import BodyCopy from '@tcp/core/src/components/common/atoms/BodyCopy';
import Constants from '@tcp/core/src/components/common/molecules/Recommendations/container/Recommendations.constants';
import Recommendations from '../../../../../../../../../mobileapp/src/components/common/molecules/Recommendations';
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
  PayPalButtonContainer,
  BannerWrapper,
  CnContainer,
  CnContent,
} from '../styles/CnCTemplate.style.native';
import { BodyCopyWithSpacing } from '../../../../../../common/atoms/styledWrapper';
import PersonalizedCoupons from '../../../../Confirmation/organisms/PersonalizedCoupons';
import PayPalButton from '../../PayPalButton';
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
  navigation,
  getPayPalSettings,
  isPayPalWebViewEnable,
  showPayPalButton,
}) => {
  return (
    <CnContainer isPayPalWebViewEnable={isPayPalWebViewEnable}>
      {!isConfirmationPage ? (
        <CnContent isPayPalWebViewEnable={isPayPalWebViewEnable}>
          {!isPayPalWebViewEnable && (
            <>
              <CouponAndPromosWrapper>
                <CouponAndPromos isCheckout navigation={navigation} />
              </CouponAndPromosWrapper>
              <View>
                <OrderLedgerContainer
                  showAccordian={showAccordian}
                  pageCategory={pageCategory}
                  navigation={navigation}
                />
              </View>
            </>
          )}
          {!isPayPalWebViewEnable && !isGuest && (
            <BonusPointsWrapper>
              <BonusPointsDays />
            </BonusPointsWrapper>
          )}

          <ButtonWrapper isPayPalWebViewEnable={isPayPalWebViewEnable}>
            {showPayPalButton && (
              <PayPalButtonContainer>
                <PayPalButton
                  getPayPalSettings={getPayPalSettings}
                  navigation={navigation}
                  isBillingPage
                  setVenmoState={() => {}}
                />
              </PayPalButtonContainer>
            )}
            {!showPayPalButton && (
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
            )}
            {footerBody}
            {!isPayPalWebViewEnable && !!backLinkText && (
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
        </CnContent>
      ) : (
        <View>
          <OrderLedgerContainer
            isConfirmationPage={isConfirmationPage}
            pageCategory={pageCategory}
            showAccordian
          />
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
          <Recommendations
            navigation={navigation}
            variation="moduleO"
            page={Constants.RECOMMENDATIONS_PAGES_MAPPING.CHECKOUT}
          />
        </View>
      )}
    </CnContainer>
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
  getPayPalSettings: PropTypes.shape({}),
  isPayPalWebViewEnable: PropTypes.bool,
  showPayPalButton: PropTypes.bool,
};

CnCCommonTemplate.defaultProps = {
  isConfirmationPage: false,
  pageCategory: {},
  getPayPalSettings: {},
  isPayPalWebViewEnable: false,
  showPayPalButton: false,
};

export default CnCCommonTemplate;
