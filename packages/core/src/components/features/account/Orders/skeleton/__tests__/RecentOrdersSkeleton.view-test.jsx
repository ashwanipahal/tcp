import React from 'react';
import { shallow } from 'enzyme';
import RecentOrdersSkeleton from '../RecentOrdersSkeleton.view';

describe('RecentOrdersSkeleton component', () => {
  it('should renders correctly', () => {
    const props = {
      className: 'sample-class',
    };
    const component = shallow(<RecentOrdersSkeleton {...props} />);
    expect(component).toMatchSnapshot();
  });
});
