import React from 'react';
import { shallow } from 'enzyme';
import SettingsView from '../views/Settings.view.native';

describe('SettingsView component', () => {
  const props = {
    labels: {},
    isUserLoggedIn: false,
  };
  it('should renders correctly', () => {
    const component = shallow(<SettingsView {...props} />);
    expect(component).toMatchSnapshot();
  });

  it('test if handleTouchId is enabled ', () => {
    const component = shallow(<SettingsView {...props} />);
    component.instance().handleTouchId(true);
    expect(component.state('touchIdValue')).toBe(true);
  });

  it('test if handleFaceId is disabled ', () => {
    const component = shallow(<SettingsView {...props} />);
    component.instance().handleFaceId(true);
    expect(component.state('faceIdValue')).toBe(true);
  });

  it('should render with touch id', () => {
    const component = shallow(<SettingsView {...props} />);
    component.setState({ biometryType: 'TouchID' });
    expect(component).toMatchSnapshot();
  });

  it('should render with face id', () => {
    const component = shallow(<SettingsView {...props} />);
    component.setState({ biometryType: 'FaceID' });
    expect(component).toMatchSnapshot();
  });
});
