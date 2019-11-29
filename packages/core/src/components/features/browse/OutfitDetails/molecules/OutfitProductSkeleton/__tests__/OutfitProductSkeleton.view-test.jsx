import React from 'react';
import { shallow } from 'enzyme';
import { OutfitProductSkeletonVanilla } from '../views/OutfitProductSkeleton.view';

describe('OutfitProductSkeletonVanilla', () => {
  let component;
  const props = {};

  beforeEach(() => {
    component = shallow(<OutfitProductSkeletonVanilla {...props} />);
  });

  it('OutfitProductSkeletonVanilla should render correctly', () => {
    expect(component).toMatchSnapshot();
  });
});
