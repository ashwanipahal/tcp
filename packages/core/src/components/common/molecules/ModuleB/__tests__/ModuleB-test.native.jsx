import React from 'react';
import { shallow } from 'enzyme';
import { ModuleBVanilla } from '../view/ModuleB.native';
import mock from '../../../../../services/abstractors/common/moduleB/mock';

describe('ModuleBVanilla', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = shallow(<ModuleBVanilla {...mock.composites} />);
  });

  it('should match snapshot', () => {
    expect(wrapper).toMatchSnapshot();
  });
});
