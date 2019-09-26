import React from 'react';
import { View } from 'react-native';
import Recaptcha from './recaptcha.native';
import ModalNative from '../Modal/view/Modal.native';
import { RecaptchaContainer } from '../../../features/account/common/molecule/CardTile/CardTile.style.native';

class RecaptchaModal extends React.PureComponent<Props> {
  render() {
    const { toggleRecaptchaModal, setRecaptchaModalMountedState, onMessage } = this.props;
    return (
      <View>
        {setRecaptchaModalMountedState && (
          <ModalNative isOpen={setRecaptchaModalMountedState} onRequestClose={toggleRecaptchaModal}>
            <RecaptchaContainer>
              <Recaptcha onMessage={onMessage} />
            </RecaptchaContainer>
          </ModalNative>
        )}
      </View>
    );
  }
}

export default RecaptchaModal;
