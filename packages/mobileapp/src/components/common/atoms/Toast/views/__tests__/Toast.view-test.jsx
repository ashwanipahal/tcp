import React from 'react';
import { shallow } from 'enzyme';
import ToastView from '../Toast.view';

describe('Toast msg view render', () => {
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
