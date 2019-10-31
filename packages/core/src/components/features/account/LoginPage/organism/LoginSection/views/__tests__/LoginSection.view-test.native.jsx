import React from 'react';
import { shallow } from 'enzyme';
import { LoginSectionVanilla } from '../LoginSection.view.native';

describe('LoginSection component', () => {
  const props = {
    onSubmit: () => {},
    labels: {},
    initialValues: {},
    resetPassword: true,
  };
  it('should renders correctly', () => {
    const component = shallow(<LoginSectionVanilla {...props} />);
    expect(component).toMatchSnapshot();
  });

  it('should test change password', () => {
    const component = shallow(<LoginSectionVanilla {...props} />);
    component.setProps({
      navigation: {
        state: {
          params: {
            component: 'change-password',
            logonPasswordOld: 'CI+20YL2b3kMcnvCrlg8nTxw==',
            em: 'coiIGBav4RrUU3tqv8eAB9uZEtUbuUU8bU0hqGLhydw=',
          },
        },
      },
      newPassword: true,
    });
    expect(component).toMatchSnapshot();
  });
});
