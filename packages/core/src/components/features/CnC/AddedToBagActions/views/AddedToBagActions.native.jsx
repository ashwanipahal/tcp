import React from 'react';
import PropTypes from 'prop-types';
import BodyCopy from '../../../../common/atoms/BodyCopy';
import {
  ButtonWrapper,
  ActionsWrapper,
  ViewBagButton,
  CheckoutButton,
} from '../styles/AddedToBagActions.style.native';
import { navigateToNestedRoute } from '../../../../../utils/utils.app';

const AddedToBagActions = ({ labels, showAddTobag, navigation }) => {
  return (
    <ActionsWrapper>
      {showAddTobag && (
        <ButtonWrapper>
          <ViewBagButton>
            <BodyCopy
              textTransform="uppercase"
              color="white"
              fontWeight="extrabold"
              fontFamily="secondary"
              fontSize="fs13"
              text={labels.viewBag && labels.viewBag.toUpperCase()}
            />
          </ViewBagButton>
        </ButtonWrapper>
      )}
      <ButtonWrapper>
        <CheckoutButton>
          <BodyCopy
            color="white"
            fontWeight="extrabold"
            fontFamily="secondary"
            fontSize="fs13"
            text={labels.checkout && labels.checkout.toUpperCase()}
            onPress={() => {
              navigateToNestedRoute(navigation, 'HomeStack', 'Checkout');
            }}
          />
        </CheckoutButton>
      </ButtonWrapper>
    </ActionsWrapper>
  );
};

AddedToBagActions.propTypes = {
  labels: PropTypes.shape.isRequired,
  showAddTobag: PropTypes.shape,
  navigation: PropTypes.shape({}).isRequired,
};

AddedToBagActions.defaultProps = {
  showAddTobag: true,
};

export default AddedToBagActions;
