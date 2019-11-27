import React from 'react';
import { List } from 'immutable';
import { shallow } from 'enzyme';
import PaymentOverviewTileSkelton from '../../skelton/PaymentOverviewTileSkelton.view.native';

describe('PaymentOverviewTile container', () => {
  it('Generate Skelton of Payment Overview', () => {
    const component = shallow(<PaymentOverviewTileSkelton />);
    expect(component).toMatchSnapshot();
  });
});
