import styled from 'styled-components/native';

const UserInfoRow = styled.View`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: flex-start;
  padding-bottom: ${props => props.theme.spacing.ELEM_SPACING.XS};
`;

const UserInfoLabels = styled.View`
  width: 35%;
  padding-right: ${props => props.theme.spacing.ELEM_SPACING.XS};
  align-self: center;
`;

const UserIDLabels = styled.View`
  width: 35%;
  padding-right: ${props => props.theme.spacing.ELEM_SPACING.XS};
  align-self: flex-end;
`;

const UserInfoValues = styled.View`
  width: 60%;
  align-self: center;
`;

const UserIDValues = styled.View`
  width: 60%;
  align-self: flex-end;
`;

export { UserInfoRow, UserInfoLabels, UserInfoValues, UserIDValues, UserIDLabels };
