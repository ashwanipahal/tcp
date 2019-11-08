const dummyUrl = 'http://www.childrensplace.com';
const ctaTypes = ['stackedCTAButtons', 'linkList', 'CTAButtonCarousel', 'divImageCTACarousel'];
const carouselCtaType = ['button', 'link'];
const divCtaTitle1 = 'Big & Little Sis';
const divCtaTitle2 = 'Big & Little Bro';
const shopTheCollectionTitle = 'Shop The Collection';

// https://test5.childrensplace.com/image/upload/v1573193928/module-E-test-large-1.jpg
// https://test5.childrensplace.com/image/upload/v1573193928/module-E-test-small-2.jpg
// https://test5.childrensplace.com/image/upload/v1573193928/module-E-test-small-1.jpg
// https://test5.childrensplace.com/image/upload/v1573194405/moduleE-eyebrow-image.jpg
// https://test5.childrensplace.com/image/upload/v1573197073/Screenshot_2019-11-08_at_12.40.10_PM.png

/*
Without EyeBrow Image Variation (Default)
large_text_black --- "MATCHING FAMILY" Header Text -- ALREADY EXIST;
spaced_text_only_mobile -- "ALL SPRING DRESSES UP" Promo Text -- NEW ONE;
percentage_inline_promo_black -- "40% OFF" Promo Text -- NEW ONE
spaced_text_regular_black --  "BIG & LITTLE BRO" Small Image Text -- NEW ONE

With EyeBrow Image Variation (Alt)
small_text_normal -- "Cue The Photos" Promo Text -- ALREADY EXIST;
medium_text_black -- "THE DRESS UP SHOP" HEADER Text -- ALREADY EXIST;
spaced_text_regular_black -- "BALL MATCHING FAMILY" Promo Text -- NEW ONE
percentage_all_wrapped_normal_tab -- "60% OFF"(Wrapped) Promo Text -- ALREADY EXIST;
spaced_text_regular_black --  "BIG & LITTLE BRO" Small Image Text -- NEW ONE
*/

export default {
  moduleE: {
    contentId: 'f1733fc9-6db0-4042-9844-99980420359f',
    name: 'moduleE',
    type: 'module',
    composites: {
      eyebrow: [
        {
          mediaLinkedList: [
            {
              image: {
                url:
                  'https://test5.childrensplace.com/image/upload/v1573194405/moduleE-eyebrow-image.jpg',
                alt: 'Left Image',
                title: 'Left Image',
                crop_d: '',
                crop_t: '',
                crop_m: '',
              },
              link: {
                url: dummyUrl,
                text: 'Left Image Link',
                title: 'Left Image Link',
                target: '',
                external: 0,
              },
            },
            {
              image: {
                url:
                  'https://test5.childrensplace.com/image/upload/v1573194405/moduleE-eyebrow-image.jpg',
                alt: 'Right Image',
                title: 'Right Image',
                crop_d: '',
                crop_t: '',
                crop_m: '',
              },
              link: {
                url: dummyUrl,
                text: 'Right Image Link',
                title: 'Right Image Link',
                target: '',
                external: 0,
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
              },
              textItems: [
                {
                  text: 'Cue the photos',
                  style: 'small_text_normal',
                },
              ],
            },
          ],
        },
      ],
      headerText: [
        {
          textItems: [
            {
              text: 'THE DRESS UP SHOP',
              // v2Text: 'MATCHING FAMILY',
              style: 'large_text_black',
              // v2Style: 'medium_text_black',
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
              text: 'ALL SPRING DRESSES UP',
              // v2Text: 'THE DRESS UP SHOP',
              style: 'medium_text_black',
              // v2Style: 'spaced_text_only_mobile',
            },
          ],
        },
      ],
      linkedImage: [
        {
          image: {
            url:
              'https://test5.childrensplace.com/image/upload/v1573197073/Screenshot_2019-11-08_at_12.40.10_PM.png',
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
              'https://test5.childrensplace.com/image/upload/v1573193928/module-E-test-large-1.jpg',
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
            target: '',
            external: 0,
          },
        },
        {
          image: {
            url:
              'https://test5.childrensplace.com/image/upload/v1573193928/module-E-test-large-1.jpg',
            alt: 'Family Tees',
            title: 'Family Tees',
            crop_d: '',
            crop_t: '',
            crop_m: '',
          },
          singleCTAButton: {
            url: dummyUrl,
            text: shopTheCollectionTitle,
            title: shopTheCollectionTitle,
            target: '',
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
            url: dummyUrl,
            alt: divCtaTitle1,
            title: divCtaTitle1,
            crop_d: 'crop_value1',
            crop_t: 'crop_value2',
            crop_m: 'crop_value3',
          },
          styled: {
            text: divCtaTitle1,
            style: 'style1',
          },
          link: {
            url: '/link/url',
            text: divCtaTitle1,
            title: divCtaTitle1,
            external: 1,
            target: '_blank',
          },
        },
        {
          image: {
            url: dummyUrl,
            alt: divCtaTitle2,
            title: divCtaTitle2,
            crop_d: '',
            crop_t: '',
            crop_m: '',
          },
          styled: {
            text: divCtaTitle2,
            style: 'style1',
          },
          link: {
            url: '/link/url',
            text: divCtaTitle2,
            title: divCtaTitle2,
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
