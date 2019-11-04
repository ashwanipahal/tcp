window.TCP_HOTFIX = {
  request: [
    {
      created: '2010-11-21',
      mutate(request) {
        console.log(`TCP_HOTFIX created ${this.created}`, request);
      },
    },
  ],
  tracking: [],
  component: {
    home: {},
    plp: {
      ProductTile: {
        created: '2019-11-01',
        props: {},
        mutate({ el /* , props, component */ }) {
          el.appendChild(document.createTextNode('☎️'));
        },
      },
    },
    pdp: {},
    bag: {},
    checkout: {},
  },
};
