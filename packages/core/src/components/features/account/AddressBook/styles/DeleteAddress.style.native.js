import styled from 'styled-components/native';

const DeleteAddressBody = styled.View`
  display: flex;
  flex: 1;
  padding: ${props => props.theme.spacing.LAYOUT_SPACING.SM};
`;

const AddressWrapper = styled.View`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: ${props => props.theme.spacing.ELEM_SPACING.XL};
  margin-bottom: ${props => props.theme.spacing.ELEM_SPACING.XL};
`;

const CustomButtonWrapper = styled.View`
  margin: ${props => props.theme.spacing.ELEM_SPACING.XS};
`;

export { DeleteAddressBody, CustomButtonWrapper, AddressWrapper };
