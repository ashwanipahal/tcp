import styled from 'styled-components/native';

const StyledRowDataContainer = styled.View`
  flex-direction: row;
  margin: 4px 0;
  justify-content: space-between;
`;
const HeadRowDataContainer = styled.View`
  flex-direction: row;
  justify-content: space-between;
  margin: ${props => props.theme.spacing.ELEM_SPACING.XL} 0
    ${props => props.theme.spacing.ELEM_SPACING.SM} 0;
`;

export { StyledRowDataContainer, HeadRowDataContainer };
