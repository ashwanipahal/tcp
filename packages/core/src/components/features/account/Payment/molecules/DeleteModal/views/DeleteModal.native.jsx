import React from 'react';
import { View, SafeAreaView } from 'react-native';
import withStyles from '../../../../../../common/hoc/withStyles.native';
import {
  Style,
  ModalHeading,
  ModalViewWrapper,
  LineWrapper,
  CardDescription,
  CardDetailWrapper,
  CardDetail,
  ImgWrapper,
  ImageStyle,
  ConfirmButtonWrapper,
  CloseButtonWrapper,
} from '../DeleteModal.style.native';
import BodyCopy from '../../../../../../common/atoms/BodyCopy';
import ModalNative from '../../../../../../common/molecules/Modal';
import LineComp from '../../../../../../common/atoms/Line';
import CustomButton from '../../../../../../common/atoms/Button';

// @flow
type Props = {
  labels: Object,
  dto: Object,
  setDeleteModalMountedState: boolean,
  toggleModal: Object,
  onConfirm: Func,
  onClose: Func,
};

class DeleteModal extends React.PureComponent<Props> {
  render() {
    const { labels, dto, setDeleteModalMountedState, toggleModal, onConfirm, onClose } = this.props;
    return (
      <View>
        <ModalNative isOpen={setDeleteModalMountedState} onRequestClose={toggleModal}>
          <ModalHeading>
            <BodyCopy
              mobileFontFamily={['secondary']}
              fontWeight="extrabold"
              fontSize="fs16"
              text={labels.paymentGC.lbl_payment_modalDeleteCard}
            />
          </ModalHeading>
          <LineWrapper>
            <LineComp marginTop={5} borderWidth={2} borderColor="black" />
          </LineWrapper>
          <SafeAreaView>
            <ModalViewWrapper>
              <CardDescription>{dto.cardDescription}</CardDescription>
              <CardDetailWrapper>
                <ImgWrapper>
                  <ImageStyle source={dto.cardImage1} />
                </ImgWrapper>
                <CardDetail>{dto.cardDetail}</CardDetail>
              </CardDetailWrapper>
              <ConfirmButtonWrapper>
                <CustomButton
                  text={labels.paymentGC.lbl_payment_modalGCConfirm}
                  buttonVariation="variable-width"
                  fill="BLUE"
                  color="white"
                  onPress={onConfirm}
                />
              </ConfirmButtonWrapper>
              <CloseButtonWrapper>
                <CustomButton
                  text={labels.paymentGC.lbl_payment_modalGCCancel}
                  buttonVariation="variable-width"
                  fill="RED"
                  color="red"
                  onPress={onClose}
                />
              </CloseButtonWrapper>
            </ModalViewWrapper>
          </SafeAreaView>
        </ModalNative>
      </View>
    );
  }
}

export default withStyles(DeleteModal, Style);
export { DeleteModal as DeleteModalVanilla };
