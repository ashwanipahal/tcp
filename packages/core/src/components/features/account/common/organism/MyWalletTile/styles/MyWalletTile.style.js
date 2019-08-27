import { css } from 'styled-components';

const styles = css`
  .bordered {
    border-bottom: 1px solid ${props => props.theme.colors.BORDER.NORMAL};
  }
`;

export default styles;
