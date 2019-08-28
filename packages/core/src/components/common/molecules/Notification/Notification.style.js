import { css } from 'styled-components';

const NotificationStyle = css`
  align-items: center;
  display: flex;
  border: 2px solid
    ${props =>
      props.status === 'success'
        ? props.theme.colorPalette.green[500]
        : props.theme.colorPalette.red[500]};
  background-color: ${props => props.theme.colorPalette.white};
`;
export default NotificationStyle;
