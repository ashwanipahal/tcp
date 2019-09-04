import { css } from 'styled-components';

const styles = css`
  ${props => `
  background: ${props.theme.colors.PRIMARY.PALEGRAY};
  padding: ${props.theme.spacing.ELEM_SPACING.XXXS};
  margin-bottom: 3px;`}

  .bonusPointsDaysWrapper {
    background-color: ${props => props.theme.colorPalette.white};
    padding: ${props => props.theme.spacing.ELEM_SPACING.LRG}
      ${props => props.theme.spacing.ELEM_SPACING.SM};
  }

  .right-sec {
    margin-bottom: ${props => (props.marginTop ? props.theme.spacing.LAYOUT_SPACING.MED : 0)};
    @media ${props => props.theme.mediaQuery.large} {
      margin-top: ${props => (props.marginTop ? props.theme.spacing.LAYOUT_SPACING.LRG : 0)};
      margin-bottom: 0;
    }
    @media ${props => props.theme.mediaQuery.mediumOnly} {
      margin-top: ${props => (props.marginTop ? props.theme.spacing.LAYOUT_SPACING.MED : 0)};
      margin-bottom: 0;
    }
  }

  .hide-mobile {
    display: none;
    @media ${props => props.theme.mediaQuery.medium} {
      display: block;
    }
  }
`;

export default styles;
