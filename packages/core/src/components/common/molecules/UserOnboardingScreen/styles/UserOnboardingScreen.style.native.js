import styled from 'styled-components/native';
// import { Anchor, DamImage, Button } from '../../../atoms';

export const Container = styled.View`
  margin-bottom: ${props => props.theme.spacing.LAYOUT_SPACING.SM};
`;

export const TextCarouselWrapper = styled.View`
  align-items: center;
  justify-content: center;
`;

export const ButtonsWrapper = styled.View`
  margin: 0 14px;
  margin-bottom: 20px;
`;

export default {
  Container,
  TextCarouselWrapper,
};
