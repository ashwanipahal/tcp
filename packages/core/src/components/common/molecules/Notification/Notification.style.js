import { css } from 'styled-components';
// TODO: change LAYOUT_SPACING to LAYOUT

const NotificationStyle = css`
  margin-bottom: ${props => props.theme.spacing.LAYOUT_SPACING.XS};
  .notification {
    font-weight: ${props => props.theme.fonts.fontWeight.bold};
    color: ${props =>
      props.status === 'success' ? props.theme.colors.TEXT.DARKGRAY : props.theme.colors.WHITE};
  }
  img {
    vertical-align: middle;
    margin-right: ${props => props.theme.spacing.ELEM_SPACING.MED};
  }
  border-radius: ${props => props.theme.spacing.ELEM_SPACING.XXXS};
  ${props =>
    props.status === 'success' &&
    `
    border: ${props.theme.spacing.ELEM_SPACING.XXXS} solid ${
      props.theme.colors.NOTIFICATION.SUCCESS
    };
    background-color: ${props.theme.colors.WHITE};
    padding: ${props.theme.spacing.ELEM_SPACING.XS}
    };
  `}
  ${props =>
    props.status === 'error' &&
    `
    background-color: ${props.theme.colors.NOTIFICATION.ERROR};
    padding: ${props.theme.spacing.ELEM_SPACING.XS} 0 ${props.theme.spacing.ELEM_SPACING.SM} ${
      props.theme.spacing.ELEM_SPACING.SM
    };
  `}
`;
export default NotificationStyle;
