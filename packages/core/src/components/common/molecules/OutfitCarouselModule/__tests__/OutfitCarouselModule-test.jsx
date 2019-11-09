import React from 'react';
import { shallow } from 'enzyme';
import mock from './mock';
import { OutfitCarouselModuleVanilla as OutfitCarouselModule } from '../views/OutfitCarouselModule.view';

describe('OutfitCarouselModule component', () => {
  it('should default variant correctly', () => {
    const wrapper = shallow(<OutfitCarouselModule outfitModule={mock.OutfitCarouselModule} />).get(
      0
    );
    expect(wrapper).toMatchSnapshot();
  });
});
