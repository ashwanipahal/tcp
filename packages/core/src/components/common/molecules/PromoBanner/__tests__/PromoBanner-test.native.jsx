import React from 'react';
import { shallow } from 'enzyme';
import mock from '../../../../../services/abstractors/common/moduleK/mock';
import { PromoBannerVanilla, bodyCopyStyles } from '../views/PromoBanner.native';

describe('PromoTextBanner native component', () => {
  let component;

  beforeEach(() => {
    component = shallow(
      <PromoBannerVanilla promoBanner={mock.moduleK.composites.masonryGrid[0].promoBanner} />
    );
  });

  it('ModuleN should be defined', () => {
    expect(component).toBeDefined();
  });

  it('ModuleN should render correctly', () => {
    expect(component).toMatchSnapshot();
  });

  it('should render 1View', () => {
    expect(component.find('Styled(View)')).toHaveLength(1);
  });

  it('should render View', () => {
    expect(component.find('Styled(Styled(BodyCopy))')).toHaveLength(0);
  });

  it('renders correctly', () => {
    const wrapper = shallow(
      <PromoBannerVanilla
        promoBanner={mock.moduleK.composites.masonryGrid[0].promoBanner}
        dataLocator="moduleK_text_"
      />
    );
    expect(wrapper).toMatchSnapshot();
  });

  it('renders all style correctly', () => {
    Object.keys(bodyCopyStyles).forEach(key => {
      const wrapper = shallow(bodyCopyStyles[key]());
      expect(wrapper).toMatchSnapshot();
    });
  });
});
