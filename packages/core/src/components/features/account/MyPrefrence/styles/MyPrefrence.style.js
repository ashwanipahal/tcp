import { css } from 'styled-components';

export default css`
  .profileInfoSeparator {
    border: 0.5px solid ${props => props.theme.colorPalette.gray[1400]};
  }

  .elm-padding-top {
    padding-top: ${props => props.theme.spacing.ELEM_SPACING.LRG};
  }

  .CheckBox__text {
    padding-top: ${props => props.theme.spacing.ELEM_SPACING.XXS};
  }
  .favtPageLink {
    padding-right: ${props => props.theme.spacing.ELEM_SPACING.XL};
  }
`;
