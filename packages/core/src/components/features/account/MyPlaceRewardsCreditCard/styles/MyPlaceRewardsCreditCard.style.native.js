import styled from 'styled-components/native';
import { Anchor, Image } from '@tcp/core/src/components/common/atoms';

export const ImageContainer = styled.View`
  margin-top: ${props => props.theme.spacing.ELEM_SPACING.LRG};
  align-items: center;
`;

export const ButtonWrapper = styled.View`
  width: 100%;
  align-items: center;
  justify-content: center;
  margin-top: ${props => props.theme.spacing.ELEM_SPACING.MED};
`;

export const StyledAnchor = styled(Anchor)`
  margin-right: ${props => props.theme.spacing.ELEM_SPACING.XL};
  align-items: center;
  justify-content: center;
`;

export const BottomContainer = styled.View`
  width: 100%;
  align-items: center;
  flex-direction: row;
  justify-content: center;
  margin-top: ${props => props.theme.spacing.ELEM_SPACING.XXL}
  margin-bottom: ${props => props.theme.spacing.ELEM_SPACING.XXL}
`;

export const StyledImage = styled(Image)`
  /* stylelint-disable-next-line */
  resize-mode: contain;
`;

export const HeaderContainer = styled.View`
  flex-direction: row;
  width: 100%;
  align-items: center;
  justify-content: center;
  margin-top: ${props => props.theme.spacing.ELEM_SPACING.SM}
`;

export default {
  ImageContainer,
  ButtonWrapper,
  StyledAnchor,
  BottomContainer,
  StyledImage,
  HeaderContainer,
};




