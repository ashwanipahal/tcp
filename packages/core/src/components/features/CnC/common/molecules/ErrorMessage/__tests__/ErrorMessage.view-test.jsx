import React from 'react';
import { shallow } from 'enzyme';
import { ErrorMessage } from '../views/ErrorMessage.view';

describe.only('ErrorMessage Component', () => {
  let component;
  const props = {
    error: 'This is test error.',
  };

  beforeEach(() => {
    component = shallow(<ErrorMessage {...props} />);
  });

  it('ErrorMessage should be defined', () => {
    expect(component).toBeDefined();
  });

  it('ErrorMessage should render correctly', () => {
    expect(component).toMatchSnapshot();
  });
});
