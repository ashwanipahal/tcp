import { shallow } from 'enzyme';
import React from 'react';
import { MyAccountLayoutViewVanilla } from '../views/MyAccountLayout.view.native';
import navData from '../MyAccountRoute.config';

describe('My Account Layout View', () => {
  const mainContent = jest.fn();
  const handleComponentChange = jest.fn();
  let props = {
    labels: {},
    className: 'MyAccountLayoutView',
    handleComponentChange,
  };

  it('should render MyAccountLayoutView Correctly', () => {
    props = {
      labels: {},
      className: 'MyAccountLayoutView',
      handleComponentChange,
    };
    const tree = shallow(
      <MyAccountLayoutViewVanilla
        mainContent={mainContent}
        navData={navData}
        selectedComponent="addressBookMobile"
        {...props}
      />
    );
    expect(tree).toMatchSnapshot();
  });
});
