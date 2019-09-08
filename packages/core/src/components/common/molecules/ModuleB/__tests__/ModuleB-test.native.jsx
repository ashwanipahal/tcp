import React from 'react';
import { shallow } from 'enzyme';
import { ModuleBVanilla } from '../view/ModuleB.native';

describe('ModuleNVanilla', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = shallow(<ModuleBVanilla />);
  });

  it('should match snapshot', () => {
    expect(wrapper).toMatchSnapshot();
  });
});
