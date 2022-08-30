import React from 'react';
import { shallow } from 'enzyme';
import { SettingsModal } from '../SettingsModal.view.native';

describe('SettingsModal component', () => {
  it('should renders correctly', () => {
    const props = {
      labels: {},
      navigation: jest.fn(),
      isUserLoggedIn: false,
    };
    const component = shallow(<SettingsModal {...props} />);
    expect(component).toMatchSnapshot();
  });
});
