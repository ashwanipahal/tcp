import React from 'react';
import { mount } from 'enzyme';

import { ThemeProvider } from 'styled-components';
import Image from '@tcp/core/src/components/common/atoms/Image';

import DamImage from '../views/DamImage';

const themeMock = {
  breakpoints: {
    keys: ['xs', 'sm', 'lg'],
    values: { xs: 0, sm: 768, lg: 1024 },
  },
};

describe('DamImage component', () => {
  it('Should create correct srcset only with imgLocation', () => {
    const srcset =
      'https://res.cloudinary.com/tcp-dam-test/image/upload/w_468/v1561401513/ecom/assets/content/tcp/us/home/transform/dancing-girl.png 468w,https://res.cloudinary.com/tcp-dam-test/image/upload/w_768/v1561401513/ecom/assets/content/tcp/us/home/transform/dancing-girl.png 768w,https://res.cloudinary.com/tcp-dam-test/image/upload/w_1024/v1561401513/ecom/assets/content/tcp/us/home/transform/dancing-girl.png 1024w';

    const component = mount(
      <ThemeProvider theme={themeMock}>
        <DamImage
          alt="Dancing Baby"
          imgPath="v1561401513/ecom/assets/content/tcp/us/home/transform/dancing-girl.png"
        />
      </ThemeProvider>
    );

    expect(component.find(Image).prop('srcSet')).toEqual(srcset);
  });

  it('Should create correct srcset with imgLocation and cloudinary configuration', () => {
    const srcset =
      'https://res.cloudinary.com/tcp-dam-test/image/upload/g_face:center,q_auto:best,w_470/dancing-boy.png 468w,https://res.cloudinary.com/tcp-dam-test/image/upload/c_fill,g_face:center,q_auto:best,w_780/dancing-boy.png 768w,https://res.cloudinary.com/tcp-dam-test/image/upload/c_crop,g_face:auto,q_auto:best,w_1100/dancing-boy.png 1024w';

    const component = mount(
      <ThemeProvider theme={themeMock}>
        <DamImage
          alt="Dancing Boy"
          imgPath="dancing-boy.png"
          imgConfig={[
            'g_face:center,q_auto:best,w_470',
            'c_fill,g_face:center,q_auto:best,w_780',
            'c_crop,g_face:auto,q_auto:best,w_1100',
          ]}
        />
      </ThemeProvider>
    );

    expect(component.find(Image).prop('srcSet')).toEqual(srcset);
  });

  it('Should create correct srcset with imgPath', () => {
    const srcset =
      'https://www.tcp.com/c_crop,g_face:center,q_auto:best,w_470/dancing-boy.png 468w,https://www.tcp.com/c_fill,g_face:center,q_auto:best,w_780/dancing-boy.png 768w,https://www.tcp.com/c_crop,g_face:center,q_auto:best,w_1100/dancing-boy.png 1024w';

    const component = mount(
      <ThemeProvider theme={themeMock}>
        <DamImage
          alt="Dancing Boy"
          path="https://www.tcp.com"
          imgPath="dancing-boy.png"
          imgConfig={[
            'c_crop,g_face:center,q_auto:best,w_470',
            'c_fill,g_face:center,q_auto:best,w_780',
            'c_crop,g_face:center,q_auto:best,w_1100',
          ]}
        />
      </ThemeProvider>
    );

    expect(component.find(Image).prop('srcSet')).toEqual(srcset);
  });

  it('Should create correct srcset with cloudinary presets', () => {
    const srcset =
      'https://www.tcp.com/c_crop,g_face:center,q_auto:best,w_470/dancing-boy.png 468w,https://www.tcp.com/test_image_presets/dancing-boy.png 768w,https://www.tcp.com/c_crop,g_face:center,q_auto:best,w_1100/dancing-boy.png 1024w';

    const component = mount(
      <ThemeProvider theme={themeMock}>
        <DamImage
          alt="Dancing Boy"
          path="https://www.tcp.com"
          imgPath="dancing-boy.png"
          imgConfig={[
            'c_crop,g_face:center,q_auto:best,w_470',
            'test_image_presets',
            'c_crop,g_face:center,q_auto:best,w_1100',
          ]}
        />
      </ThemeProvider>
    );

    expect(component.find(Image).prop('srcSet')).toEqual(srcset);
  });
});
