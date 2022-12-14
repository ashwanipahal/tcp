import React from 'react';
import { shallow } from 'enzyme';
import { PaymentTile } from '../PaymentTile.view.native';

describe('PaymentTile component', () => {
  it('should render correctly', () => {
    const component = shallow(<PaymentTile handleComponentChange={jest.fn()} />);
    expect(component).toMatchSnapshot();
  });
});
