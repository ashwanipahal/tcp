import React from 'react';
import { shallow } from 'enzyme';
import Ribbon from '../Ribbon.native';
import { mockV2 } from '../../../../../services/abstractors/common/moduleS/mock';

describe('RibbonComponentVanilla', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = shallow(
      <Ribbon
        navigation={{}}
        ribbonBanner={mockV2.moduleS.composites.ribbonBanner}
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
