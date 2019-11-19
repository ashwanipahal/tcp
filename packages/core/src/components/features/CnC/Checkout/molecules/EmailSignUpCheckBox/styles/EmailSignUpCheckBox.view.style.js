import { css } from 'styled-components';

const styles = css`
  margin-bottom: ${props => props.theme.spacing.LAYOUT_SPACING.SM};
  ${props =>
    props.bottomSeparator
      ? `border-bottom: 1px solid ${props.theme.colorPalette.gray[500]};
  padding-bottom: ${props.theme.spacing.ELEM_SPACING.XL};
`
      : ''}

  .email-signUp-subHeading {
    margin-top: ${props => props.theme.spacing.ELEM_SPACING.SM};
    margin-bottom: ${props => props.theme.spacing.ELEM_SPACING.SM};
  }

  .email-checkbox-list {
    display: flex;
    flex: 1;
  }

  .email-signup-tcp {
    flex: 1;
  }

  .email-signup-gym {
    flex: 1;
    @media ${props => props.theme.mediaQuery.medium} {
      flex: 2;
    }
    @media ${props => props.theme.mediaQuery.large} {
      flex: 3;
    }
  }

  .email-signup-text {
    margin-top: ${props => props.theme.spacing.ELEM_SPACING.LRG};
    @media ${props => props.theme.mediaQuery.large} {
      max-width: 50%;
    }
  }

  .email-signup-disclaimer_txt {
    font-family: ${props => props.theme.typography.fonts.secondary};
    font-size: ${props => props.theme.typography.fontSizes.fs10};
  }
`;

export default styles;
