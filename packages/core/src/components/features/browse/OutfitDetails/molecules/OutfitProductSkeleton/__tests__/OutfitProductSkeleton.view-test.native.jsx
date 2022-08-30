import React from 'react';
import { shallow } from 'enzyme';
import OutfitProductSkeleton from '../views/OutfitProductSkeleton.view.native';

describe('OutfitProductSkeleton', () => {
  let component;
  const props = {};

  beforeEach(() => {
    component = shallow(<OutfitProductSkeleton {...props} />);
  });

  it('OutfitProductSkeleton should render correctly', () => {
    expect(component).toMatchSnapshot();
  });
});
