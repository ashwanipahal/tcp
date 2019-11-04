import { css } from 'styled-components';

const styles = css`
  height: 100%;
  .cardDetailsWrapper {
    display: flex;
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
      line-height: ${props => props.theme.fonts.lineHeight.normal};
      span {
        margin: -7px;
      }
    }
  }
`;

export default styles;
