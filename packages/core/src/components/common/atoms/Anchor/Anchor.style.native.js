import { css } from 'styled-components/native';

const AnchorStyles = css`
  background: ${props => props.theme.colorPalette.white};
  color: ${props => props.theme.colorPalette.black};
  font-size: ${props => props.theme.typography.fontSizes.fs16};
  font-weight: ${props => props.theme.typography.fontWeights.black};
`;

export default AnchorStyles;
