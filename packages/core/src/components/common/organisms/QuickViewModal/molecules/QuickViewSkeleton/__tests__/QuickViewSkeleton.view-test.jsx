import React from 'react';
import { shallow } from 'enzyme';
import { QuickViewSkeletonVanilla } from '../views/QuickViewSkeleton.view';

describe('QuickViewSkeletonVanilla', () => {
  let component;
  const props = {};

  beforeEach(() => {
    component = shallow(<QuickViewSkeletonVanilla {...props} />);
  });

  it('QuickViewSkeleton should render correctly', () => {
    expect(component).toMatchSnapshot();
  });
});
