import React from 'react';
import { shallow } from 'enzyme';
import AccountOverview from '../AccountOverview.view.native';

describe('AccountOverview component', () => {
  const props = {
    labels: {
      foo: 'foo',
    },
    navigation: {
      state: {
        params: {
          component: 'change-password',
          logonPasswordOld: 'CI+20YL2b3kMcnvCrlg8nTxw==',
          em: 'coiIGBav4RrUU3tqv8eAB9uZEtUbuUU8bU0hqGLhydw=',
        },
      },
    },
  };

  it('should render correctly', () => {
    const component = shallow(<AccountOverview {...props} />);
    expect(component).toMatchSnapshot();
  });
});
