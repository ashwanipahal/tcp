import React from 'react';
import { shallow } from 'enzyme';
import ModuleD from '../view/ModuleD';

describe('ModuleD component', () => {
  it('renders correctly', () => {
    const props = {};

    const wrapper = shallow(<ModuleD {...props} />).get(0);
    const mount = shallow(wrapper);
    expect(mount).toMatchSnapshot();
  });
});
