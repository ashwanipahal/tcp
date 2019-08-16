import styled from 'styled-components';

const CreditCardContainer = styled.View`
  border: 1px solid gray;
  flex: 1;
  flex-direction: column;
`;

const CreditCardWrapper = styled.View`
  border: 1px solid green;
  height: 150px;
`;

const AddressWrapper = styled.View`
  border: 1px solid blue;
  height: 250px;
`;

const ActionsWrapper = styled.View`
  border: 1px solid yellow;
  align-items: center;
  height: 150px;
`;

const AddAddressButton = {
  color: 'white',
  fontWeight: 'normal',
  opacity: 0.5,
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

const ModalHeading = styled.Text`
  margin-top: 50px;
  padding-left: ${props => props.theme.spacing.LAYOUT_SPACING.XXS};
`;

const ModalViewWrapper = styled.View`
  padding-left: ${props => props.theme.spacing.LAYOUT_SPACING.XXS};
  padding-right: ${props => props.theme.spacing.LAYOUT_SPACING.XXS};
  height: 800px;
`;

const LineWrapper = styled.View`
  padding-left: ${props => props.theme.spacing.LAYOUT_SPACING.XXS};
  padding-right: ${props => props.theme.spacing.LAYOUT_SPACING.XXS};
`;


export {
  CreditCardContainer,
  CreditCardWrapper,
  AddressWrapper,
  ActionsWrapper,
  AddAddressButton,
  CancelButton,
  ModalHeading,
  ModalViewWrapper,
  LineWrapper,
};
