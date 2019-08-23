import React, { PureComponent } from 'react';
import { View } from 'react-native';
import Recaptcha from './recaptcha.native';
import ModalNative from '../Modal/view/Modal.native';
import { RecaptchaContainer } from '../../../features/account/common/molecule/CardTile/CardTile.style.native';

class RecaptchaModal extends PureComponent<Props> {
  render() {
    const { toggleRecaptchaModal, setRecaptchaModalMountedState } = this.props;
    return (
      <View>
        {setRecaptchaModalMountedState && (
          <ModalNative isOpen={setRecaptchaModalMountedState} onRequestClose={toggleRecaptchaModal}>
            <RecaptchaContainer>
              <Recaptcha onMessage="hello" />
            </RecaptchaContainer>
          </ModalNative>
        )}
      </View>
    );
  }
}

export default RecaptchaModal;
