import React from 'react';
import { shallow } from 'enzyme';
import ModuleM from '../views/ModuleM.native';

describe('ModuleM component', () => {
  it('ModuleM component renders correctly without props', () => {
    const component = shallow(<ModuleM />);
    expect(component).toMatchSnapshot();
  });
});
