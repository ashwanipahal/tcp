import { css } from 'styled-components';

const styles = css`
  input {
    background-color: ${props => props.theme.colorPalette.gray[300]};
  }
  @media ${props => props.theme.mediaQuery.smallOnly} {
    .exp-year-field:nth-child(3) {
      margin-right: auto;
    }
  }
`;

export default styles;
