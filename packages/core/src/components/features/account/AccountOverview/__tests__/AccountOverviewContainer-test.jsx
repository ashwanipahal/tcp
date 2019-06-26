import { shallow } from 'enzyme';
import React from 'react';
import AccountOverview from '../container/AccountOverview.container';

describe('MyAccountOverview Container', () => {
  it('should render AccountOverview Correctly', () => {
    const mainContent = jest.fn();
    const tree = shallow(<AccountOverview mainContent={mainContent} />);
    expect(tree).toMatchSnapshot();
  });
});
