import styled from 'styled-components/native';
import { BodyCopy, Anchor, Image } from '../../../atoms';

export const ImageContainer = styled.View`
  margin-top: ${props => props.marginTop || props.theme.spacing.ELEM_SPACING.XS};
  align-items: center;
`;

export const Container = styled.View`
  width: 85%;
  margin: ${props => props.theme.spacing.LAYOUT_SPACING.XXS}
    ${props => props.theme.spacing.LAYOUT_SPACING.XS} 0
    ${props => props.theme.spacing.LAYOUT_SPACING.XS};
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

export const ScrollViewContainer = styled.ScrollView`
  margin-bottom: 40px;
`;

export const ButtonWrapper = styled.View`
  width: 100%;
  align-items: center;
  justify-content: center;
  margin-top: ${props => props.theme.spacing.LAYOUT_SPACING.XXS};
`;

export const StyledAnchor = styled(Anchor)`
  padding: ${props => props.paddingTop || '0px'} ${props => props.paddingRight || '0px'}
    ${props => props.paddingBottom || '0px'} ${props => props.paddingLeft || '0px'};
  align-items: center;
  justify-content: center;
`;

export const BottomContainer = styled.View`
  width: 100%;
  padding: ${props => props.theme.spacing.LAYOUT_SPACING.XXS}
    ${props => props.theme.spacing.LAYOUT_SPACING.XXS} 0
    ${props => props.theme.spacing.LAYOUT_SPACING.XXS};
  align-items: center;
  flex-direction: row;
  justify-content: center;
`;

export const RichTextContainer = styled.View`
  width: 100%;
  height: 143px;
`;

export const StyledImage = styled(Image)`
  /* stylelint-disable-next-line */
  resize-mode: stretch;
`;

export default {
  ImageContainer,
  StyledBodyCopy,
  ScrollViewContainer,
  ButtonWrapper,
  StyledAnchor,
  BottomContainer,
  RichTextContainer,
  Container,
  StyledImage,
};
