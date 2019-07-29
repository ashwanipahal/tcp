import { css } from 'styled-components';

const styles = css`
  position: relative;

  img {
    position: absolute;
    top: 0;
    right: 0;
    width: ${props => props.theme.spacing.CREDIT_CARD_ICON_WIDTH};
  }
`;

export default styles;
