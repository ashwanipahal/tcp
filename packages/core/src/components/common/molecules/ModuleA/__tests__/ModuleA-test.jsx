import React from 'react';
import { shallow } from 'enzyme';
import mock from '../../../../../services/abstractors/common/moduleA/mock';
import { ModuleAVanilla as ModuleA } from '../view/ModuleA';

describe('ModuleA component', () => {
  it('should render TCP or default variant correctly', () => {
    const wrapper = shallow(<ModuleA {...mock.moduleA.composites} />).get(0);
    expect(wrapper).toMatchSnapshot();
  });

  it('should render Gymboree variant correctly', () => {
    const wrapper = shallow(<ModuleA variant="gymboree" {...mock.moduleA.composites} />).get(0);
    expect(wrapper).toMatchSnapshot();
  });
});
