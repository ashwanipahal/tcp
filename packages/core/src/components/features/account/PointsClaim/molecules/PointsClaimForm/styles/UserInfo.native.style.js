import styled from 'styled-components/native';

const UserInfoRow = styled.View`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: flex-start;
  padding-bottom: ${props => props.theme.spacing.ELEM_SPACING.XS};
`;

const UserInfoLabels = styled.View`
  width: 40%;
  padding-right: ${props => props.theme.spacing.ELEM_SPACING.XS};
`;

const UserInfoValues = styled.View`
  width: 55%;
  align-self: flex-end;
`;

export { UserInfoRow, UserInfoLabels, UserInfoValues };
