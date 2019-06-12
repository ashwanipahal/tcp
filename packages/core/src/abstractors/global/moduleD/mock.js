const PLACEHOLDER_URL = 'https://via.placeholder.com/350';
export default {
  moduleD: {
    type: 'module',
    name: 'moduleD',
    contentID: '<uuid>',
    value: [
      {
        type: 'composite',
        name: 'header',
        value: {
          type: 'link',
          name: 'headerLink',
          value: {
            url: '/node/pdp/<uuid>',
            text: 'Mini Me Shop',
            title: 'go to mini me shop',
            target: '',
            external: 0,
            class: '',
            view: 'link',
          },
        },
      },
      {
        type: 'composite',
        subtype: 'promoBanner',
        value: {
          type: 'link',
          name: 'headerLink',
          value: {
            url: '/node/pdp/<uuid>',
            text: 'this is a <strong>promo</strong> banner',
            title: 'go to promo section',
            target: '',
            external: 0,
            class: '',
            view: 'link',
          },
        },
      },
      {
        type: 'composite',
        subtype: 'imageGallery',
        value: [
          {
            type: 'imageLink',
            name: 'imageLink1',
            value: {
              url: '/something',
              text: 'Family tees',
              target: '',
              external: 0,
              class: '',
              view: 'link',
              image: {
                src: PLACEHOLDER_URL,
                alt: '',
              },
            },
          },
          {
            type: 'imageLink',
            name: 'imageLink2',
            value: {
              url: '/something',
              text: 'Mom and Me tees',
              target: '',
              external: 0,
              class: '',
              view: 'link',
              image: {
                src: PLACEHOLDER_URL,
                alt: '',
              },
            },
          },
          {
            type: 'imageLink',
            name: 'imageLink1',
            value: {
              url: '/something',
              text: 'Family tees',
              target: '',
              external: 0,
              class: '',
              view: 'link',
              image: {
                src: PLACEHOLDER_URL,
                alt: '',
              },
            },
          },
          {
            type: 'imageLink',
            name: 'imageLink1',
            value: {
              url: '/something',
              text: 'Family tees',
              target: '',
              external: 0,
              class: '',
              view: 'link',
              image: {
                src: PLACEHOLDER_URL,
                alt: '',
              },
            },
          },
        ],
      },
      {
        type: 'composite',
        name: 'ctaButton',
        value: {
          type: 'link',
          name: 'cta1',
          value: {
            url: '/node/pdp',
            text: 'SHOP ALL',
            title: 'shop all categories',
            target: '',
            external: 0,
            class: '',
            view: 'button',
          },
        },
      },
    ],
  },
};
