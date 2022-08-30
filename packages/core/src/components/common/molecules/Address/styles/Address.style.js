import { css } from 'styled-components';

const styles = css`
  .addressLine {
    @media ${props => props.theme.mediaQuery.medium} {
      ${props =>
        props.singleLineAddress
          ? `
        display: flex;
        flex-wrap: wrap;

        & > p {
          margin-right: ${props.theme.spacing.ELEM_SPACING.XXS}
        }
      `
          : ``}
    }
  }
  ${props => (props.inheritedStyles ? props.inheritedStyles : '')};
`;

export default styles;
