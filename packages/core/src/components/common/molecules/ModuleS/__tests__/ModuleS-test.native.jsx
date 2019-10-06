import React from 'react';
import { shallow } from 'enzyme';
import ModuleS from '../view/ModuleS.native';
import mock from '../../../../../services/abstractors/common/moduleS/mock-v1';

describe('ModuleSVanilla', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = shallow(<ModuleS {...mock.moduleS.composites} />);
  });

  it('should match snapshot', () => {
    expect(wrapper).toMatchSnapshot();
  });
});
