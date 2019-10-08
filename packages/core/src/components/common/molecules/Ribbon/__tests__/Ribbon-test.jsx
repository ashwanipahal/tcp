import React from 'react';
import { shallow } from 'enzyme';
import Ribbon from '../Ribbon';
import mock from '../../../../../services/abstractors/common/moduleS/mock-v2';

describe('RibbonComponent', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = shallow(
      <Ribbon
        ribbonBanner={mock.moduleS.composites.ribbonBanner}
        width="200"
        height="70"
        color="white"
        locator="ribbon_test_locator"
      />
    );
  });

  it('should match snapshot', () => {
    expect(wrapper).toMatchSnapshot();
  });
});
