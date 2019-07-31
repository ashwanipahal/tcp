import styled from 'styled-components';

const getPageStyle = () => {
  return `
  margin-bottom: 30px;
  `;
};
const ScrollViewStyle = styled.ScrollView`
  ${getPageStyle}
`;

export default ScrollViewStyle;
