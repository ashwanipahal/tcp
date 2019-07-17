import { css } from 'styled-components';

const styles = css`
  .add-gift-card__separator {
    border-bottom: 3px solid ${props => props.theme.colors.BLACK};
    padding-bottom: ${props => props.theme.spacing.ELEM_SPACING.SM};
    margin-bottom: ${props => props.theme.spacing.ELEM_SPACING.XXXL};
  }
  .add-gift-card__row {
    margin-top: ${props => props.theme.spacing.ELEM_SPACING.LRG};
    display: flex;
    align-items: flex-end;
  }
  .add-gift-card__row__message-container {
    background-color: #d8d8d8;
    padding: ${props => props.theme.spacing.ELEM_SPACING.MED}
      ${props => props.theme.spacing.ELEM_SPACING.LRG}
      ${props => props.theme.spacing.ELEM_SPACING.LRG};
    font-family: ${props => props.theme.typography.fonts.secondary};
    letter-spacing: ${props => props.theme.typography.letterSpacings.normal};
    font-style: normal;
    font-stretch: normal;
  }

  .add-gift-card__message__title {
    font-size: ${props => props.theme.typography.fontSizes.fs14};
    font-weight: ${props => props.theme.typography.fontWeights.extrabold};
    line-height: ${props => props.theme.typography.lineHeights.lh107};
    color: ${props => props.theme.colorPalette.black};
  }

  .add-gift-card__message {
    font-size: ${props => props.theme.typography.fontSizes.fs12};
    font-weight: ${props => props.theme.typography.fontWeights.regular};
    line-height: ${props => props.theme.typography.lineHeights.normal};
    color: ${props => props.theme.colorPalette.black};
  }

  .add-gift-card__first-button-container {
    @media ${props => props.theme.mediaQuery.medium} {
      margin-top: ${props => props.theme.spacing.ELEM_SPACING.XXXL};
    }
    @media ${props => props.theme.mediaQuery.small} {
      margin-top: ${props => props.theme.spacing.ELEM_SPACING.XXL};
    }
  }
  .add-gift-card__second-button-container {
    @media ${props => props.theme.mediaQuery.medium} {
      margin-top: ${props => props.theme.spacing.ELEM_SPACING.XXXL};
    }
    @media ${props => props.theme.mediaQuery.small} {
      margin-top: ${props => props.theme.spacing.ELEM_SPACING.MED};
    }
  }
`;

export default styles;
