import { shallow } from 'enzyme';
import React from 'react';
import { MyAccountLayoutViewVanilla } from '../views/MyAccountLayout.view.native';
import navData from '../MyAccountRoute.config';

describe('My Account Layout View', () => {
  it('should render MyAccountLayoutView Correctly', () => {
    const mainContent = jest.fn();
    const tree = shallow(
      <MyAccountLayoutViewVanilla
        mainContent={mainContent}
        navData={navData}
        selectedComponent="accountOverview"
      />
    );
    expect(tree).toMatchSnapshot();
  });
});
