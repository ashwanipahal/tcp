import React from 'react';
import { View, TouchableOpacity } from 'react-native';
import PropTypes from 'prop-types';
import BodyCopy from '@tcp/core/src/components/common/atoms/BodyCopy';
import Constants from '@tcp/core/src/components/common/molecules/Recommendations/container/Recommendations.constants';
import ConfirmationAccountFormContainer from '@tcp/core/src/components/features/CnC/common/organism/ConfirmationAccountForm';
import Recommendations from '../../../../../../../../../mobileapp/src/components/common/molecules/Recommendations';
import OrderLedgerContainer from '../../OrderLedger';
import CouponAndPromos from '../../CouponAndPromos';
import BonusPointsDays from '../../../../../../common/organisms/BonusPointsDays';
import CardImage from '../../../../../../common/molecules/CardImage';

import {
  ButtonWrapper,
  CheckoutButton,
  BackLinkText,
  BackIcon,
  BackLinkWrapperWrapper,
  BonusPointsWrapper,
  CouponAndPromosWrapper,
  PayPalButtonContainer,
  CnContainer,
  CnContent,
  VenmoPaidContainer,
  VenmoPaidTextContainer,
} from '../styles/CnCTemplate.style.native';
import PersonalizedCoupons from '../../../../Confirmation/organisms/PersonalizedCoupons';
import PayPalButton from '../../PayPalButton';
import VenmoPaymentButton from '../../../../../../common/atoms/VenmoPaymentButton';
/** The hard coded values are just to show the confirmation template. these will be removed once the components are are in place */

const getPaymentButton = params => {
  const {
    btnText,
    onPress,
    backLinkText,
    onBackLinkPress,
    footerBody,
    navigation,
    getPayPalSettings,
    isPayPalWebViewEnable,
    showPayPalButton,
    showVenmoSubmit,
    onVenmoSubmit,
    onVenmoError,
  } = params;
  return (
    <ButtonWrapper
      showPayPalButton={showPayPalButton}
      isPayPalWebViewEnable={isPayPalWebViewEnable}
    >
      {showPayPalButton && (
        <PayPalButtonContainer>
          <PayPalButton
            getPayPalSettings={getPayPalSettings}
            navigation={navigation}
            isBillingPage
            fullWidth
            setVenmoState={() => {}}
            closeModal={() => {}}
          />
        </PayPalButtonContainer>
      )}
      {showVenmoSubmit && (
        <VenmoPaymentButton onSuccess={onVenmoSubmit} onError={onVenmoError} isVenmoBlueButton />
      )}
      {!showPayPalButton && !showVenmoSubmit && (
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
  );
};

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
  showVenmoSubmit,
  onVenmoSubmit,
  venmoPayment,
  onVenmoError,
}) => {
  const userName = venmoPayment ? venmoPayment.userName : '';
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
          {getPaymentButton({
            btnText,
            onPress,
            backLinkText,
            onBackLinkPress,
            footerBody,
            getPayPalSettings,
            showPayPalButton,
            showVenmoSubmit,
            onVenmoSubmit,
            onVenmoError,
          })}
        </CnContent>
      ) : (
        <View>
          <OrderLedgerContainer
            isConfirmationPage={isConfirmationPage}
            pageCategory={pageCategory}
            showAccordian
          />
          {venmoPayment && venmoPayment.userName && (
            <VenmoPaidContainer>
              <VenmoPaidTextContainer>
                <BodyCopy
                  fontWeight="regular"
                  fontFamily="secondary"
                  fontSize="fs16"
                  text="Paid with "
                />
              </VenmoPaidTextContainer>
              <CardImage card={venmoPayment} cardNumber={userName} />
            </VenmoPaidContainer>
          )}
          {isGuest && <ConfirmationAccountFormContainer />}
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
  showVenmoSubmit: PropTypes.bool,
  onVenmoSubmit: PropTypes.func,
  venmoPayment: PropTypes.shape({}),
  onVenmoError: PropTypes.bool,
};

CnCCommonTemplate.defaultProps = {
  isConfirmationPage: false,
  pageCategory: {},
  getPayPalSettings: {},
  isPayPalWebViewEnable: false,
  showPayPalButton: false,
  showVenmoSubmit: false,
  onVenmoSubmit: () => {},
  venmoPayment: null,
  onVenmoError: false,
};

export default CnCCommonTemplate;
