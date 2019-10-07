import React from 'react';
import { View } from 'react-native';
import PropTypes from 'prop-types';
import Recaptcha from './recaptcha.native';
import ModalNative from '../Modal/view/Modal.native';
import { RecaptchaContainer } from '../../../features/account/common/molecule/CardTile/CardTile.style.native';

class RecaptchaModal extends React.PureComponent {
  render() {
    const { toggleRecaptchaModal, setRecaptchaModalMountedState, onMessage } = this.props;
    return (
      <View>
        {setRecaptchaModalMountedState && (
          <ModalNative
            transparentModal="transparent-captcha"
            heading="RECAPTCHA"
            isOpen={setRecaptchaModalMountedState}
            onRequestClose={toggleRecaptchaModal}
          >
            <RecaptchaContainer>
              <Recaptcha onMessage={onMessage} />
            </RecaptchaContainer>
          </ModalNative>
        )}
      </View>
    );
  }
}

RecaptchaModal.propTypes = {
  onMessage: PropTypes.func.isRequired,
  toggleRecaptchaModal: PropTypes.string.isRequired,
  setRecaptchaModalMountedState: PropTypes.shape({}).isRequired,
};

export default RecaptchaModal;
