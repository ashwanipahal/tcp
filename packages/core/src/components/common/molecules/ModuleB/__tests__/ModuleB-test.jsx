import React from 'react';
import { shallow } from 'enzyme';
import mock from '../../../../../services/abstractors/common/moduleB/mock';
import { ModuleBVanilla as ModuleB } from '../view/ModuleB';

describe('ModuleB component', () => {
  it('should render TCP or default variant correctly', () => {
    const wrapper = shallow(<ModuleB {...mock} />);
    expect(wrapper).toMatchSnapshot();
  });

  it('should render banner top variation', () => {
    mock.bannerPosition = 'top';
    const wrapper = shallow(<ModuleB {...mock} />);
    expect(wrapper.find('.banner-top-variation')).toHaveLength(1);
    expect(wrapper).toMatchSnapshot();
  });

  it('should render banner top alt variation', () => {
    mock.bannerPosition = 'topAlt';
    const wrapper = shallow(<ModuleB {...mock} />);
    expect(wrapper.find('.banner-top-alt-variation')).toHaveLength(1);
    expect(wrapper).toMatchSnapshot();
  });

  it('should render banner bottom variation', () => {
    mock.bannerPosition = 'bottom';
    const wrapper = shallow(<ModuleB {...mock} />);
    expect(wrapper.find('.banner-bottom-variation')).toHaveLength(1);
    expect(wrapper).toMatchSnapshot();
  });

  it('should render banner overlay variation', () => {
    mock.bannerPosition = 'overlay';
    const wrapper = shallow(<ModuleB {...mock} />);
    expect(wrapper.find('.banner-overlay-variation')).toHaveLength(1);
    expect(wrapper).toMatchSnapshot();
  });
});
