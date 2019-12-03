import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { View } from 'react-native';
import Barcode from 'react-native-barcode-builder';
import BodyCopy from '@tcp/core/src/components/common/atoms/BodyCopy';
import { ViewWithSpacing } from '@tcp/core/src/components/common/atoms/styledWrapper';

class BarcodeView extends PureComponent {
  render() {
    const { value, format, height, displayValue, width, fontSize } = this.props;
    return (
      <View>
        <Barcode value={value} width={width} height={height} format={format} />
        {displayValue && (
          <ViewWithSpacing spacingStyles="margin-bottom-XXS">
            <BodyCopy textAlign="center" fontFamily="secondary" fontSize={fontSize} text={value} />
          </ViewWithSpacing>
        )}
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
  fontSize: PropTypes.string,
};

BarcodeView.defaultProps = {
  format: 'CODE128',
  height: 50,
  width: '1',
  displayValue: true,
  fontSize: 'fs12',
};

export default BarcodeView;
