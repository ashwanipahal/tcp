import styled from 'styled-components';

const getPageStyle = props => {
  const { theme } = props;
  return `
  margin-bottom: ${theme.spacing.APP_LAYOUT_SPACING.XS}
  `;
};
const ScrollViewStyle = styled.ScrollView`
  ${getPageStyle}
`;

export default ScrollViewStyle;
