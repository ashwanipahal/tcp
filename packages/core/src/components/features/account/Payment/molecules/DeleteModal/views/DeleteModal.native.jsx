import React from 'react';
import PropTypes from 'prop-types';
import { View, SafeAreaView } from 'react-native';
import theme from '@tcp/core/styles/themes/TCP';
import Address from '@tcp/core/src/components/common/molecules/Address';
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
  CenterAlign,
  ConfirmButtonWrapper,
  CloseButtonWrapper,
  CardContainer,
  CardExpiry,
} from '../DeleteModal.style.native';
import BodyCopy from '../../../../../../common/atoms/BodyCopy';
import ModalNative from '../../../../../../common/molecules/Modal';
import LineComp from '../../../../../../common/atoms/Line';
import CustomButton from '../../../../../../common/atoms/Button';

const buttonStyle = {
  paddingRight: 5,
  paddingLeft: 5,
  fontWeight: theme.typography.fontWeights.regular,
};

class DeleteModal extends React.PureComponent<Props> {
  static propTypes = {
    labels: PropTypes.shape({}),
    dto: PropTypes.shape({}),
    setDeleteModalMountedState: PropTypes.bool,
    toggleModal: PropTypes.shape({}),
    onConfirm: PropTypes.func,
    onClose: PropTypes.func,
  };

  static defaultProps = {
    labels: {},
    dto: {},
    setDeleteModalMountedState: false,
    toggleModal: {},
    onConfirm: () => {},
    onClose: () => {},
  };

  render() {
    const {
      labels,
      dto,
      setDeleteModalMountedState,
      toggleModal,
      onConfirm,
      onClose,
      addressDetails,
    } = this.props;
    const cardTitle = dto.accountNo
      ? `${dto.cardDetail} ${dto.accountNo.slice(-4)}`
      : dto.cardDetail;

    return (
      <View>
        <ModalNative isOpen={setDeleteModalMountedState} onRequestClose={toggleModal}>
          <ModalHeading>
            <BodyCopy
              mobileFontFamily={['secondary']}
              fontWeight="regular"
              fontSize="fs16"
              text={labels.paymentGC.lbl_payment_modalDeleteCard}
            />
          </ModalHeading>
          <LineWrapper>
            <LineComp marginTop={5} borderWidth={2} borderColor="black" />
          </LineWrapper>
          <SafeAreaView>
            <ModalViewWrapper>
              <CardDescription>
                <BodyCopy
                  mobileFontFamily={['secondary']}
                  fontWeight="extrabold"
                  fontSize="fs16"
                  text={dto.cardDescription}
                />
              </CardDescription>
              <CardDetailWrapper>
                <ImgWrapper>
                  <ImageStyle source={dto.cardImage} />
                </ImgWrapper>
                <CardContainer>
                  <CardDetail>{cardTitle}</CardDetail>
                  <CardExpiry>{dto.cardExpiry}</CardExpiry>
                  <Address
                    showCountry={false}
                    showPhone={false}
                    showName
                    dataLocatorPrefix="address"
                    address={addressDetails}
                  />
                </CardContainer>
              </CardDetailWrapper>
              <CenterAlign>
                <ConfirmButtonWrapper>
                  <CustomButton
                    text={labels.paymentGC.lbl_payment_modalGCConfirm}
                    buttonVariation="variable-width"
                    fill="BLUE"
                    color="white"
                    width="162px"
                    font-size="14"
                    onPress={onConfirm}
                    style={buttonStyle}
                  />
                </ConfirmButtonWrapper>
                <CloseButtonWrapper>
                  <CustomButton
                    text={labels.paymentGC.lbl_payment_modalGCCancel}
                    buttonVariation="variable-width"
                    fill="RED"
                    color="red"
                    width="162px"
                    font-size="14"
                    onPress={onClose}
                    style={buttonStyle}
                  />
                </CloseButtonWrapper>
              </CenterAlign>
            </ModalViewWrapper>
          </SafeAreaView>
        </ModalNative>
      </View>
    );
  }
}

export default withStyles(DeleteModal, Style);
export { DeleteModal as DeleteModalVanilla };
