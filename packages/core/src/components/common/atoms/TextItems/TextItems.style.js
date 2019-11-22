import { css } from 'styled-components';

const textItemsStyle = css`
  .header-icon {
    width: 47px;
    height: 40px;
    margin: 0 ${props => props.theme.spacing.ELEM_SPACING.XXS} -${props => props.theme.spacing.ELEM_SPACING.XS};

    @media ${props => props.theme.mediaQuery.large} {
      width: 66px;
      height: 56px;
    }
  }
`;

export default textItemsStyle;
