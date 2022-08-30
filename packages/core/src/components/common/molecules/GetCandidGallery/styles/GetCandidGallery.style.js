import { css } from 'styled-components';

export default css`
  margin: ${props => props.theme.spacing.LAYOUT_SPACING.MED} 0;
  padding: 0 14px;

  .description {
    margin: ${props => props.theme.spacing.ELEM_SPACING.MED} 0;

    @media ${props => props.theme.mediaQuery.large} {
      margin: ${props => props.theme.spacing.ELEM_SPACING.SM} 0;
    }
  }

  .button-container {
    margin-top: ${props => props.theme.spacing.ELEM_SPACING.MED};
    margin-bottom: ${props => props.theme.spacing.ELEM_SPACING.LRG};
    text-align: center;

    @media ${props => props.theme.mediaQuery.medium} {
      margin-bottom: ${props => props.theme.spacing.ELEM_SPACING.XL};
      .add-photo-btn {
        width: 162px;
      }
    }

    @media ${props => props.theme.mediaQuery.large} {
      margin: ${props => props.theme.spacing.ELEM_SPACING.XL} 0;
      .add-photo-btn {
        width: 210px;
      }
    }
  }
`;
