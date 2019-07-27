import { css } from 'styled-components';

const MyAccountNavLinkStyles = css`
  padding: 0;
  box-sizing: border-box;
  @media ${props => props.theme.mediaQuery.large} {
    border-right: ${props => props.theme.spacing.ELEM_SPACING.XXXS} solid
      ${props => props.theme.colors.PRIMARY.LIGHTGRAY};
  }
  .nav-link-wrapper {
    padding: ${props => props.theme.spacing.ELEM_SPACING.SM} 0;
  }

  .nav-sub-section {
    padding-left: 0;
    padding-top: ${props => props.theme.spacing.ELEM_SPACING.SM};
    border: none;
    li {
      padding-bottom: 0;
      padding-left: ${props => props.theme.spacing.ELEM_SPACING.LRG};
    }
  }
`;

export default MyAccountNavLinkStyles;
