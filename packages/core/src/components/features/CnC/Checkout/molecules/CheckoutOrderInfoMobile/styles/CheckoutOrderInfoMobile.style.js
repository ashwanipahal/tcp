import { css } from 'styled-components';

const styles = css`
  @media ${props => props.theme.mediaQuery.medium} {
    display: none;
  }
  .order-summary {
    margin-top: ${props => props.theme.spacing.ELEM_SPACING.MED};
  }

  @media ${props => props.theme.mediaQuery.smallMax} {
    .order-summary {
      padding: 0;
      margin-bottom: ${props => props.theme.spacing.ELEM_SPACING.MED};
    }
  }

  .bonusPointsDaysWrapper {
    background-color: ${props => props.theme.colorPalette.white};
    padding: ${props => props.theme.spacing.ELEM_SPACING.LRG}
      ${props => props.theme.spacing.ELEM_SPACING.SM};
  }

  .bonusPointsDaysWrapperAccordian {
    background-color: ${props => props.theme.colorPalette.white};
    padding: ${props => props.theme.spacing.ELEM_SPACING.LRG}
      ${props => props.theme.spacing.ELEM_SPACING.SM};
    @media ${props => props.theme.mediaQuery.smallMax} {
      padding-top: 0px;
      padding-bottom: 0px;
      width: 101%;
      margin-left: -14px;
    }
  }
`;

export default styles;
