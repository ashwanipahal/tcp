import styled from 'styled-components/native';

export const StyledViewWrapper = styled.View`
  padding:0 14px;
  justify-content:center;
  align-content:center;
  margin-top:150px;
`;

export const StyledText = styled.Text`
margin-bottom:39px;
justify-content:center;
align-content:center;
`

export const ButtonWrapper = styled.View`
  margin-bottom: ${props => props.theme.spacing.ELEM_SPACING.LRG};
`;

export default {
  StyledViewWrapper,
  ButtonWrapper
};
