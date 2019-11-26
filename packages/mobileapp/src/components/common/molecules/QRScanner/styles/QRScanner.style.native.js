import styled from 'styled-components/native';

export const HelpText = styled.Text`
  margin-top: 24px;
  height: 22px;
`;

export const BackContainer = styled.View`
  flex-direction: row;
  margin-top: ${props => props.theme.spacing.ELEM_SPACING.XS};
  width: 60%;
`;
