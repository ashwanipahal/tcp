import styled from 'styled-components/native';

const leftAignWrapper = () => {
  return `
    align-items:flex-start;
    margin-bottom:20px;
    flex-direction: row;
  `;
};

const FloatWrapper = styled.View`
  ${leftAignWrapper}
`;

const CustomIconWrapper = styled.TouchableOpacity`
  align-self: center;
  margin-right: ${props => props.theme.spacing.ELEM_SPACING.XXXS};
`;

const PasswordDescriptionWrapper = styled.View`
  margin: 0px ${props => props.theme.spacing.ELEM_SPACING.MED};
`;

export { CustomIconWrapper, FloatWrapper, PasswordDescriptionWrapper };
