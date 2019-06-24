import { shallow } from 'enzyme';
import React from 'react';
import AccountOverview from '../views/AccountOverview.view';

describe('MyAccountOverview View', () => {
  it('should render AccountOverview Correctly', () => {
    const tree = shallow(<AccountOverview />);
    expect(tree).toMatchSnapshot();
  });
});
