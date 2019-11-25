import React, { PureComponent } from 'react';
import QRCodeScanner from 'react-native-qrcode-scanner';
import withStyles from '@tcp/core/src/components/common/hoc/withStyles';
import { Text, Linking, Modal, Alert } from 'react-native';
import BagPageHeader from '../../Header/BagPageHeader';
import Style from '../styles/QRScanner.style.native';

class QRCode extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      modalVisible: true,
    };
  }

  redirectToPLP = data => {
    const { navigation } = this.props;
    navigation.navigate('ProductListing', {
      url: '/c?cid=girls-clothing-school-uniforms',
      showCustomLoader: true,
    });
  };

  onSuccess = e => {
    // console.log('Scanned' + JSON.stringify(e.data, null, 4));
    // Alert(e.data);
  };

  /**
   * @function closeModal
   * closes search modal
   *
   * @memberof SearchProduct
   */
  closeModal = () => {
    this.setState({ modalVisible: false }, () => {
      const { closeSearchModal } = this.props;
      if (closeSearchModal) closeSearchModal();
    });
  };

  render() {
    const { modalVisible } = this.state;
    const { navigation } = this.props;
    this.redirectToPLP();
    return (
      <Modal
        animationType="fade"
        transparent={false}
        visible={modalVisible}
        onRequestClose={this.closeModal}
      >
        <BagPageHeader showGobackIcon navigation={navigation} />
        <QRCodeScanner
          onRead={this.onSuccess}
          reactivate
          showMarker
          topContent={<Text>Center QR code inside frame to scan.</Text>}
        />
      </Modal>
    );
  }
}

export default withStyles(QRCode, Style);
export { QRCode as QRCodeVanilla };
