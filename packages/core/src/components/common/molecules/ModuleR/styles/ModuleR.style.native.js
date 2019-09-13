import styled from 'styled-components/native';

import { Image } from '../../../atoms';

export const Container = styled.View`
  width: 100%;
  margin-bottom: ${props => props.theme.spacing.LAYOUT_SPACING.SM};
`;

export const HeaderContainer = styled.View`
  align-items: center;
  margin-bottom: 10px;
`;

export const PromoContainer = styled.View`
  align-items: center;
`;

export const StyledImage = styled(Image)`
  /* stylelint-disable-next-line */
  resize-mode: contain;
`;

export const ImageItemWrapper = styled.View`
  width: ${props => props.width};
  align-items: center;
  flex-direction: row;
`;

export const ButtonContainer = styled.View`
  align-items: center;
`;

export const ImageContainer = styled.View`
  flex-direction: row;
  flex-wrap: wrap;
  padding: ${props =>
    `${props.theme.spacing.ELEM_SPACING.LRG} ${props.theme.spacing.ELEM_SPACING.MED} 14px`};
  justify-content: space-between;
`;

export const ProductTabListContainer = styled.View`
  margin-top: ${props => props.theme.spacing.ELEM_SPACING.XS};
`;

export default {
  Container,
  PromoContainer,
  HeaderContainer,
  ImageItemWrapper,
  ButtonContainer,
  StyledImage,
  ImageContainer,
  ProductTabListContainer,
};
