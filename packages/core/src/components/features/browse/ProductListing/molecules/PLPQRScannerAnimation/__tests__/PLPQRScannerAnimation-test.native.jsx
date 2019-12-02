import React from 'react';
import { shallow } from 'enzyme';
import PLPQRScannerAnimation from '../view/PLPQRScannerAnimation.native';

describe('PLPQRScannerAnimation', () => {
  let component;
  let props;
  props = {
    url: 'http://fake-image-url',
  };

  beforeEach(() => {
    component = shallow(<PLPQRScannerAnimation {...props} />);
  });

  it('should be defined', () => {
    expect(component).toBeDefined();
  });

  it('should render with open modal', () => {
    expect(component).toMatchSnapshot();
  });

  it('should render with close modal', () => {
    props = {
      ...props,
      isOpen: false,
    };
    component = shallow(<PLPQRScannerAnimation {...props} />);
    expect(component).toMatchSnapshot();
  });
});
