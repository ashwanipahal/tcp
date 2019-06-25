import { shallow } from 'enzyme';
import React from 'react';
import MyAccountLayoutView from '../views/MyAccountLayout.view';
import navData from '../MyAccountRoute.config';

describe('My Account Layout View', () => {
  it('should render MyAccountLayoutView Correctly', () => {
    const mainContent = jest.fn();
    const tree = shallow(
      <MyAccountLayoutView
        mainContent={mainContent}
        navData={navData}
        selectedComponent="accountOverview"
      />
    );
    expect(tree).toMatchSnapshot();
  });
});
