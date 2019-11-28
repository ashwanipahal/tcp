import React from 'react';
import { shallow } from 'enzyme';
import { CategoryPromoImagesVanilla } from '../views/CategoryPromoImages.view';

describe('ProductPickupVanilla', () => {
  let component;
  const imageGrid = [
    {
      image: {
        url: '/Module-H_TCP_ybjasx.jpg',
        alt: 'Test Tiles',
        title: 'Test Tiles',
        crop_d: '',
        crop_t: '',
        crop_m: '',
        __typename: 'Image',
      },
      styled: {
        text: 'Category 1',
        __typename: 'StyledText',
      },
      link: {
        url: '/dummy',
        text: 'Category 1',
        title: '',
        target: '',
        external: 0,
        action: '',
        __typename: 'Link',
      },
      __typename: 'DivCTALink',
    },
    {
      image: {
        url: '/Module-H_Gymboree_oyndtj.jpg',
        alt: 'dummy2',
        title: 'dummy2',
        crop_d: '',
        crop_t: '',
        crop_m: '',
        __typename: 'Image',
      },
      styled: {
        text: 'Category 2',
        __typename: 'StyledText',
      },
      link: {
        url: '/dummy',
        text: 'Category 2',
        title: '',
        target: '',
        external: 0,
        action: '',
        __typename: 'Link',
      },
      __typename: 'DivCTALink',
    },
    {
      image: {
        url: '/top_view_Module_B_fdvbd5.jpg',
        alt: 'dummy',
        title: 'dummy',
        crop_d: '',
        crop_t: '',
        crop_m: '',
        __typename: 'Image',
      },
      styled: {
        text: 'dummy test',
        __typename: 'StyledText',
      },
      link: {
        url: '/dummy',
        text: '',
        title: '',
        target: '',
        external: 0,
        action: '',
        __typename: 'Link',
      },
      __typename: 'DivCTALink',
    },
    {
      image: {
        url: '/top_view_Module_B_fdvbd5.jpg',
        alt: 'new image',
        title: 'new image',
        crop_d: '',
        crop_t: '',
        crop_m: '',
        __typename: 'Image',
      },
      styled: {
        text: 'dummy',
        __typename: 'StyledText',
      },
      link: {
        url: '/dummy',
        text: 'Category 4',
        title: '',
        target: '',
        external: 0,
        action: '',
        __typename: 'Link',
      },
      __typename: 'DivCTALink',
    },
  ];

  const props = {
    className: '',
    categoryPromoImages: {
      '06b47e35-c634-4438-b292-d6737f0f5661': {
        imageGrid,
        moduleClassName: '',
        images: '4',
      },
      '06b47e35-c634-4438-b292-d6737f0f5662': {
        imageGrid,
        moduleClassName: '',
        images: '6',
      },
      '06b47e35-c634-4438-b292-d6737f0f5663': {
        imageGrid,
        __typename: 'Composite',
        moduleName: 'categoryPromo',
        set: [
          {
            key: 'moduleClassName',
            val: '',
            __typename: 'KeyValPair',
          },
          {
            key: 'images',
            val: '6',
            __typename: 'KeyValPair',
          },
        ],
        moduleClassName: '',
        images: '1',
      },
    },
  };

  beforeEach(() => {
    component = shallow(<CategoryPromoImagesVanilla {...props} />);
  });

  it('should render correctly', () => {
    expect(component).toMatchSnapshot();
  });
});
