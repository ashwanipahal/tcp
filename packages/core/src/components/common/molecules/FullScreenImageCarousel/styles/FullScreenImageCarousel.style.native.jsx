import styled from 'styled-components';

export const ModalCarousel = styled.View`
  justify-content: center;
  height: ${props => props.height};
  margin-top: ${props => props.theme.spacing.ELEM_SPACING.XXL};
`;

export const PaginationContainer = styled.View`
  justify-content: center;
  flex-direction: row;
  align-items: center;
  width: 100%;
  position: absolute;
  bottom: 60;
`;
