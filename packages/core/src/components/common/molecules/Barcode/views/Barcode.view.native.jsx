/* eslint-disable react/no-unused-prop-types */
import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { View } from 'react-native';
import Barcode from 'react-native-barcode-builder';
import BodyCopy from '../../../atoms/BodyCopy';

class BarcodeView extends PureComponent {
  render() {
    const { value, format, height } = this.props;
    return (
      <View>
        <Barcode value={value} width="1" height={height} format={format} />
        <BodyCopy textAlign="center" text={value} />
      </View>
    );
  }
}

BarcodeView.propTypes = {
  value: PropTypes.string.isRequired,
  format: PropTypes.string,
  height: PropTypes.number,
};

BarcodeView.defaultProps = {
  format: 'CODE128',
  height: 50,
};

export default BarcodeView;
