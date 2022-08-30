import styled, { css } from 'styled-components/native';
import { DamImage } from '../../../../../../common/atoms';

const getImageStyle = props => {
  const { selected } = props;
  const size = 14;
  const radius = 7.5;
  const width = selected ? size - 3 : size;
  const height = selected ? size - 3 : size;
  const borderRadius = selected ? radius + 1 : radius;
  return `
    width: ${width};
    height: ${height};
    border-radius: ${borderRadius};
    resize-mode: cover;
    border-width: 0;
  `;
};

const getImageBorderStyle = props => {
  const { theme, selected } = props;
  const { colorPalette } = theme;
  const borderColor = selected ? colorPalette.gray[900] : colorPalette.gray[600];
  const size = 14;
  const radius = 8;
  const width = selected ? size + 1 : size;
  const height = selected ? size + 1 : size;
  const borderRadius = selected ? radius + 1 : radius;

  return `
    width: ${width};
    height: ${height};
    border-radius: ${borderRadius};
    border-color: ${borderColor};
    border-width: 1;
    align-items: center;
    justify-content: center;
  `;
};

const ColorSwitchesContainer = styled.View`
  height: 17;
  margin-top: ${props => props.theme.spacing.ELEM_SPACING.XS};
`;

const ImageTouchableOpacity = styled.TouchableOpacity`
  ${getImageBorderStyle}
`;

const ItemSeparatorStyle = styled.View`
  margin-left: ${props => props.theme.spacing.ELEM_SPACING.XS};
`;

const ImageStyle = styled(DamImage)`
  ${getImageStyle}
`;
const styles = css``;

export { styles, ImageTouchableOpacity, ColorSwitchesContainer, ItemSeparatorStyle, ImageStyle };
