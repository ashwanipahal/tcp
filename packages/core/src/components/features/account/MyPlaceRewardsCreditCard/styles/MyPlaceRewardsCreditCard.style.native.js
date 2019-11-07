import styled from 'styled-components/native';
import { BodyCopy, Anchor, Image } from '@tcp/core/src/components/common/atoms';

export const ImageContainer = styled.View`
  margin-top: ${props => props.theme.spacing.ELEM_SPACING.LRG};
  align-items: center;
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
  margin-top: ${props => props.theme.spacing.LAYOUT_SPACING.MED}
  margin-bottom: ${props => props.theme.spacing.LAYOUT_SPACING.MED}
`;

export const StyledImage = styled(Image)`
  /* stylelint-disable-next-line */
  resize-mode: stretch;
`;

export const HeaderContainer = styled.View`
  flex-direction: row;
  width: 100%;
  align-items: center;
  justify-content: center;
  margin-top: ${props => props.theme.spacing.ELEM_SPACING.XL}
`;

export default {
  ImageContainer,
  ButtonWrapper,
  StyledAnchor,
  BottomContainer,
  StyledImage,
  HeaderContainer,
};




