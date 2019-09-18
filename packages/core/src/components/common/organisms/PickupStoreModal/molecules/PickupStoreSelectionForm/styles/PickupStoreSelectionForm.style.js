import { css } from 'styled-components';

export default css`
  .TextBox__input,
  .select__input {
    padding-top: 18px;
  }
  @media ${props => props.theme.mediaQuery.large} {
    .distance-input {
      margin: 0 10px;
    }
    .TextBox__input,
    .select__input {
      padding-top: 26px;
    }
  }
`;
