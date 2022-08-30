import React from 'react';
import { shallow } from 'enzyme';
import { MyAccountDropdownNavVanilla } from '../views/MyAccountDropdownNav.view.native';

describe('MyAccountDropdownNav', () => {
  it('should render correctly', () => {
    const props = {
      navData: [{ component: 'overview' }],
      handleComponentChange: () => {},
      className: '',
      component: 'Account',
    };
    const tree = shallow(<MyAccountDropdownNavVanilla {...props} />);
    expect(tree).toMatchSnapshot();
  });

  it('on change component prop, dropDownItem state should reset', () => {
    const props = {
      navData: [{ component: 'overview' }],
      handleComponentChange: () => {},
      className: '',
      component: 'Account',
    };
    const tree = shallow(<MyAccountDropdownNavVanilla {...props} />);
    tree.setProps({
      component: 'payment',
    });
    expect(tree.state('dropDownItem')).toBe('payment');
  });
});
