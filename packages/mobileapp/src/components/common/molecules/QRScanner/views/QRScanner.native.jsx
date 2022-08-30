import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import get from 'lodash/get';
import { connect } from 'react-redux';
import QRCodeScanner from 'react-native-qrcode-scanner';
import withStyles from '@tcp/core/src/components/common/hoc/withStyles';
import { Modal } from 'react-native';
import BagPageHeader from '../../Header/BagPageHeader';
import ScanErrorModal from '../../scanErrorModal';
import Style, { HelpText } from '../styles/QRScanner.style.native';

class QRCode extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      isQRNotReadable: false,
      isQRActive: true,
    };
    this.scanner = '';
  }

  /**
   * It redirects to PLP page once camera detected QR.
   * If there is no readable content in QR then it will not redirect to PLP
   * and open error modal
   *
   */
  redirectToPLP = data => {
    const qrValidatorString = '/scan-it/';
    if (data && data.match(qrValidatorString)) {
      const { navigation } = this.props;
      navigation.navigate('ProductListing', {
        url: `/c?cid=${data.replace(qrValidatorString, '')}`,
        showCustomLoader: true,
      });
    } else {
      this.noQRFound();
    }
  };

  /**
   * Set state to show no QR found modal
   */
  noQRFound = () => {
    this.setState({ isQRNotReadable: true, isQRActive: false });
  };

  /**
   * Set state to close no QR found error modal and reactive the QR scanner to scan another QR code.
   */
  closeNoQRFoundModal = () => {
    this.setState({ isQRNotReadable: false, isQRActive: true }, () => this.activateQRScanner());
  };

  /**
   * Activate QR scanner programmatically because QR scanner will scan only once
   * If another QR need to scan then QR scanner need to be reactivate
   */
  activateQRScanner = () => {
    this.scanner.reactivate();
  };

  /**
   * QR scanner scanned callback.
   */
  onSuccess = e => {
    this.setState({ isQRActive: false }, () => this.redirectToPLP(e && e.data));
  };

  /**
   * Render top content on QR scanner page
   */
  topContent = () => {
    const { qrLabels } = this.props;
    return (
      <>
        <HelpText>{qrLabels.lbl_qrscanner_help_one}</HelpText>
        <HelpText>{qrLabels.lbl_qrscanner_help_two}</HelpText>
      </>
    );
  };

  render() {
    const { isQRNotReadable, isQRActive } = this.state;
    const { navigation, qrLabels } = this.props;
    return (
      <Modal animationType="fade" transparent={false}>
        <ScanErrorModal
          labels={qrLabels}
          isOpen={isQRNotReadable}
          navigation={navigation}
          onClose={this.closeNoQRFoundModal}
        />
        <BagPageHeader showGobackIcon navigation={navigation} showCloseButton={false} />
        <QRCodeScanner
          fadeIn={false}
          ref={node => {
            this.scanner = node;
          }}
          onRead={this.onSuccess}
          reactivate={isQRActive}
          showMarker
          topContent={this.topContent()}
          reactivateTimeout={2}
          notAuthorizedView={<HelpText>{qrLabels.lbl_qrscanner_not_authorized}</HelpText>}
        />
      </Modal>
    );
  }
}

const mapStateToProps = state => {
  return {
    qrLabels: get(state, 'Labels.global.qrScanner', {}),
  };
};

QRCode.propTypes = {
  qrLabels: PropTypes.shape({}).isRequired,
  navigation: PropTypes.shape({}),
};

QRCode.defaultProps = {
  navigation: {},
};

export default connect(mapStateToProps)(withStyles(QRCode, Style));
export { QRCode as QRCodeVanilla };
