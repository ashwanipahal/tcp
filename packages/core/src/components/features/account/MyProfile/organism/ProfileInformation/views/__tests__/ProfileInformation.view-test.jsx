import React from 'react';
import { shallow } from 'enzyme';
import ProfileInformation from '../ProfileInformation.view';

describe('ProfileInformation component', () => {
  it('should render correctly', () => {
    const labels = {};
    const component = shallow(<ProfileInformation labels={labels} />);
    expect(component).toMatchSnapshot();
  });
});
