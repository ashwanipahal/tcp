import React from 'react';
import { shallow } from 'enzyme';
import { PaymentOverviewTile } from '../PaymentOverviewTile.view.native';

describe('PaymentOverviewTile component', () => {
  it('should render correctly', () => {
    const component = shallow(<PaymentOverviewTile />);
    expect(component).toMatchSnapshot();
  });
});
