import React from 'react';
import PropTypes from 'prop-types';
import { SafeAreaView } from 'react-native';
import BodyCopy from '@tcp/core/src/components/common/atoms/BodyCopy';
import LineComp from '@tcp/core/src/components/common/atoms/Line';
import ModalNative from '@tcp/core/src/components/common/molecules/Modal';
import AddEditCreditCard from '@tcp/core/src/components/features/account/AddEditCreditCard/container/AddEditCreditCard.container';
import { ModalHeading, ModalViewWrapper, LineWrapper } from '../AddEditPaymentModal.style.native';

export class AddEditPaymentModal extends React.PureComponent<Props> {
  static propTypes = {
    labels: PropTypes.shape({}),
    dto: PropTypes.shape({}),
    toggleModal: PropTypes.shape({}),
  };

  static defaultProps = {
    labels: {},
    dto: {},
    toggleModal: {},
  };

  render() {
    const { labels, toggleModal, setUpdateModalMountedState, dto } = this.props;
    return (
      <ModalNative isOpen={setUpdateModalMountedState} onRequestClose={toggleModal}>
        <ModalHeading>
          <BodyCopy
            mobileFontFamily={['secondary']}
            fontWeight="extrabold"
            fontSize="fs16"
            text={labels.paymentGC.lbl_payment_addCCHeading}
          />
        </ModalHeading>
        <LineWrapper>
          <LineComp marginTop={5} borderWidth={2} borderColor="black" />
        </LineWrapper>
        <SafeAreaView>
          <ModalViewWrapper>
            <AddEditCreditCard labels={labels} isEdit={false} onClose={toggleModal} dto={dto} />
          </ModalViewWrapper>
        </SafeAreaView>
      </ModalNative>
    );
  }
}

export default AddEditPaymentModal;
