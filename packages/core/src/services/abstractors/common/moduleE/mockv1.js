const dummyUrl = 'http://www.childrensplace.com';
const ctaTypes = ['stackedCTAButtons', 'linkList', 'CTAButtonCarousel', 'divImageCTACarousel'];
const carouselCtaType = ['link', 'button'];
const divCtaTitle1 = 'Big & Little Sis';
const divCtaTitle2 = 'Big & Little Bro';
const shopTheCollectionTitle = 'Shop The Collection';
const ctaShopNowButton = 'SHOP NOW';

export default {
  moduleE: {
    contentId: 'f1733fc9-6db0-4042-9844-99980420359f',
    name: 'moduleE',
    type: 'module',
    composites: {
      ctaType: ctaTypes[0],
      carouselCtaType: carouselCtaType[0],
      headerText: [
        {
          textItems: [
            {
              // text: 'THE DRESS UP SHOP',
              text: 'MATCHING FAMILY',
              // style: 'medium_text_black',
              style: 'large_text_black',
            },
          ],
          link: {
            url: '/node/pdp/<uuid>',
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
              // text: 'BALL MATCHING FAMILY',
              text: 'ALL SPRING DRESSES UP',
              // style: 'spaced_text_regular_black',
              style: 'spaced_text_only_mobile',
            },
            {
              // text: '60 % OFF',
              text: '40% OFF',
              // style: 'percentage_all_wrapped_normal_tab',
              style: 'percentage_inline_promo_black',
            },
          ],
        },
      ],
      linkedImage: [
        {
          image: {
            url:
              'https://test5.childrensplace.com/image/upload/v1573246605/module-E-promo-area.jpg',
            alt: 'Promo Area',
            title: 'Promo Area',
            crop_d: '',
            crop_t: '',
            crop_m: '',
          },
          link: {
            url: dummyUrl,
            text: '',
            title: '',
            target: '',
            external: 0,
          },
        },
      ],
      largeCompImageSimpleCarousel: [
        {
          image: {
            url:
              'https://test5.childrensplace.com/image/upload/v1573283582/module-E-test-large-1.jpg',
            alt: 'Family Tees2',
            title: 'Family Tees2',
            crop_d: '',
            crop_t: '',
            crop_m: '',
          },
          singleCTAButton: {
            url: dummyUrl,
            text: shopTheCollectionTitle,
            title: shopTheCollectionTitle,
            target: '_blank',
            external: 0,
          },
        },
        {
          image: {
            url:
              'https://test5.childrensplace.com/image/upload/v1573239143/module-E-test-large-2.jpg',
            alt: 'Family Tees',
            title: 'Family Tees',
            crop_d: '',
            crop_t: '',
            crop_m: '',
          },
          singleCTAButton: {
            url: `${dummyUrl}/2`,
            text: shopTheCollectionTitle,
            title: shopTheCollectionTitle,
            target: '_blank',
            external: 0,
          },
        },
      ],
      ctaItems: [
        {
          button: {
            url: '/girl',
            text: 'Girl',
            title: 'Girl',
            target: '',
            external: 0,
          },
        },
        {
          button: {
            url: '/toddler-girl',
            text: 'Toddler Girl',
            title: 'Toddler Girl',
            target: '',
            external: 0,
          },
        },
        {
          button: {
            url: '/boy',
            text: 'Boy',
            title: 'Boy',
            target: '',
            external: 0,
          },
        },
        {
          button: {
            url: '/toddler-boy',
            text: 'Toddler Boy',
            title: 'Toddler Boy',
            target: '',
            external: 0,
          },
        },
        {
          button: {
            url: '/baby',
            text: 'Baby',
            title: 'Baby',
            target: '',
            external: 0,
          },
        },
      ],
      divCTALinks: [
        {
          image: {
            url:
              'https://test5.childrensplace.com/image/upload/v1573193928/module-E-test-small-1.jpg',
            alt: divCtaTitle1,
            title: divCtaTitle1,
            crop_d: '',
            crop_t: '',
            crop_m: '',
          },
          styled: {
            text: divCtaTitle1,
            style: 'spaced_text_regular_black',
          },
          link: {
            url: '/test/link/url1',
            text: ctaShopNowButton,
            title: ctaShopNowButton,
            external: 1,
            target: '_blank',
          },
        },
        {
          image: {
            url:
              'https://test5.childrensplace.com/image/upload/v1573283630/module-E-test-large-2.jpg',
            alt: divCtaTitle2,
            title: divCtaTitle2,
            crop_d: '',
            crop_t: '',
            crop_m: '',
          },
          styled: {
            text: divCtaTitle2,
            style: 'spaced_text_regular_black',
          },
          link: {
            url: '/test/link/url2',
            text: ctaShopNowButton,
            title: ctaShopNowButton,
            external: 1,
            target: '_blank',
          },
        },
      ],
    },
    set: [
      {
        key: 'ctaType',
        val: ctaTypes[0],
      },
      {
        key: 'carouselCtaType',
        val: carouselCtaType[0],
      },
    ],
  },
};
