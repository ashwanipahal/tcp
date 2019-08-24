import React from 'react';
import { mount } from 'enzyme';

import { DamImageVanilla as DamImage} from '../views/DamImage';

const themeMock = {
  breakpoints: {
    maxWidth: 1440,
    keys: ['xs', 'sm', 'lg', 'xl'],
    values: { xs: 0, sm: 768, lg: 1024, xl: 1440 },
  },
};

const imgDataAltText = 'Dancing Boy';

describe('DamImage component', () => {
  it('Should create correct srcset only with imgLocation', () => {
    const srcSets = [
      'https://res.cloudinary.com/tcp-dam-test/image/upload/w_1440/v1561401513/ecom/assets/content/tcp/us/home/transform/dancing-girl.png',
      'https://res.cloudinary.com/tcp-dam-test/image/upload/w_1024/v1561401513/ecom/assets/content/tcp/us/home/transform/dancing-girl.png',
      'https://res.cloudinary.com/tcp-dam-test/image/upload/w_768/v1561401513/ecom/assets/content/tcp/us/home/transform/dancing-girl.png',
    ];

    const imgData = {
      alt: imgDataAltText,
      url: 'v1561401513/ecom/assets/content/tcp/us/home/transform/dancing-girl.png',
      crop_d: '',
      crop_t: '',
      crop_m: '',
    };
    const component = mount(<DamImage theme={themeMock} imgData={imgData} />);

    expect(component.find('source').get(0).props.srcSet).toEqual(srcSets[0]);
    expect(component.find('source').get(1).props.srcSet).toEqual(srcSets[1]);
    expect(component.find('source').get(2)).toBeFalsy();
    expect(component.find('img').get(0).props.src).toEqual(srcSets[2]);
  });

  it('Should create correct srcset with imgLocation and cloudinary configuration', () => {
    const srcSets = [
      'https://res.cloudinary.com/tcp-dam-test/image/upload/c_crop,g_face:auto,q_auto:best,w_1440/dancing-boy1.png',
      'https://res.cloudinary.com/tcp-dam-test/image/upload/c_fill,g_face:center,q_auto:best,w_1024/dancing-boy1.png',
      'https://res.cloudinary.com/tcp-dam-test/image/upload/g_face:center,q_auto:best,w_768/dancing-boy1.png',
    ];

    const imgData = {
      alt: imgDataAltText,
      url: 'dancing-boy1.png',
      crop_d: '',
      crop_t: '',
      crop_m: '',
    };

    const component = mount(
      <DamImage
        theme={themeMock}
        imgData={imgData}
        imgConfigs={[
          'g_face:center,q_auto:best,w_768',
          'c_fill,g_face:center,q_auto:best,w_1024',
          'c_crop,g_face:auto,q_auto:best,w_1440',
        ]}
      />
    );

    expect(component.find('source').get(0).props.srcSet).toEqual(srcSets[0]);
    expect(component.find('source').get(1).props.srcSet).toEqual(srcSets[1]);
    expect(component.find('img').get(0).props.src).toEqual(srcSets[2]);
  });

  it('Should create correct srcset with basePath', () => {
    const srcSets = [
      'https://www.tcp4.com/c_crop,g_face:center,q_auto:best,w_1440/dancing-boy4.png',
      'https://www.tcp4.com/c_fill,g_face:center,q_auto:best,w_1100/dancing-boy4.png',
      'https://www.tcp4.com/c_crop,g_face:center,q_auto:best,w_768/dancing-boy4.png',
    ];

    const imgData = {
      alt: imgDataAltText,
      url: 'dancing-boy4.png',
    };
    const component = mount(
      <DamImage
        theme={themeMock}
        basePath="https://www.tcp4.com"
        imgData={imgData}
        imgConfigs={[
          'c_crop,g_face:center,q_auto:best,w_768',
          'c_fill,g_face:center,q_auto:best,w_1100',
          'c_crop,g_face:center,q_auto:best,w_1440',
        ]}
      />
    );

    expect(component.find('source').get(0).props.srcSet).toEqual(srcSets[0]);
    expect(component.find('source').get(1).props.srcSet).toEqual(srcSets[1]);
    expect(component.find('img').get(0).props.src).toEqual(srcSets[2]);
  });

  it('Should create correct srcset with cloudinary presets', () => {
    const srcSets = [
      'https://www.tcp1.com/c_crop,g_face:center,q_auto:best,w_1200/dancing-boy6.png',
      'https://www.tcp1.com/test_image_presets/dancing-boy6.png',
      'https://www.tcp1.com/c_crop,q_auto:best,w_470/dancing-boy6.png',
    ];

    const imgData = {
      alt: imgDataAltText,
      url: 'dancing-boy6.png',
    };

    const component = mount(
      <DamImage
        theme={themeMock}
        basePath="https://www.tcp1.com"
        imgData={imgData}
        imgConfigs={[
          'c_crop,q_auto:best,w_470',
          'test_image_presets',
          'c_crop,g_face:center,q_auto:best,w_1200',
        ]}
      />
    );

    expect(component.find('source').get(0).props.srcSet).toEqual(srcSets[0]);
    expect(component.find('source').get(1).props.srcSet).toEqual(srcSets[1]);
    expect(component.find('img').get(0).props.src).toEqual(srcSets[2]);
  });

  it('Should create correct srcset with single img config in array', () => {
    const srcSets = [
      'https://www.tcp2.com/w_1440/dancing-girl.png',
      'https://www.tcp2.com/w_1024/dancing-girl.png',
      'https://www.tcp2.com/c_crop,g_face:center,q_auto:best,w_478/dancing-girl.png',
    ];

    const imgData = {
      alt: 'Dancing Girl',
      url: 'dancing-girl.png',
    };

    const component = mount(
      <DamImage
        theme={themeMock}
        basePath="https://www.tcp2.com"
        imgData={imgData}
        imgConfigs={['c_crop,g_face:center,q_auto:best,w_478']}
      />
    );

    expect(component.find('source').get(0).props.srcSet).toEqual(srcSets[0]);
    expect(component.find('source').get(1).props.srcSet).toEqual(srcSets[1]);
    expect(component.find('img').get(0).props.src).toEqual(srcSets[2]);
  });

  it('Should create correct srcset with CMS imgData', () => {
    const srcSets = [
      'https://www.tcp.com/c_crop,g_face:center,q_auto:best,w_1100/dancing-boy.png',
      'https://www.tcp.com/c_fill,g_face:center,q_auto:best,w_780/dancing-boy.png',
      'https://www.tcp.com/c_crop,g_face:center,q_auto:best,w_470/dancing-boy.png',
    ];

    const imgData = {
      alt: imgDataAltText,
      url: 'dancing-boy.png',
      crop_d: 'c_crop,g_face:center,q_auto:best,w_1100',
      crop_t: 'c_fill,g_face:center,q_auto:best,w_780',
      crop_m: 'c_crop,g_face:center,q_auto:best,w_470',
    };
    const component = mount(
      <DamImage theme={themeMock} basePath="https://www.tcp.com" imgData={imgData} />
    );

    expect(component.find('source').get(0).props.srcSet).toEqual(srcSets[0]);
    expect(component.find('source').get(1).props.srcSet).toEqual(srcSets[1]);
    expect(component.find('img').get(0).props.src).toEqual(srcSets[2]);
  });

  it('Should create correct srcset with mix CMS imgData and prop imgConfigs', () => {
    const srcSets = [
      'https://www.tcp.com/c_crop,g_face:center,q_auto:best,w_1100/dancing-boy.png',
      'https://www.tcp.com/c_fill,g_face:center,q_auto:best,w_780/dancing-boy.png',
      'https://www.tcp.com/c_crop,g_face:center,q_auto:best,w_470/dancing-boy.png',
    ];

    const imgData = {
      alt: imgDataAltText,
      url: 'dancing-boy.png',
      crop_d: 'c_crop,g_face:center,q_auto:best,w_1100',
      crop_t: 'c_fill,g_face:center,q_auto:best,w_780',
    };
    const component = mount(
      <DamImage
        theme={themeMock}
        basePath="https://www.tcp.com"
        imgData={imgData}
        imgConfigs={['c_crop,g_face:center,q_auto:best,w_470']}
      />
    );

    expect(component.find('source').get(0).props.srcSet).toEqual(srcSets[0]);
    expect(component.find('source').get(1).props.srcSet).toEqual(srcSets[1]);
    expect(component.find('img').get(0).props.src).toEqual(srcSets[2]);
  });

  it('Should create correct srcset with mix CMS imgData and prop imgConfigs', () => {
    const srcSets = [
      'https://www.tcp.com/upload/c_crop,g_face:center,q_auto:best,w_1200/dancing-boy.png',
      'https://www.tcp.com/upload/test_image_presets/dancing-boy.png',
      'https://www.tcp.com/upload/c_crop,q_auto:best,w_470/dancing-boy.png',
    ];

    const imgData = {
      alt: imgDataAltText,
      url: 'https://www.tcp.com/upload/dancing-boy.png',
    };
    const component = mount(
      <DamImage
        theme={themeMock}
        basePath="https://www.tcp.com"
        imgData={imgData}
        imgConfigs={[
          'c_crop,q_auto:best,w_470',
          'test_image_presets',
          'c_crop,g_face:center,q_auto:best,w_1200',
        ]}
      />
    );

    expect(component.find('source').get(0).props.srcSet).toEqual(srcSets[0]);
    expect(component.find('source').get(1).props.srcSet).toEqual(srcSets[1]);
    expect(component.find('img').get(0).props.src).toEqual(srcSets[2]);
  });
});
