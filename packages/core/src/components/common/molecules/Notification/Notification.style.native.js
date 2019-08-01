import styled, { css } from 'styled-components/native';

const getPageStyle = () => {
  return `
  margin-horizontal: ${'30px'}
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
    color: #000;
    font-family: ${typography.fonts.secondary};
    border:1px solid #c8102e;
    padding:5px;
    margin:10px;
    `;
};

const NotificationWrapper = styled.Text`
  ${getTextBaseStyle}
`;

export { NotificationWrapper, SectionStyle };
