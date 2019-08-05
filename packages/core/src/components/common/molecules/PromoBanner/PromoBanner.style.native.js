import styled from 'styled-components/native';

export const StyledText = styled.Text`
  font-family: ${props => props.theme.typography.fonts.primary};
  ${props =>
    props.style === 'style1'
      ? `
      color: ${props.theme.colorPalette.gray['900']};
      font-size: ${props.theme.typography.fontSizes.fs42};
    `
      : `
      color: ${props.theme.colorPalette.black};
      font-weight: ${props.theme.typography.fontWeights.black}};
      font-size: ${props.theme.typography.fontSizes.fs70};
    `};
  text-align: center;
`;

export default {
  StyledText,
};
