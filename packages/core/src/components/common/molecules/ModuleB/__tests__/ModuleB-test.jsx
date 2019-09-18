import React from 'react';
import { shallow } from 'enzyme';
import mock from '../../../../../services/abstractors/common/moduleB/mock';
import { ModuleBVanilla as ModuleB } from '../view/ModuleB';
import ImageBanner from '../view/ModuleB-imageBanner';

describe('ModuleB component', () => {
  const {
    composites: {
      largeCompImage: [{ headerText, promoBanner, linkedImage }],
    },
    bannerPosition,
  } = mock;

  const imageBannerProps = {
    bannerPosition,
    promoBanner: {
      headerText,
      promoBanner,
    },
    linkedImage,
  };

  const props = {
    largeCompImage: mock.composites.largeCompImage,
    ctaItems: mock.composites.ctaItems,
    bannerPosition: mock.bannerPosition,
    ctaType: mock.ctaType,
    expandableTitle: mock.expandableTitle,
  };

  it('should render TCP or default variant correctly', () => {
    const wrapper = shallow(<ModuleB {...props} />);
    expect(wrapper).toMatchSnapshot();
  });

  it('should render banner top variation', () => {
    imageBannerProps.bannerPosition = 'top';
    const wrapper = shallow(<ImageBanner {...imageBannerProps} />);
    expect(wrapper.find('.banner-top-variation')).toHaveLength(1);
    expect(wrapper).toMatchSnapshot();
  });

  it('should render banner top alt variation', () => {
    imageBannerProps.bannerPosition = 'topAlt';
    const wrapper = shallow(<ImageBanner {...imageBannerProps} />);
    expect(wrapper.find('.banner-top-alt-variation')).toHaveLength(1);
    expect(wrapper).toMatchSnapshot();
  });

  it('should render banner bottom variation', () => {
    imageBannerProps.bannerPosition = 'bottom';
    const wrapper = shallow(<ImageBanner {...imageBannerProps} />);
    expect(wrapper.find('.banner-bottom-variation')).toHaveLength(1);
    expect(wrapper).toMatchSnapshot();
  });

  it('should render banner overlay variation', () => {
    imageBannerProps.bannerPosition = 'overlay';
    const wrapper = shallow(<ImageBanner {...imageBannerProps} />);
    expect(wrapper.find('.banner-overlay-variation')).toHaveLength(1);
    expect(wrapper).toMatchSnapshot();
  });
});
