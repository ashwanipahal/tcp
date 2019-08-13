import styled, { css } from 'styled-components';

const ButtonWrapperStyle = css`
  &.forgot-password-form {
    margin: 30px 0;

    .heading-link a {
      color: ${props => props.theme.colorPalette.black};
    }

    .forgot-password-text {
      display: block;
    }

    .elem-mb-SM {
      max-width: 241px;
      margin: 12px auto 25px;
    }
  }
`;

const WrapperStyle = styled.View`
  margin-bottom: ${props => props.theme.spacing.ELEM_SPACING.LRG};
`;

const Container = styled.View`
  border: solid 0.8px ${props => props.theme.colors.BRAND.BOY};
  border-style: dashed;
`;

const CardSavingHeader = styled.View`
  flex-direction: row;
  height: 16px;
  background: ${props => props.theme.colors.BRAND.GIRLS};
  justify-content: center;
`;

const CardRewardHeader = styled.View`
  flex-direction: row;
  height: 16px;
  background: ${props => props.theme.colors.BRAND.GIRLS};
  justify-content: center;
`;

const CardPublicCashHeader = styled.View`
  flex-direction: row;
  height: 16px;
  background: ${props => props.theme.colors.BRAND.GIRLS};
  justify-content: center;
`;

const HeaderBox = styled.View`
  flex: 1;
`;

const CouponTitle = styled.View`
  margin-left: 14px;
`;

const CouponExpired = styled.View`
  flex: 1;
  background: ${props => props.theme.colors.TEXT.DARKERGRAY};
`;

const CouponText = styled.Text`
  color: ${props => props.theme.colors.WHITE};
  font-size: ${props => props.theme.typography.fontSizes.fs10};
  font-weight: ${props => props.theme.typography.fontWeights.semibold};
  line-height: 14px;
  text-align: ${props => (props.center ? 'center' : 'left')};
  font-family: ${props => props.theme.typography.fonts.primary};
`;

const CouponBody = styled.View`
  padding: ${props => props.theme.spacing.ELEM_SPACING.XXS}
    ${props => props.theme.spacing.ELEM_SPACING.MED}
    ${props => props.theme.spacing.ELEM_SPACING.XXS}
    ${props => props.theme.spacing.ELEM_SPACING.MED};
`;

const CouponRow = styled.View`
  display: flex;
  flex-direction: row;
  margin-top: ${props => props.theme.spacing.APP_LAYOUT_SPACING.XS};
  margin-bottom: ${props => props.theme.spacing.APP_LAYOUT_SPACING.XS};
`;

const CouponCal = styled.View`
  flex: 1;
`;

const CouponTextBox = styled.View``;

const CouponDesc = styled(CouponText)`
  color: ${props => props.theme.colors.TEXT.DARK};
  font-size: ${props => props.theme.typography.fontSizes.fs12};
  font-weight: ${props => props.theme.typography.fontWeights.black};
`;

const CouponDuration = styled(CouponText)`
  color: ${props => props.theme.colors.TEXT.DARK};
  font-size: ${props => props.theme.typography.fontSizes.fs10};
`;

const CouponAnchor = styled.View`
  align-self: flex-start;
`;

export {
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
  CouponTextBox,
  CouponDesc,
  CouponDuration,
  CouponAnchor,
  ButtonWrapperStyle,
};
