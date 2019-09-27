import styled from 'styled-components';

const Header = styled.View`
  display: flex;
  flex-direction: row;
`;

const EditAnchor = styled.View`
  margin-left: ${props => props.theme.spacing.ELEM_SPACING.XS};
  align-self: flex-end;
  padding-bottom: ${props => props.theme.spacing.ELEM_SPACING.XXXS};
  font-size: ${props => props.theme.spacing.ELEM_SPACING.SM};
  color: ${props => props.theme.colors.ANCHOR.PRIMARY};
`;

export { Header, EditAnchor };
