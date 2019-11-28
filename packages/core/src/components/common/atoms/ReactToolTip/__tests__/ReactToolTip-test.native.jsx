import React from 'react';
import { Text } from 'react-native';
import { shallow } from 'enzyme';

import ReactTooltip from '../views/ReactToolTip.native';
import Triangle from '../views/Triangle';

describe('Tooltip component', () => {
  it('should render without issues', () => {
    const component = shallow(
      <ReactTooltip popover={<Text>Info here</Text>}>
        <Text>Press me</Text>
      </ReactTooltip>
    );

    expect(component).toMatchSnapshot();
  });

  it('should display ReactTooltip', () => {
    const Info = () => <Text>Info here</Text>;
    const component = shallow(
      <ReactTooltip height={100} width={200} popover={<Info />}>
        <Text>Press me</Text>
      </ReactTooltip>
    );

    component
      .find('TouchableOpacity')
      .at(0)
      .simulate('press');
    expect(component.find(Triangle)).toBeTruthy();
    expect(component.find(Info)).toBeTruthy();

    expect(component).toMatchSnapshot();
  });

  it('does not render pointer', () => {
    const component = shallow(
      <ReactTooltip withPointer={false} height={100} width={200} popover={<Text>Info here</Text>}>
        <Text>Press me</Text>
      </ReactTooltip>
    );

    component
      .find('TouchableOpacity')
      .at(0)
      .simulate('press');

    expect(component.state('isVisible')).toBe(true);
    try {
      component.find(Triangle);
    } catch (e) {
      expect(e.message).toBe('No instances found with node type: "Triangle"');
    }
  });
});
