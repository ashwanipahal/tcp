import React from 'react';
import PropTypes from 'prop-types';
import {
  ButtonWrapper,
  ActionsWrapper,
  ViewBagButton,
  ButtonText,
  CheckoutButton,
} from '../styles/AddedToBagActions.style.native';

const AddedToBagActions = ({ labels }) => {
  return (
    <ActionsWrapper>
      <ButtonWrapper>
        <ViewBagButton>
          <ButtonText>{labels.viewBag}</ButtonText>
        </ViewBagButton>
      </ButtonWrapper>
      <ButtonWrapper>
        <CheckoutButton>
          <ButtonText>{labels.checkout}</ButtonText>
        </CheckoutButton>
      </ButtonWrapper>
    </ActionsWrapper>
  );
};

AddedToBagActions.propTypes = {
  labels: PropTypes.shape.isRequired,
};

export default AddedToBagActions;
