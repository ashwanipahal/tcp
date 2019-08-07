import { css } from 'styled-components';

const Styles = css`
  .alignCenter {
    display: flex;
    justify-content: center;
  }
  .extraPointsWrapper {
    background-color: ${props => props.theme.colorPalette.orange[300]};
  }
`;

export default Styles;
