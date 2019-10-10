import styled from 'styled-components/native';

export const ButtonWrapper = styled.View`
  align-items: center;
  display: flex;
`;

export const Heading = styled.Text`
  color: ${props => props.theme.colors.PRIMARY.DARK};
  font-size: ${props => props.theme.fonts.fontSize.heading.large.h3}px;
  font-weight: bold;
  margin-bottom: ${props => props.theme.spacing.LAYOUT_SPACING.XS};
  margin-top: ${props => props.theme.spacing.LAYOUT_SPACING.SM};
  text-align: center;
  text-transform: uppercase;
`;

export const Wrapper = styled.View`
  display: flex;
  margin-bottom: ${props => props.theme.spacing.LAYOUT_SPACING.SM};
`;

export const Tile = styled.View`
  margin-bottom: ${props => props.theme.spacing.LAYOUT_SPACING.XXS};
  ${props => (props.tileIndex % 2 === 0 ? `margin-right: 14px ` : `margin-left: 5px`)};
`;

export const Container = styled.View`
  margin-bottom: ${props => props.theme.spacing.LAYOUT_SPACING.XXS};
`;

export const ListContainer = styled.View`
  align-items: center;
`;

export default {
  ButtonWrapper,
  Heading,
  Wrapper,
  Tile,
  Container,
  ListContainer,
};
