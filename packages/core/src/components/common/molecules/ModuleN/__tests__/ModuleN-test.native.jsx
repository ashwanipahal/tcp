import React from 'react';
import { shallow } from 'enzyme';
import mock from '../../../../../services/abstractors/common/moduleN/mock';
import { ModuleNVanilla } from '../views/ModuleN.native';

describe('ModuleNVanilla', () => {
  let componentSingleCTAButton;
  let divImageCTACarousel;
  let linkList;
  let scrollCTAButtons;

  beforeEach(() => {
    componentSingleCTAButton = shallow(
      <ModuleNVanilla {...mock.moduleN.composites.singleCTAButton} />
    );
    divImageCTACarousel = shallow(
      <ModuleNVanilla {...mock.moduleN.composites.divImageCTACarousel} />
    );

    linkList = shallow(<ModuleNVanilla {...mock.moduleN.composites.linkList} />);

    linkList = shallow(<ModuleNVanilla {...mock.moduleN.composites.linkList} />);

    scrollCTAButtons = shallow(<ModuleNVanilla {...mock.moduleN.composites.linkList} />);
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
