import styled from 'styled-components/native';
import { BodyCopy, Anchor, Image } from '../../../atoms';

export const ImageContainer = styled.View`
  margin-top: ${props => props.marginTop || props.theme.spacing.ELEM_SPACING.XS};
  align-items: center;
`;

export const Container = styled.View`
  width: 50%;
  margin-top: ${props => props.theme.spacing.LAYOUT_SPACING.XXS};
  margin-left: ${props => props.theme.spacing.LAYOUT_SPACING.MED};
  margin-right: ${props => props.theme.spacing.LAYOUT_SPACING.MED};
`;

export const TextBoxContainer = styled.View`
  width: 100%;
  padding-top: ${props => props.theme.spacing.LAYOUT_SPACING.XXS};
  padding-left: ${props => props.theme.spacing.LAYOUT_SPACING.XXS};
  padding-right: ${props => props.theme.spacing.LAYOUT_SPACING.XXS};
`;

export const StyledBodyCopy = styled(BodyCopy)`
  padding-top: ${props => props.paddingTop || '0px'};
  padding-left: ${props => props.paddingLeft || '0px'};
  padding-right: ${props => props.paddingRight || '0px'};
  padding-bottom: ${props => props.paddingBottom || '0px'};
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
  padding-top: ${props => props.paddingTop || '0px'};
  padding-left: ${props => props.paddingLeft || '0px'};
  padding-right: ${props => props.paddingRight || '0px'};
  padding-bottom: ${props => props.paddingBottom || '0px'};
  align-items: center;
  justify-content: center;
`;

export const BottomContainer = styled.View`
  width: 100%;
  padding-top: ${props => props.theme.spacing.LAYOUT_SPACING.SM};
  padding-left: ${props => props.theme.spacing.LAYOUT_SPACING.XXS};
  padding-right: ${props => props.theme.spacing.LAYOUT_SPACING.XXS};
  align-items: center;
  flex-direction: row;
  justify-content: center;
`;

export const RichTextContainer = styled.View`
  width: 420px;
  height: 80px;
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
