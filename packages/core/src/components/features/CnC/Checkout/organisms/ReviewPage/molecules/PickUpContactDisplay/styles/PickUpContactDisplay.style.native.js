import styled from 'styled-components';

const Header = styled.View`
  display: flex;
  justify-content: flex-start;
  margin-top: ${props => props.theme.spacing.LAYOUT_SPACING.XXS};
  margin-bottom: ${props => props.theme.spacing.LAYOUT_SPACING.SM};
`;

const FontStyle = styled.Text`
  font-weight: ${props => props.theme.typography.fontWeights.regular};
`;

const EditAnchor = styled.View`
  margin-left: ${props => props.theme.spacing.LAYOUT_SPACING.XS};
  align-self: flex-end;
`;
const ContactBody = styled.View`
  margin-bottom: ${props => props.theme.spacing.LAYOUT_SPACING.MED};
`;

export { Header, EditAnchor, FontStyle, ContactBody };
