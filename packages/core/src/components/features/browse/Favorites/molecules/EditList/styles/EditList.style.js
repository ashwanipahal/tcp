import { css } from 'styled-components';

export default css`
  .default-check-row {
    p {
      padding-top: 5px;
    }
    img {
      width: 15px;
      height: 13px;
      padding-left: 7px;
      vertical-align: middle;
    }
  }
  .delete-list-link {
    button {
      text-align: center;
      border: none;
      text-decoration: underline;
      text-transform: none;
      padding: 0;
      font-size: ${props => props.theme.typography.fontSizes.fs14};
      font-weight: ${props => props.theme.typography.fontWeights.regular};
      min-height: 12px;
      height: auto;
      &:hover {
        background: none;
      }
      &:focus {
        background: none;
      }
    }
  }
`;
