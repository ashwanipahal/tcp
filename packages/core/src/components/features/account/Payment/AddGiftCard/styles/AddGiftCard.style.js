import { css } from 'styled-components';

const styles = css`
  .addGiftCard__separator {
    border-bottom: 3px solid ${props => props.theme.colors.BLACK};
    padding-bottom: ${props => props.theme.spacing.ELEM_SPACING.SM};
    margin-bottom: ${props => props.theme.spacing.ELEM_SPACING.MED};
  }
  .addGiftCard_row {
    margin-top: ${props => props.theme.spacing.ELEM_SPACING.LRG};
    display: flex;
    align-items: flex-end;
  }
  .addGiftCard__row__message__container {
    background-color: #d8d8d8;
    padding: ${props => props.theme.spacing.ELEM_SPACING.MED}
      ${props => props.theme.spacing.ELEM_SPACING.LRG}
      ${props => props.theme.spacing.ELEM_SPACING.LRG};
    font-family: ${props => props.theme.typography.fonts.secondary};
    letter-spacing: ${props => props.theme.typography.letterSpacings.normal};
    font-style: normal;
    font-stretch: normal;
  }

  .addGiftCard__message_title {
    font-size: ${props => props.theme.typography.fontSizes.fs14};
    font-weight: ${props => props.theme.typography.fontWeights.extrabold};
    line-height: ${props => props.theme.typography.lineHeights.lh107};
    color: ${props => props.theme.colorPalette.black};
  }

  .addGiftCard__message {
    font-size: ${props => props.theme.typography.fontSizes.fs12};
    font-weight: ${props => props.theme.typography.fontWeights.regular};
    line-height: ${props => props.theme.typography.lineHeights.normal};
    color: ${props => props.theme.colorPalette.black};
  }
`;

export default styles;
