import styled from 'styled-components';

const ViewConatiner = styled.View`
  background: ${props => props.theme.colors.BRAND.GIRLS};
`;

const WrapperStyle = styled.View`
  margin-bottom: ${props => props.theme.spacing.ELEM_SPACING.LRG};
  padding: 0px 15px 0px 13px;
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
  display: flex;
  align-items: center;
  justify-content: center;
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
  align-items: center;
  justify-content: center;
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
  margin-top: 4px;
  color: ${props => props.theme.colors.TEXT.DARK};
  font-size: ${props => props.theme.typography.fontSizes.fs10};
  font-family: ${props => props.theme.typography.fonts.secondary};
`;

const CouponAnchor = styled.View`
  align-self: flex-start;
`;

export {
  WrapperStyle,
  ViewConatiner,
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
};
