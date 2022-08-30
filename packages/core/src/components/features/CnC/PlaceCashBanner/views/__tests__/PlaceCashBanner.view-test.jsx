import React from 'react';
import { shallow } from 'enzyme';
import PlaceCashLabelTestData from '../../util.test.data';

import { PlaceCashBannerVanilla } from '../PlaceCashBanner.view';

describe('PlaceCashBanner should render correctly', () => {
  it('should match snapshot if isEnabled=true', () => {
    const props = {
      labels: PlaceCashLabelTestData,
      isEnabled: true,
    };

    const wrapper = shallow(<PlaceCashBannerVanilla {...props} />);
    expect(wrapper).toMatchSnapshot();
  });

  it('should match snapshot if isEnabled=false', () => {
    const props = {
      labels: PlaceCashLabelTestData,
      isEnabled: false,
    };
    const wrapper = shallow(<PlaceCashBannerVanilla {...props} />);
    expect(wrapper).toEqual({});
  });
});
