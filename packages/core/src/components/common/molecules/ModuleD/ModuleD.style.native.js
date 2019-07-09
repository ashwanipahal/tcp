import styled from 'styled-components/native';

export const ButtonWrapper = styled.View`
  align-items: center;
  display: flex;
  margin-top: ${props => props.theme.spacing.ELEM_SPACING.LRG};
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

export const ModuleDWrapper = styled.View`
  display: flex;
  padding-left: 14px;
  padding-right: 14px;
`;

export const Tile = styled.View`
  margin-bottom: ${props => props.theme.spacing.ELEM_SPACING.LRG};
  ${props => (props.tileIndex % 2 === 0 ? 'margin-right: 10px' : 'margin-left: 10px')};
  width: 50%;
`;

export default {
  ButtonWrapper,
  Heading,
  ModuleDWrapper,
  Tile,
};
