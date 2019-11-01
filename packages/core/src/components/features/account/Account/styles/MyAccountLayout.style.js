import { css } from 'styled-components';

const MyAccountNavLinkStyles = css`
  padding: 0;
  box-sizing: border-box;
  height: 100%;
  width: 100%;
  @media ${props => props.theme.mediaQuery.large} {
    border-right: 1px solid ${props => props.theme.colors.PRIMARY.LIGHTGRAY};
  }
  .nav-link-wrapper {
    padding: ${props => props.theme.spacing.ELEM_SPACING.MED} 0 0;
  }

  .nav-sub-section {
    padding-left: 0;
    padding-top: ${props => props.theme.spacing.ELEM_SPACING.XS};
    border: none;
    li {
      padding: ${props => props.theme.spacing.ELEM_SPACING.XS} 0 0
        ${props => props.theme.spacing.ELEM_SPACING.LRG};
    }
  }
`;

export default MyAccountNavLinkStyles;
