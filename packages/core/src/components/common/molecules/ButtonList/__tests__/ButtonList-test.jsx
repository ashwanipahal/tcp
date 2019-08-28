import React from 'react';
import { shallow } from 'enzyme';
import { VanillaButtonList } from '../views/ButtonList';
import mock from '../../../../../services/abstractors/common/moduleN/mock';

describe('ButtonList component', () => {
  let ButtonListComp;

  it('renders correctly without props', () => {
    ButtonListComp = shallow(<VanillaButtonList buttonsData={mock.moduleN.composites.ctaItems} />);
    expect(ButtonListComp).toMatchSnapshot();
  });

  it('renders correctly with props for stacked CTA buttons', () => {
    ButtonListComp = shallow(
      <VanillaButtonList
        buttonsData={mock.moduleN.composites.ctaItems}
        buttonListVariation="stackedCTAList"
        dataLocatorTextCta="moduleN_cta_links_"
      />
    );
    expect(ButtonListComp.find('.stacked-button-list-wrapper')).toHaveLength(1);
    expect(ButtonListComp).toMatchSnapshot();
  });

  it('renders correctly for scroll cta buttons', () => {
    ButtonListComp = shallow(
      <VanillaButtonList
        buttonsData={mock.moduleN.composites.ctaItems}
        buttonListVariation="scrollCTAList"
        dataLocatorTextCta="moduleN_cta_links_"
      />
    );
    expect(ButtonListComp.find('.scroll-button-list-wrapper')).toHaveLength(1);
    expect(ButtonListComp).toMatchSnapshot();
  });
  it('renders correctly for image cta List', () => {
    ButtonListComp = shallow(
      <VanillaButtonList
        buttonsData={mock.moduleN.composites.ctaItems}
        buttonListVariation="imageCTAList"
        dataLocatorDivisionImages="moduleN_image_"
        dataLocatorTextCta="moduleN_cta_links_"
      />
    );
    expect(ButtonListComp.find('.scroll-button-list-wrapper')).toHaveLength(1);
    expect(ButtonListComp).toMatchSnapshot();
  });

  it('renders correctly', () => {
    ButtonListComp = shallow(
      <VanillaButtonList
        buttonsData={mock.moduleN.composites.ctaItems}
        buttonListVariation="linkCTAList"
        dataLocatorTextCta="moduleN_cta_links_"
      />
    );
    expect(ButtonListComp.find('.link-button-list-wrapper')).toHaveLength(1);
    expect(ButtonListComp).toMatchSnapshot();
  });
});
