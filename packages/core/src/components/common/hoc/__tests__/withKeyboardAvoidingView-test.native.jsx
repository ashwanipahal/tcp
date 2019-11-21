import React from 'react';
import { View } from 'react-native';
import { shallow } from 'enzyme';
import WithKeyboardAvoidingView from '../withKeyboardAvoidingView.native';

describe('WithKeyboardAvoidingView component test cases', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = shallow(
      <WithKeyboardAvoidingView>
        <View />
      </WithKeyboardAvoidingView>
    );
  });

  it('should match snapshot', () => {
    expect(wrapper).toMatchSnapshot();
  });
});
