import styled from 'styled-components/native';

export const ShopBySizeLink = styled.TouchableOpacity`
  margin: ${props => props.theme.spacing.ELEM_SPACING.XS};
  width: 54;
  height: 54;
  border-radius: 27;
  background-color: ${props => props.theme.colorPalette.white};
  border: 1px solid ${props => props.theme.colorPalette.text.hint};
  align-items: center;
  justify-content: center;
`;

export const ShopBySizeContainer = styled.View`
  margin: ${props => props.theme.spacing.ELEM_SPACING.MED}
    ${props => props.theme.spacing.ELEM_SPACING.XXS};
  flex-direction: row;
  flex-wrap: wrap;
`;
