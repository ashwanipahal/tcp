import React from 'react';
import CnCTemplate from '../../../../common/organism/CnCTemplate';
import Row from '../../../../../../common/atoms/Row';

export default class PickupPage extends React.PureComponent {
  render() {
    return (
      <CnCTemplate
        header={() => {
          return <Row>Pickup Header</Row>;
        }}
        leftSection={() => {
          return 'Pickup Page';
        }}
      />
    );
  }
}
