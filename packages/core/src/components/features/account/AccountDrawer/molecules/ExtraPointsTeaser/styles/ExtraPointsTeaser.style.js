import { css } from 'styled-components';

const Styles = css`
  padding: 16px 38px 24px 38px;
  .alignCenter {
    display: flex;
    justify-content: center;
  }
  .extraPointsWrapper {
    background-color: ${props => props.theme.colorPalette.orange[300]};
    padding-top: 20px;
    padding-bottom: 12px;
  }
  .getCloser {
    padding-top: 7px;
  }
  .learnMore {
    padding-top: 7px;
  }
`;

export default Styles;
