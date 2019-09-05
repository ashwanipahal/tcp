import { css } from 'styled-components';

export default css`
  display: flex;
  float: right;
  padding-top: 3px;

  ${props =>
    props.showInFooter
      ? `
    padding: 34px 0 32px;
    float: left;

    @media ${props.theme.mediaQuery.large} {
      float: right;
      padding: 22px 0 12px;
    }
    `
      : ``}
`;
