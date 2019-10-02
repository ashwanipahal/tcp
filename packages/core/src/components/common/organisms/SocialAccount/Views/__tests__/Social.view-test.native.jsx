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
      pointsAwarded: {
        points: 10,
      },
    },
    labels: {},
    pointModalClose: jest.fn(),
    handleComponentChange: jest.fn(),
    setPointsModal: true,
  };
  let component;

  beforeEach(() => {
    component = shallow(<SocialviewVanilla {...props} />);
  });

  it('should renders correctly', () => {
    expect(component).toMatchSnapshot();
  });

  it.skip('should simulate facebook connect', () => {
    component
      .find('TouchableOpacity')
      .simulate('press', { isSocialAccount: 'Facebook', isConnected: false });
    expect(component).toMatchSnapshot();
  });

  it('should render with connected', () => {
    props.getSocialAcc.facebook.accessToken = true;
    expect(component).toMatchSnapshot();
  });

  it('test onClose function', () => {
    component.instance().onClose();
    expect(props.pointModalClose).toHaveBeenCalledTimes(1);
  });

  it('test viewAll function', () => {
    component.instance().viewAll();
    expect(props.handleComponentChange).toHaveBeenCalledTimes(1);
  });

  it('should simulate instagram connect', () => {
    component
      .find('TouchableOpacity')
      .simulate('press', { isSocialAccount: 'Instagram', isConnected: false });
    expect(component).toMatchSnapshot();
  });
});
