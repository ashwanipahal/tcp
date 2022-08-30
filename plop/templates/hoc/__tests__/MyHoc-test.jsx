import React from 'react';
import { shallow } from 'enzyme';
import MyHoc from '../MyHoc';

describe('MyHoc HOC', () => {
  it('MyHoc HOC renders correctly without props', () => {
    const Component = <h1>Test MyHoc</h1>;
    const HOC = MyHoc(Component);
    const component = shallow(<HOC />);
    expect(component).toMatchSnapshot();
  });
});
