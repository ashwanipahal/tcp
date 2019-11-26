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
} from '../styles/notReadableModal.native.style';
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

const NotReadableModal = ({ onClose, isOpen, labels }) => {
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
                text={labels.lbl_qrscan_no_result || 'No Results or Unreadable Code'}
                textAlign="center"
                fontFamily="secondary"
                fontSize="fs16"
                fontWeight="black"
              />

              <StyledBodyCopy
                text={
                  labels.lbl_qrscan_no_result_help ||
                  'Scanning code on fabric? Lay flat, smooth wrinkles & rescan.'
                }
                textAlign="center"
                fontFamily="secondary"
                fontSize="fs16"
                marginTop="16px"
              />

              <StyledButton
                text={labels.lbl_qrscan_cta_retry || 'RESCAN CODE'}
                fill="WHITE"
                marginTop="25px"
                width="260px"
                onPress={() => closeIconAction(onClose)}
              />
            </MessageContainer>
          </Wrapper>
        </Container>
      </ShadowContainer>
    </ModalNative>
  );
};

NotReadableModal.propTypes = {
  onClose: PropTypes.func,
  labels: PropTypes.shape({}).isRequired,
};

NotReadableModal.defaultProps = {
  onClose: () => {},
};

export default NotReadableModal;
export { NotReadableModal as PLPGifAnimationVanilla };
