import React from 'react';
import { shallow } from 'enzyme';
import moduleAMockData from '../../../../../services/abstractors/common/moduleA/mock';
import { ModuleAVanilla } from '../view/ModuleA.native';

describe('ModuleNVanilla', () => {
  let componentSingleCTAButton;
  let divImageCTACarousel;
  let linkList;
  let scrollCTAButtons;

  beforeEach(() => {
    componentSingleCTAButton = shallow(
      <ModuleAVanilla set={moduleAMockData.moduleA.set} {...moduleAMockData.moduleA.composites} />
    );
    divImageCTACarousel = shallow(
      <ModuleAVanilla set={moduleAMockData.moduleA.set} {...moduleAMockData.moduleA.composites} />
    );

    linkList = shallow(
      <ModuleAVanilla set={moduleAMockData.moduleA.set} {...moduleAMockData.moduleA.composites} />
    );

    scrollCTAButtons = shallow(
      <ModuleAVanilla set={moduleAMockData.moduleA.set} {...moduleAMockData.moduleA.composites} />
    );
  });

  it('ModuleA should be defined', () => {
    expect(componentSingleCTAButton).toBeDefined();
    expect(divImageCTACarousel).toBeDefined();
    expect(linkList).toBeDefined();
    expect(scrollCTAButtons).toBeDefined();
  });

  it('ModuleA should render correctly', () => {
    expect(componentSingleCTAButton).toMatchSnapshot();
    expect(divImageCTACarousel).toBeDefined();
    expect(linkList).toBeDefined();
    expect(scrollCTAButtons).toBeDefined();
  });
});
