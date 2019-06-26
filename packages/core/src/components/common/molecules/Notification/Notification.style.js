import { css } from 'styled-components';

const NotificationStyle = css`
  margin-bottom: ${props => props.theme.spacing.LAYOUT_SPACING.XS};
  .notification {
    font-weight: ${props => props.theme.fonts.fontWeight.bold};
  }
  ${props =>
    props.status === 'success' &&
    `
    border: ${props.theme.spacing.ELEM_SPACING.XXXS} solid ${
      props.theme.colors.NOTIFICATION.SUCCESS
    };
    border-radius: ${props.theme.spacing.ELEM_SPACING.XXXS};
    color: ${props.theme.colors.TEXT.DARKGRAY};
    background-color: ${props.theme.colors.WHITE};
    padding: ${props.theme.spacing.ELEM_SPACING.XXS} 0 ${props.theme.spacing.ELEM_SPACING.XS} ${
      props.theme.spacing.ELEM_SPACING.XXS
    };
  `}
  ${props =>
    props.status === 'error' &&
    `
    border-radius: ${props.theme.spacing.ELEM_SPACING.XXXS};
    color: ${props.theme.colors.WHITE};
    background-color: ${props.theme.colors.NOTIFICATION.ERROR};
    padding: ${props.theme.spacing.ELEM_SPACING.XS} 0 ${props.theme.spacing.ELEM_SPACING.SM} ${
      props.theme.spacing.ELEM_SPACING.SM
    };
  `}
`;
export default NotificationStyle;
