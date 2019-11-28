import { css } from 'styled-components';

const styles = css`
  margin-top: ${props => props.theme.spacing.ELEM_SPACING.LRG};

  .gift-wrapping-title {
    margin-bottom: ${props => props.theme.spacing.ELEM_SPACING.MED};
  }
  .header {
    display: flex;
    flex-direction: row;
  }
  .editAnchor {
    margin-left: ${props => props.theme.spacing.ELEM_SPACING.XS};
    align-self: flex-end;
    padding-bottom: ${props => props.theme.spacing.ELEM_SPACING.XXXS};
    margin-bottom: ${props => props.theme.spacing.ELEM_SPACING.MED};
    @media @media ${props => props.theme.mediaQuery.large},
      ${props => props.theme.mediaQuery.medium} {
      display: none;
    }
  }
  .anchorStyle {
    font-size: ${props => props.theme.spacing.ELEM_SPACING.SM};
    color: ${props => props.theme.colors.ANCHOR.PRIMARY};
  }
`;

export default styles;
