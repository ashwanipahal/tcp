import React from 'react';
import { shallow } from 'enzyme';
import ErrorMessage from '../views/ErrorMessage.view.native';

describe('ErrorMessage Component', () => {
  let component;
  let props;

  beforeEach(() => {
    props = {
      error: 'This is test error',
    };
  });

  it('ErrorMessage should be defined', () => {
    component = shallow(<ErrorMessage {...props} />);
    expect(component).toBeDefined();
  });

  it('ErrorMessage should render correctly', () => {
    component = shallow(<ErrorMessage {...props} />);
    expect(component).toMatchSnapshot();
  });

  it('ErrorMessage should render correctly from bag page', () => {
    props.bagPage = true;
    component = shallow(<ErrorMessage {...props} />);
    expect(component).toMatchSnapshot();
  });

  it('ErrorMessage should render correctly with fontsize and fontweight', () => {
    props.fontSize = 'fs12';
    props.fontWeight = 'extrabold';
    component = shallow(<ErrorMessage {...props} />);
    expect(component).toMatchSnapshot();
  });
});
