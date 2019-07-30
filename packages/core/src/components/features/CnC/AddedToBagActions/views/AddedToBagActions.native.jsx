import React from 'react';
import PropTypes from 'prop-types';
import BodyCopy from '../../../../common/atoms/BodyCopy';
import {
  ButtonWrapper,
  ActionsWrapper,
  ViewBagButton,
  CheckoutButton,
} from '../styles/AddedToBagActions.style.native';

const AddedToBagActions = ({ labels }) => {
  return (
    <ActionsWrapper>
      <ButtonWrapper>
        <ViewBagButton>
          <BodyCopy
            textTransform="uppercase"
            color="white"
            fontWeight="extrabold"
            fontFamily="secondary"
            fontSize="fs13"
            text={labels.viewBag.toUpperCase()}
          />
        </ViewBagButton>
      </ButtonWrapper>
      <ButtonWrapper>
        <CheckoutButton>
          <BodyCopy
            color="white"
            fontWeight="extrabold"
            fontFamily="secondary"
            fontSize="fs13"
            text={labels.checkout.toUpperCase()}
          />
        </CheckoutButton>
      </ButtonWrapper>
    </ActionsWrapper>
  );
};

AddedToBagActions.propTypes = {
  labels: PropTypes.shape.isRequired,
};

export default AddedToBagActions;
