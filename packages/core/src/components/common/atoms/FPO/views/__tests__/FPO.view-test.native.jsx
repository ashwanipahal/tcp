import React from 'react';
import { shallow } from 'enzyme';
import FPO from '../FPO.view.native';

describe('FPO Component', () => {
  it('should render correctly', () => {
    const tree = shallow(<FPO />);
    expect(tree).toMatchSnapshot();
  });
});
