import styled from 'styled-components';

const StyledTest = styled.div`
  background: ${props => props.theme.colors.BRAND.PRIMARY};
  font-family: ${props => props.theme.fonts.primaryFontFamily};
  font-size: ${props => props.theme.fonts.fontSize.heading.large.h1}px;
`;

export default StyledTest;
