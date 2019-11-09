import styled from 'styled-components/native';

export const BackLinkText = styled.Text`
  color: ${props => props.theme.colors.PRIMARY.BLUE};
  font-size: ${props => props.theme.fonts.fontSize.anchor.medium}px;
  align-self: center;
`;

export const BackIcon = styled.View`
  transform: rotate(135deg);
  border-style: solid;
  border-color: ${props => props.theme.colors.PRIMARY.BLUE};
  border-right-width: ${props => props.theme.spacing.ELEM_SPACING.XXXS};
  border-bottom-width: ${props => props.theme.spacing.ELEM_SPACING.XXXS};
  width: 10px;
  height: 10px;
  padding: ${props => props.theme.spacing.ELEM_SPACING.XXS};
  align-self: center;
`;

export const BackLinkWrapperWrapper = styled.View`
  display: flex;
  flex-direction: row;
  align-self: center;
  margin-bottom: ${props => props.theme.spacing.ELEM_SPACING.XXXL};
`;

export const CheckoutButton = styled.TouchableOpacity`
  background: ${props => props.theme.colorPalette.blue.C900};
  display: flex;
  height: 42px;
  justify-content: center;
  align-items: center;
  margin-bottom: ${props => props.theme.spacing.ELEM_SPACING.MED};
`;

export const BonusPointsWrapper = styled.View`
  padding-top: ${props => props.theme.spacing.ELEM_SPACING.SM};
  padding-bottom: ${props => props.theme.spacing.ELEM_SPACING.SM};
  border-top-width: 1px;
  border-bottom-width: 1px;
  border-style: solid;
  border-color: ${props => props.theme.colors.PRIMARY.GRAY};
`;

export const CouponAndPromosWrapper = styled.View`
  padding-top: ${props => props.theme.spacing.ELEM_SPACING.SM};
  padding-bottom: ${props => props.theme.spacing.ELEM_SPACING.SM};
`;

const applyPositionClassStyle = props => {
  if (props.isPayPalWebViewEnable) {
    return `
    top: 0px;
    position: absolute;
    width:100%;
    margin:0px;
    padding:0px;
    `;
  }
  return 'position: relative;';
};

export const PayPalButtonContainer = styled.View`
  margin-bottom: 20px;
  ${applyPositionClassStyle}
`;

export const BannerWrapper = styled.View`
  background-color: ${props => props.theme.colorPalette.gray[500]};
  margin: ${props => props.theme.spacing.ELEM_SPACING.MED} 0;
  height: 100px;
  ${applyPositionClassStyle}
`;

export const CnContainer = styled.View`
  ${applyPositionClassStyle}
  margin-bottom: 60px;
`;

export const CnContent = styled.View`
  ${applyPositionClassStyle}
`;

export const ButtonWrapper = styled.View`
  margin: 0 10px;
  display: flex;
  flex-direction: column;
  margin-top: 20px;
  ${applyPositionClassStyle}
`;

export default {
  ButtonWrapper,
  CheckoutButton,
  BackLinkText,
  BackIcon,
  BackLinkWrapperWrapper,
  BonusPointsWrapper,
  CouponAndPromosWrapper,
  BannerWrapper,
  CnContainer,
  CnContent,
  PayPalButtonContainer,
};
