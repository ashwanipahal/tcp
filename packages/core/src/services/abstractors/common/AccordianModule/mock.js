export default {
  contentId: '<uuid>',
  name: 'accordion',
  type: 'module',
  composites: {
    accordionWrapper: [
      {
        styled: {
          text: 'Accordion Item 1 Header',
          style: 'style1',
        },
        richText: {
          text: '<p>Accordion Item 1 Body</p>',
        },
      },
      {
        styled: {
          text: 'Accordion Item 2 Header',
          style: 'style1',
        },
        richText: {
          text: '<p>Accordion Item 2 Body</p>',
        },
      },
      {
        styled: {
          text: 'Accordion Item 3 Header',
          style: 'style1',
        },
        richText: {
          text: '<p>Accordion Item 3 Body</p>',
        },
      },
    ],
  },
  submodules: {},
  set: [],
};
