import styled from 'styled-components/native';

const UnderlineStyle = styled.View`
  height: 1px;
  background-color: ${props => props.theme.colorPalette.gray[500]};
  margin-bottom: ${props => props.theme.spacing.ELEM_SPACING.MED};
  margin-top: ${props => props.theme.spacing.ELEM_SPACING.MED};
`;

const PaymentTileContainer = styled.View`
  border: 1px solid ${props => props.theme.colorPalette.gray[900]};
  padding: ${props => props.theme.spacing.ELEM_SPACING.MED};
`;

const ButtonWrapperStyle = styled.View`
  padding-top: ${props => props.theme.spacing.ELEM_SPACING.XXS};
  margin-bottom: ${props => props.theme.spacing.ELEM_SPACING.XL};
`;

export { UnderlineStyle, PaymentTileContainer, ButtonWrapperStyle };
