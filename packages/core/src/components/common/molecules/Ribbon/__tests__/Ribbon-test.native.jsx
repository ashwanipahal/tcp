import React from 'react';
import { shallow } from 'enzyme';
import Ribbon from '../Ribbon.native';
import mock from '../../../../../services/abstractors/common/moduleS/mock-v2';

describe('RibbonComponentVanilla', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = shallow(
      <Ribbon
        navigation={{}}
        ribbonBanner={mock.moduleS.composites.ribbonBanner}
        width="200px"
        height="70px"
        color="white"
      />
    );
  });

  it('should match snapshot', () => {
    expect(wrapper).toMatchSnapshot();
  });
});
