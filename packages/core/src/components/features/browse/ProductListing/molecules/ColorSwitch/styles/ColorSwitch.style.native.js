import styled, { css } from 'styled-components/native';

const getImageStyle = () => {
  return `
    width: 16;
    height: 16;
    resize-mode: contain;
    border-color: rgba(26, 26, 26, 0);
    border-width: 1;
    border-radius: 8;
  `;
};
// border-radius: 16 / 2;
const getSelectedImageStyle = props => {
  const { theme } = props;
  const { colorPalette } = theme;
  const borderColor = colorPalette.gray[900];
  return `
    width: 16;
    height: 16;
    resize-mode: contain;
    border-color: ${borderColor};
    border-width: 1;
    border-radius: 8;
  `;
};

const ColorSwitchesContainer = styled.View`
  height: 17;
  margin-top: ${props => props.theme.spacing.ELEM_SPACING.XS};
`;

const ItemSeparatorStyle = styled.View`
  margin-left: ${props => props.theme.spacing.ELEM_SPACING.XS};
`;

const ImageStyle = styled.Image`
  ${getImageStyle}
`;

const SelectedImageStyle = styled.Image`
  ${getSelectedImageStyle}
`;

const styles = css``;

export { styles, ColorSwitchesContainer, ItemSeparatorStyle, ImageStyle, SelectedImageStyle };
