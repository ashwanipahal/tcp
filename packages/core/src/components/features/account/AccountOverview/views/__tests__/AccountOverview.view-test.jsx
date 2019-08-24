import React from 'react';
import { shallow } from 'enzyme';
import { AccountOverview } from '../AccountOverview.view';

describe('AccountOverviewTileList component', () => {
  it('should render correctly', () => {
    const component = shallow(<AccountOverview />);
    expect(component).toMatchSnapshot();
  });
});
