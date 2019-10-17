import styled from 'styled-components/native';

const Container = styled.View`
  margin-left: ${props => props.theme.spacing.ELEM_SPACING.MED};
  margin-right: ${props => props.theme.spacing.ELEM_SPACING.MED};
`;

const TextSection = styled.Text`
  height: 100px;
`;

const FooterTextContainer = styled.Text`
  flex: 1;
  flex-direction: row;
  flex-wrap: wrap;
  margin-bottom: ${props => props.theme.spacing.APP_LAYOUT_SPACING.XS};
  color: ${props => props.theme.colorPalette.gray[800]};
`;

const FooterLink = styled.Text`
  font-size: ${props => props.theme.fonts.fontSize.anchor.medium}px;
  text-decoration: underline;
  color: ${props => props.theme.colorPalette.gray[800]};
`;

export default { Container, TextSection, FooterTextContainer, FooterLink };
