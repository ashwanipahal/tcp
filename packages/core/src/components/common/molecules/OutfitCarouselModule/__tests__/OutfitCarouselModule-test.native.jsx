import React from 'react';
import { shallow } from 'enzyme';
import { OutfitCarouselModule } from '../views/OutfitCarouselModule.view.native';

describe('OutfitCarouselModule', () => {
  let component;
  const props = {
    navigation: {},
    data: {
      headLine: [
        {
          text: 'Daffodil-Garden',
          style: '',
          __typename: 'StyledText',
        },
      ],
      subHeadLine: [
        {
          text: 'Build her head-to-toe party outfit sprinkled with all the extra-sweet details!',
          style: '',
          __typename: 'StyledText',
        },
      ],
      mediaLinkedList: [
        {
          image: {
            url: '/HoppyEaster_LongGroup02_FebDressy_4913_ts6cmf1.jpg',
            title: 'One',
            alt: 'One',
            crop_d: '',
            crop_t: '',
            crop_m: '',
            __typename: 'Image',
          },
          link: {
            url: '/HoppyEaster_LongGroup02_FebDressy_4913_ts6cmf2.jpg',
            text: '',
            target: '',
            title: '',
            __typename: 'Link',
          },
          __typename: 'LinkedImage',
        },
        {
          image: {
            url: '/HoppyEaster_LongGroup02_FebDressy_4913_ts6cmf.jpg',
            title: 'Three',
            alt: 'Three',
            crop_d: '',
            crop_t: '',
            crop_m: '',
            __typename: 'Image',
          },
          link: {
            url: '/HoppyEaster_LongGroup02_FebDressy_4913_ts6cmf3.jpg',
            text: 'Sunbeam',
            target: '',
            title: '',
            __typename: 'Link',
          },
          __typename: 'LinkedImage',
        },
        {
          image: {
            url: '/HoppyEaster_LongGroup02_FebDressy_4913_ts6cmf4.jpg',
            title: 'Five',
            alt: 'Five',
            crop_d: '',
            crop_t: '',
            crop_m: '',
            __typename: 'Image',
          },
          link: {
            url: '/HoppyEaster_LongGroup02_FebDressy_4913_ts6cmf5.jpg',
            text: 'Floral Breeze',
            target: '',
            title: '',
            __typename: 'Link',
          },
          __typename: 'LinkedImage',
        },
        {
          image: {
            url: '/HoppyEaster_LongGroup02_FebDressy_4913_ts6cmf6.jpg',
            title: 'test',
            alt: 'test',
            crop_d: '',
            crop_t: '',
            crop_m: '',
            __typename: 'Image',
          },
          link: {
            url: '/dummy',
            text: 'Pinkalicious',
            target: '',
            title: '',
            __typename: 'Link',
          },
          __typename: 'LinkedImage',
        },
        {
          image: {
            url: '/HoppyEaster_LongGroup02_FebDressy_4913_ts6cmf7.jpg',
            title: 'Outfit',
            alt: 'Outfit',
            crop_d: '',
            crop_t: '',
            crop_m: '',
            __typename: 'Image',
          },
          link: {
            url: '/dummy/dummy',
            text: 'thousand',
            target: '',
            title: '',
            __typename: 'Link',
          },
          __typename: 'LinkedImage',
        },
      ],
      __typename: 'Composite',
      moduleName: 'outfitCarousel',
      set: [],
    },
  };

  beforeEach(() => {
    component = shallow(<OutfitCarouselModule {...props} />);
  });

  it('should be defined', () => {
    expect(component).toBeDefined();
  });

  it('should render correctly', () => {
    expect(component).toMatchSnapshot();
  });

  it('should return styled view component value', () => {
    expect(component.find('Styled(View)')).toHaveLength(1);
  });

  it('should return BannerCarousel component value one', () => {
    expect(component.find('BannerCarousel')).toHaveLength(1);
  });
});
