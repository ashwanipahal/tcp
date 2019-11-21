import React from 'react';
import { shallow } from 'enzyme';
import { SkeletonVanilla as Skeleton } from '../views/Skeleton';

describe('Home Skeleton Componenet', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = shallow(<Skeleton col={3} className="skeleton" />);
  });

  it('should match snapshot', () => {
    expect(wrapper).toMatchSnapshot();
  });
});
