import React from 'react';
import { shallow } from 'enzyme';
import CardViewSkeleton from '../CardViewSkeleton.view';

describe('CardViewSkeleton component', () => {
  it('should renders correctly', () => {
    const props = {
      className: 'sample-class',
    };
    const component = shallow(<CardViewSkeleton {...props} />);
    expect(component).toMatchSnapshot();
  });
});
