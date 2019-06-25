import React from 'react';
import { shallow } from 'enzyme';
import ModuleD from '../ModuleD';

describe('ModuleD component', () => {
  it('renders correctly', () => {
    const props = {};

    const wrapper = shallow(<ModuleD {...props} />);
    expect(wrapper).toMatchSnapshot();
  });
});
