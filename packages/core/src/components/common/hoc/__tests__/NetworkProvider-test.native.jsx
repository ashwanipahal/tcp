import React from 'react';
// eslint-disable-next-line import/no-unresolved
import { View } from 'react-native';
import { shallow } from 'enzyme';
import NetworkProvider from '../NetworkProvider.app';

describe('Appsplash component test cases', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = shallow(
      <NetworkProvider>
        <View />
      </NetworkProvider>
    );
  });

  it('should match snapshot', () => {
    expect(wrapper).toMatchSnapshot();
  });

  it('should update connection state', () => {
    wrapper.instance().updateConnectionState({ isConnected: false });
    expect(wrapper.instance().state.isConnected).toBeFalsy();
  });
});
