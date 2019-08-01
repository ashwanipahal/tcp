import styled, { css } from 'styled-components/native';

const getPageStyle = props => {
  const { theme } = props;
  return `
  margin-horizontal: ${theme.spacing.LAYOUT_SPACING.SM};
  justify-content: ${'center'};

  `;
};
const SectionStyle = css`
  ${getPageStyle}
`;

const getTextBaseStyle = props => {
  const { theme } = props;
  const { typography } = theme;
  return `
    font-size: ${typography.fontSizes.fs14};
    color: ${theme.colorPalette.black};
    font-family: ${typography.fonts.secondary};
    border:1px solid ${theme.colorPalette.red[500]};
    padding:${theme.spacing.ELEM_SPACING.XXS};
    margin: ${theme.spacing.ELEM_SPACING.XS};
    `;
};

const NotificationWrapper = styled.Text`
  ${getTextBaseStyle}
`;

export { NotificationWrapper, SectionStyle };
