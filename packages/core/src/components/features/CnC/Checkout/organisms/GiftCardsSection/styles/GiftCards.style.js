import { css } from 'styled-components';

const styles = css`
  .new_gift_card_button {
    background-color: ${props => props.theme.colors.BLACK};
    color: ${props => props.theme.colors.WHITE};
    font-size: ${props => props.theme.typography.fontSizes.fs14};
  }
  .headsUpMsgBoldTitle {
    font-family: ${props => props.theme.typography.fonts.secondaryFontSemilBoldFamily};
    font-weight: ${props => props.theme.fonts.fontWeight.bold};
    font-size: ${props => props.theme.typography.fontSizes.fs16};
    margin-right: ${props => props.theme.spacing.ELEM_SPACING.XS};
  }
`;

export default styles;
