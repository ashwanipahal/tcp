import React from 'react';
import { shallow } from 'enzyme';
import { AddressOverviewTile } from '../AddressOverviewTile.view';

describe('AddressOverviewTile component', () => {
  it('should render correctly', () => {
    const component = shallow(<AddressOverviewTile />);
    expect(component).toMatchSnapshot();
  });
});
