import React from 'react';
import { shallow } from 'enzyme';
import BundleProductItemsSkeleton from '../views/BundleProductItemsSkeleton.view.native';

describe('BundleProductItemsSkeleton', () => {
  let component;
  const props = {};

  beforeEach(() => {
    component = shallow(<BundleProductItemsSkeleton {...props} />);
  });

  it('BundleProductItemsSkeleton should render correctly', () => {
    expect(component).toMatchSnapshot();
  });
});
