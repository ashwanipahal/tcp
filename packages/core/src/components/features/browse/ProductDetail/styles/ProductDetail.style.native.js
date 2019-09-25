import styled from 'styled-components';

const PageContainer = styled.View`
  justify-content: center;
  margin-left: ${props => props.theme.spacing.ELEM_SPACING.SM};
  margin-right: ${props => props.theme.spacing.ELEM_SPACING.SM};
`;

export const ModalCarousel = styled.View`
  justify-content: center;
  height: ${props => props.height};
`;

export default PageContainer;
