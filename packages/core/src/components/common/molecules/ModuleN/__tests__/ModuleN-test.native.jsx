import React from 'react';
import { shallow } from 'enzyme';
import moduleNMockData from '../../../../../services/abstractors/common/moduleN/mock';
import { ModuleNVanilla } from '../views/ModuleN.native';

describe('ModuleNVanilla', () => {
  let componentSingleCTAButton;
  let divImageCTACarousel;
  let linkList;
  let scrollCTAButtons;

  beforeEach(() => {
    componentSingleCTAButton = shallow(
      <ModuleNVanilla set={moduleNMockData.moduleN.set} {...moduleNMockData.moduleN.composites} />
    );
    divImageCTACarousel = shallow(
      <ModuleNVanilla set={moduleNMockData.moduleN.set} {...moduleNMockData.moduleN.composites} />
    );

    linkList = shallow(
      <ModuleNVanilla set={moduleNMockData.moduleN.set} {...moduleNMockData.moduleN.composites} />
    );

    scrollCTAButtons = shallow(
      <ModuleNVanilla set={moduleNMockData.moduleN.set} {...moduleNMockData.moduleN.composites} />
    );
  });

  it('ModuleN should be defined', () => {
    expect(componentSingleCTAButton).toBeDefined();
    expect(divImageCTACarousel).toBeDefined();
    expect(linkList).toBeDefined();
    expect(scrollCTAButtons).toBeDefined();
  });

  it('ModuleN should render correctly', () => {
    expect(componentSingleCTAButton).toMatchSnapshot();
    expect(divImageCTACarousel).toBeDefined();
    expect(linkList).toBeDefined();
    expect(scrollCTAButtons).toBeDefined();
  });
});
