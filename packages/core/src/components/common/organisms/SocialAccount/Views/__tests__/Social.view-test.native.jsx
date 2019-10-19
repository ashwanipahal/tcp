import React from 'react';
import { shallow } from 'enzyme';
import { NativeModules } from 'react-native';
import { SocialviewVanilla } from '../Social.view.native';

describe('Social component', () => {
  const props = {
    saveSocialAcc: jest.fn(),
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
    NativeModules.RNTwitterSignIn = {
      init: jest.fn(),
      logIn: jest.fn(() => Promise.resolve({ loginData: { userID: 'foo', authToken: 'foo' } })),
    };
  });

  it('should renders correctly', () => {
    expect(component).toMatchSnapshot();
  });

  it.skip('should simulate facebook connect', () => {
    component
      .find('Styled(TouchableOpacity)')
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

  it('test dispatchSaveSocial func', () => {
    component.instance().dispatchSaveSocial('facebook', 'foo', 'foo');
    expect(props.pointModalClose).toHaveBeenCalled();
  });

  it('should simulate twitter connect', () => {
    component.instance().handleSocialNetwork('Twitter', false);
    expect(props.saveSocialAcc).toHaveBeenCalledTimes(1);
  });
});
