// const ctaTypes = ['stackedCTAButtons', 'linkList', 'CTAButtonCarousel', 'divImageCTACarousel'];
const divImageUrl =
  'https://res.cloudinary.com/tcp-dam-test/image/upload/q_auto:best/v1558543115/ecom/assets/content/tcp/us/home/moduled/US-HP-050519-MINIME1_h9cwcd.jpg';

export default {
  moduleN: {
    contentId: '728f4e9b-b1ee-4b83-addc-399caae17239',
    name: 'moduleN',
    type: 'module',
    set: [
      {
        val: '',
        key: 'moduleClassName',
      },
      {
        val: 'full',
        key: 'moduleWidth',
      },
      {
        val: 'bgClass',
        key: 'bgClass',
      },
      {
        val: 'stackedCTAButtons',
        key: 'ctaType',
      },
    ],
    composites: {
      ctaType: 'stackedCTAButtonsExpandable',
      expandableTitle: 'Shop',
      headerText: [
        {
          textItems: [
            {
              text: 'Must-See Markdowns',
              style: 'white_large_text_half',
            },
          ],
          icon: {
            placement: '',
            icon: '',
          },
          link: {
            url:
              'https://www.childrensplace.com/us/search/all-clearance?icid=hp_s15_buttonnlivetext_searchall_070819_clearance',
            title: 'ALL CLEARANCE',
            target: '_blank',
          },
        },
      ],
      promoBanner: [
        {
          link: {
            url:
              'https://www.childrensplace.com/us/search/all-clearance?icid=hp_s15_buttonnlivetext_searchall_070819_clearance',
            title: '60-70 % OFF',
          },
          textItems: [
            {
              text: '60-70 % OFF',
              style: 'percentage_inline_promo_half',
            },
          ],
        },
      ],
      ctaItems: [
        {
          button: {
            url: '/c/girls-clothing',
            text: 'GIRL',
            target: '_blank',
            title: 'GIRL',
          },
          image: {
            url: divImageUrl,
            alt: 'Girl',
            title: 'Girl',
            crop_d: '',
            crop_t: '',
            crop_m: '',
          },
        },
        {
          button: {
            url: 'https://test6.childrensplace.com/us/c/baby-clothes',
            text: 'BOY',
            target: '_blank',
            title: 'BOY',
          },
          image: {
            url: divImageUrl,
            alt: 'Girl',
            title: 'Girl',
            crop_d: '',
            crop_t: '',
            crop_m: '',
          },
        },
        {
          button: {
            url: 'https://test6.childrensplace.com/us/c/toddler-boy-clothes',
            text: 'TODDLER BOY',
            target: '_blank',
            title: 'TODDLER BOY',
          },
          image: {
            url: divImageUrl,
            alt: 'Girl',
            title: 'Girl',
            crop_d: '',
            crop_t: '',
            crop_m: '',
          },
        },
        {
          button: {
            url: 'https://test6.childrensplace.com/us/c/toddler-girl-clothes',
            text: 'TODDLER GIRL',
            target: '_blank',
            title: 'TODDLER GIRL',
          },
          image: {
            url: divImageUrl,
            alt: 'Girl',
            title: 'Girl',
            crop_d: '',
            crop_t: '',
            crop_m: '',
          },
        },
      ],
    },
  },
};
