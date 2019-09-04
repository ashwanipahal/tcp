import styled from 'styled-components/native';

const StyledHeader = styled.View`
  margin-bottom: ${props => props.theme.spacing.ELEM_SPACING.XL};
  margin-top: ${props => props.theme.spacing.ELEM_SPACING.XL};
`;

const Container = styled.View`
margin-left: ${props => props.theme.spacing.ELEM_SPACING.MED};
margin-right: ${props => props.theme.spacing.ELEM_SPACING.MED};
`;

export { StyledHeader, Container };
