import { css } from 'styled-components';

const styles = css`
  position: relative;

  img {
    position: absolute;
    top: 0;
    right: 0;
    width: ${props => props.theme.spacing.CREDIT_CARD_ICON_WIDTH};
    border: 1px solid ${props => props.theme.colorPalette.gray[500]};
    border-radius: ${props => props.theme.spacing.ELEM_SPACING.XS};
  }
`;

export default styles;
