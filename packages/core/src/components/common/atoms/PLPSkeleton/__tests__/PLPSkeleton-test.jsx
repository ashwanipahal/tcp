import React from 'react';
import { shallow } from 'enzyme';
import { PLPSkeletonVanilla as Skeleton } from '../views/PLPSkeleton';

describe('PLP Skeleton Component', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = shallow(<Skeleton col={3} className="skeleton" />);
  });

  it('should match snapshot', () => {
    expect(wrapper).toMatchSnapshot();
  });
});
