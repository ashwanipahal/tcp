import { css } from 'styled-components';

const styles = css`
  .bordered {
    border-top: 1px solid ${props => props.theme.colors.BORDER.BLUE};
    border-bottom: 1px solid ${props => props.theme.colors.BORDER.BLUE};
  }
`;

export default styles;
