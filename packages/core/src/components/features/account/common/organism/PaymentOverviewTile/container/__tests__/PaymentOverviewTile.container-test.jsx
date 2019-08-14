import React from 'react';
import { List } from 'immutable';
import { shallow } from 'enzyme';
import { PaymentOverviewTile } from '../PaymentOverviewTile.container';
import PaymentOverviewTileComponent from '../../views/PaymentOverviewTile.view';

describe('PaymentOverviewTile container', () => {
  it('should render PaymentOverviewTile component', () => {
    const obj = new List();
    const component = shallow(
      <PaymentOverviewTile
        creditCardDefault={obj}
        giftCardList={obj}
        venmoCardList={obj}
        labels={{ accountOverview: {} }}
      />
    );
    expect(component.is(PaymentOverviewTileComponent)).toBeTruthy();
  });
});
