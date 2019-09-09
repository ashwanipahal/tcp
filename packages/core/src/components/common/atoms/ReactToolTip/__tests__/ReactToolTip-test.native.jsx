import React from 'react';
import { Text, TouchableOpacity } from 'react-native';
import { create } from 'react-test-renderer';

import ReactTooltip from '../views/ReactToolTip.native';
import Triangle from '../views/Triangle';

describe('Tooltip component', () => {
  it('should render without issues', () => {
    const component = create(
      <ReactTooltip popover={<Text>Info here</Text>}>
        <Text>Press me</Text>
      </ReactTooltip>
    );

    expect(component.toJSON()).toMatchSnapshot();
  });

  it('should display ReactTooltip', () => {
    const Info = () => <Text>Info here</Text>;
    const component = create(
      <ReactTooltip height={100} width={200} popover={<Info />}>
        <Text>Press me</Text>
      </ReactTooltip>
    );

    component.root.findAllByType(TouchableOpacity)[0].props.onPress();
    expect(component.root.findByType(Triangle)).toBeTruthy();
    expect(component.root.findByType(Info)).toBeTruthy();

    expect(component.toJSON()).toMatchSnapshot();
  });

  it('does not render pointer', () => {
    const component = create(
      <ReactTooltip withPointer={false} height={100} width={200} popover={<Text>Info here</Text>}>
        <Text>Press me</Text>
      </ReactTooltip>
    ).root;

    component.findAllByType(TouchableOpacity)[0].props.onPress();
    expect(component.instance.state.isVisible).toBe(true);
    try {
      component.findByType(Triangle);
    } catch (e) {
      expect(e.message).toBe('No instances found with node type: "Triangle"');
    }
  });
});
