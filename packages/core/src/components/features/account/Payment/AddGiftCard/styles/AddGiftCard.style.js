import { css } from 'styled-components';

const styles = css`
  .card__separator {
    border-bottom: 3px solid ${props => props.theme.colors.BLACK};
    padding-bottom: ${props => props.theme.spacing.ELEM_SPACING.SM};
    margin-bottom: ${props => props.theme.spacing.ELEM_SPACING.XXXL};
  }
  .card__row {
    margin-top: ${props => props.theme.spacing.ELEM_SPACING.LRG};
    display: flex;
    align-items: flex-end;
  }
  .card__msgWrapper {
    background-color: ${props => props.theme.colorPalette.gray[500]};
    padding: ${props => props.theme.spacing.ELEM_SPACING.MED}
      ${props => props.theme.spacing.ELEM_SPACING.LRG}
      ${props => props.theme.spacing.ELEM_SPACING.LRG};
    font-family: ${props => props.theme.typography.fonts.secondary};
    letter-spacing: ${props => props.theme.typography.letterSpacings.normal};
    font-style: normal;
    font-stretch: normal;
  }

  .card__msg {
    font-size: ${props => props.theme.typography.fontSizes.fs12};
    font-weight: ${props => props.theme.typography.fontWeights.regular};
    line-height: ${props => props.theme.typography.lineHeights.normal};
    color: ${props => props.theme.colorPalette.black};
  }

  .card__msg--bold {
    font-size: ${props => props.theme.typography.fontSizes.fs14};
    font-weight: ${props => props.theme.typography.fontWeights.extrabold};
    line-height: ${props => props.theme.typography.lineHeights.lh107};
  }

  .card__btn {
    @media ${props => props.theme.mediaQuery.medium} {
      margin-top: ${props => props.theme.spacing.ELEM_SPACING.XXXL};
    }
    @media ${props => props.theme.mediaQuery.small} {
      margin-top: ${props => props.theme.spacing.ELEM_SPACING.XXL};
    }
  }
  .card__btn--medium {
    @media ${props => props.theme.mediaQuery.small} {
      margin-top: ${props => props.theme.spacing.ELEM_SPACING.MED};
    }
  }
  .card__recaptcha {
    position: absolute;
  }
`;

export default styles;
