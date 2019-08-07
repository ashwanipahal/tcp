export default {
  moduleA: {
    contentId: 'f1733fc9-6db0-4042-9844-99980420359f',
    name: 'moduleA',
    type: 'module',
    composites: {
      largeCompImageCarousel: [
        {
          headerText: [
            {
              textItems: [
                {
                  text: 'Entire site',
                  style: 'style1',
                },
              ],
              link: {
                url: '/trending',
                text: '',
                title: '',
                target: '',
                external: 0,
              },
              icon: {
                icon: '',
                placement: '',
              },
            },
          ],
          promoBanner: [
            {
              link: {
                url: '/banner/url',
                text: '',
                title: '',
                target: '',
                external: 0,
              },
              textItems: [
                {
                  text: '60%',
                  style: 'style1',
                },
                {
                  text: 'off',
                  style: 'style2',
                },
                {
                  text: '50% off',
                  style: 'style1',
                },
                {
                  text: 'all shoes and other accessories',
                  style: 'style2',
                },
              ],
            },
          ],
          linkedImage: [
            {
              image: {
                url: 'http://image1.sm/url',
                alt: 'Family Tees Image',
                title: 'Family Tees title',
                crop_d: 'c_crop,g_face:center,q_auto:best,w_1024',
                crop_t: 'c_crop,g_face:center,q_auto:best,w_962',
                crop_m: 'c_crop,g_face:center,q_auto:best,w_962',
              },
              link: {
                url: '/node/product/<uuid>',
                text: 'Family Tees',
                title: 'Family Tees',
                target: '',
                external: 0,
              },
            },
          ],
        },
      ],
      ctaItems: [
        {
          image: {
            url: 'http://image.com/girl',
            alt: 'Girl',
            title: 'Girl',
            crop_d: '',
            crop_t: '',
            crop_m: '',
          },
          button: {
            url: '/girl',
            text: 'Girl',
            title: 'Girl',
            target: '',
            external: 0,
          },
        },
        {
          image: {
            url: 'http://image.com/toddler-girl',
            alt: 'Toddler Girl alt',
            title: 'Toddler Girl title',
            crop_d: '',
            crop_t: '',
            crop_m: '',
          },
          button: {
            url: '/toddler-girl',
            text: 'Toddler Girl',
            title: 'Toddler Girl',
            target: '',
            external: 0,
          },
        },
        {
          image: {
            url: 'http://image.com/boy',
            alt: 'Boy',
            title: 'Boy',
            crop_d: '',
            crop_t: '',
            crop_m: '',
          },
          button: {
            url: '/boy',
            text: 'Boy',
            title: 'Boy',
            target: '',
            external: 0,
          },
        },
        {
          image: {
            url: 'http://image.com/toddler-boy',
            alt: 'Toddler Boy alt',
            title: 'Toddler Boy title',
            crop_d: '',
            crop_t: '',
            crop_m: '',
          },
          button: {
            url: '/toddler-boy',
            text: 'Toddler Boy',
            title: 'Toddler Boy',
            target: '',
            external: 0,
          },
        },
        {
          image: {
            url: 'http://image.com/baby',
            alt: 'Baby',
            title: 'Baby',
            crop_d: '',
            crop_t: '',
            crop_m: '',
          },
          button: {
            url: '/baby',
            text: 'Baby',
            title: 'Baby',
            target: '',
            external: 0,
          },
        },
      ],
    },
    submodules: {},
    set: [
      {
        key: 'ctaType',
        val: 'divImageCTACarousel',
      },
    ],
  },
};
