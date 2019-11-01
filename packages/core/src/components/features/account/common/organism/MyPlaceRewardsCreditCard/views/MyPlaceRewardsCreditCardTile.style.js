import { css } from 'styled-components';

const styles = css`
  height: 100%;
  .cardDetailsWrapper {
    display: flex;
    padding-top: 12px;
  }
  .cardDescriptionWrapper {
    display: flex;
    flex-direction: column;
  }

  .container-top {
    display: flex;
    flex-direction: column;
    height: 100%;
    justify-content: space-between;
  }

  .list-style {
    text-decoration: none;
    li {
      list-style-type: disc;
      line-height: 22px;
    }
  }
`;

export default styles;
