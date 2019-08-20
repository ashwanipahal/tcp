import React from 'react';
import { shallow } from 'enzyme';
import { List } from 'immutable';
import { MyWalletTile } from '../MyWalletTile.view';

describe('MyWalletTile component', () => {
  it('should render correctly when coupons are present', () => {
    const props = {
      labels: {
        lbl_overview_myWalletOfferAvailable: '',
      },
      coupons: List([{}]),
    };
    const component = shallow(<MyWalletTile {...props} />);
    expect(component).toMatchSnapshot();
  });

  it('should render correctly when coupons are not present', () => {
    const props = {
      labels: {},
      coupons: List([]),
    };
    const component = shallow(<MyWalletTile {...props} />);
    expect(component).toMatchSnapshot();
  });
});
