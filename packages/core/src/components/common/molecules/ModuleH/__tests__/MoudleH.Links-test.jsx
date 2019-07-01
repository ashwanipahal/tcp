import React from 'react';
import { shallow } from 'enzyme';
import ModuleHCTALinks from '../view/ModuleH.Links';
import mock from '../mock';

describe('ModuleH Links Component', () => {
  it('renders correctly', () => {
    const currentIndex = {
      current: 0,
      next: 1,
    };
    const props = {
      currentIndex,
      dataCTALinks: mock.moduleH.composites.divCTALinks,
    };
    const ModuleHCTALinksComp = shallow(<ModuleHCTALinks {...props} />);
    expect(ModuleHCTALinksComp).toMatchSnapshot();
  });

  it('renders CTA links correctly', () => {
    const currentIndex = {
      current: 0,
      next: 1,
    };
    const props = {
      currentIndex,
      dataCTALinks: mock.moduleH.composites.divCTALinks,
    };
    const ModuleHCTALinksComp = shallow(<ModuleHCTALinks {...props} />);
    expect(ModuleHCTALinksComp.find('.moduleH__CTALink')).toHaveLength(5);
  });
});
