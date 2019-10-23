import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { View } from 'react-native';
import Barcode from 'react-native-barcode-builder';
import BodyCopy from '@tcp/core/src/components/common/atoms/BodyCopy';

class BarcodeView extends PureComponent {
  render() {
    const { value, format, height, displayValue, width } = this.props;
    return (
      <View>
        <Barcode value={value} width={width} height={height} format={format} />
        {displayValue && <BodyCopy textAlign="center" text={value} />}
      </View>
    );
  }
}

BarcodeView.propTypes = {
  value: PropTypes.string.isRequired,
  format: PropTypes.string,
  height: PropTypes.number,
  width: PropTypes.string,
  displayValue: PropTypes.bool,
};

BarcodeView.defaultProps = {
  format: 'CODE128',
  height: 50,
  width: '1',
  displayValue: true,
};

export default BarcodeView;
