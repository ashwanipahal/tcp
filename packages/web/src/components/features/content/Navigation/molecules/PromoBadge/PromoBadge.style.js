import { css } from 'styled-components';

export default css`
  &.nav-bar-l1-promo-badge {
    padding: 7px 25px;
    border-radius: ${props => (props.theme.isGymboree ? '12.5px' : '5px')};
    background-color: ${props =>
      props.theme.isGymboree
        ? props.theme.colorPalette.userTheme.bagde
        : props.theme.colorPalette.primary.main};
  }
`;
