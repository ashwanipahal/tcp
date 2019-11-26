import React from 'react';
import { shallow } from 'enzyme';
import QuickViewSkeleton from '../views/QuickViewSkeleton.view';

describe('QuickViewSkeletonVanilla', () => {
  let component;
  const props = {};

  beforeEach(() => {
    component = shallow(<QuickViewSkeleton {...props} />);
  });

  it('QuickViewSkeleton should render correctly', () => {
    expect(component).toMatchSnapshot();
  });
});
