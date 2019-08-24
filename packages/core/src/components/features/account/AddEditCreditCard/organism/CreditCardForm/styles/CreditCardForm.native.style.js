import styled from 'styled-components';

const CreditCardContainer = styled.View`
  flex: 1;
  flex-direction: column;
`;

const CreditCardWrapper = styled.View`
  height: ${props => props.theme.spacing.LAYOUT_SPACING.XXL};
`;

const AddressWrapper = styled.View`
  margin-top: ${props => props.theme.spacing.ELEM_SPACING.XXL};
  height: 200px;
`;

const ActionsWrapper = styled.View`
  align-items: center;
  height: ${props => props.theme.spacing.LAYOUT_SPACING.XL};
`;

const AddAddressButton = {
  color: 'white',
  fontWeight: 'normal',
  marginTop: 48,
  width: 190,
};

const CancelButton = {
  fontWeight: 'normal',
  opacity: 0.5,
  color: 'black',
  border: 1,
  marginTop: 15,
  width: 190,
};

const DefaultAddress = styled.View`
  flex: 1;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
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
  height: 820px;
`;

const CustomAddress = {
  fontWeight: 'regular',
  fontSize: 'fs14',
};

export {
  CreditCardContainer,
  CreditCardWrapper,
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
};
