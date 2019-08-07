const cropD = 'c_crop,g_face:center,q_auto:best,w_1440';
const cropT = 'c_crop,g_face:center,q_auto:best,w_962';
const cropM = 'c_crop,g_face:center,q_auto:best,w_520';

export default {
  moduleL: {
    contentId: 'f567fa01-4afd-4d82-bbe4-e2734d555d06',
    name: 'moduleL',
    type: 'module',
    set: [
      {
        key: 'imagesPerSlide',
        val: '4',
      },
    ],
    composites: {
      imagesPerSlide: '4',
      headerText: [
        {
          textItems: [
            {
              text: 'TRENDING NOW',
              style: 'style1',
            },
          ],
          icon: {
            placement: '',
            icon: '',
          },
          link: {
            url: 'https://www.childrensplace.com/us/c/girls-new-arrivals',
            title: '',
            target: '',
            external: 0,
          },
        },
      ],
      promoBanner: [
        {
          link: {
            url: '/banner/url',
            title: '',
            target: '',
            external: 0,
            class: '',
          },
          textItems: [
            {
              text: '60% OFF',
              style: 'text-black',
            },
            {
              text: 'BUY TODAY',
              style: 'text-normal',
            },
          ],
        },
      ],
      imageGrid: [
        {
          image: {
            url:
              'https://res.cloudinary.com/tcp-dam-test/image/upload/v1562061640/senjuti-kundu-7uP2gFMB2ps-unsplash_kxf3r4.jpg',
            title: 'BE A UNICORN 24/7/365 title',
            alt: 'BE A UNICORN 24/7/365 alt',
            crop_d: cropD,
            crop_t: cropT,
            crop_m: cropM,
          },
          styled: {
            text: 'BE A UNICORN 24/7/365',
            style: 'style1',
          },
          link: {
            url: 'https://www.childrensplace.com/us/c/toddler-girl-clothes',
            text: 'Shop Unicorns & Friends',
            title: 'Shop Unicorns & Friends',
            target: '',
            external: 0,
            class: '',
          },
        },
        {
          image: {
            url:
              'https://res.cloudinary.com/tcp-dam-test/image/upload/v1562061640/ben-white-4K2lIP0zc_k-unsplash_avr2bp.jpg',
            title: 'FOR YOUR #1DINO FAN title',
            alt: 'FOR YOUR #1DINO FAN alt',
            crop_d: cropD,
            crop_t: cropT,
            crop_m: cropM,
          },
          styled: {
            text: 'FOR YOUR #1DINO FAN',
            style: 'style2',
          },
          link: {
            url: 'https://www.childrensplace.com/us/c/toddler-boy-clothes',
            text: 'Shop Dinos',
            title: 'Shop Dinos',
            target: '',
            external: 0,
            class: '',
          },
        },
        {
          image: {
            url:
              'https://res.cloudinary.com/tcp-dam-test/image/upload/v1562061640/charlein-gracia--Ux5mdMJNEA-unsplash_bnyejv.jpg',
            title: 'FLIP, SHAKE & SHINE title',
            alt: 'FLIP, SHAKE & SHINE alt',
            crop_d: cropD,
            crop_t: cropT,
            crop_m: cropM,
          },
          styled: {
            text: 'FLIP, SHAKE & SHINE',
            style: 'style3',
          },
          link: {
            url: 'https://www.childrensplace.com/us/c/girls-clothing',
            text: 'Shop Flip Sequence',
            title: 'Shop Flip Sequence',
            target: '',
            external: 0,
            class: '',
          },
        },
        {
          image: {
            url:
              'https://res.cloudinary.com/tcp-dam-test/image/upload/v1562651404/Kids_Image_1_hiov9u.jpg',
            title: 'COOL & COMFY STYLE title',
            alt: 'COOL & COMFY STYLE alt',
            crop_d: cropD,
            crop_t: cropT,
            crop_m: cropM,
          },
          styled: {
            text: 'COOL & COMFY STYLE',
            style: 'style4',
          },
          link: {
            url: 'https://www.childrensplace.com/us/c/boys-clothing',
            text: 'Shop Ninjas',
            title: 'Shop Ninjas',
            target: '',
            external: 0,
            class: '',
          },
        },
      ],
    },
  },
};
