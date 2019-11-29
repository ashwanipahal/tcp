import React from 'react';
import { PropTypes } from 'prop-types';
import {
  Wrapper,
  Container,
  StyledImage,
  Touchable,
  StyledBodyCopy,
  StyledButton,
  MessageContainer,
  ShadowContainer,
} from '../styles/scanErrorModal.native.style';
import { getScreenWidth, getScreenHeight } from '@tcp/core/src/utils/utils.app';
import ModalNative from '@tcp/core/src/components/common/molecules/Modal/view/Modal.native';

const PROPMT_WIDTH = getScreenWidth() - 60;
const HEIGHT = getScreenHeight();
const closeImage = require('@tcp/core/src/assets/close.png');

const closeIconAction = onClose => {
  if (onClose) {
    onClose();
  }
};

const ScanErrorModal = ({ onClose, isOpen, labels }) => {
  return (
    <ModalNative isOpen={isOpen} onRequestClose={() => closeIconAction(onClose)} customTransparent>
      <ShadowContainer height={HEIGHT}>
        <Container>
          <Wrapper width={PROPMT_WIDTH}>
            <Touchable accessibilityRole="button" onPress={() => closeIconAction(onClose)}>
              <StyledImage source={closeImage} width="15px" height="15px" />
            </Touchable>
            <MessageContainer>
              <StyledBodyCopy
                text={labels.lbl_qrscan_no_result}
                textAlign="center"
                fontFamily="secondary"
                fontSize="fs16"
                marginTop="31px"
                fontWeight="bold"
              />

              <StyledBodyCopy
                text={labels.lbl_qrscan_no_result_help}
                textAlign="center"
                fontFamily="secondary"
                fontSize="fs16"
                marginTop="16px"
              />

              <StyledButton
                text={labels.lbl_qrscan_cta_retry}
                fill="WHITE"
                marginTop="25px"
                width="260px"
                fontWeight="semibold"
                onPress={() => closeIconAction(onClose)}
              />
            </MessageContainer>
          </Wrapper>
        </Container>
      </ShadowContainer>
    </ModalNative>
  );
};

ScanErrorModal.propTypes = {
  onClose: PropTypes.func,
  labels: PropTypes.shape({}),
};

ScanErrorModal.defaultProps = {
  onClose: () => {},
  labels: {
    lbl_qrscan_no_result: '',
    lbl_qrscan_no_result_help: '',
    lbl_qrscan_cta_retry: '',
  },
};

export default ScanErrorModal;
