import React from 'react';
import CnCTemplate from '../../common/organism/CnCTemplate';
import Row from '../../../../common/atoms/Row';

export default class ShippingPage extends React.PureComponent {
  render() {
    return (
      <CnCTemplate
        header={() => {
          return <Row>Shipping Header</Row>;
        }}
        leftSection={() => {
          return 'Shipping Page';
        }}
      />
    );
  }
}
