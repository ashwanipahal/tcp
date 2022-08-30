import React from 'react';
import { shallow } from 'enzyme';
import MyPrefrenceVanilla from '../MyPreferenceSubscription.view.native';

describe('MyPrefrenceVanilla component', () => {
  it('should render correctly', () => {
    const labels = {};
    const otherProps = {};
    const component = shallow(<MyPrefrenceVanilla labels={labels} {...otherProps} />);
    expect(component).toMatchSnapshot();
  });
});
