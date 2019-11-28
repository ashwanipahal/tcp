import React from 'react';
import { shallow } from 'enzyme';
import OrderDetailsSkeleton from '../OrderDetailsSkeleton.view';

describe('OrderDetailsSkeleton component', () => {
  it('should renders correctly', () => {
    const props = {
      className: 'sample-class',
    };
    const component = shallow(<OrderDetailsSkeleton {...props} />);
    expect(component).toMatchSnapshot();
  });
});
