import styled from 'styled-components/native';

const Container = styled.View`
  flex: 1;
  margin-left: ${props => props.theme.spacing.ELEM_SPACING.MED};
  margin-right: ${props => props.theme.spacing.ELEM_SPACING.MED};
`;

export default { Container };
