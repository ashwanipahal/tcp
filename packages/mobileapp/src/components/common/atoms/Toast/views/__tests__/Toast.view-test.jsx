import React from 'react';
import { shallow } from 'enzyme';
import ToastView from '../Toast.view';

describe('Animated Brand Change Icon Native', () => {
  let component;
  beforeEach(() => {
    component = shallow(<ToastView />);
  });

  it('should be defined', () => {
    expect(component).toBeDefined();
  });

  it('should render correctly', () => {
    expect(component).toMatchSnapshot();
  });
});
