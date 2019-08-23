const ctaTypes = ['stackedCTAList', 'linkCTAList', 'scrollCTAList', 'imageCTAList'];
const divImageUrl =
  'https://res.cloudinary.com/tcp-dam-test/image/upload/v1558543115/ecom/assets/content/tcp/us/home/moduled/US-HP-050519-MINIME1_h9cwcd.jpg';

export default {
  moduleN: {
    contentId: 'f1733fc9-6db0-4042-9844-99980420359f',
    name: 'moduleN',
    type: 'module',
    composites: {
      bgColor: '#f53d3d',
      headerText: [
        {
          textItems: [
            {
              text: 'ALL CLEARANCE',
              color: 'color2',
              style: 'style12',
            },
          ],
          link: {
            url: 'plpUrl',
            title: '',
            target: '',
          },
        },
      ],
      promoBanner: [
        {
          link: {
            url: '/c/',
            text: '',
            title: '',
            target: '',
            external: 0,
            class: '',
          },
          textItems: [
            {
              text: '60-70 % OFF',
              style: 'percentage_wrapped_large',
            },
            {
              text: 'No Exclusions',
              style: 'text_normal',
            },
          ],
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
            url: '/girl',
            text: 'Girl',
            title: 'Girl',
            target: '',
            external: 0,
          },
        },
        {
          image: {
            url:
              'https://res.cloudinary.com/tcp-dam-test/image/upload/v1558543115/ecom/assets/content/tcp/us/home/moduled/US-HP-050519-MINIME3_vmfhnu.jpg',
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
            url: divImageUrl,
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
            url:
              'https://res.cloudinary.com/tcp-dam-test/image/upload/v1558543115/ecom/assets/content/tcp/us/home/moduled/US-HP-050519-MINIME3_vmfhnu.jpg',
            alt: 'Toddler Boy alt',
            title: 'Tod Boy title',
            crop_d: '',
            crop_t: '',
            crop_m: '',
          },
          button: {
            url: '/toddler-boy2',
            text: 'Toddler Boy',
            title: 'Tod Boy',
            target: '',
            external: 0,
          },
        },
        {
          image: {
            url: divImageUrl,
            alt: 'Baby Alt',
            title: 'Baby title',
            crop_d: '',
            crop_t: '',
            crop_m: '',
          },
          button: {
            url: '/toddler-boy',
            text: 'Baby',
            title: 'Baby',
            target: '',
            external: 0,
          },
        },
        {
          image: {
            url: divImageUrl,
            alt: 'Baby Alt',
            title: 'Baby title',
            crop_d: '',
            crop_t: '',
            crop_m: '',
          },
          button: {
            url: '/toddler-boy',
            text: 'Alt',
            title: 'Alt',
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
        val: ctaTypes[0],
      },
    ],
  },
};
