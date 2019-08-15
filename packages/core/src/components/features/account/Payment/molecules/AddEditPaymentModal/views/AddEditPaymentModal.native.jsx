import React from 'react';
import PropTypes from 'prop-types';
import { SafeAreaView } from 'react-native';
import AddEditCreditCard from '@tcp/core/src/components/features/account/AddEditCreditCard';
// import theme from '@tcp/core/styles/themes/TCP';
import withStyles from '../../../../../../common/hoc/withStyles.native';
import {
  Style,
  ModalHeading,
  ModalViewWrapper,
  LineWrapper,
} from '../AddEditPaymentModal.style.native';
import BodyCopy from '../../../../../../common/atoms/BodyCopy';
import ModalNative from '../../../../../../common/molecules/Modal';
import LineComp from '../../../../../../common/atoms/Line';

export class AddEditPaymentModal extends React.PureComponent<Props> {
  static propTypes = {
    labels: PropTypes.shape({}),
    dto: PropTypes.shape({}),
    toggleModal: PropTypes.shape({}),
    onConfirm: PropTypes.func,
    onClose: PropTypes.func,
  };

  static defaultProps = {
    labels: {},
    dto: {},
    toggleModal: {},
    onConfirm: () => {},
    onClose: () => {},
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
            text={labels.paymentGC.lbl_payment_addCCHeading}
          />
        </ModalHeading>
        <LineWrapper>
          <LineComp marginTop={5} borderWidth={2} borderColor="black" />
        </LineWrapper>
        <SafeAreaView>
          <ModalViewWrapper>
            <BodyCopy
              mobileFontFamily={['secondary']}
              fontWeight="extrabold"
              fontSize="fs16"
              text="Content"
            />
            <AddEditCreditCard labels={labels} isEdit={false} />
          </ModalViewWrapper>
        </SafeAreaView>
      </ModalNative>
    );
  }
}

export default withStyles(AddEditPaymentModal, Style);
export { AddEditPaymentModal as AddEditPaymentModalVanilla };
