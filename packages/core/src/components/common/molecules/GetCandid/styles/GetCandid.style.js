import { css } from 'styled-components';

const candidContainer = css`
  border-bottom: 7px solid #f7f7f7;
`;

const getCandid = css`
  .get-candid-default-heading {
    .get-candid-main-heading {
      margin-bottom: 10px;
    }

    .get-candid-heading-desc {
      margin-bottom: 26px;
    }
  }

  .get-candid-button-container {
    * {
      display: flex;
      align-items: center;
      justify-content: center;
    }
    margin-top: 14px;
    width: 100%;
  }

  .u-margin-right {
    margin-right: 30px;
  }
`;

export { getCandid, candidContainer };
