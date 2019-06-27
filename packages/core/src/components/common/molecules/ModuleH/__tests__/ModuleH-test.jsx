import React from 'react';
import { shallow } from 'enzyme';
import ModuleH from '../view';

describe('ModuleH component', () => {
  it('renders correctly', () => {
    const wrapper = shallow(<ModuleH />).get(0);
    const moduleHComp = shallow(wrapper);
    expect(moduleHComp).toMatchSnapshot();
  });
});
