import React from 'react';
import PropTypes from 'prop-types';
import withStyles from '../../../../../../common/hoc/withStyles';
import OpenLoginModal from '../../../../../account/LoginPage/views/LoginModal';
import style from '../../../../AddedToBagActions/styles/AddedToBagActions.style';
import BagConfirmationModal from '../../../../BagPage/views/BagConfirmationModal.view';
import ItemDeleteConfirmationModal from '../../../../BagPage/views/ItemDeleteConfirmationModal.view';

class ModalsCheckout extends React.PureComponent<Props> {
  routeToCheckout = e => {
    const { routeForBagCheckout, closeCheckoutModalMountState, closeMiniBagDispatch } = this.props;
    if (e) {
      e.preventDefault();
    }
    closeMiniBagDispatch(false, false);
    closeCheckoutModalMountState({ state: false });
    routeForBagCheckout();
  };

  closeModalAndHandleCheckout = () => {
    const { closeCheckoutConfirmationModal, handleCartCheckout } = this.props;
    closeCheckoutConfirmationModal();
    return handleCartCheckout();
  };

  render() {
    const {
      labels,
      checkoutModalMountedState,
      closeCheckoutModalMountState,
      modalInfo,
      closeCheckoutConfirmationModal,
      removeUnqualifiedItemsAndCheckout,
      currentSelectItemInfo,
      closeItemDeleteModal,
      deleteConfirmationModalLabels,
      confirmRemoveCartItem,
      addItemToSflList,
    } = this.props;
    const { showModal, isEditingItem: modalEditingItem } = modalInfo;
    if (modalEditingItem) {
      labels.confirmationText = labels.editConfirmationText;
    }
    return (
      <>
        <BagConfirmationModal
          labels={labels}
          isOpen={showModal}
          closeCheckoutConfirmationModal={closeCheckoutConfirmationModal}
          removeUnqualifiedItemsAndCheckout={
            modalEditingItem ? this.closeModalAndHandleCheckout : removeUnqualifiedItemsAndCheckout
          }
        />
        <OpenLoginModal
          variation="checkout"
          openState={checkoutModalMountedState}
          setLoginModalMountState={closeCheckoutModalMountState}
          handleContinueAsGuest={this.routeToCheckout}
          handleAfterLogin={this.routeToCheckout}
        />
        <ItemDeleteConfirmationModal
          isOpen={currentSelectItemInfo.showModal}
          closeCheckoutConfirmationModal={closeItemDeleteModal}
          labels={deleteConfirmationModalLabels}
          moveToSfl={() => addItemToSflList(currentSelectItemInfo)}
          confirmRemoveCartItem={() => confirmRemoveCartItem(currentSelectItemInfo.itemId)}
        />
      </>
    );
  }
}

ModalsCheckout.propTypes = {
  labels: PropTypes.shape.isRequired,
  handleCartCheckout: PropTypes.func.isRequired,
  routeForBagCheckout: PropTypes.func.isRequired,
};

export default withStyles(ModalsCheckout, style);
export { ModalsCheckout as ModalsCheckoutVanilla };
