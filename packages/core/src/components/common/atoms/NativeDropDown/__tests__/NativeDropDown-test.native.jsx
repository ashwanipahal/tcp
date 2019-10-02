import React from 'react';
import { shallow } from 'enzyme';

import NativeDropDown from '../NativeDropDown.native';

describe('NativeDropDown native should render correctly', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = shallow(<NativeDropDown data={[{ displayName: 'Test', id: '123' }]} />);
    wrapper.instance().setState({ isAndroidPlatform: false });
  });

  it('should match snapshot for android', () => {
    expect(wrapper).toMatchSnapshot();
  });

  it('should match snapshot for ios', () => {
    wrapper.instance().setState({ isAndroidPlatform: true });
    expect(wrapper).toMatchSnapshot();
  });

  it('should close modal on item select', () => {
    wrapper.instance().selectItem('Test');
    expect(wrapper.instance().state.showPicker).toBeFalsy();
  });
});
