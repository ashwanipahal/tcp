import styled from 'styled-components/native';

const RecaptchaContainer = styled.View`
  margin-top: ${props => props.theme.spacing.ELEM_SPACING.XS};
  height: 89px;
`;

const CardRow = styled.View`
  margin-top: ${props => props.theme.spacing.ELEM_SPACING.LRG};
  display: flex;
  align-items: flex-end;
  background-color: ${props => props.theme.colorPalette.gray[500]};
  padding: ${props => props.theme.spacing.ELEM_SPACING.MED}
    ${props => props.theme.spacing.ELEM_SPACING.LRG}
    ${props => props.theme.spacing.ELEM_SPACING.LRG};
  font-family: ${props => props.theme.typography.fonts.secondary};
  letter-spacing: ${props => props.theme.typography.letterSpacings.normal};
  font-style: normal;
  font-stretch: normal;
`;

export { RecaptchaContainer, CardRow };
