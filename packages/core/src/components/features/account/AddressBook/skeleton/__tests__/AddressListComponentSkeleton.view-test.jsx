import React from 'react';
import { shallow } from 'enzyme';
import AddressListComponentSkeleton from '../AddressListComponentSkeleton.view';

describe('AddressListComponentSkeleton component', () => {
  it('should renders correctly', () => {
    const props = {
      className: 'sample-class',
    };
    const component = shallow(<AddressListComponentSkeleton {...props} />);
    expect(component).toMatchSnapshot();
  });
});
