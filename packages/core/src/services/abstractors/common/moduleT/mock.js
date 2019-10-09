const dummyUrl = 'http://www.childrensplace.com';
const dummyImage =
  'https://res.cloudinary.com/tcp-dam-test/image/upload/q_auto:best/v1558543115/ecom/assets/content/tcp/us/home/moduled/US-HP-050519-MINIME1_h9cwcd.jpg';

const ctaTypes = [
  'divImageCTACarousel',
  'stackedCTAButtonsExpandable',
  'CTAButtonCarouselExpandable',
  'stackedCTAButtons',
  'CTAButtonCarousel',
];

export default {
  moduleT: {
    contentId: 'f1733fc9-6db0-4042-9844-99980420359f',
    name: 'moduleT',
    type: 'module',
    composites: {
      bgColor: '#d8d8d8',
      layout: 'alt',
      headerText: [
        {
          textItems: [
            {
              text: 'THE SHORT SHOP',
              style: 'medium_text_black',
            },
          ],
          link: {
            url: '/p/',
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
            url: '/c/',
            text: '',
            title: '',
            target: '',
            external: 0,
            class: '',
          },
          textItems: [
            {
              text2: 'ALL SHORTS',
              text: 'ALL GRAPHIC TEES',
              style: 'medium_text_regular',
              style2: 'extra_large_text_regular',
            },
            {
              text: '60 % OFF',
              style: 'percentage_wrapped_large_black',
              style2: 'extra_large_text_black',
            },
          ],
        },
      ],

      ctaItems: [
        {
          button: {
            url: '/c/girls-clothing',
            text: 'Girl',
            title: 'Girl',
            target: '',
            external: 0,
            action: '',
          },
          image: {
            url:
              'https://res.cloudinary.com/tcp-dam-test/image/upload/q_auto:best/v1558543115/ecom/assets/content/tcp/us/home/moduled/US-HP-050519-MINIME1_h9cwcd.jpg',
            alt: 'Girl',
            title: 'Girl',
            crop_d: '',
            crop_t: '',
            crop_m: '',
          },
        },
        {
          button: {
            url: '/c/toddler-girl-clothes',
            text: 'Toddler Girl',
            title: 'Toddler Girl',
            target: '',
            external: 0,
            action: '',
          },
          image: {
            url: dummyImage,
            alt: 'Girl',
            title: 'Girl',
            crop_d: '',
            crop_t: '',
            crop_m: '',
          },
        },
        {
          button: {
            url: '/c/boys-clothing',
            text: 'Boy',
            title: 'Boy',
            target: '',
            external: 0,
            action: '',
          },
          image: {
            url: dummyImage,
            alt: 'Girl',
            title: 'Girl',
            crop_d: '',
            crop_t: '',
            crop_m: '',
          },
        },
        {
          button: {
            url: '/c/toddler-boy-clothes',
            text: 'Toddler Boy',
            title: 'Toddler Boy',
            target: '',
            external: 0,
            action: '',
          },
          image: {
            url: dummyImage,
            alt: 'Girl',
            title: 'Girl',
            crop_d: '',
            crop_t: '',
            crop_m: '',
          },
        },
        {
          button: {
            url: '/c/baby-clothes',
            text: 'Baby',
            title: 'Baby',
            target: '',
            external: 0,
            action: '',
          },
          image: {
            url: dummyImage,
            alt: 'Girl',
            title: 'Girl',
            crop_d: '',
            crop_t: '',
            crop_m: '',
          },
        },
      ],

      divTabs: [
        {
          text: {
            text: 'GIRL',
          },
          category: {
            cat_id: '47526',
          },
          singleCTAButton: {
            url: dummyUrl,
            text: 'SHOP ALL 1',
            title: 'SHOP ALL',
            target: '',
            external: 0,
            action: '',
          },
        },
        {
          text: {
            text: 'TODDLER GIRL',
          },
          category: {
            cat_id: '47502>47535>54071',
          },
          singleCTAButton: {
            url: dummyUrl,
            text: 'SHOP ALL 2',
            title: 'SHOP ALL',
            target: '',
            external: 0,
            action: '',
          },
        },
        {
          text: {
            text: 'BOY',
          },
          category: {
            cat_id: '47503>47544',
          },
          singleCTAButton: {
            url: dummyUrl,
            text: 'SHOP ALL 3',
            title: 'SHOP ALL',
            target: '',
            external: 0,
            action: '',
          },
        },
        {
          text: {
            text: 'TODDLER BOY',
          },
          category: {
            cat_id: '47501>47526',
          },
          singleCTAButton: null,
        },
      ],

      mediaLinkedList: [
        {
          image: {
            url:
              'https://tcp-dam-test-ressh.cloudinary.com/image/upload/v1569002145/ecom/assets/products/tcp/3006086/3006086_10.jpg',
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
            url:
              'https://tcp-dam-test-ressh.cloudinary.com/image/upload/v1569002143/ecom/assets/products/tcp/3005541/3005541_SV.jpg',
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
    },

    set: [
      {
        key: 'ctaType',
        val: ctaTypes[0],
      },
    ],
  },
};
