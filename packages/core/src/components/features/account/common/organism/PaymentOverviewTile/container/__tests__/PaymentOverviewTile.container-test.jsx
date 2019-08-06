import React from 'react';
import { shallow } from 'enzyme';
import { PaymentOverviewTile } from '../PaymentOverviewTile.container';
import PaymentOverviewTileComponent from '../../views/PaymentOverviewTile.view';

describe('PaymentOverviewTile container', () => {
  it('should render PaymentOverviewTile component', () => {
    const component = shallow(<PaymentOverviewTile labels={{ accountOverview: {} }} />);
    expect(component.is(PaymentOverviewTileComponent)).toBeTruthy();
  });
});
