import React from 'react';
import CnCTemplate from '../../common/organism/CnCTemplate';
import Row from '../../../../common/atoms/Row';

export default class CheckoutPage extends React.PureComponent {
  render() {
    return (
      <CnCTemplate
        header={() => {
          return <Row>Checkout Header</Row>;
        }}
        leftSection={() => {
          return 'Shipping Page';
        }}
      />
    );
  }
}
