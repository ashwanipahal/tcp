import React from 'react';
import { shallow } from 'enzyme';
import Ribbon from '../Ribbon';
import mock from '../../../../../services/abstractors/common/moduleS/mock-v2';

describe('RibbonComponent', () => {
  let wrapper;
  it('should match snapshot', () => {
    wrapper = shallow(
      <Ribbon
        ribbonBanner={mock.moduleS.composites.ribbonBanner}
        width="200"
        height="70"
        color="white"
        locator="ribbon_test_locator"
      />
    );
    expect(wrapper).toMatchSnapshot();
  });
  it('should call the getConfig getImgPath', () => {
    wrapper = shallow(
      <Ribbon
        ribbonBanner={[
          {
            textItems: [[Object]],
            link: { url: '/c/girls-clothes', text: 'Girls', title: 'Girls', target: '' },
            ribbonPlacement: 'right',
            ribbonClass: 'ribbon-color-cherry',
          },
        ]}
        width="200"
        height="70"
        color="white"
        locator="ribbon_test_locator"
      />
    );
    expect(wrapper).toMatchSnapshot();
  });
});
