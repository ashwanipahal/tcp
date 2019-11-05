import React from 'react';
import { shallow } from 'enzyme';
import HelpTabs from '@tcp/core/src/components/common/molecules/HelpTabs';
import { VanillaHelpCenter } from '../views/HelpCenterTemplate';

describe('HelpCenterTemplate  component', () => {
  it('renders correctly without props', () => {
    const component = shallow(<VanillaHelpCenter />);
    expect(component).toMatchSnapshot();
  });
  it('renders correctly with props', () => {
    const props = {
      className: 'test',
      childProps: {
        tabs: [
          {
            url: '/button/url9',
            text: 'Etna',
            title: 'Etna',
            external: 0,
            target: '_blank',
            action: 'action',
          },
          {
            url: '/button/url9',
            text: 'Etna',
            title: 'Etna',
            external: 0,
            target: '_blank',
            action: 'action',
          },
        ],
      },
      mainContent: HelpTabs,
      labels: {},
    };
    const component = shallow(<VanillaHelpCenter {...props} />);
    expect(component).toMatchSnapshot();
    expect(component.find(HelpTabs)).toHaveLength(1);
  });
});
