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
  const { theme } = props;
  return `
    color: ${theme.colorPalette.red[500]};
    border:1px solid ${theme.colorPalette.red[500]};
    padding:${theme.spacing.ELEM_SPACING.MED};
    margin: ${theme.spacing.ELEM_SPACING.XS};
    `;
};

const NotificationWrapper = styled.View`
  ${getTextBaseStyle}
`;

export { NotificationWrapper, SectionStyle };
