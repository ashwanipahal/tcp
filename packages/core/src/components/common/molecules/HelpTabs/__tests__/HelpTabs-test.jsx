import React from 'react';
import { shallow } from 'enzyme';
import { VanillaHelpTabs as HelpTabs } from '../views/HelpTabs';

const mock = [
  {
    button: {
      url: '/button/url1',
      text: 'Etna',
      title: 'Etna',
      external: 0,
      target: '_blank',
      action: 'action',
    },
  },
  {
    button: {
      url: '/button/url2',
      text: 'Etna',
      title: 'Etna',
      external: 0,
      target: '_blank',
      action: 'action',
    },
  },
  {
    button: {
      url: '/button/url3',
      text: 'Etna',
      title: 'Etna',
      external: 0,
      target: '_blank',
      action: 'action',
    },
  },
  {
    button: {
      url: '/button/url4',
      text: 'Etna',
      title: 'Etna',
      external: 0,
      target: '_blank',
      action: 'action',
    },
  },
  {
    button: {
      url: '/button/url5',
      text: 'Etna',
      title: 'Etna',
      external: 0,
      target: '_blank',
      action: 'action',
    },
  },
  {
    button: {
      url: '/button/url6',
      text: 'Etna',
      title: 'Etna',
      external: 0,
      target: '_blank',
      action: 'action',
    },
  },
  {
    button: {
      url: '/button/url7',
      text: 'Etna',
      title: 'Etna',
      external: 0,
      target: '_blank',
      action: 'action',
    },
  },
  {
    button: {
      url: '/button/url8',
      text: 'Etna',
      title: 'Etna',
      external: 0,
      target: '_blank',
      action: 'action',
    },
  },
  {
    button: {
      url: '/button/url9',
      text: 'Etna',
      title: 'Etna',
      external: 0,
      target: '_blank',
      action: 'action',
    },
  },
];
describe('Help Tabs component', () => {
  it('renders correctly', () => {
    const component = shallow(<HelpTabs tabs={mock} />);
    expect(component).toMatchSnapshot();
  });
});
