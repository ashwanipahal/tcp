import { shallow } from 'enzyme';
import React from 'react';
import AccountOverviewComponent from '../views/AccountOverview.view';

describe('MyAccountOverview View', () => {
  it('should render AccountOverview Correctly', () => {
    const tree = shallow(<AccountOverviewComponent />);
    expect(tree).toMatchSnapshot();
  });
});
