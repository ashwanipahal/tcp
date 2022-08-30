import React from 'react';
import { shallow } from 'enzyme';
import ErrorDisplay from '../views/ErrorDisplay.view.native';

describe('ErrorDisplay', () => {
  let component;
  const props = {
    margins: '5px 0 0 0',
    isBorder: false,
    width: null,
    paddings: null,
  };

  beforeEach(() => {
    component = shallow(<ErrorDisplay {...props} />);
  });

  it('should render correctly', () => {
    expect(component).toMatchSnapshot();
  });
});
