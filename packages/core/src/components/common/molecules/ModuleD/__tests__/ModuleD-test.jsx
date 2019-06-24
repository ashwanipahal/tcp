import React from 'react';
import { shallow } from 'enzyme';
import ModuleD from '../ModuleD';
import mock from '../mock';

describe('ModuleD component', () => {
  it('renders correctly', () => {
    const props = {
      data: mock,
    };

    const wrapper = shallow(<ModuleD {...props} />);
    expect(wrapper).toMatchSnapshot();
  });
});
