import React from 'react';
import { shallow } from 'enzyme';
import mock from '../../../../../services/abstractors/common/moduleN/mock';
import { ModuleNVanilla } from '../views/ModuleN.native';

describe('ModuleNVanilla', () => {
  let componentSingleCTAButton;
  let divImageCTACarousel;

  beforeEach(() => {
    componentSingleCTAButton = shallow(
      <ModuleNVanilla {...mock.moduleN.composites.singleCTAButton} />
    );
    divImageCTACarousel = shallow(
      <ModuleNVanilla {...mock.moduleN.composites.divImageCTACarousel} />
    );
  });

  it('ModuleN should be defined', () => {
    expect(componentSingleCTAButton).toBeDefined();
    expect(divImageCTACarousel).toBeDefined();
  });

  it('ModuleN should render correctly', () => {
    expect(componentSingleCTAButton).toMatchSnapshot();
    expect(divImageCTACarousel).toBeDefined();
  });
});
