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

export { CreditCardContainer, CreditCardWrapper, AddressWrapper, ActionsWrapper, AddAddressButton, CancelButton };
