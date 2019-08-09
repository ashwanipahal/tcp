import React from 'react';
import { shallow } from 'enzyme';
import { VanillaButtonList } from '../views/ButtonList';
import mock from '../../../../../services/abstractors/common/moduleD/mockN';

describe('ButtonList component', () => {
  let ButtonListComp;

  it('renders correctly without props', () => {
    ButtonListComp = shallow(<VanillaButtonList />);
    expect(ButtonListComp).toMatchSnapshot();
  });

  it('renders correctly with props for stacked CTA buttons', () => {
    ButtonListComp = shallow(
      <VanillaButtonList
        buttonsData={mock.moduleD.composites.stackedCTAButtons}
        buttonListVariation="stackedCTAList"
        dataLocatorTextCta="moduleN_cta_links_"
      />
    );
    expect(ButtonListComp.find('.stack-comp-wrapper')).toHaveLength(1);
    expect(ButtonListComp).toMatchSnapshot();
  });

  it('renders correctly for scroll cta buttons', () => {
    ButtonListComp = shallow(
      <VanillaButtonList
        buttonsData={mock.moduleD.composites.stackedCTAButtons}
        buttonListVariation="scrollCTAList"
        dataLocatorTextCta="moduleN_cta_links_"
      />
    );
    expect(ButtonListComp.find('.scroll-comp-wrapper')).toHaveLength(1);
    expect(ButtonListComp).toMatchSnapshot();
  });
  it('renders correctly for image cta List', () => {
    ButtonListComp = shallow(
      <VanillaButtonList
        buttonsData={mock.moduleD.composites.divImageCTACarousel}
        buttonListVariation="imageCTAList"
        dataLocatorDivisionImages="moduleN_image_"
        dataLocatorTextCta="moduleN_cta_links_"
      />
    );
    expect(ButtonListComp.find('.scroll-comp-wrapper')).toHaveLength(1);
    expect(ButtonListComp).toMatchSnapshot();
  });

  it('renders correctly', () => {
    ButtonListComp = shallow(
      <VanillaButtonList
        buttonsData={mock.moduleD.composites.linkList}
        buttonListVariation="linkCTAList"
        dataLocatorTextCta="moduleN_cta_links_"
      />
    );
    expect(ButtonListComp.find('.link-comp-wrapper')).toHaveLength(1);
    expect(ButtonListComp).toMatchSnapshot();
  });
});
