import styled from 'styled-components/native';

const FreeShippingLabel = styled.View`
  display: flex;
  flex-direction: row;
  justify-content: center;
  padding: ${props => props.theme.spacing.ELEM_SPACING.MED};
`;

const ShippingNew = styled.Text`
  color: ${props => props.theme.colorPalette.blue[800]};
`;

const AnchorWrapper = styled.View`
  padding-left: ${props => props.theme.spacing.ELEM_SPACING.XS};
`;

const FreeShippingIconWrapper = styled.View`
  height: 18px;
  width: 20px;
  @media ${props => props.theme.mediaQuery.large} {
    height: 23px;
    width: 25px;
  }
  padding-right: ${props => props.theme.spacing.ELEM_SPACING.XS};
`;

export { FreeShippingLabel, ShippingNew, AnchorWrapper, FreeShippingIconWrapper };
