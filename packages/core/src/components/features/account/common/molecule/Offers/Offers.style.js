import { css } from 'styled-components';

const styles = css`
  margin: 0;
  .offers_msg--blue {
    color: ${props => props.theme.colorPalette.primary.main};
  }
  .offers_link {
    color: ${props => props.theme.colorPalette.black};
    font-size: ${props => props.theme.typography.fontSizes.fs12};
    font-weight: ${props => props.theme.typography.fontWeights.semibold};
    font-family: ${props => props.theme.typography.fonts.secondary};
  }
`;

export default styles;
