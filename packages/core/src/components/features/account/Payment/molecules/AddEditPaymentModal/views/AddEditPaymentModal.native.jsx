import React from 'react';
import PropTypes, { func } from 'prop-types';
import ModalNative from '@tcp/core/src/components/common/molecules/Modal';
import AddEditCreditCard from '@tcp/core/src/components/features/account/AddEditCreditCard/container/AddEditCreditCard.container.native';
import { getLabelValue } from '@tcp/core/src/utils/utils';
import { ModalViewWrapper } from '../AddEditPaymentModal.style.native';

export class AddEditPaymentModal extends React.PureComponent<Props> {
  static propTypes = {
    labels: PropTypes.shape({}),
    dto: PropTypes.shape({}),
    toggleModal: PropTypes.shape({}),
    updateCardList: func,
  };

  static defaultProps = {
    labels: { paymentGC: { lbl_payment_editCCHeading: '', lbl_payment_addCCHeading: '' } },
    dto: {},
    toggleModal: {},
    updateCardList: {},
  };

  render() {
    const {
      labels,
      toggleModal,
      setUpdateModalMountedState,
      dto,
      updateCardList,
      isEdit,
      selectedCard,
    } = this.props;
    return (
      <ModalNative
        isOpen={setUpdateModalMountedState}
        onRequestClose={toggleModal}
        heading={
          isEdit
            ? getLabelValue(labels, 'lbl_payment_editCCHeading', 'paymentGC')
            : getLabelValue(labels, 'lbl_payment_addCCHeading', 'paymentGC')
        }
      >
        <ModalViewWrapper>
          <AddEditCreditCard
            labels={labels}
            isEdit={isEdit}
            onClose={toggleModal}
            dto={dto}
            updateCardList={updateCardList}
            selectedCard={selectedCard}
          />
        </ModalViewWrapper>
      </ModalNative>
    );
  }
}

export default AddEditPaymentModal;
