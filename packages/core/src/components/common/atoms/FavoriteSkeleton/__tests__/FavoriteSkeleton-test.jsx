import React from 'react';
import { shallow } from 'enzyme';
import { FavoriteSkeletonVanilla as Skeleton } from '../views/FavoriteSkeleton';

describe('FavoriteSkeletonVanilla Component', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = shallow(<Skeleton col={8} className="skeleton" />);
  });

  it('should match snapshot', () => {
    expect(wrapper).toMatchSnapshot();
  });
});
