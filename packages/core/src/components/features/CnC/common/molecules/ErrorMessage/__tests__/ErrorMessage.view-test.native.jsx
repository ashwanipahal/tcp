import React from 'react';
import { shallow } from 'enzyme';
import ErrorMessage from '../views/ErrorMessage.view.native';

describe('ErrorMessage Component', () => {
  let component;
  const Props = {
    error: 'This is test error',
  };

  beforeEach(() => {
    component = shallow(<ErrorMessage {...Props} />);
  });

  it('ErrorMessage should be defined', () => {
    expect(component).toBeDefined();
  });

  it('ErrorMessage should render correctly', () => {
    expect(component).toMatchSnapshot();
  });
});
