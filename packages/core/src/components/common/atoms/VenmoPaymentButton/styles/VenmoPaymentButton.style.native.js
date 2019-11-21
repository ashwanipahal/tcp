import styled from 'styled-components/native';

const VenmoButton = styled.TouchableOpacity`
  align-items: center;
  justify-content: center;
  text-align: center;
  height: ${props => props.theme.spacing.LAYOUT_SPACING.MED};
  border-radius: ${props =>
    props.theme.isGymboree
      ? props.theme.spacing.ELEM_SPACING.LRG
      : props.theme.spacing.ELEM_SPACING.XXS};
  border: 1px solid ${props => props.theme.colorPalette.gray[600]};
  background-color: ${props =>
    props.isVenmoBlue ? props.theme.colors.VENMO : props.theme.colors.WHITE};
  margin-bottom: ${props => props.theme.spacing.ELEM_SPACING.XS};
`;

export default VenmoButton;
