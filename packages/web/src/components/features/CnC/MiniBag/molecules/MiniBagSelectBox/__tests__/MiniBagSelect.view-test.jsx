import React from 'react';
import { shallow } from 'enzyme';
import MiniBagSelectBox from '../MiniBagSelectBox';

describe('MiniBagSelectBox component', () => {
  it('MiniBagSelectBox component renders correctly', () => {
    const component = shallow(<MiniBagSelectBox />);
    expect(component).toMatchSnapshot();
  });
});
