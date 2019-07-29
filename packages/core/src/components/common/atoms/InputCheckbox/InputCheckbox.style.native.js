import styled from 'styled-components/native';

const StyledCheckBox = styled.View`
  display: flex;
  flex-direction: row;
  align-items: center;
`;

const StyledImage = styled.View`
  margin-right: ${props => props.theme.spacing.ELEM_SPACING.SM};
`;

export { StyledCheckBox, StyledImage };
