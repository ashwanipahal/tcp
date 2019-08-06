import { css } from 'styled-components';

const styles = css`
  .place-rewards__heading {
    border-bottom: 3px solid ${props => props.theme.colorPalette.black};
    padding-bottom: ${props => props.theme.spacing.ELEM_SPACING.SM};
    margin-bottom: ${props => props.theme.spacing.ELEM_SPACING.MED};
    @media ${props => props.theme.mediaQuery.medium} {
      margin-bottom: ${props => props.theme.spacing.ELEM_SPACING.XL};
    }
  }
  .place-rewards-sections-row1,
  .place-rewards-sections-row2 {
    @media ${props => props.theme.mediaQuery.medium} {
      border-bottom: 1px solid ${props => props.theme.colorPalette.gray[500]};
      padding-bottom: ${props => props.theme.spacing.ELEM_SPACING.LRG};
      margin-bottom: ${props => props.theme.spacing.ELEM_SPACING.LRG};
    }
  }
  .place-rewards-sections-row2 {
    @media ${props => props.theme.mediaQuery.medium} {
      margin-bottom: ${props => props.theme.spacing.ELEM_SPACING.XXL};
    }
  }
  .place-rewards-col1,
  .place-rewards-col2,
  .place-rewards-col3 {
    margin-bottom: ${props => props.theme.spacing.ELEM_SPACING.LRG};
  }

  .place-rewards-col4 {
    margin-bottom: ${props => props.theme.spacing.ELEM_SPACING.XL};
  }

  .place-rewards-col1,
  .place-rewards-col2,
  .place-rewards-col3,
  .place-rewards-col4 {
    @media ${props => props.theme.mediaQuery.medium} {
      margin-bottom: 0;
    }
  }
  .place-rewards-col1,
  .place-rewards-col3 {
    @media ${props => props.theme.mediaQuery.medium} {
      box-sizing: border-box;
      border-right: 1px solid ${props => props.theme.colorPalette.gray[500]};
    }
  }
`;

export default styles;
