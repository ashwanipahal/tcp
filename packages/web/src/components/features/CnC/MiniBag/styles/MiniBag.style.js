import { css } from 'styled-components';

const styles = css`
  div.TCPModal__InnerContent {
    right: 0;
    left: auto;
    top: 0;
    bottom: 0;
    transform: none;
    box-shadow: 0 4px 8px 0 rgba(163, 162, 162, 0.5);
    padding: 7px 20px 20px;
    width: 480px;
  }
  .Modal_Heading {
    font-weight: normal;
    line-height: 43px;
    border: none;
    margin-bottom: 0;
    padding: 0;
    @media ${props => props.theme.mediaQuery.medium} {
      display: block;
    }
  }
  .mini-bg-close {
    top: 21px;
  }
  .edit-button {
    min-height: unset;
  }
`;

export default styles;
