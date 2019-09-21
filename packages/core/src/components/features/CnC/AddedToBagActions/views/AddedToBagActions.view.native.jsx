import React from 'react';
import PropTypes from 'prop-types';
import BodyCopy from '../../../../common/atoms/BodyCopy';
import {
  ButtonWrapper,
  ActionsWrapper,
  ViewBagButton,
  CheckoutButton,
} from '../styles/AddedToBagActions.style.native';
import ADDEDTOBAG_CONSTANTS from '../../AddedToBag/AddedToBag.constants';
import CheckoutModals from '../../common/organism/CheckoutModals';

class AddedToBagActions extends React.PureComponent<Props> {
  render() {
    const {
      labels,
      showAddTobag,
      handleCartCheckout,
      isEditingItem,
      navigation,
      closeModal,
    } = this.props;
    return (
      <ActionsWrapper>
        {showAddTobag && (
          <ButtonWrapper>
            <ViewBagButton
              onPress={() => {
                navigation.navigate(ADDEDTOBAG_CONSTANTS.BAG_PAGE);
                if (closeModal) {
                  closeModal();
                }
              }}
            >
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
          <CheckoutButton
            onPress={() => {
              handleCartCheckout({ isEditingItem, navigation, closeModal });
            }}
          >
            <BodyCopy
              color="white"
              fontWeight="extrabold"
              fontFamily="secondary"
              fontSize="fs13"
              text={labels.checkout && labels.checkout.toUpperCase()}
            />
          </CheckoutButton>
        </ButtonWrapper>
        <CheckoutModals navigation={navigation} />
      </ActionsWrapper>
    );
  }
}

AddedToBagActions.propTypes = {
  labels: PropTypes.shape.isRequired,
  showAddTobag: PropTypes.shape,
  navigation: PropTypes.shape({}).isRequired,
  closeModal: PropTypes.func,
};

AddedToBagActions.defaultProps = {
  showAddTobag: true,
  closeModal: () => {},
};

export default AddedToBagActions;
