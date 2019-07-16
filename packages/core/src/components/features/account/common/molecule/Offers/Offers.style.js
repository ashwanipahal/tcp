import { css } from 'styled-components';

const styles = css`
  margin: 0;
  .offers__msg {
    color: ${props => props.theme.colorPalette.primary.main};
  }
  .offers__link {
    color: ${props => props.theme.colorPalette.black};
    font-size: ${props => props.theme.typography.fontSizes.fs12};
    font-weight: ${props => props.theme.typography.fontWeights.semibold};
    font-family: ${props => props.theme.typography.fonts.secondary};
  }
`;

export default styles;
