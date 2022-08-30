import React from 'react';
import { shallow } from 'enzyme';
import SettingsTopSection from '../views/SettingsTopSection.view.native';

describe('SettingsTopSection component', () => {
  it('should renders correctly', () => {
    const props = {
      labels: {},
      onRequestClose: jest.fn(),
    };
    const component = shallow(<SettingsTopSection {...props} />);
    expect(component).toMatchSnapshot();
  });
});
