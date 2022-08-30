import styled from 'styled-components/native';
import { BodyCopy, Anchor, Image } from '../../../../../../../common/atoms';

export const ImageContainer = styled.View`
  margin-top: ${props => props.marginTop || props.theme.spacing.ELEM_SPACING.XS};
  align-items: center;
`;

export const TextBoxContainer = styled.View`
  width: 100%;
  padding: ${props => props.theme.spacing.LAYOUT_SPACING.XXS}
    ${props => props.theme.spacing.LAYOUT_SPACING.XXS} 0
    ${props => props.theme.spacing.LAYOUT_SPACING.XXS};
`;

export const StyledBodyCopy = styled(BodyCopy)`
  padding: ${props => props.paddingTop || '0px'} ${props => props.paddingRight || '0px'}
    ${props => props.paddingBottom || '0px'} ${props => props.paddingLeft || '0px'};
`;

export const CouponCodeWrapper = styled(StyledBodyCopy)`
  background-color: ${props => props.theme.colors.PRIMARY.LIGHTGRAY};
  width: 68%;
  text-align: center;
  margin-left: ${props => props.marginLeft};
`;

export const ScrollViewContainer = styled.ScrollView`
  width: 90%;
  margin: ${props => props.theme.spacing.LAYOUT_SPACING.XXS}
    ${props => props.theme.spacing.LAYOUT_SPACING.XS}
    ${props => props.theme.spacing.LAYOUT_SPACING.SM}
    ${props => props.theme.spacing.LAYOUT_SPACING.XS};
`;

export const ButtonWrapper = styled.View`
  width: 100%;
  align-items: center;
  justify-content: center;
  margin-top: ${props => props.theme.spacing.LAYOUT_SPACING.SM};
`;

export const CopyToClipBoardWrapper = styled(StyledBodyCopy)`
  text-decoration: underline;
`;

export const StyledAnchor = styled(Anchor)`
  padding: ${props => props.paddingTop || '0px'} ${props => props.paddingRight || '0px'}
    ${props => props.paddingBottom || '0px'} ${props => props.paddingLeft || '0px'};
  align-items: center;
  justify-content: center;
`;

export const BottomContainer = styled.View`
  width: 100%;
  padding: ${props => props.theme.spacing.LAYOUT_SPACING.SM}
    ${props => props.theme.spacing.LAYOUT_SPACING.XXS}
    ${props => props.theme.spacing.LAYOUT_SPACING.SM}
    ${props => props.theme.spacing.LAYOUT_SPACING.XXS};
  align-items: center;
  flex-direction: row;
  justify-content: center;
`;

export const PSContainer = styled.View`
  height: 125px;
`;

export const Container = styled.View`
  width: 85%;
  margin: ${props => props.theme.spacing.LAYOUT_SPACING.XXS}
    ${props => props.theme.spacing.LAYOUT_SPACING.XS} 0
    ${props => props.theme.spacing.LAYOUT_SPACING.XS};
`;

export const CheckoutButtonWrapper = styled.View`
  width: 100%;
  align-items: center;
  justify-content: center;
  margin-top: ${props => props.theme.spacing.LAYOUT_SPACING.XXS};
`;

export const RichTextContainer = styled.View`
  width: 100%;
`;

export const StyledImage = styled(Image)`
  /* stylelint-disable-next-line */
  resize-mode: stretch;
`;

export const ShippingInfoWrapper = styled.View`
  height: 330;
`;

export const SavingAmountWrapper = styled.View`
  height: 70px;
`;

export const HorizontalLine = styled.View`
  border-bottom-color: ${props => props.theme.colors.PRIMARY.LIGHTGRAY};
  border-bottom-width: 1px;
  margin-top: ${props => props.theme.spacing.ELEM_SPACING.XL};
  margin-bottom: ${props => props.theme.spacing.ELEM_SPACING.XL};
`;

export default {
  ImageContainer,
  StyledBodyCopy,
  ScrollViewContainer,
  CheckoutButtonWrapper,
  ButtonWrapper,
  StyledAnchor,
  Container,
  RichTextContainer,
  BottomContainer,
  StyledImage,
  CouponCodeWrapper,
  ShippingInfoWrapper,
  SavingAmountWrapper,
  HorizontalLine,
  PSContainer,
  CopyToClipBoardWrapper,
};
