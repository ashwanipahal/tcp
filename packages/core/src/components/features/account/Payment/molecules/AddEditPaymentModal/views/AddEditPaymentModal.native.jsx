import React from 'react';
import PropTypes from 'prop-types';
import { SafeAreaView } from 'react-native';
import AddEditCreditCard from '@tcp/core/src/components/features/account/AddEditCreditCard/container/AddEditCreditCard.container';
import { ModalHeading, ModalViewWrapper, LineWrapper } from '../AddEditPaymentModal.style.native';
import BodyCopy from '../../../../../../common/atoms/BodyCopy';
import ModalNative from '../../../../../../common/molecules/Modal';
import LineComp from '../../../../../../common/atoms/Line';

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
    const { labels, toggleModal } = this.props;
    return (
      <ModalNative onRequestClose={toggleModal}>
        <ModalHeading>
          <BodyCopy
            mobileFontFamily={['secondary']}
            fontWeight="extrabold"
            fontSize="fs16"
            text="Add Credit or Debit Card"
          />
        </ModalHeading>
        <LineWrapper>
          <LineComp marginTop={5} borderWidth={2} borderColor="black" />
        </LineWrapper>
        <SafeAreaView>
          <ModalViewWrapper>
            <AddEditCreditCard labels={labels} isEdit={false} onClose={toggleModal} />
          </ModalViewWrapper>
        </SafeAreaView>
      </ModalNative>
    );
  }
}

export default AddEditPaymentModal;
