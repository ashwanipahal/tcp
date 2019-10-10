const dummyUrl = 'http://www.childrensplace.com';

const ctaTypes = ['stackedCTAButtons', 'linkList', 'CTAButtonCarousel', 'divImageCTACarousel'];

export default {
  moduleT: {
    contentId: 'f1733fc9-6db0-4042-9844-99980420359f',
    name: 'moduleT',
    type: 'module',
    composites: {
      ctaType: ctaTypes[0],
      headerText: [
        {
          textItems: [
            {
              text: 'THE SHORT SHOP',
              style: 'medium_text_black',
            },
          ],
          link: {
            url: dummyUrl,
            text: '',
            title: '',
            target: '',
            external: 0,
            action: '',
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
            url: dummyUrl,
            text: '',
            title: '',
            target: '',
            external: 0,
            class: '',
          },
          textItems: [
            {
              text: 'ALL GRAPHIC TEES',
              style: 'medium_text_regular',
            },
            {
              text: '60 % OFF',
              style: 'percentage_all_wrapped_normal',
            },
          ],
        },
      ],
      mediaLinkedList: [
        {
          image: {
            url: 'https://test5.childrensplace.com/image/upload/v1562731929/Image_14_bp7ih0.jpg',
            alt: 'Boys',
            title: 'Boys',
            crop_d: '',
            crop_t: '',
            crop_m: '',
          },
          link: {
            url: '/p/',
            text: 'Boys',
            title: 'Boys',
            target: '',
            external: 0,
            action: '',
          },
        },
        {
          image: {
            url: 'https://test5.childrensplace.com/image/upload/v1565145744/mod-h-kids_b9ivyr.png',
            alt: 'Girls',
            title: 'Girls',
            crop_d: '',
            crop_t: '',
            crop_m: '',
          },
          link: {
            url: '/p/',
            text: 'Girls',
            title: 'Girls',
            target: '',
            external: 0,
            action: '',
          },
        },
      ],
      ctaItems: [
        {
          image: {
            url:
              'https://res.cloudinary.com/tcp-dam-test/image/upload/q_auto:best/v1558543115/ecom/assets/content/tcp/us/home/moduled/US-HP-050519-MINIME1_h9cwcd.jpg',
            alt: 'Girl',
            title: 'Girl',
            crop_d: '',
            crop_t: '',
            crop_m: '',
          },
          button: {
            url: '/c/',
            text: 'Girl',
            title: 'Girl',
            target: '',
            external: 0,
          },
        },
        {
          image: {
            url:
              'https://res.cloudinary.com/tcp-dam-test/image/upload/q_auto:best/v1558543115/ecom/assets/content/tcp/us/home/moduled/US-HP-050519-MINIME1_h9cwcd.jpg',
            alt: 'Toddler Girl alt',
            title: 'Toddler Girl title',
            crop_d: '',
            crop_t: '',
            crop_m: '',
          },
          button: {
            url: '/c/',
            text: 'Toddler Girl',
            title: 'Toddler Girl',
            target: '',
            external: 0,
          },
        },
        {
          image: {
            url:
              'https://test5.childrensplace.com/image/upload/v1565680164/sarah-doody-x_XipCfA3Qc-unsplash_e38rjo.jpg',
            alt: 'Boy',
            title: 'Boy',
            crop_d: '',
            crop_t: '',
            crop_m: '',
          },
          button: {
            url: '/c/',
            text: 'Boy',
            title: 'Boy',
            target: '',
            external: 0,
          },
        },
        {
          image: {
            url:
              'https://test5.childrensplace.com/image/upload/v1565680141/alexander-dummer-x4jRmkuDImo-unsplash_ptu9ul.jpg',
            alt: 'Toddler Boy alt',
            title: 'Toddler Boy title',
            crop_d: '',
            crop_t: '',
            crop_m: '',
          },
          button: {
            url: '/c/',
            text: 'Toddler Boy',
            title: 'Toddler Boy',
            target: '',
            external: 0,
          },
        },
        {
          image: {
            url:
              'https://test5.childrensplace.com/image/upload/v1565680140/christian-fickinger-MDIGo4Ez-0g-unsplash_jkpwgf.jpg',
            alt: 'Baby',
            title: 'Baby',
            crop_d: '',
            crop_t: '',
            crop_m: '',
          },
          button: {
            url: '/c/',
            text: 'Baby',
            title: 'Baby',
            target: '',
            external: 0,
          },
        },
      ],
    },
    set: [
      {
        key: 'ctaType',
        val: ctaTypes[0],
      },
    ],
  },
};
