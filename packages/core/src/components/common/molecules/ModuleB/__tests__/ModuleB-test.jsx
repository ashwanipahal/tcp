import React from 'react';
import { shallow } from 'enzyme';
import mock from '../../../../../services/abstractors/common/moduleB/mock';
import { ModuleBVanilla as ModuleB } from '../view/ModuleB';

describe('ModuleB component', () => {
  it('should render TCP or default variant correctly', () => {
    const wrapper = shallow(<ModuleB {...mock} />).get(0);
    expect(wrapper).toMatchSnapshot();
  });

  it('should render banner top variation', () => {
    const wrapper = shallow(<ModuleB {...mock} />).get(0);
    expect(wrapper).toMatchSnapshot();
  });

  it('should render banner top alt variation', () => {
    const wrapper = shallow(<ModuleB {...mock} />).get(0);
    expect(wrapper).toMatchSnapshot();
  });

  it('should render banner bottom variation', () => {
    const wrapper = shallow(<ModuleB {...mock} />).get(0);
    expect(wrapper).toMatchSnapshot();
  });

  it('should render banner overlay variation', () => {
    const wrapper = shallow(<ModuleB {...mock} />).get(0);
    expect(wrapper).toMatchSnapshot();
  });
});
