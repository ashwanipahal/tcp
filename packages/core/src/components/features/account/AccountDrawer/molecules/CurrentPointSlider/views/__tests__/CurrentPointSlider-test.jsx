import React from 'react';
import { shallow } from 'enzyme';
import { CurrentPointSliderVanilla } from '../CurrentPointSlider';

describe('CurrentPointSlider', () => {
  it('should render correctly', () => {
    const labels = {
      CREATE_ACC_LBL_HIDE: 'hide',
    };
    const tree = shallow(<CurrentPointSliderVanilla labels={labels} />);
    expect(tree).toMatchSnapshot();
  });
});
