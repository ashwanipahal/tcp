import { shallow } from 'enzyme';
import React from 'react';
import MyAccountLayout from '../container/MyAccountLayout.container';

describe('My Account Layout Container', () => {
  it('should render MyAccountLayout Correctly', () => {
    const mainContent = jest.fn();
    const tree = shallow(<MyAccountLayout mainContent={mainContent} />);
    expect(tree).toMatchSnapshot();
  });
});
