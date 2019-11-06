import styled from 'styled-components';

export const QuickViewAddToBagButtonWrapper = styled.View`
  bottom: 0px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  background-color: ${props => props.theme.colors.WHITE};
  padding: ${props => props.theme.spacing.ELEM_SPACING.SM} 14px;
`;

export default {
  QuickViewAddToBagButtonWrapper,
};
