/* eslint-disable react/no-unused-prop-types */
import React, { PureComponent } from 'react';
import logger from '@tcp/core/src/utils/loggerInstance';
import JsBarcode from 'jsbarcode';
import PropTypes from 'prop-types';

class Barcode extends PureComponent {
  constructor(props) {
    super(props);
    this.barCodeRef = React.createRef();
  }

  componentDidMount() {
    this.update();
  }

  componentDidUpdate() {
    this.update();
  }

  update = () => {
    const { value } = this.props;
    const renderElement = this.barCodeRef.current;
    try {
      JsBarcode(renderElement, value, Object.assign({}, this.props));
    } catch (e) {
      // prevent stop the parent process
      logger.error(e);
    }
  };

  render() {
    const { barcodeId, renderer, value } = this.props;
    if (renderer === 'svg') {
      return <svg ref={this.barCodeRef} id={barcodeId} />;
    }
    if (renderer === 'canvas') {
      return <canvas ref={this.barCodeRef} id={barcodeId} />;
    }
    if (renderer === 'img') {
      return <img ref={this.barCodeRef} id={barcodeId} alt={value} />;
    }

    return null;
  }
}

Barcode.propTypes = {
  value: PropTypes.string.isRequired,
  barcodeId: PropTypes.string.isRequired,
  renderer: PropTypes.string,
  format: PropTypes.string,
  width: PropTypes.number,
  height: PropTypes.number,
  displayValue: PropTypes.bool,
  fontOptions: PropTypes.string,
  font: PropTypes.string,
  textAlign: PropTypes.string,
  textPosition: PropTypes.string,
  textMargin: PropTypes.number,
  fontSize: PropTypes.number,
  background: PropTypes.string,
  lineColor: PropTypes.string,
  margin: PropTypes.number,
};

Barcode.defaultProps = {
  format: 'CODE128',
  renderer: 'svg',
  width: 2,
  height: 100,
  displayValue: true,
  fontOptions: '',
  font: 'Nunito',
  textAlign: 'center',
  textPosition: 'bottom',
  textMargin: 2,
  fontSize: 20,
  background: '#ffffff',
  lineColor: '#000000',
  margin: 10,
};

export default Barcode;
