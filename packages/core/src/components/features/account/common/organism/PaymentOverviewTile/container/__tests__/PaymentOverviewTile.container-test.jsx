import React from 'react';
import { List } from 'immutable';
import { shallow } from 'enzyme';
import { PaymentOverviewTile } from '../PaymentOverviewTile.container';
import PaymentOverviewTileComponent from '../../views/PaymentOverviewTile.view';

import PaymentOverviewTileSkelton from '../../skelton/PaymentOverviewTileSkelton.view';

describe('PaymentOverviewTile container', () => {
  it('should render PaymentOverviewTile components', () => {
    const obj = new List();
    const component = shallow(
      <PaymentOverviewTile
        creditCardDefault={obj}
        giftCardList={obj}
        venmoCardList={obj}
        labels={{ accountOverview: {} }}
        isFetching={false}
      />
    );
    expect(component.is(PaymentOverviewTileComponent)).toBeTruthy();
    expect(component.is(PaymentOverviewTileSkelton)).not.toBeTruthy();
  });

  it('should render PaymentOverviewTile components', () => {
    const obj = new List();
    const component = shallow(
      <PaymentOverviewTile
        creditCardDefault={obj}
        giftCardList={obj}
        venmoCardList={obj}
        labels={{ accountOverview: {} }}
        isFetching
      />
    );
    expect(component.is(PaymentOverviewTileComponent)).not.toBeTruthy();
    expect(component.is(PaymentOverviewTileSkelton)).toBeTruthy();
  });
});
