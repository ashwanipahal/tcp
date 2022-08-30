import styled from 'styled-components/native';

const LegalStyleLinkStyles = {
  height: 100,
  paddingTop: 15,
};

const CopyrightText = styled.Text`
  margin-top: ${props => props.theme.spacing.LAYOUT_SPACING.MED};
  color: ${props => props.theme.colorPalette.gray[600]};
  font-size: ${props => props.theme.fonts.fontSize.anchor.medium}px;
`;

const UnderlineStyle = styled.View`
  height: 1px;
  background-color: ${props => props.theme.colorPalette.gray[500]};
  margin-bottom: ${props => props.theme.spacing.ELEM_SPACING.MED};
  margin-top: ${props => props.theme.spacing.ELEM_SPACING.MED};
`;

export { LegalStyleLinkStyles, CopyrightText, UnderlineStyle };
