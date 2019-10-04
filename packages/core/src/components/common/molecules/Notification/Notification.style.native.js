import styled, { css } from 'styled-components/native';

const getPageStyle = props => {
  const { theme } = props;
  return `
 margin: auto  ${theme.spacing.APP_LAYOUT_SPACING.XS};
  justify-content: center;

  `;
};
const SectionStyle = css`
  ${getPageStyle}
`;

const getTextBaseStyle = props => {
  const { theme, status } = props;
  return `
    color: ${theme.colorPalette.red[500]};

    ${status === 'success' ? `border: 2px solid ${props.theme.colorPalette.green[500]};` : ''};
      ${status === 'error' ? `border: 2px solid ${props.theme.colorPalette.red[500]};` : ''};
      ${status === 'info' ? `border: 2px solid ${props.theme.colorPalette.gray[600]};` : ''};
    padding:${theme.spacing.ELEM_SPACING.MED};
    margin: ${theme.spacing.ELEM_SPACING.XS};
    `;
};

const NotificationWrapper = styled.View`
  flex-direction: row;
  ${getTextBaseStyle};
`;

export { NotificationWrapper, SectionStyle };
