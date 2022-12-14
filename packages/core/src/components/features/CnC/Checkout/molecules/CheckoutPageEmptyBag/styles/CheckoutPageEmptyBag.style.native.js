import styled from 'styled-components/native';

const EmptyBagContainer = styled.View`
  margin-top: ${props => props.theme.spacing.ELEM_SPACING.MED};
  color: ${props => props.theme.colors.BLACK};
  font-family: ${props => props.theme.typography.fonts.secondary};
  font-weight: ${props => props.theme.fonts.fontWeight.semiBold};
`;

const EmptyBagTextContainer = styled.View`
  padding-top: ${props => props.theme.spacing.LAYOUT_SPACING.MED};
  align-items: center;
  justify-content: center;
  background: ${props => props.theme.colors.PRIMARY.PALEGRAY};
`;

const EmptyBagBoldText = styled.Text`
  margin-left: ${props => props.theme.spacing.ELEM_SPACING.MED};
  margin-right: ${props => props.theme.spacing.ELEM_SPACING.MED};
  margin-bottom: ${props => props.theme.spacing.ELEM_SPACING.MED};
`;

export { EmptyBagContainer, EmptyBagTextContainer, EmptyBagBoldText };
