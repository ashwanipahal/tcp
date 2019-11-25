import React from 'react';
import PropTypes from 'prop-types';
import BagPageUtils from '@tcp/core/src/components/features/CnC/BagPage/views/Bagpage.utils';
import withStyles from '../../../../../../common/hoc/withStyles';
import OpenLoginModal from '../../../../../account/LoginPage/views/LoginModal';
import style from '../../../../AddedToBagActions/styles/AddedToBagActions.style';
import BagConfirmationModal from '../../../../BagPage/views/BagConfirmationModal.view';
import ItemDeleteConfirmationModal from '../../../../BagPage/views/ItemDeleteConfirmationModal.view';

class ModalsCheckout extends React.PureComponent<Props> {
  routeToCheckout = e => {
    const {
      routeForBagCheckout,
      closeCheckoutModalMountState,
      closeMiniBagDispatch,
      setClickAnalyticsDataCheckout,
      cartOrderItems,
      setBagPageIsRouting,
    } = this.props;
    const productsData = BagPageUtils.formatBagProductsData(cartOrderItems);
    setClickAnalyticsDataCheckout({
      customEvents: ['scCheckout', 'event86', 'event9'],
      products: productsData,
    });
    /* istanbul ignore else */
    if (e) {
      e.preventDefault();
    }
    closeMiniBagDispatch(false, false);
    closeCheckoutModalMountState({ state: false });
    setBagPageIsRouting();
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
      bagPageServerError,
      checkoutModalComponentType,
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
        {checkoutModalMountedState && (
          <OpenLoginModal
            variation="checkout"
            openState={checkoutModalMountedState}
            setLoginModalMountState={closeCheckoutModalMountState}
            handleContinueAsGuest={this.routeToCheckout}
            handleAfterLogin={this.routeToCheckout}
            componentType={checkoutModalComponentType}
          />
        )}
        <ItemDeleteConfirmationModal
          isOpen={currentSelectItemInfo.showModal}
          closeCheckoutConfirmationModal={closeItemDeleteModal}
          labels={deleteConfirmationModalLabels}
          moveToSfl={() => addItemToSflList(currentSelectItemInfo)}
          confirmRemoveCartItem={() => confirmRemoveCartItem(currentSelectItemInfo.itemId)}
          bagPageServerError={bagPageServerError}
        />
      </>
    );
  }
}

ModalsCheckout.propTypes = {
  labels: PropTypes.shape.isRequired,
  handleCartCheckout: PropTypes.func.isRequired,
  routeForBagCheckout: PropTypes.func.isRequired,
  bagPageServerError: PropTypes.shape({}),
};

ModalsCheckout.defaultProps = {
  bagPageServerError: null,
};

export default withStyles(ModalsCheckout, style);
export { ModalsCheckout as ModalsCheckoutVanilla };
