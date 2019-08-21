import styled from 'styled-components/native';

export const ErrorView = styled.View`
  display: flex;
  padding: 6px 15px 13px 14px;
  flex-direction: row;
  background-color: ${props => props.theme.colors.PRIMARY.PALEGRAY};
`;

export const ErrorText = {
  flexWrap: 'wrap',
  flex: 1,
};
