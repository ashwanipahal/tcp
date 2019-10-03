import React from 'react';
import { shallow } from 'enzyme';
import ToastView from '../Toast.view';

describe('Toast msg view render', () => {
  let component;
  const props = {
    errorMessage: '',
    toastMessageReset: jest.fn(),
    positionValue: 0,
  };
  beforeEach(() => {
    component = shallow(<ToastView {...props} />);
  });

  it('should be defined', () => {
    expect(component).toBeDefined();
  });

  it('should render correctly', () => {
    expect(component).toMatchSnapshot();
  });
  it('should renders componentDidUpdate  correctly', () => {
    component.setProps({
      errorMessage: '',
    });
    expect(component).toMatchSnapshot();
  });
});
