import React from 'react';
import { shallow } from 'enzyme';
import FastImageNative from '../view/FastImage.view';

describe('FastImageNative', () => {
  let component;

  beforeEach(() => {
    const props = {
      url: 'http://fake-url',
      style: {},
    };
    component = shallow(<FastImageNative {...props} />);
  });

  it('should be defined', () => {
    expect(component).toBeDefined();
  });

  it('should render correctly', () => {
    expect(component).toMatchSnapshot();
  });
});
