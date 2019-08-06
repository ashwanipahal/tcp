import React from 'react';
import { shallow } from 'enzyme';
import { AccountOverviewTileList } from '../AccountOverviewTileList.view';

describe('AccountOverviewTileList component', () => {
  it('should render correctly', () => {
    const component = shallow(<AccountOverviewTileList />);
    expect(component).toMatchSnapshot();
  });
});
