import React from 'react';
import { mount } from 'enzyme';

import DamImage from '../views/DamImage';

describe('DamImage component', () => {
  it('Should create correct srcset only with imgLocation', () => {
    const srcSets = [
      'https://res.cloudinary.com/tcp-dam-test/image/upload/w_488/v1561401513/ecom/assets/content/tcp/us/home/transform/dancing-girl.png',
      'https://res.cloudinary.com/tcp-dam-test/image/upload/w_788/v1561401513/ecom/assets/content/tcp/us/home/transform/dancing-girl.png',
      'https://res.cloudinary.com/tcp-dam-test/image/upload/w_1044/v1561401513/ecom/assets/content/tcp/us/home/transform/dancing-girl.png',
    ];

    const component = mount(
      <DamImage
        alt="Dancing Baby"
        imgPath="v1561401513/ecom/assets/content/tcp/us/home/transform/dancing-girl.png"
      />
    );

    expect(component.find('source').get(0).props.srcSet).toEqual(srcSets[0]);
    expect(component.find('source').get(1).props.srcSet).toEqual(srcSets[1]);
    expect(component.find('source').get(2).props.srcSet).toEqual(srcSets[2]);
  });

  it('Should create correct srcset with imgLocation and Cloudinary configuration', () => {
    const srcSets = [
      'https://res.cloudinary.com/tcp-dam-test/image/upload/c_crop,g_face:auto,q_auto:best,w_470/dancing-boy.png',
      'https://res.cloudinary.com/tcp-dam-test/image/upload/c_fill,g_face:center,q_auto:best,w_780/dancing-boy.png',
      'https://res.cloudinary.com/tcp-dam-test/image/upload/g_face:center,q_auto:best,w_1100/dancing-boy.png',
    ];

    const component = mount(
      <DamImage
        alt="Dancing Boy"
        imgPath="dancing-boy.png"
        imgConfigs={[
          'c_crop,g_face:auto,q_auto:best,w_470',
          'c_fill,g_face:center,q_auto:best,w_780',
          'g_face:center,q_auto:best,w_1100',
        ]}
      />
    );

    expect(component.find('source').get(0).props.srcSet).toEqual(srcSets[0]);
    expect(component.find('source').get(1).props.srcSet).toEqual(srcSets[1]);
    expect(component.find('source').get(2).props.srcSet).toEqual(srcSets[2]);
  });

  it('Should create correct srcset with imgPath', () => {
    const srcSets = [
      'https://www.tcp.com/c_crop,g_face:center,q_auto:best,w_470/dancing-boy.png',
      'https://www.tcp.com/c_fill,g_face:center,q_auto:best,w_780/dancing-boy.png',
      'https://www.tcp.com/c_crop,g_face:center,q_auto:best,w_1100/dancing-boy.png',
    ];
    const component = mount(
      <DamImage
        alt="Dancing Boy"
        path="https://www.tcp.com"
        imgPath="dancing-boy.png"
        imgConfigs={[
          'c_crop,g_face:center,q_auto:best,w_470',
          'c_fill,g_face:center,q_auto:best,w_780',
          'c_crop,g_face:center,q_auto:best,w_1100',
        ]}
      />
    );

    expect(component.find('source').get(0).props.srcSet).toEqual(srcSets[0]);
    expect(component.find('source').get(1).props.srcSet).toEqual(srcSets[1]);
    expect(component.find('source').get(2).props.srcSet).toEqual(srcSets[2]);
  });

  it('Should create correct srcset with cloudinary presets', () => {
    const srcSets = [
      'https://www.tcp.com/c_crop,g_face:center,q_auto:best,w_470/dancing-boy.png',
      'https://www.tcp.com/test_image_presets/dancing-boy.png',
      'https://www.tcp.com/c_crop,g_face:center,q_auto:best,w_1100/dancing-boy.png',
    ];
    const component = mount(
      <DamImage
        alt="Dancing Boy"
        path="https://www.tcp.com"
        imgPath="dancing-boy.png"
        imgConfigs={[
          'c_crop,g_face:center,q_auto:best,w_470',
          'test_image_presets',
          'c_crop,g_face:center,q_auto:best,w_1100',
        ]}
      />
    );

    expect(component.find('source').get(0).props.srcSet).toEqual(srcSets[0]);
    expect(component.find('source').get(1).props.srcSet).toEqual(srcSets[1]);
    expect(component.find('source').get(2).props.srcSet).toEqual(srcSets[2]);
  });
});
