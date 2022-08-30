import React from 'react';
import { shallow } from 'enzyme';
import PLPSkeleton from '../views/PLPSkeleton.native';

describe('PLP Skeleton Native Componenet', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = shallow(<PLPSkeleton col={3} />);
  });

  it('should match snapshot', () => {
    expect(wrapper).toMatchSnapshot();
  });
});
