import React from 'react';
import { shallow } from 'enzyme';
import { BundleProductItemsSkeletonVanilla } from '../views/BundleProductItemsSkeleton.view';

describe('BundleProductItemsSkeletonVanilla', () => {
  let component;
  const props = {};

  beforeEach(() => {
    component = shallow(<BundleProductItemsSkeletonVanilla {...props} />);
  });

  it('BundleProductItemsSkeletonVanilla should render correctly', () => {
    expect(component).toMatchSnapshot();
  });
});
