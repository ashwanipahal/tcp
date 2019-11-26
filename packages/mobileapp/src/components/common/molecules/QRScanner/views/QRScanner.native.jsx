import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { get } from 'lodash';
import { connect } from 'react-redux';
import QRCodeScanner from 'react-native-qrcode-scanner';
import withStyles from '@tcp/core/src/components/common/hoc/withStyles';
import { Text, Modal } from 'react-native';
import BagPageHeader from '../../Header/BagPageHeader';
import NoReadableQRModal from '../../QRCodeNotReadable';
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

  redirectToPLP = data => {
    if (data) {
      const { navigation } = this.props;
      navigation.navigate('ProductListing', {
        url: `/c?cid=${data}`,
        showCustomLoader: true,
      });
    } else {
      this.notReadableQRCode();
    }
  };

  notReadableQRCode = () => {
    this.setState({ isQRNotReadable: true, isQRActive: false });
  };

  closeNotReadableQRCodeModal = () => {
    this.setState({ isQRNotReadable: false, isQRActive: true }, () => this.activateQRScanner());
  };

  activateQRScanner = () => {
    this.scanner.reactivate();
  };

  onSuccess = e => {
    this.setState({ isQRActive: false }, () => this.redirectToPLP(e && e.data));
  };

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
        <NoReadableQRModal
          labels={qrLabels}
          isOpen={isQRNotReadable}
          navigation={navigation}
          onClose={this.closeNotReadableQRCodeModal}
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
    qrLabels: get(state, 'Labels.Browse.SLP', {}),
  };
};

QRCode.propTypes = {
  qrLabels: PropTypes.shape({}).isRequired,
};

export default connect(mapStateToProps)(withStyles(QRCode, Style));
export { QRCode as QRCodeVanilla };
