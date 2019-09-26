import styled from 'styled-components/native';

const GiftServicesWrapper = styled.View`
  margin-top: ${props => props.theme.spacing.ELEM_SPACING.XXL};
  margin-bottom: ${props => props.theme.spacing.ELEM_SPACING.XXXL};
`;

const CheckBoxWrapper = styled.View`
  display: flex;
  flex-direction: row;
`;
const GiftServicesHeader = styled.View`
  flex-direction: row;
`;
const StyledAnchor = styled.View`
  margin-left: ${props => props.theme.spacing.ELEM_SPACING.XS};
`;

const GiftServicesContent = styled.View`
  margin-left: ${props => props.theme.spacing.ELEM_SPACING.XXL};
`;

const RadioButtonWrapper = styled.View`
  margin: ${props => props.theme.spacing.APP_LAYOUT_SPACING.XS} 0;
  display: flex;
  flex-direction: row;
`;

const ImageBrandStyle = styled.Image`
  width: 90px;
  height: 30px;
`;

const RadioButtonWrapperInner = styled.View`
  display: flex;
  flex-direction: row;
  margin-right: ${props => props.theme.spacing.ELEM_SPACING.XL};
`;

const AddMessageWrapper = styled.View`
  margin: ${props => props.theme.spacing.APP_LAYOUT_SPACING.XS} 0 0;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;

const InputBoxWrapper = styled.TextInput`
  height: 146px;
  width: 100%;
  border: 1px solid ${props => props.theme.colors.FOOTER.DIVIDER};
`;

const ServiceDetailWrapper = styled.View`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  width: 100%;
`;

const PriceWrapper = styled.View`
  margin-left: ${props => props.theme.spacing.APP_LAYOUT_SPACING.SM};
`;

const StyledGiftDetails = styled.View`
  margin-top: ${props => props.theme.spacing.APP_LAYOUT_SPACING.XXS};
`;
const AddMessageHead = styled.View`
  margin-bottom: 5px;
`;

export {
  GiftServicesWrapper,
  CheckBoxWrapper,
  GiftServicesHeader,
  StyledAnchor,
  GiftServicesContent,
  RadioButtonWrapper,
  AddMessageWrapper,
  InputBoxWrapper,
  ServiceDetailWrapper,
  PriceWrapper,
  ImageBrandStyle,
  RadioButtonWrapperInner,
  StyledGiftDetails,
  AddMessageHead,
};
