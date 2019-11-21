import styled from 'styled-components/native';

const StyledHeader = styled.View`
  margin-bottom: ${props => props.theme.spacing.ELEM_SPACING.LRG};
  margin-top: ${props => props.theme.spacing.ELEM_SPACING.XL};
  margin-left: ${props => props.theme.spacing.ELEM_SPACING.MED};
  margin-right: ${props => props.theme.spacing.ELEM_SPACING.MED};
`;
const HeaderContainer = styled.View`
  flex: 1;
  margin-left: ${props => props.theme.spacing.ELEM_SPACING.MED};
  margin-right: ${props => props.theme.spacing.ELEM_SPACING.MED};
`;

export { StyledHeader, HeaderContainer };
