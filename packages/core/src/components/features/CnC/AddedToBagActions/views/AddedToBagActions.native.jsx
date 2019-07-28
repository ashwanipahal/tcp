import React from 'react';
import {
  ButtonWrapper,
  ActionsWrapper,
  ViewBagButton,
  ButtonText,
  CheckoutButton,
} from '../styles/AddedToBagActions.style.native';

const AddedToBagActions = () => {
  return (
    <ActionsWrapper>
      <ButtonWrapper>
        <ViewBagButton>
          <ButtonText>VIEW BAG</ButtonText>
        </ViewBagButton>
      </ButtonWrapper>
      <ButtonWrapper>
        <CheckoutButton>
          <ButtonText>CHECKOUT</ButtonText>
        </CheckoutButton>
      </ButtonWrapper>
    </ActionsWrapper>
  );
};

export default AddedToBagActions;
