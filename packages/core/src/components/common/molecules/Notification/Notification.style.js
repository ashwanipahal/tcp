import { css } from 'styled-components';

const NotificationStyle = css`
  align-items: center;
  display: flex;

  ${props =>
    props.status === 'success' ? `border: 2px solid ${props.theme.colorPalette.green[500]};` : ''};
  ${props =>
    props.status === 'error' ? `border: 2px solid ${props.theme.colorPalette.red[500]};` : ''};
  ${props =>
    props.status === 'info' ? `border: 2px solid ${props.theme.colorPalette.gray[600]};` : ''};

  background-color: ${props => props.theme.colorPalette.white};

  .notification__image {
    height: 24px;
  }
`;
export default NotificationStyle;
