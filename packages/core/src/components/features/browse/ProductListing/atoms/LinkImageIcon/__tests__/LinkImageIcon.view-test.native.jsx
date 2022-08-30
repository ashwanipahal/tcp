import React from 'react';
import { shallow } from 'enzyme';
import { LinkImageIconVanilla } from '../views/LinkImageIcon.view.native';

describe('LinkImageIconVanilla component', () => {
  const props = {
    uri: '',
    selected: false,
    width: 10,
    height: 10,
    resizeMode: 'contain',
    borderWidth: 1,
    borderRadius: 6,
    onPress: () => {},
  };
  it('should renders LinkImageIconVanilla correctly', () => {
    const component = shallow(<LinkImageIconVanilla {...props} />);
    expect(component).toMatchSnapshot();
  });
});
