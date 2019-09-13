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
} from '../styles/CnCTemplate.style.native';

const CnCCommonTemplate = ({ btnText, onPress, backLinkText, onBackLinkPress, isGuest }) => {
  return (
    <>
      <View>
        <CouponAndPromos isCheckout />
      </View>
      <View>
        <OrderLedgerContainer />
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
  );
};
CnCCommonTemplate.propTypes = {
  navigation: PropTypes.shape({}).isRequired,
  btnText: PropTypes.string.isRequired,
  onPress: PropTypes.func.isRequired,
  backLinkText: PropTypes.string.isRequired,
  onBackLinkPress: PropTypes.func.isRequired,
  isGuest: PropTypes.func.isRequired,
};

export default CnCCommonTemplate;
