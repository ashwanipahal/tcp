import React from 'react';
import { shallow } from 'enzyme';
import PlaceCashLabelTestData from '../../util.test.data';
import { PlaceCashBannerVanilla } from '../PlaceCashBanner.view.native';

describe('PlaceCashBanner should render correctly', () => {
  const props = {
    labels: PlaceCashLabelTestData,
    isEnabled: true,
  };
  it('should match snapshot', () => {
    const wrapper = shallow(<PlaceCashBannerVanilla {...props} />);
    expect(wrapper).toMatchSnapshot();
  });
});
