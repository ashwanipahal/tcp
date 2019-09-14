import { css } from 'styled-components';

export default css`
  .profileInfoSeparator {
    border: 0.5px solid ${props => props.theme.colors.BORDER.LIGHT};
  }

  .InputCheckbox {
    padding-top: ${props => props.theme.spacing.ELEM_SPACING.XS};
  }

  .favtPageLink {
    padding-right: ${props => props.theme.spacing.ELEM_SPACING.XL};
  }
  .hideOnMobile {
    @media ${props => props.theme.mediaQuery.smallOnly} {
      display: none;
    }
  }
`;
