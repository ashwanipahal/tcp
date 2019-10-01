import React from 'react';
import { shallow } from 'enzyme';

import { SocialviewVanilla } from '../Social.view.native';

describe('Social component', () => {
  const props = {
    saveSocialAcc: {},
    getSocialAcc: {
      facebook: {
        accessToken: false,
        userId: false,
      },
    },
    labels: {},
  };
  it('should renders correctly', () => {
    const component = shallow(<SocialviewVanilla {...props} />);
    expect(component).toMatchSnapshot();
  });

  it.skip('should simulate facebook connect', () => {
    const component = shallow(<SocialviewVanilla {...props} />);
    component
      .find('TouchableOpacity')
      .simulate('press', { isSocialAccount: 'Facebook', isConnected: false });
    expect(component).toMatchSnapshot();
  });

  it('should render with connected', () => {
    props.getSocialAcc.facebook.accessToken = true;
    const component = shallow(<SocialviewVanilla {...props} />);
    expect(component).toMatchSnapshot();
  });
});
