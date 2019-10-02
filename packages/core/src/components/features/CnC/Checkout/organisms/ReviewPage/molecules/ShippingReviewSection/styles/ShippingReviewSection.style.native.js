import styled from 'styled-components/native';

const ShippingReviewContainer = styled.View`
  padding-bottom: ${props => props.theme.spacing.LAYOUT_SPACING.MED};
  border-bottom-width: 1px;
  border-bottom-color: ${props => props.theme.colorPalette.gray[900]};
`;

const TitlePlusEditSection = styled.View`
  margin-top: ${props => props.theme.spacing.ELEM_SPACING.XXL};
`;

const AddressSection = styled.View`
  margin-top: ${props => props.theme.spacing.ELEM_SPACING.SM};
`;

const AddressTitle = styled.View`
  margin-top: ${props => props.theme.spacing.ELEM_SPACING.MED};
`;

export default { ShippingReviewContainer, AddressSection, AddressTitle, TitlePlusEditSection };
