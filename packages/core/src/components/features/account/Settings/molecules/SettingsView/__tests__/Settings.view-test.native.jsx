import React from 'react';
import { shallow } from 'enzyme';
import SettingsView from '../views/Settings.view.native';

describe('SettingsView component', () => {
  const props = {
    labels: {},
    isUserLoggedIn: false,
  };

  let component;

  beforeEach(() => {
    component = shallow(<SettingsView {...props} />);
  });

  it('should renders correctly', () => {
    expect(component).toMatchSnapshot();
  });

  it('test if handleTouchId is enabled ', () => {
    component.instance().handleTouchId(true);
    expect(component.state('touchIdValue')).toBe(false);
  });

  it('test if handleTouchId is enable ', () => {
    component.instance().handleTouchId(false);
    expect(component.state('promptVisible')).toBe(false);
  });

  it('test if handleFaceId is disabled ', () => {
    component.instance().handleFaceId(true);
    expect(component.state('faceIdValue')).toBe(false);
  });

  it('test if handleFaceId is enabled ', () => {
    component.instance().handleFaceId(false);
    expect(component.state('faceIdValue')).toBe(false);
  });

  it('test if handleFaceId is enable ', () => {
    component.instance().handleTouchId(false);
    expect(component.state('promptVisible')).toBe(false);
  });

  it('should render with touch id', () => {
    component.setState({ biometryType: 'TouchID' });
    expect(component).toMatchSnapshot();
  });

  it('should render with face id', () => {
    component.setState({ biometryType: 'FaceID' });
    expect(component).toMatchSnapshot();
  });

  it('should test handleAppStateChange', () => {
    component.setState({ appState: 'background' });
    component.instance().handleAppStateChange('active');
    expect(component.state('appState')).toEqual('active');
  });
});
