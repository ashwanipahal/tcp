import { css } from 'styled-components';

const styles = css`
  .new_gift_card_button {
    background-color: ${props => props.theme.colors.BLACK};
    color: ${props => props.theme.colors.WHITE};
    font-size: ${props => props.theme.typography.fontSizes.fs14};
  }
`;

export default styles;
