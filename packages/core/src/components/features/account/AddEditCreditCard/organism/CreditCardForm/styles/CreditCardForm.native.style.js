import styled from 'styled-components';

const CreditCardContainer = styled.View`
  margin: 0 ${props => props.theme.spacing.ELEM_SPACING.SM};
`;

const AddressWrapper = styled.View`
  margin-top: ${props => props.theme.spacing.ELEM_SPACING.XXXL};
`;

const ActionsWrapper = styled.View`
  margin: 0 ${props => props.theme.spacing.ELEM_SPACING.XXL}
    ${props => props.theme.spacing.ELEM_SPACING.LRG}
    ${props => props.theme.spacing.ELEM_SPACING.XXL};
`;

const AddAddressButton = {
  color: 'white',
  fontWeight: 'normal',
  marginTop: 30,
};

const CancelButton = {
  fontWeight: 'normal',
  color: 'black',
  border: 1,
  marginTop: 19,
};

const DefaultAddress = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
  margin-top: ${props => props.theme.spacing.ELEM_SPACING.LRG};
`;

const LeftBracket = styled.View`
  border: 1px solid gray;
  border-right-width: 0px;
  margin-right: ${props => props.theme.spacing.ELEM_SPACING.SM};
  height: ${props => props.theme.spacing.LAYOUT_SPACING.XL};
  width: ${props => props.theme.spacing.ELEM_SPACING.SM};
`;

const RightBracket = styled.View`
  border: 1px solid gray;
  border-left-width: 0px;
  margin-left: ${props => props.theme.spacing.ELEM_SPACING.SM};
  height: ${props => props.theme.spacing.LAYOUT_SPACING.XL};
  width: ${props => props.theme.spacing.ELEM_SPACING.SM};
`;

const ModalHeading = styled.Text`
  padding-left: ${props => props.theme.spacing.LAYOUT_SPACING.XXS};
  margin-top: ${props => props.theme.spacing.LAYOUT_SPACING.MED};
`;

const ModalViewWrapper = styled.View`
  padding-left: ${props => props.theme.spacing.LAYOUT_SPACING.XXS};
  padding-right: ${props => props.theme.spacing.LAYOUT_SPACING.XXS};
`;

const CustomAddress = {
  fontWeight: 'regular',
  fontSize: 'fs14',
};

const TextWrapper = styled.View`
  margin-top: ${props => props.theme.spacing.ELEM_SPACING.SM};
`;

const dropDownStyle = {
  height: 30,
  borderBottomWidth: 1,
  marginTop: 25,
};
const itemStyle = {
  height: 90,
};

export {
  CreditCardContainer,
  AddressWrapper,
  ActionsWrapper,
  AddAddressButton,
  CancelButton,
  ModalHeading,
  ModalViewWrapper,
  DefaultAddress,
  LeftBracket,
  RightBracket,
  CustomAddress,
  TextWrapper,
  dropDownStyle,
  itemStyle,
};
