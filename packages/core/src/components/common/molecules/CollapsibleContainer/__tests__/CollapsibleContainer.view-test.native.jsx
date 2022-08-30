import React from 'react';
import { View, Text } from 'react-native';
import { shallow } from 'enzyme';
import CollapsibleContainer from '../views/CollapsibleContainer.view.native';

describe('CollapsibleContainer', () => {
  const header = (
    <View>
      <Text>hello</Text>
    </View>
  );
  const body = (
    <View>
      <Text>body</Text>
    </View>
  );

  it('should render correctly', () => {
    const tree = shallow(<CollapsibleContainer header={header} body={body} />);
    tree.setState({ isExpanded: false });
    expect(tree).toMatchSnapshot();
    tree.find('Styled(TouchableOpacity)').simulate('press');
    expect(tree.state('isExpanded')).toBe(true);
  });
  it('should render correctly with getExpandedState and bag page', () => {
    const tree = shallow(
      <CollapsibleContainer header={header} body={body} getExpandedState={jest.fn()} />
    );
    tree.setState({ isExpanded: false, isBag: false });
    tree.setProps({ index: 0, openedTile: 0 });
    expect(tree).toMatchSnapshot();
    tree.find('Styled(TouchableOpacity)').simulate('press');
    expect(tree.state('isExpanded')).toBe(true);
  });
});
