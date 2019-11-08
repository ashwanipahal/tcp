import React from 'react';
import { shallow } from 'enzyme';
import ExtraPointsSkeleton from '../ExtraPointsSkeleton.view';

describe('ExtraPointsSkeleton component', () => {
  it('should renders correctly', () => {
    const props = {
      className: 'sample-class',
    };
    const component = shallow(<ExtraPointsSkeleton {...props} />);
    expect(component).toMatchSnapshot();
  });
});
