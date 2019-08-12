import React from 'react';
import { shallow } from 'enzyme';
import { RemoveSoldOut } from '../views/RemoveSoldOut.view';

describe.only('RemoveSoldOut Component', () => {
  let component;
  const props = {
    errorMsg: 'This is test error.',
  };

  beforeEach(() => {
    component = shallow(<RemoveSoldOut {...props} />);
  });

  it('ItemAvailability should be defined', () => {
    expect(component).toBeDefined();
  });

  it('ItemAvailability should render correctly', () => {
    expect(component).toMatchSnapshot();
  });
});
