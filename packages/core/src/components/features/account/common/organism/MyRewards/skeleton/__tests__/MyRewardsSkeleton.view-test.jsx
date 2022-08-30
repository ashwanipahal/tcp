import React from 'react';
import { shallow } from 'enzyme';
import MyRewardsSkeleton from '../MyRewardsSkeleton.view';

describe('MyRewardsSkeleton component', () => {
  it('should renders correctly', () => {
    const props = {
      className: 'sample-class',
    };
    const component = shallow(<MyRewardsSkeleton {...props} />);
    expect(component).toMatchSnapshot();
  });
});
