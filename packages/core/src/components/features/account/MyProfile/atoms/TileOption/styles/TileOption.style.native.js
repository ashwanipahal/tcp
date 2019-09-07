import styled from 'styled-components/native';

export const TileContainer = styled.TouchableOpacity`
  align-items: center;
  justify-content: center;
  width: 150px;
  height: 42px;
  border-radius: 6px;
  text-align: center;
  border: solid 2px ${props => props.theme.colors.BORDER.BLUE};
  background-color: ${props =>
    props.isSelected ? props.theme.colorPalette.gray['500'] : props.theme.colorPalette.white};
`;

export const TextWrapper = styled.View`
  margin: ${props => props.theme.spacing.APP_LAYOUT_SPACING.XXS}
    ${props => props.theme.spacing.ELEM_SPACING.XXXS};
  align-items: center;
  align-content: center;
  text-align: center;
`;
