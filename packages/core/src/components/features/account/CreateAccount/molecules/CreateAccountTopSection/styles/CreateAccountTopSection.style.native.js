import styled, { css } from 'styled-components/native';

const getPageStyle = props => {
  const { theme } = props;
  return `
   margin: auto  ${theme.spacing.APP_LAYOUT_SPACING.SM};
  justify-content: ${'center'};

  `;
};
const SectionStyle = css`
  ${getPageStyle}
`;

const CenterAlignWrapper = styled.View`
  display: flex;
  justify-content: ${'center'};
  align-items: center;
`;

const TextAlignCenter = styled.Text`
  text-align: center;
`;

export { SectionStyle, CenterAlignWrapper, TextAlignCenter };
