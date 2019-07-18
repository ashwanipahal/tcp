import React from 'react';
import { mount } from 'enzyme';

import DamImage from '../views/DamImage';

const themeMock = {
  breakpoints: {
    keys: ['xs', 'sm', 'lg', 'xl'],
    values: { xs: 0, sm: 768, lg: 1024, xl: 1440 },
  },
};

describe('DamImage component', () => {
  it('Should create correct srcset only with imgLocation', () => {
    const srcSets = [
      'https://res.cloudinary.com/tcp-dam-test/image/upload/w_1440/v1561401513/ecom/assets/content/tcp/us/home/transform/dancing-girl.png',
      'https://res.cloudinary.com/tcp-dam-test/image/upload/w_1024/v1561401513/ecom/assets/content/tcp/us/home/transform/dancing-girl.png',
      'https://res.cloudinary.com/tcp-dam-test/image/upload/w_768/v1561401513/ecom/assets/content/tcp/us/home/transform/dancing-girl.png',
    ];

    const component = mount(
      <DamImage
        theme={themeMock}
        alt="Dancing Baby"
        imgPath="v1561401513/ecom/assets/content/tcp/us/home/transform/dancing-girl.png"
      />
    );

    expect(component.find('source').get(0).props.srcSet).toEqual(srcSets[0]);
    expect(component.find('source').get(1).props.srcSet).toEqual(srcSets[1]);
    expect(component.find('img').get(0).props.src).toEqual(srcSets[2]);
  });

  it('Should create correct srcset with imgLocation and cloudinary configuration', () => {
    const srcSets = [
      'https://res.cloudinary.com/tcp-dam-test/image/upload/c_crop,g_face:auto,q_auto:best,w_1440/dancing-boy.png',
      'https://res.cloudinary.com/tcp-dam-test/image/upload/c_crop,g_face:auto,q_auto:best,w_1100/dancing-boy.png',
      'https://res.cloudinary.com/tcp-dam-test/image/upload/c_fill,g_face:center,q_auto:best,w_780/dancing-boy.png',
      'https://res.cloudinary.com/tcp-dam-test/image/upload/g_face:center,q_auto:best,w_470/dancing-boy.png',
    ];

    const component = mount(
      <DamImage
        theme={themeMock}
        alt="Dancing Boy"
        imgPath="dancing-boy.png"
        imgConfigs={[
          'g_face:center,q_auto:best,w_470',
          'c_fill,g_face:center,q_auto:best,w_780',
          'c_crop,g_face:auto,q_auto:best,w_1100',
          'c_crop,g_face:auto,q_auto:best,w_1440',
        ]}
      />
    );

    expect(component.find('source').get(0).props.srcSet).toEqual(srcSets[0]);
    expect(component.find('source').get(1).props.srcSet).toEqual(srcSets[1]);
    expect(component.find('img').get(0).props.src).toEqual(srcSets[3]);
  });

  it('Should create correct srcset with imgPath', () => {
    const srcSets = [
      'https://www.tcp.com/c_crop,g_face:center,q_auto:best,w_1440/dancing-boy.png',
      'https://www.tcp.com/c_crop,g_face:center,q_auto:best,w_1100/dancing-boy.png',
      'https://www.tcp.com/c_fill,g_face:center,q_auto:best,w_780/dancing-boy.png',
      'https://www.tcp.com/c_crop,g_face:center,q_auto:best,w_470/dancing-boy.png',
    ];
    const component = mount(
      <DamImage
        theme={themeMock}
        alt="Dancing Boy"
        path="https://www.tcp.com"
        imgPath="dancing-boy.png"
        imgConfigs={[
          'c_crop,g_face:center,q_auto:best,w_470',
          'c_fill,g_face:center,q_auto:best,w_780',
          'c_crop,g_face:center,q_auto:best,w_1100',
          'c_crop,g_face:center,q_auto:best,w_1440',
        ]}
      />
    );

    expect(component.find('source').get(0).props.srcSet).toEqual(srcSets[0]);
    expect(component.find('source').get(1).props.srcSet).toEqual(srcSets[1]);
    expect(component.find('img').get(0).props.src).toEqual(srcSets[3]);
  });

  it('Should create correct srcset with cloudinary presets', () => {
    const srcSets = [
      'https://www.tcp1.com/c_crop,g_face:center,q_auto:best,w_1440/dancing-boy.png',
      'https://www.tcp1.com/c_crop,g_face:center,q_auto:best,w_1100/dancing-boy.png',
      'https://www.tcp1.com/test_image_presets/dancing-boy.png',
      'https://www.tcp1.com/c_crop,q_auto:best,w_470/dancing-boy.png',
    ];
    const component = mount(
      <DamImage
        theme={themeMock}
        alt="Dancing Boy"
        path="https://www.tcp1.com"
        imgPath="dancing-boy.png"
        imgConfigs={[
          'c_crop,q_auto:best,w_470',
          'test_image_presets',
          'c_crop,g_face:center,q_auto:best,w_1100',
          'c_crop,g_face:center,q_auto:best,w_1440',
        ]}
      />
    );

    expect(component.find('source').get(0).props.srcSet).toEqual(srcSets[0]);
    expect(component.find('source').get(1).props.srcSet).toEqual(srcSets[1]);
    expect(component.find('img').get(0).props.src).toEqual(srcSets[3]);
  });

  it('Should create correct srcset with single img config in array', () => {
    const srcSets = [
      'https://www.tcp2.com/w_1440/dancing-boy.png',
      'https://www.tcp2.com/w_1024/dancing-boy.png',
      'https://www.tcp2.com/w_768/dancing-boy.png',
      'https://www.tcp2.com/c_crop,g_face:center,q_auto:best,w_470/dancing-boy.png',
    ];
    const component = mount(
      <DamImage
        theme={themeMock}
        alt="Dancing Boy"
        path="https://www.tcp2.com"
        imgPath="dancing-boy.png"
        imgConfigs={['c_crop,g_face:center,q_auto:best,w_470']}
      />
    );

    expect(component.find('source').get(0).props.srcSet).toEqual(srcSets[0]);
    expect(component.find('source').get(1).props.srcSet).toEqual(srcSets[1]);
    expect(component.find('img').get(0).props.src).toEqual(srcSets[3]);
  });
});
